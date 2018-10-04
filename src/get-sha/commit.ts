import { sync as execFileSync } from 'execa';
import { GitLog } from './default-options';

/** Get commit hash from commit-message
 * Be careful it will return either individual or array of string
 * @param message commit message
 * @param options objects based on `git log` flags
 * @return Git Object hash of the commit
 */
export function fromCommit(
  message: string,
  options = GitLog
): string | string[] {
  const { abbreviated, maxCount } = options;
  const format = abbreviated ? '%h' : '%H';

  const commitIds = execFileSync(
    'git',
    [
      'log',
      `--grep='${message}'`,
      `--max-count ${maxCount}`,
      `--pretty='format:${format}'`
    ],
    { shell: true }
  ).stdout.split('\n');

  if (!maxCount)
    throw new Error(
      '`--max-count 0` will not output anything. Are you sure about this?'
    );
  else if (maxCount === 1) return commitIds[0];
  else return commitIds;
}
