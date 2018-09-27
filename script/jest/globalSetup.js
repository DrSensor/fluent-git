const { resolve } = require('path');
const { execSync } = require('child_process');

const cd = dir => resolve(process.cwd(), dir);

module.exports = () => {
  process.chdir(cd('example'));
  execSync('git fetch origin --force refs/notes/*:refs/notes/*');
};
