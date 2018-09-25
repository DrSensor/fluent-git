import { sync as execFileSync } from 'execa';
import { isHash, parse } from '../../utils';
import { GitListTree } from './default-options';

import { fromCommit } from './commit';

/** Get tree hash from a folder at specific commit
 * @param folder folder name or path. Path must be relative path
 * @param commit commit-id (SHA-1) or commit-message
 * @param options objects based on `git ls-tree` flags
 * @return Git Object hash (tree) of the folder
 */
export function fromFolder(
  folder: string,
  commit: string,
  options = GitListTree
): string {
  const getObjSHA = (commitId: string): string => {
    const { abbreviated, recurse } = options;

    const trees = execFileSync(
      'git',
      [
        'ls-tree',
        commitId,
        abbreviated ? '--abbrev' : '',
        recurse ? '-r' : '',
        '-d'
      ],
      { shell: true }
    )
      .stdout.split('\n')
      .map(output => parse.git.lsTree(output));

    return trees.filter(t => t.type !== 'commit' && t.name === folder)[0].sha;
  };

  if (isHash(commit)) return getObjSHA(commit);
  else return getObjSHA(fromCommit(commit) as string);
}
