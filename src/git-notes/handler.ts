import { exec, spawn } from 'child_process';
import gitNotes from './notes';
import * as SHA from './get-sha';

type Operation = 'add' | 'overwrite' | 'copy' | 'append' | 'remove';

/**
 * @see https://gist.github.com/DrSensor/d7d005265009b38f2130adc27eae59be
 */
export default class {
  constructor(private ops?: Operation, private notes?: string) {
    if (ops && !notes) throw new Error('Notes is missing for operation ' + ops);
  }

  /** Insert/Read notes at specific git hash-object
   * @param sha hash-object of commit, blob, or tree
   */
  at(sha: string) {
    if (this.ops) return gitNotes(sha)[this.ops](this.notes!);
    else return gitNotes(sha);
  }

  /** Insert/Read notes at specific file
   * @param message must be string of the message
   */
  atCommit = (message: string) => this.at(SHA.fromCommit(message));

  /** Insert/Read notes at specific file
   * @param file can be filename or relative filepath
   * @param commit can be commit-id (SHA-1) or commit-message
   */
  atFile = (file: string, commit: string) =>
    this.at(SHA.fromFile(file, commit));

  /** Insert/Read notes at specific folder
   * @param tree can be relative or fullpath
   * @param commit can be commit-id (SHA-1) or commit-message
   */
  atFolder = (tree: string, commit: string) =>
    this.at(SHA.fromFolder(tree, commit));
}
