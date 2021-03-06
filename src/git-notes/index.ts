import gitNotes from './notes';
import NotesHandler from './handler';
import { isHash } from '../utils';
const isPlainObject = (obj: any) => !!obj && obj.constructor === Object;

/** Instantiate fluent API for git-notes 😎
 * @param text can be SHA or string notes
 * @param options can be --ref string or key-value (js object) of options
 * @return chainable function/object depend on `text`
 */
export default function(
  text?: string | GitNotes.Options,
  options: string | GitNotes.Options = {}
): any {
  if (isPlainObject(text)) options = text as GitNotes.Options;
  else options = typeof options === 'string' ? { ref: options } : options;

  if (typeof text !== 'string') return new NotesHandler(options);
  else if (isHash(text)) return gitNotes(text, options);
  else
    return {
      // if isNotes
      add: new NotesHandler(options, 'add', text),
      overwrite: new NotesHandler(options, 'overwriteWith', text),
      copy: new NotesHandler(options, 'add', text), // this is intentional for semantic sakes 😂
      append: new NotesHandler(options, 'append', text)
    };
}

import './__global';
