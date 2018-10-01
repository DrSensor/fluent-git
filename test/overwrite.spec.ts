// TODO: use combination of beforeAll and afterEach
import { notes as gitnotes } from '../src';
import * as SHA from '../src/git-notes/get-sha';
import { execSync } from 'child_process';
import 'jest-extended';
const isArray = Array.isArray;

const ref = 'test/overwrite';
const destSHA = '0745e98';
const somenotes = `headline of the notes
# 😋 Lorem Ipsum
* Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
* Aliquam tincidunt mauris eu risus.
* Vestibulum auctor dapibus neque.
`;

describe('Overwrite Notes', () => {
  beforeAll(() => gitnotes('notes that should be copied', ref).add.at(destSHA));

  describe('at specific Git Object', () => {
    describe('when use full SHA', () =>
      testSHA('af233391c665c79184a0d14cfe384b13a852e431'));

    describe('when use abbreviated SHA', () => testSHA('af23339'));

    describe('when no Git Object found', () => {
      it('should throw Error if given a Hash string', () => {
        const notes = gitnotes() as NotesUse.Manually;
        expect(() => notes.at('fffffff').overwriteWith(destSHA)).toThrowError();
      });

      it('should throw Error if given a Notes/Text', () => {
        const notes = gitnotes() as NotesUse.Manually;
        expect(() =>
          notes.at('fffffff').overwriteWith(somenotes)
        ).toThrowError();
      });
    });
  });

  describe('at specific COMMIT using commit message', () => {
    describe('while commit does exist', () => testCommit('Initial commit'));

    describe('when no commit-message found', () => {
      it('should throw Error if given a Hash string', () => {
        const notes = gitnotes() as NotesUse.Manually;
        expect(() =>
          notes.atCommit('( ͡° ͜ʖ ͡°)').overwriteWith(destSHA)
        ).toThrowError();
      });

      it('should throw Error if given a Notes/Text', () => {
        const notes = gitnotes() as NotesUse.Manually;
        expect(() =>
          notes.atCommit('( ͡° ͜ʖ ͡°)').overwriteWith(somenotes)
        ).toThrowError();
      });
    });
  });

  describe('at FILE on specific commit', () => {
    describe('while note is exist', () => {
      describe('if given commit-id', () => testFile('LICENSE', 'af23339'));
      describe('if given commit-message', () =>
        testFile('LICENSE', 'Initial commit'));
    });

    describe('when no file found', () => {
      it('should throw Error if given a Hash string', () => {
        const notes = gitnotes() as NotesUse.Manually;
        expect(() =>
          notes.atFile('( ͡° ͜ʖ ͡°)', 'af23339').overwriteWith(destSHA)
        ).toThrowError();
      });

      it('should throw Error if given a Notes/Text', () => {
        const notes = gitnotes() as NotesUse.Manually;
        expect(() =>
          notes.atFile('( ͡° ͜ʖ ͡°)', 'af23339').overwriteWith(somenotes)
        ).toThrowError();
      });
    });
  });

  describe('at FOLDER on specific commit', () => {
    describe('while note is exist', () => {
      describe('if given commit-id', () => testFolder('.github', 'b0279ab'));
      describe('if given commit-message', () =>
        testFolder('.github', 'another folder'));
    });

    describe('when no folder found', () => {
      it('should throw Error if given a Hash string', () => {
        const notes = gitnotes() as NotesUse.Manually;
        expect(() =>
          notes.atFolder('( ͡° ͜ʖ ͡°)', 'b0279ab').overwriteWith(destSHA)
        ).toThrowError();
      });

      it('should throw Error if given a Notes/Text', () => {
        const notes = gitnotes() as NotesUse.Manually;
        expect(() =>
          notes.atFolder('( ͡° ͜ʖ ͡°)', 'b0279ab').overwriteWith(somenotes)
        ).toThrowError();
      });
    });
  });
});

