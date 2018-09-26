import gitNotes from './notes';
import NotesHandler from './handler';
import { isHash } from '../utils';

/** Instantiate fluent API for git-notes 😎
 * @param text can be SHA or string notes
 * @param options can be --ref string or key-value (js object) of options
 * @return chainable function/object depend on `text`
 */
export default function(
  text?: string,
  options: string | GitNotes.Options = {}
): any {
  options = typeof options === 'string' ? { ref: options } : options;

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

import './__global';
