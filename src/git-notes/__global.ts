import '';

interface Handler {
  at(sha: string): void;
  atCommit(message: string): void;
  atFile(file: string, commit: string): void;
  atFolder(file: string, commit: string): void;
}

declare global {
  namespace NotesUse {
    interface Text {
      add: Handler;
      overwrite: Handler;
      copy: Handler;
      append: Handler;
    }

    interface Hash {
      add(notes: string): void;
      overwriteWith(notes: string): void;
      copyFrom(notes: string): void;
      append(notes: string): void;
      remove(): void;
      show(): string;
    }

    interface Manually {
      at(sha: string): Hash;
      atCommit(message: string): Hash;
      atFile(file: string, commit: string): Hash;
      atFolder(file: string, commit: string): Hash;
    }
  }
}
