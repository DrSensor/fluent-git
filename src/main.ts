import { notes } from './';
import { command } from 'yargs';
import { isHash } from './utils';

const gnotes = notes() as NotesUse.Manually;

const yargs = command({
  command: 'print <commit>',
  describe: 'print notes',
  handler: argv => {
    if (isHash(argv.commit)) console.log(gnotes.at(argv.commit).show());
    else console.log(gnotes.atCommit(argv.commit).show());
  }
}).showHelpOnFail(true);

if (process.argv.length <= 2) yargs.showHelp().parse();
else yargs.parse();
