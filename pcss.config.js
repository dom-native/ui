const prefixer = (await import('autoprefixer')).default;
const importer = (await import('postcss-import')).default;
const nested = (await import('postcss-nested')).default;
const mixins = (await import('postcss-mixins')).default;

const plugins = [
	prefixer,
	importer,
	mixins,
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
},
{
	input: ['demo/pcss/main.pcss'],

	// required. single css file supported for now. 
	output: 'demo/dist/demo-bundle.css',

	watchPath: ['./**/*.pcss'],

	// postcss processor arrays
	plugins
}
]