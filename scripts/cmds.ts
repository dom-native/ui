import { router } from 'cmdrouter';
import { saferRemove } from 'fs-extra-plus';
import { spawn } from 'p-spawn';
import { buildDemoCode, uploadSite } from './helpers';


const SKETCH_PATH = '.design/ui-assets.sketch';
// const SYMBOLS_TS_PATH = 'src/icons-default.ts'

router({ build, watch, site }).route();

async function build() {
	await saferRemove('./dist');

	// TODO:
	// await sketch();

	// build the dist/css/ui.css
	await spawn('npm', ['run', 'build-css']);

	// build the tsc (vdev assume rollup on webBundles, which we do not need for this build)
	await spawn('./node_modules/.bin/tsc');
}


async function watch() {
	await saferRemove('./demo/dist');

	// generate first to have the ts able to compile
	await buildDemoCode(false);
	spawn('npm', ['run', 'build-demo-js', '--', '-w']);
	spawn('npm', ['run', 'build-demo-css', '--', '-w', '--verbose']);

	// // TODO sketch
	buildDemoCode(true);
}

async function dev() {
	watch();
	spawn('npm', ['run', 'start']);
}

async function site() {
	await uploadSite('demo/', 'dom-native/demo/draggable/');
}


// async function sketch() {
// 	const outDir = '.design/out';
// 	await saferRemove(outDir);
// 	await mkdir(outDir);

// 	const sketchDoc = await sketchdev(SKETCH_PATH);
// 	const svgDir = outDir + '/svgs';
// 	const spritePath = outDir + '/sprite.svg';
// 	await sketchDoc.exportArtboards({
// 		out: svgDir,
// 		replace: [/\/\d.*$/, ''] as [RegExp, string],
// 		artboardName: /^d-ico\/.*$/, // the regex matching artboard that should be exported
// 		flatten: '-',
// 		sprite: spritePath
// 	});
// 	const spriteContent = await readFile(spritePath, 'utf8');
// 	const tsFileContent = await readFile(SYMBOLS_TS_PATH, 'utf8');

// 	const regex = /const\sSVG_SYMBOLS\s=\s`([\s\S]*)`/;

// 	const newTsFileContent = tsFileContent.replace(regex, `const SVG_SYMBOLS = \`\n${spriteContent}\n\``);

// 	await writeFile(SYMBOLS_TS_PATH, newTsFileContent, 'utf8');
// 	console.log(`Sketch file changed, ${SYMBOLS_TS_PATH} file updated`);

// }