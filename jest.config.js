module.exports = {
	testEnvironment: "node",
	globals: {
		"ts-jest": {
			useBabelrc: true
		}
	},
	globalSetup: "<rootDir>/script/jest/globalSetup.js",
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	testPathIgnorePatterns: [
		"<rootDir>/test/fixtures",
		"<rootDir>/node_modules/",
		"<rootDir>/packages/"
	],
	coveragePathIgnorePatterns: [
		".*\\.d\\.ts",
		"<rootDir>/node_modules/",
		"<rootDir>/packages/"
	],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	setupTestFrameworkScriptFile: "./jest.setup.js"
}
