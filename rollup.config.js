
import rollup_cjs from '@rollup/plugin-commonjs';
import rollup_multi from '@rollup/plugin-multi-entry';
import rollup_re from '@rollup/plugin-node-resolve';
import rollup_ts from 'rollup-plugin-typescript2';



export default [{
	input: './demo/src/*.ts',
	output: {
		file: './demo/dist/demo-bundle.js',
		format: 'iife',
		name: 'bundle'
	},
	plugins: [
		rollup_multi(),
		rollup_cjs(),
		rollup_re(),
		rollup_ts({
			tsconfig: './demo/tsconfig.json'
		})]
}]

