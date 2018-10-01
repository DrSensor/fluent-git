const { execSync } = require('child_process');
const { resolve } = require('path');
const { rm } = require('shelljs');

const testNotes = resolve(
  process.cwd(),
  '../.git/modules/example/refs/notes/test'
);

module.exports = () => {
  rm('-r', testNotes);
  execSync('git fetch origin --force refs/notes/*:refs/notes/*');
};
