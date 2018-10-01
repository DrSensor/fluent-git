import { notes as gitnotes } from '../src';
import * as SHA from '../src/git-notes/get-sha';
import 'jest-extended';
const isArray = Array.isArray;

const ref = 'test/remove';

describe('Remove Notes', () => {
  describe('at specific Git Object', () => {
    describe('when use full SHA', () =>
      testSHA('af233391c665c79184a0d14cfe384b13a852e431'));

    describe('when use abbreviated SHA', () => testSHA('af23339'));

    test('should throw Error if no Git Object found', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() => notes.at('fffffff').remove()).toThrowError();
    });

    test('should throw Error if no notes found', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() => notes.at('0745e98').remove()).toThrowError();
    });
  });

  describe('at specific COMMIT using commit message', () => {
    describe('while commit does exist', () => testCommit('Initial commit'));

    test('should throw Error if no commit-message found', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() => notes.atCommit('( ͡° ͜ʖ ͡°)').remove()).toThrowError();
    });

    test('should throw Error if notes found', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() => notes.atCommit('another folder').remove()).toThrowError();
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
      expect(() => notes.atFile('( ͡° ͜ʖ ͡°)', 'af23339').remove()).toThrowError();
    });

    test('should throw Error if no note found', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() =>
        notes.atFile('README.md', 'af23339').remove()
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
        notes.atFolder('( ͡° ͜ʖ ͡°)', 'b0279ab').remove()
      ).toThrowError();
    });

    test('should throw Error if no note found', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() => notes.atFolder('src', 'b0279ab').remove()).toThrowError();
    });
  });
});

//#region test instantiating
function testSHA(GitObject: string) {
  resetNotes(GitObject);

  it('should success if given a Hash string on instantiating', () => {
    const notes = gitnotes(GitObject, ref) as NotesUse.Hash;
    expect(() => notes.remove()).not.toThrowError();
  });

  it('should throw Error if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes', ref) as NotesUse.Text;
    // @ts-ignore
    expect(() => notes.remove.at(GitObject)).toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes(undefined, ref) as NotesUse.Manually;
    expect(() => notes.at(GitObject).remove()).not.toThrowError();
  });
}

function testCommit(CommitMessage: string) {
  const sha = SHA.fromCommit(CommitMessage);
  resetNotes(isArray(sha) ? sha[0] : sha);

  it('should success if given a Commit Message on instantiating', () => {
    const notes = gitnotes(CommitMessage, ref) as NotesUse.Hash;
    expect(() => notes.remove()).toThrowError();
  });

  it('should throw Error if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes', ref) as NotesUse.Text;
    // @ts-ignore
    expect(() => notes.remove.atCommit(CommitMessage)).toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes(undefined, ref) as NotesUse.Manually;
    expect(() => notes.atCommit(CommitMessage).remove()).not.toThrowError();
  });
}

function testFile(Filename: string, Commit: string) {
  const sha = SHA.fromFile(Filename, Commit);
  resetNotes(isArray(sha) ? sha[0] : sha);

  it('should throw Error if given a Filename on instantiating', () => {
    const notes = gitnotes(Filename, ref) as NotesUse.Hash;
    expect(() => notes.remove()).toThrowError();
  });

  it('should throw Error if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes', ref) as NotesUse.Text;
    // @ts-ignore
    expect(() => notes.remove.atFile(Filename, Commit)).toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes(undefined, ref) as NotesUse.Manually;
    expect(() => notes.atFile(Filename, Commit).remove()).not.toThrowError();
  });
}

function testFolder(Folder: string, Commit: string) {
  const sha = SHA.fromFolder(Folder, Commit);
  resetNotes(isArray(sha) ? sha[0] : sha);

  it('should throw Error if given a Folder on instantiating', () => {
    const notes = gitnotes(Folder, ref) as NotesUse.Hash;
    expect(() => notes.remove()).toThrowError();
  });

  it('should throw Error if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes', ref) as NotesUse.Text;
    // @ts-ignore
    expect(() => notes.remove.atFolder(Folder, Commit)).toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes(undefined, ref) as NotesUse.Manually;
    expect(() => notes.atFolder(Folder, Commit).remove()).not.toThrowError();
  });
}
//#endregion

function resetNotes(sha: string) {
  const notes = gitnotes(sha, ref) as NotesUse.Hash;
  let somenotes: string;

  try {
    beforeAll(() => (somenotes = notes.show()));
  } finally {
    afterEach(() => notes.overwriteWith(somenotes));
  }
}
