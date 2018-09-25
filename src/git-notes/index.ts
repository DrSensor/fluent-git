import gitNotes from './notes';
import NotesHandler from './handler';
import { isHash } from '../utils';

/**
 * @param text can be SHA or string notes
 * @param options @see https://github.com/DrSensor/git-notes/README.md
 * @return chainable function/object depend on `text`
 */
export default function(
  text?: string,
  options: string | GitNotes.Options = {}
): any {
  if (!text) return new NotesHandler(options);
  else if (isHash(text)) return gitNotes(text, options);
  else
    return {
      // if isNotes
      add: new NotesHandler(options, 'add', text),
      overwrite: new NotesHandler(options, 'overwrite', text),
      copy: new NotesHandler(options, 'copyFrom', text),
      append: new NotesHandler(options, 'append', text)
    };
}
