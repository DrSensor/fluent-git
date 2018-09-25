import gitNotes, { IfManual } from './';
import { command } from 'yargs';
import { isHash } from './utils';

const notes = gitNotes() as IfManual;

const yargs = command({
  command: 'print <commit>',
  describe: 'print notes',
  handler: argv => {
    if (isHash(argv.commit)) console.log(notes.at(argv.commit).show());
    else console.log(notes.atCommit(argv.commit).show());
  }
}).showHelpOnFail(true);

if (process.argv.length <= 2) yargs.showHelp().parse();
else yargs.parse();
