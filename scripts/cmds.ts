import { router } from 'cmdrouter';
import { execa } from 'execa';
import { saferRemove } from 'fs-aux';

const SKETCH_PATH = '.design/ui-assets.sketch';
const SVG_SPRITE_PATH = '.design/svg/sprite.svg';
const SYMBOLS_TS_PATH = 'src/icons-default.ts';

const { stdout, stderr } = process;
const execaOpts = Object.freeze({ stdout, stderr });

router({ build, watch }).route();

async function build() {
	await saferRemove('./dist');

	// TODO - enable demo css 
	// await sketch();

	// build the dist/css/ui.css
	await execa('./node_modules/.bin/pcss', execaOpts);

	// build the tsc (for the user imports)
	console.log(`running './node_modules/.bin/tsc'`);
	await execa('./node_modules/.bin/tsc', execaOpts);

	// build the rollup to be part of the dist (for demo, deprecated now)
	// await execa('./node_modules/.bin/rollup', ['-c'], execaOpts);
}

// FIXME - disabled since ESM update
async function watch() {
	await saferRemove('./dist');

	// NOTE - For v0.3.x we do not have demo here anymore, but in the @dom-native/site
	//        So, just watching the css and ts

	execa('./node_modules/.bin/pcss', ['-w'], execaOpts);
	console.log(`running './node_modules/.bin/tsc -w'`);
	execa('./node_modules/.bin/tsc', ['-w'], execaOpts);
	execa('./node_modules/.bin/sketchdev', ['-w'], execaOpts);

}