//#region test instantiating
function testSHA(GitObject: string) {
  resetNotes(GitObject);

  it('should success if given a Hash string on instantiating', () => {
    const notes = gitnotes(GitObject, ref) as NotesUse.Hash;
    expect(() => notes.overwriteWith(destSHA)).not.toThrowError();
    expect(() => notes.overwriteWith(somenotes)).not.toThrowError();
  });

  it('should success if given a Notes/Text on instantiating', () => {
    const notes = gitnotes(somenotes, ref) as NotesUse.Text;
    expect(() => notes.overwrite.at(GitObject)).not.toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes(undefined, ref) as NotesUse.Manually;
    expect(() => notes.at(GitObject).overwriteWith(destSHA)).not.toThrowError();
    expect(() =>
      notes.at(GitObject).overwriteWith(somenotes)
    ).not.toThrowError();
  });
}

function testCommit(CommitMessage: string) {
  const sha = SHA.fromCommit(CommitMessage);
  resetNotes(isArray(sha) ? sha[0] : sha);

  it('should throw Error if given a Commit Message on instantiating', () => {
    const notes = gitnotes(CommitMessage, ref) as NotesUse.Hash;
    expect(() => notes.overwriteWith(destSHA)).toThrowError();
    expect(() => notes.overwriteWith(somenotes)).toThrowError();
  });

  it('should success if given a Notes/Text on instantiating', () => {
    const notes = gitnotes(somenotes, ref) as NotesUse.Text;
    expect(() => notes.overwrite.atCommit(CommitMessage)).not.toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes(undefined, ref) as NotesUse.Manually;
    expect(() =>
      notes.atCommit(CommitMessage).overwriteWith(destSHA)
    ).not.toThrowError();
    expect(() =>
      notes.atCommit(CommitMessage).overwriteWith(somenotes)
    ).not.toThrowError();
  });
}

function testFile(Filename: string, Commit: string) {
  const sha = SHA.fromFile(Filename, Commit);
  resetNotes(isArray(sha) ? sha[0] : sha);

  it('should throw Error if given a Filename on instantiating', () => {
    const notes = gitnotes(Filename, ref) as NotesUse.Hash;
    expect(() => notes.overwriteWith(destSHA)).toThrowError();
    expect(() => notes.overwriteWith(somenotes)).toThrowError();
  });

  it('should success if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes', ref) as NotesUse.Text;
    expect(() => notes.overwrite.atFile(Filename, Commit)).not.toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes(undefined, ref) as NotesUse.Manually;
    expect(() =>
      notes.atFile(Filename, Commit).overwriteWith(destSHA)
    ).not.toThrowError();
    expect(() =>
      notes.atFile(Filename, Commit).overwriteWith(somenotes)
    ).not.toThrowError();
  });
}

function testFolder(Folder: string, Commit: string) {
  const sha = SHA.fromFolder(Folder, Commit);
  resetNotes(isArray(sha) ? sha[0] : sha);

  it('should throw Error if given a Folder on instantiating', () => {
    const notes = gitnotes(Folder, ref) as NotesUse.Hash;
    expect(() => notes.overwriteWith(destSHA)).toThrowError();
    expect(() => notes.overwriteWith(somenotes)).toThrowError();
  });

  it('should success if given a Notes/Text on instantiating', () => {
    const notes = gitnotes('some notes', ref) as NotesUse.Text;
    expect(() => notes.overwrite.atFolder(Folder, Commit)).not.toThrowError();
  });

  it('should success if not given anything (Empty) on instantiating', () => {
    const notes = gitnotes(undefined, ref) as NotesUse.Manually;
    expect(() =>
      notes.atFolder(Folder, Commit).overwriteWith(destSHA)
    ).not.toThrowError();
    expect(() =>
      notes.atFolder(Folder, Commit).overwriteWith(somenotes)
    ).not.toThrowError();
  });
}
//#endregion

function resetNotes(sha: string) {
  beforeEach(() =>
    execSync(`git notes --ref=${ref} add ${sha} -m 'gibrish notes'`));
  afterEach(() => execSync(`git notes --ref=${ref} remove ${sha}`));
}
