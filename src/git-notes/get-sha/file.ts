import { sync as execFileSync } from 'execa';
import { isHash, parse } from '../../utils';
import { GitListBlob } from '../default-options';

import { fromCommit } from './commit';

/** Get blob hash from a file at specific commit
 * @param file filename or filepath. Filepath must be relative path
 * @param commit commit-id (SHA-1) or commit-message
 * @param options objects based on `git ls-tree` flags
 * @return Git Object hash (blob) of the file
 */
export function fromFile(
  file: string,
  commit: string,
  options = GitListBlob
): string {
  const getObjSHA = (commitId: string): string => {
    const { abbreviated, recurse } = options;

    const trees = execFileSync(
      'git',
      ['ls-tree', commitId, abbreviated ? '--abbrev' : '', recurse ? '-r' : ''],
      { shell: true }
    )
      .stdout.split('\n')
      .map(output => parse.git.lsTree(output));

    return trees.filter(t => t.type !== 'commit' && t.name === file)[0].sha;
  };

  if (isHash(commit)) return getObjSHA(commit);
  else return getObjSHA(fromCommit(commit) as string);
}
