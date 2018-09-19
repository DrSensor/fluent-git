import gitNotes from './notes';
import * as SHA from './get-sha';
import { isHash, becomePanic } from '../utils';

type Operation = 'add' | 'overwrite' | 'copy' | 'append' | 'remove';

/** Class Handler to make 🆒 semantic API style 😎 */
export default class {
  constructor(private ops?: Operation, private notes?: string) {
    if (ops && !notes) throw new Error('Notes is missing for operation ' + ops);
  }

  /** Insert/Read notes at specific git hash-object
   * @param sha hash-object of commit, blob, or tree
   * @returns chainable function **if possible**
   */
  at(sha: string) {
    if (this.ops) return gitNotes(sha)[this.ops](this.notes!);
    else return gitNotes(sha);
  }

  /** Insert/Read notes at specific file
   * @param message must be string of the message
   * @returns chainable function **if possible**
   */
  atCommit = (message: string) => this.at(this.getCommitSHA(message)!);

  /** Insert/Read notes at specific file
   * @param file can be filename or relative filepath
   * @param commit can be commit-id (SHA-1) or commit-message
   * @returns chainable function **if possible**
   */
  atFile(file: string, commit: string) {
    if (isHash(commit)) return this.at(SHA.fromFile(file, commit));
    else return this.at(SHA.fromFile(file, this.getCommitSHA(commit)!));
  }

  /** Insert/Read notes at specific folder
   * @param tree can be foldername or relativepath
   * @param commit can be commit-id (SHA-1) or commit-message
   * @returns chainable function **if possible**
   */
  atFolder(tree: string, commit: string) {
    if (isHash(commit)) return this.at(SHA.fromFolder(tree, commit));
    else return this.at(SHA.fromFolder(tree, this.getCommitSHA(commit)!));
  }

  /** Insert/Read notes at specific submodule
   * @param submodule must be relativepath
   * @param commit can be commit-id (SHA-1) or commit-message
   * @returns chainable function **if possible**
   */
  atSubmodule(submodule: string, commit: string) {
    if (isHash(commit)) return this.at(SHA.fromSubmodule(submodule, commit));
    else
      return this.at(SHA.fromSubmodule(submodule, this.getCommitSHA(commit)!));
  }

  // same as `fromCommit` from `get-sha.ts` but with error handling
  private getCommitSHA(message: string) {
    const commitId = SHA.fromCommit(message);

    if (Array.isArray(commitId))
      becomePanic({
        operation: {
          name: 'commit-message',
          data: message
        },
        data: commitId,
        suggestion: `git log --all --grep='${message}' --oneline`
      });
    else return commitId;
  }
}
