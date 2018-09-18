interface IfNotesHandler {
  at(sha: string): void;
  atCommit(message: string): void;
  atFile(file: string, commit: string): void;
  atFolder(file: string, commit: string): void;
}

interface IfNotes {
  add: IfNotesHandler;
  overwrite: IfNotesHandler;
  copy: IfNotesHandler;
  append: IfNotesHandler;
  remove: IfNotesHandler;
}

interface IfHash {
  add(notes: string): void;
  overwrite(notes: string): void;
  copy(notes: string): void;
  append(notes: string): void;
  remove(notes: string): void;
  show(): string;
}

interface IfEmpty {
  at(sha: string): IfHash;
  atCommit(message: string): IfHash;
  atFile(file: string, commit: string): IfHash;
  atFolder(file: string, commit: string): IfHash;
}

declare module '*/dist' {
  function notes(text?: string): IfEmpty | IfHash | IfNotes;
  export default notes;
}
