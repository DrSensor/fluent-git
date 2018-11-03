module.exports = {
	testEnvironment: "node",
	preset: "ts-jest/presets/js-with-ts",
	globalSetup: "<rootDir>/script/jest/globalSetup.js",
	globalTeardown: "<rootDir>/script/jest/globalTeardown.js",
	testPathIgnorePatterns: [
		"<rootDir>/test/fixtures",
		"<rootDir>/node_modules/",
		"<rootDir>/packages/"
	],
	coveragePathIgnorePatterns: [
		".*\\.d\\.ts",
		"<rootDir>/node_modules/",
		"<rootDir>/packages/"
	]
}
