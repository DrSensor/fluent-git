import { isHash } from '../utils';

export function fromCommit(message: string) {
  return String('not yet implemented');
}

export function fromFile(file: string, commit: string) {
  const getObjSHA = (commitId: string) => String('not yet implemented');

  if (isHash(commit)) return getObjSHA(commit);
  else return getObjSHA(fromCommit(commit));
}

export function fromFolder(file: string, commit: string) {
  const getObjSHA = (commitId: string) => String('not yet implemented');

  if (isHash(commit)) return getObjSHA(commit);
  else return getObjSHA(fromCommit(commit));
}
