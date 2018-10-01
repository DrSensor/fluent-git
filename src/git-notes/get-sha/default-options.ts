//#region based on `git log` flags
export const GitLog = {
  abbreviated: true,
  maxCount: 1
};
//#endregion

//#region based on `git ls-tree` flags
export const GitListBlob = {
  abbreviated: true,
  recurse: true
};

export const GitListTree = {
  abbreviated: true,
  recurse: true
};

export const GitListCommit = {
  abbreviated: true
};
//#endregion
