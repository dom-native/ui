

export default {
	input: '.design/dom-native-ui-assets.sketch',
	output: [{
		type: 'svg',
		// out: '.design/svg/sprite.svg',
		out: 'src/svg-icons-symbols-default.ts',
		artboard: /^d-ico\/.*/,
		flatten: '-'
	}
	]
}