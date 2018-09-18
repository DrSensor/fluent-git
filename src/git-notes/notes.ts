export interface GitNotes {
  [ops: string]: (notes: string) => void;
  show(): string;
}

export default function(sha: string): GitNotes {
  return {
    add(notes: string): void {
      /* not yet implemented */
    },
    overwrite(notes: string): void {
      /* not yet implemented */
    },
    copy(notes: string): void {
      /* not yet implemented */
    },
    append(notes: string): void {
      /* not yet implemented */
    },
    remove(notes: string): void {
      /* not yet implemented */
    },
    show(): string {
      return 'not yet implemented';
    }
  };
}
