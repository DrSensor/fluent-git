import { sync as execFileSync } from 'execa';

type Notes = string | GitNotes;
export interface GitNotes {
  notes: string;
  ref: string;
}

export default function(sha: string) {
  return {
    add(notes: Notes): void {
      /* not yet implemented */
    },
    overwrite(notes: Notes): void {
      /* not yet implemented */
    },
    copy(notes: Notes): void {
      /* not yet implemented */
    },
    append(notes: Notes): void {
      /* not yet implemented */
    },
    remove(notes: Notes): void {
      /* not yet implemented */
    },
    show: (ref?: string): string =>
      execFileSync('git', ['notes', ...(ref ? [ref] : []), 'show', sha]).stdout
  };
}
