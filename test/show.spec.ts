import gitnotes from '../dist';
import 'jest-extended';

function test(GitObject: string) {
  it('should return a string if given a Hash string', () => {
    const notes = gitnotes(GitObject) as IfHash;
    expect(notes.show()).toBeString();
  });

  it('should throw Error if given a Notes/Text', () => {
    const notes = gitnotes('some notes') as IfNotes;
    // @ts-ignore
    expect(() => notes.show.at(GitObject)).toThrowError();
  });

  it('should throw Error if not given anything (Empty)', () => {
    const git = gitnotes() as IfEmpty;
    expect(git.at(GitObject).show()).toBeString();
  });
}

describe('Show Notes', () => {
  describe('when use full SHA', () =>
    test('d48fd751a2beca2b61838a34b933c3df463830e9'));
  describe('when use abbreviated SHA', () => test('d48fd75'));
});
