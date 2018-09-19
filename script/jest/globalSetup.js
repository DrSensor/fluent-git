const { resolve } = require('path');
const cd = dir => resolve(process.cwd(), dir);
module.exports = () => process.chdir(cd('example'));
