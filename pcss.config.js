const prefixer = (await import('autoprefixer')).default;
const importer = (await import('postcss-import')).default;
const nested = (await import('postcss-nested')).default;

const plugins = [
	prefixer,
	importer,
	nested
];

export default [{
	// required. Support single string, or array, will be processed in order
	input: ['pcss/all.pcss'],

	// required. single css file supported for now. 
	output: 'dist/css/ui.css',

	watchPath: ['./**/*.pcss'],

	// postcss processor arrays
	plugins
}]