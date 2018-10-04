import { notes as gitnotes } from '../src';
import * as SHA from '../src/git-notes/get-sha';
import { execSync } from 'child_process';
import 'jest-extended';

const ref = 'test/add';
const somenotes = `headline of the notes
# 😋 Lorem Ipsum
* Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
* Aliquam tincidunt mauris eu risus.
* Vestibulum auctor dapibus neque.
`;

describe('Add Notes', () => {
  describe('at specific Git Object', () => {
    describe('when use full SHA', () =>
      testSHA('af233391c665c79184a0d14cfe384b13a852e431'));

    describe('when use abbreviated SHA', () => testSHA('af23339'));

    test('should throw Error if no Git Object found', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() => notes.at('fffffff').add(somenotes)).toThrowError();
    });

    test('should throw Error if notes found ⚠️', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() => notes.at('cf1ab25').add(somenotes)).toThrowError();
    });
  });

  describe('at specific COMMIT using commit message', () => {
    describe('while commit does exist', () => testCommit('Initial commit'));

    test('should throw Error if no commit-message found', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() => notes.atCommit('( ͡° ͜ʖ ͡°)').add(somenotes)).toThrowError();
    });

    test('should throw Error if notes found ️️⚠️', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() =>
        notes.atCommit('Initial commit').add(somenotes)
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
        notes.atFile('( ͡° ͜ʖ ͡°)', 'af23339').add(somenotes)
      ).toThrowError();
    });

    test('should throw Error if notes found ⚠️', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() =>
        notes.atFile('LICENSE', 'af23339').add(somenotes)
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
        notes.atFolder('( ͡° ͜ʖ ͡°)', 'b0279ab').add(somenotes)
      ).toThrowError();
    });

    test('should throw Error if notes found ⚠️', () => {
      const notes = gitnotes() as NotesUse.Manually;
      expect(() =>
        notes.atFolder('.github', 'b0279ab').add(somenotes)
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
    expect(() => notes.add(somenotes)).not.toThrowError();
  });

  it('should success if given a Notes/Text on instantiating', () => {
    const notes = gitnotes(somenotes, ref) as NotesUse.Text;
    expect(() => notes.add.at(GitObject)).not.toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes({ ref }) as NotesUse.Manually;
    expect(() => notes.at(GitObject).add(somenotes)).not.toThrowError();
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
    expect(() => notes.add(somenotes)).toThrowError();
  });

  it('should success if given a Notes/Text on instantiating', () => {
    const notes = gitnotes(somenotes, ref) as NotesUse.Text;
    expect(() => notes.add.atCommit(CommitMessage)).not.toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes({ ref }) as NotesUse.Manually;
    expect(() =>
      notes.atCommit(CommitMessage).add(somenotes)
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
    expect(() => notes.add(somenotes)).toThrowError();
  });

  it('should success if given a Notes/Text on instantiating', () => {
    const notes = gitnotes(somenotes, ref) as NotesUse.Text;
    expect(() => notes.add.atFile(Filename, Commit)).not.toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes({ ref }) as NotesUse.Manually;
    expect(() =>
      notes.atFile(Filename, Commit).add(somenotes)
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
    expect(() => notes.add(somenotes)).toThrowError();
  });

  it('should success if given a Notes/Text on instantiating', () => {
    const notes = gitnotes(somenotes, ref) as NotesUse.Text;
    expect(() => notes.add.atFolder(Folder, Commit)).not.toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes({ ref }) as NotesUse.Manually;
    expect(() =>
      notes.atFolder(Folder, Commit).add(somenotes)
    ).not.toThrowError();
  });
}
//#endregion
