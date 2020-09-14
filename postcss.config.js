const plugins = [
	require("autoprefixer"),
	require("postcss-import"),
	require("postcss-mixins"),
	require("postcss-nested")
];

module.exports = (ctx) => {
	return {
		map: { inline: false },
		plugins
	}
};