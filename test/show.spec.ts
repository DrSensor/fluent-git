import gitnotes from '../dist';
import 'jest-extended';

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

describe('Show Notes', () => {
  describe('at specific Git Object', () => {
    describe('when use full SHA', () =>
      testSHA('af233391c665c79184a0d14cfe384b13a852e431'));

    describe('when use abbreviated SHA', () => testSHA('af23339'));
  });

  test('at specific commit using commit message', () => {
    const notes = gitnotes() as IfEmpty;
    expect(notes.atCommit('Initial commit').show()).toBeString();
  });

  describe('at file on specific commit', () => {
    describe('while note is exist', () => {
      test('should return string if commit-id', () => {
        const notes = gitnotes() as IfEmpty;
        expect(notes.atFile('LICENSE', 'af23339').show()).toBeString();
      });

      test('should return string if given commit-message', () => {
        const notes = gitnotes() as IfEmpty;
        expect(notes.atFile('LICENSE', 'Initial commit').show()).toBeString();
      });
    });

    test('should throw Error if no note found', () => {
      const notes = gitnotes() as IfEmpty;
      expect(() => notes.atFile('README.md', 'af23339').show()).toThrowError();
    });
  });
});
