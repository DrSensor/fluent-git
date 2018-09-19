import { sync as execFileSync } from 'execa';
import { isHash, parse } from '../../utils';
import { GitListCommit } from '../default-options';

import { fromCommit } from './commit';

/** Get commit hash from a submodule at specific commit
 * @param submoduleFolder folder name or path of the git submodule. Path must be relative path
 * @param commit commit-id (SHA-1) or commit-message
 * @param options objects based on `git ls-tree` flags
 * @return Git Object hash (commit) of the submodule
 */
export function fromSubmodule(
  submoduleFolder: string,
  commit: string,
  options = GitListCommit
): string {
  const getObjSHA = (commitId: string): string => {
    const { abbreviated } = options;

    const trees = execFileSync(
      'git',
      ['ls-tree', commitId, abbreviated ? '--abbrev' : '', '-r', '-d'],
      { shell: true }
    )
      .stdout.split('\n')
      .map(output => parse.git.lsTree(output));

    return trees.filter(
      t => t.type === 'commit' && t.name === submoduleFolder
    )[0].sha;
  };

  if (isHash(commit)) return getObjSHA(commit);
  else return getObjSHA(fromCommit(commit) as string);
}
