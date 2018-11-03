/** Check if string is Hash string
 * @param str string that need to be checked
 * @return true if hash string
 */
export const isHash = (str: string) =>
  /^([a-f0-9]{5,50})|(HEAD([~^]\d*)*)$/gm.test(str);

/** Specific exception for this program
 * Why? Because you need beutiful error message 😆
 * @param {Panic} panic panic object
 * @throws beutiful error message
 */
export const becomePanic = (panic: GitNotes.Panic) => {
  throw new Error(
    `${panic.operation.name}: ${panic.operation.data}` +
      `\nHas multiple Id: ${panic.data}` +
      '\n\nFor more info try:' +
      `\n${panic.suggestion}`
  );
};

/** Helper for parsing various string */
export const parse = {
  git: {
    /** This will parse output string from `git ls-tree`
     * @see https://git-scm.com/docs/git-ls-tree#_output_format
     * @param output <mode> SP <type> SP <object> TAB <file>
     * @example const {mode,type,sha,name} = parse.git.lsTree('040000 tree c7584b4\t.circleci')
     */
    lsTree(output: string) {
      // <mode> SP <type> SP <object> TAB <file>
      const [mode, type, ObjectAndFolder] = output.split(' ');
      const [sha, name] = ObjectAndFolder.split('\t');
      return { mode, type, sha, name };
    }
  }
};
