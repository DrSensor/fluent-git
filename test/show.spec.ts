import gitnotes from '../src';
import 'jest-extended';

describe('Show Notes', () => {
  describe('at specific Git Object', () => {
    describe('when use full SHA', () =>
      testSHA('af233391c665c79184a0d14cfe384b13a852e431'));

    describe('when use abbreviated SHA', () => testSHA('af23339'));

    test('should throw Error if no Git Object found', () => {
      const notes = gitnotes() as IfEmpty;
      expect(() => notes.at('fffffff').show()).toThrowError();
    });

    test('should throw Error if no note found', () => {
      const notes = gitnotes() as IfEmpty;
      expect(() => notes.at('0745e98').show()).toThrowError();
    });
  });

  describe('at specific COMMIT using commit message', () => {
    describe('while commit does exist', () => testCommit('Initial commit'));

    test('should throw Error if no commit-message found', () => {
      const notes = gitnotes() as IfEmpty;
      expect(() => notes.atCommit('( ͡° ͜ʖ ͡°)').show()).toThrowError();
    });

    test('should throw Error if no note found', () => {
      const notes = gitnotes() as IfEmpty;
      expect(() => notes.atCommit('another folder').show()).toThrowError();
    });
  });

  describe('at FILE on specific commit', () => {
    describe('while note is exist', () => {
      describe('if given commit-id', () => testFile('LICENSE', 'af23339'));
      describe('if given commit-message', () =>
        testFile('LICENSE', 'Initial commit'));
    });

    test('should throw Error if no file found', () => {
      const notes = gitnotes() as IfEmpty;
      expect(() => notes.atFile('( ͡° ͜ʖ ͡°)', 'af23339').show()).toThrowError();
    });

    test('should throw Error if no note found', () => {
      const notes = gitnotes() as IfEmpty;
      expect(() => notes.atFile('README.md', 'af23339').show()).toThrowError();
    });
  });

  describe('at FOLDER on specific commit', () => {
    describe('while note is exist', () => {
      describe('if given commit-id', () => testFolder('.github', 'b0279ab'));
      describe('if given commit-message', () =>
        testFolder('.github', 'another folder'));
    });

    test('should throw Error if no folder found', () => {
      const notes = gitnotes() as IfEmpty;
      expect(() => notes.atFolder('( ͡° ͜ʖ ͡°)', 'b0279ab').show()).toThrowError();
    });

    test('should throw Error if no note found', () => {
      const notes = gitnotes() as IfEmpty;
      expect(() => notes.atFolder('src', 'b0279ab').show()).toThrowError();
    });
  });
});

//#region test instantiating
function testSHA(GitObject: string) {
  it('should return string if given a Hash string on instantiating', () => {
    const notes = gitnotes(GitObject) as IfHash;
    expect(notes.show()).toBeString();
  });

  it('should throw Error if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes') as IfNotes;
    // @ts-ignore
    expect(() => notes.show.at(GitObject)).toThrowError();
  });

  it('should return string if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes() as IfEmpty;
    expect(notes.at(GitObject).show()).toBeString();
  });
}

function testCommit(CommitMessage: string) {
  it('should throw Error if given a Commit Message on instantiating', () => {
    const notes = gitnotes(CommitMessage) as IfHash;
    expect(() => notes.show()).toThrowError();
  });

  it('should throw Error if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes') as IfNotes;
    // @ts-ignore
    expect(() => notes.show.atCommit(CommitMessage)).toThrowError();
  });

  it('should return string if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes() as IfEmpty;
    expect(notes.atCommit(CommitMessage).show()).toBeString();
  });
}

function testFile(Filename: string, Commit: string) {
  it('should throw Error if given a Filename on instantiating', () => {
    const notes = gitnotes(Filename) as IfHash;
    expect(() => notes.show()).toThrowError();
  });

  it('should throw Error if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes') as IfNotes;
    // @ts-ignore
    expect(() => notes.show.atFile(Filename, Commit)).toThrowError();
  });

  it('should return string if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes() as IfEmpty;
    expect(notes.atFile(Filename, Commit).show()).toBeString();
  });
}

function testFolder(Folder: string, Commit: string) {
  it('should throw Error if given a Folder on instantiating', () => {
    const notes = gitnotes(Folder) as IfHash;
    expect(() => notes.show()).toThrowError();
  });

  it('should throw Error if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes') as IfNotes;
    // @ts-ignore
    expect(() => notes.show.atFolder(Filename, Commit)).toThrowError();
  });

  it('should return string if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes() as IfEmpty;
    expect(notes.atFolder(Folder, Commit).show()).toBeString();
  });
}
//#endregion
