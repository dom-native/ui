

module.exports = {
	input: '.design/ui-assets.sketch',
	output: [{
		type: 'svg',
		out: '.design/svg/sprite.svg',
		artboard: /^d-ico\/.*/,
		flatten: '-'
	}
	]
}