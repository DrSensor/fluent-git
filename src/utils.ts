/** Check if string is Hash string
 * @param str string that need to be checked
 */
export const isHash = (str: string) => /^[a-f0-9]{5,50}$/gm.test(str);
