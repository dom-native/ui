

module.exports = {
	input: 'design.sketch',
	output: [{
		type: 'svg',
		out: 'svg/sprite.svg',
		artboard: /^d-ico\/.*/,
		flatten: '-'
	}
	]
}