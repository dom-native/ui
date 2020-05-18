import * as chokidar from 'chokidar';
import { router } from 'cmdrouter';
import * as fs from 'fs-extra-plus';
import { spawn } from 'p-spawn';
import { sketchdev } from 'sketchdev';


const SKETCH_PATH = '.design/ui-assets.sketch';
const SYMBOLS_TS_PATH = 'src/icons-default.ts'

router({ build, watch, dev, sketch, push }).route();

async function build() {
	await fs.saferRemove('./dist');

	await sketch();

	// build the mvdom-ui.css
	await spawn('./node_modules/.bin/vdev', ['build', 'dist']);

	// build the tsc (vdev assume rollup on webBundles, which we do not need for this build)
	await spawn('./node_modules/.bin/tsc');
}

async function watch() {
	await fs.saferRemove('./demo/dist');

	spawn('./node_modules/.bin/vdev', ['watch', 'demo']);

	if (await fs.pathExists(SKETCH_PATH)) {
		chokidar.watch(SKETCH_PATH).on('change', async () => {
			await sketch();
		});
	}
}

async function dev() {
	watch();
	spawn('npm', ['run', 'start']);
}

async function sketch() {
	const outDir = '.design/out';
	await fs.saferRemove(outDir);
	await fs.mkdir(outDir);

	const sketchDoc = await sketchdev(SKETCH_PATH);
	const svgDir = outDir + '/svgs';
	const spritePath = outDir + '/sprite.svg';
	await sketchDoc.exportArtboards({
		out: svgDir,
		replace: [/\/\d.*$/, ''] as [RegExp, string],
		artboardName: /^d-ico\/.*$/, // the regex matching artboard that should be exported
		flatten: '-',
		sprite: spritePath
	});
	const spriteContent = await fs.readFile(spritePath, 'utf8');
	const tsFileContent = await fs.readFile(SYMBOLS_TS_PATH, 'utf8');

	const regex = /const\sSVG_SYMBOLS\s=\s`([\s\S]*)`/;

	const newTsFileContent = tsFileContent.replace(regex, `const SVG_SYMBOLS = \`\n${spriteContent}\n\``);

	await fs.writeFile(SYMBOLS_TS_PATH, newTsFileContent, 'utf8');
	console.log(`Sketch file changed, ${SYMBOLS_TS_PATH} file updated`);

}


async function push() {

}