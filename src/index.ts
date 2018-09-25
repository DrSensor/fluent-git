export { default } from './git-notes';

interface IfNotesHandler {
  at(sha: string): void;
  atCommit(message: string): void;
  atFile(file: string, commit: string): void;
  atFolder(file: string, commit: string): void;
}

export interface IfNotes {
  add: IfNotesHandler;
  overwrite: IfNotesHandler;
  copy: IfNotesHandler;
  append: IfNotesHandler;
  remove: IfNotesHandler;
}

export interface IfHash {
  add(notes: string): void;
  overwrite(notes: string): void;
  copy(notes: string): void;
  append(notes: string): void;
  remove(notes: string): void;
  show(): string;
}

export interface IfManual {
  at(sha: string): IfHash;
  atCommit(message: string): IfHash;
  atFile(file: string, commit: string): IfHash;
  atFolder(file: string, commit: string): IfHash;
}
