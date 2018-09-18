import { exec, spawn } from 'child_process';
import gitNotes from './notes';
import NotesHandler from './handler';
import { isHash } from '../utils';

/**
 * @see https://gist.github.com/DrSensor/d7d005265009b38f2130adc27eae59be
 */
export default function(text?: string) {
  if (!text) return new NotesHandler();
  else if (isHash(text)) return gitNotes(text);
  else
    return {
      // if isNotes
      add: new NotesHandler('add', text),
      overwrite: new NotesHandler('overwrite', text),
      copy: new NotesHandler('copy', text),
      append: new NotesHandler('append', text),
      remove: new NotesHandler('remove', text)
    };
}
