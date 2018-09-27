import {dirname} from "path"
import pkg from "./package.json"
import prc from "./.prettierrc.json"

import commonjs from "rollup-plugin-commonjs"
import resolve from "rollup-plugin-node-resolve"
import autoExternal from "rollup-plugin-auto-external"
import babel from "rollup-plugin-babel"
import prettier from "rollup-plugin-prettier"
import typescript from "rollup-plugin-typescript2"

import executable from "./script/rollup-plugin/executable"
import moveDts from "./script/rollup-plugin/move-typedef"

// #region helper
let {overrides, ...options} = prc
const prettierrc = {
	options: options,
	files: files => overrides.find(p => p.files === files).options
}
// #endregion

// Rollup Configuration
export default [
	{
		input: {
			index: "src/index.ts",
			"get-sha": "src/git-notes/get-sha/index.ts",
			cli: "src/main.ts"
		},
		output: {
			dir: dirname(pkg.main),
			format: "cjs",
			exports: "named"
		},
		experimentalCodeSplitting: true,
		plugins: [
			typescript({
				exclude: ["test/**"],
				tsconfigOverride: {compilerOptions: {module: "esnext"}}
			}),
			moveDts(),
			commonjs(),
			resolve(),
			babel(),
			autoExternal(),
			prettier(prettierrc.files("*.js")),
			executable()
		]
	}
]
