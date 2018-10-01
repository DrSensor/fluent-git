import { notes as gitnotes } from '../src';
import * as SHA from '../src/git-notes/get-sha';
import { execSync } from 'child_process';
import 'jest-extended';

const ref = 'test/copy';
const destSHA = 'HEAD';

describe('Copy Notes', () => {
  beforeAll(() => gitnotes('notes that should be copied', ref).add.at(destSHA));

  describe('at specific Git Object', () => {
    describe('when use full SHA', () =>
      testSHA('af233391c665c79184a0d14cfe384b13a852e431'));

    describe('when use abbreviated SHA', () => testSHA('af23339'));

    test('should throw Error if no Git Object found', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() => notes.at('fffffff').copyFrom(destSHA)).toThrowError();
    });

    test('should throw Error if notes found ⚠️', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() => notes.at('cf1ab25').copyFrom(destSHA)).toThrowError();
    });
  });

  describe('at specific COMMIT using commit message', () => {
    describe('while commit does exist', () => testCommit('Initial commit'));

    test('should throw Error if no commit-message found', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() => notes.atCommit('( ͡° ͜ʖ ͡°)').copyFrom(destSHA)).toThrowError();
    });

    test('should throw Error if notes found ️️⚠️', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() =>
        notes.atCommit('Initial commit').copyFrom(destSHA)
      ).toThrowError();
    });
  });

  describe('at FILE on specific commit', () => {
    describe('while note is exist', () => {
      describe('if given commit-id', () => testFile('LICENSE', 'af23339'));
      describe('if given commit-message', () =>
        testFile('LICENSE', 'Initial commit'));
    });

    test('should throw Error if no file found', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() =>
        notes.atFile('( ͡° ͜ʖ ͡°)', 'af23339').copyFrom(destSHA)
      ).toThrowError();
    });

    test('should throw Error if notes found ⚠️', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() =>
        notes.atFile('LICENSE', 'af23339').copyFrom(destSHA)
      ).toThrowError();
    });
  });

  describe('at FOLDER on specific commit', () => {
    describe('while note is exist', () => {
      describe('if given commit-id', () => testFolder('.github', 'b0279ab'));
      describe('if given commit-message', () =>
        testFolder('.github', 'another folder'));
    });

    test('should throw Error if no folder found', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() =>
        notes.atFolder('( ͡° ͜ʖ ͡°)', 'b0279ab').copyFrom(destSHA)
      ).toThrowError();
    });

    test('should throw Error if notes found ⚠️', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() =>
        notes.atFolder('.github', 'b0279ab').copyFrom(destSHA)
      ).toThrowError();
    });
  });
});

//#region test instantiating
function testSHA(GitObject: string) {
  afterEach(() =>
    execSync(`git notes --ref=${ref} remove ${GitObject} --ignore-missing`));

  it('should success if given a Hash string on instantiating', () => {
    const notes = gitnotes(GitObject, ref) as NotesUse.Hash;
    expect(() => notes.copyFrom(destSHA)).not.toThrowError();
  });

  it('should success if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes', ref) as NotesUse.Text;
    expect(() => notes.copy.at(GitObject)).not.toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes(undefined, ref) as NotesUse.Manually;
    expect(() => notes.at(GitObject).copyFrom(destSHA)).not.toThrowError();
  });
}

function testCommit(CommitMessage: string) {
  afterEach(() =>
    execSync(
      `git notes --ref=${ref} remove ${SHA.fromCommit(
        CommitMessage
      )} --ignore-missing`
    ));

  it('should throw Error if given a Commit Message on instantiating', () => {
    const notes = gitnotes(CommitMessage, ref) as NotesUse.Hash;
    expect(() => notes.copyFrom(destSHA)).toThrowError();
  });

  it('should success if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes', ref) as NotesUse.Text;
    expect(() => notes.copy.atCommit(CommitMessage)).not.toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes(undefined, ref) as NotesUse.Manually;
    expect(() =>
      notes.atCommit(CommitMessage).copyFrom(destSHA)
    ).not.toThrowError();
  });
}

function testFile(Filename: string, Commit: string) {
  afterEach(() =>
    execSync(
      `git notes --ref=${ref} remove ${SHA.fromFile(
        Filename,
        Commit
      )} --ignore-missing`
    ));

  it('should throw Error if given a Filename on instantiating', () => {
    const notes = gitnotes(Filename, ref) as NotesUse.Hash;
    expect(() => notes.copyFrom(destSHA)).toThrowError();
  });

  it('should success if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes', ref) as NotesUse.Text;
    expect(() => notes.copy.atFile(Filename, Commit)).not.toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes(undefined, ref) as NotesUse.Manually;
    expect(() =>
      notes.atFile(Filename, Commit).copyFrom(destSHA)
    ).not.toThrowError();
  });
}

function testFolder(Folder: string, Commit: string) {
  afterEach(() =>
    execSync(
      `git notes --ref=${ref} remove ${SHA.fromFolder(
        Folder,
        Commit
      )} --ignore-missing`
    ));

  it('should throw Error if given a Folder on instantiating', () => {
    const notes = gitnotes(Folder, ref) as NotesUse.Hash;
    expect(() => notes.copyFrom(destSHA)).toThrowError();
  });

  it('should success if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes', ref) as NotesUse.Text;
    expect(() => notes.copy.atFolder(Folder, Commit)).not.toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes(undefined, ref) as NotesUse.Manually;
    expect(() =>
      notes.atFolder(Folder, Commit).copyFrom(destSHA)
    ).not.toThrowError();
  });
}
//#endregion
