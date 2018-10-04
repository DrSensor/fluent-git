import { sync as execFileSync, CommonOptions as ExecaOptions } from 'execa';
import { isHash } from '../utils';

/** Helper function to execute {@link https://git-scm.com/docs/git-notes#_subcommands git-notes subcommands}
 * @param sha SHA of commit, blob, or tree
 * @param options accept either value of `--ref` or `--ref` + {@link https://github.com/sindresorhus/execa#options execa Options}
 * @return list of function correspond to git-notes subcommands which can be called
 */
export default function(
  sha: string,
  options: GitNotes.Options
): GitNotes.Operation {
  const { ref, ...execaOpts } = options;

  return {
    add: (notes: string) =>
      execFileSync(
        'git',
        ['notes', ...(ref ? ['--ref', ref] : []), 'add', sha, '-m', notes],
        execaOpts
      ),

    overwriteWith: (text: string) =>
      execFileSync(
        'git',
        [
          'notes',
          ...(ref ? ['--ref', ref] : []),
          ...(isHash(text) ? ['copy', text, sha] : ['add', sha, '-m', text]),
          '-f'
        ],
        execaOpts
      ),

    copyFrom: (otherSHA: string) =>
      execFileSync(
        'git',
        ['notes', ...(ref ? ['--ref', ref] : []), 'copy', otherSHA, sha],
        execaOpts
      ),

    append: (notes: string) =>
      execFileSync(
        'git',
        ['notes', ...(ref ? ['--ref', ref] : []), 'append', sha, '-m', notes],
        execaOpts
      ),

    remove: () =>
      execFileSync(
        'git',
        ['notes', ...(ref ? ['--ref', ref] : []), 'remove', sha],
        execaOpts
      ),

    show: () =>
      execFileSync(
        'git',
        ['notes', ...(ref ? ['--ref', ref] : []), 'show', sha],
        execaOpts
      ).stdout
  };
}
