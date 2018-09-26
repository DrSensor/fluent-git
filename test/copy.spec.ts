import { notes as gitnotes } from '../src';
import 'jest-extended';

function test(GitObject: string, Text: string) {
  it('should return a string if given a Hash string', () => {
    const notes = gitnotes(GitObject) as NotesUse.Hash;
    expect(() => notes.copy(Text)).not.toThrowError();
  });

  it('should throw Error if given a Notes/Text at specific', () => {
    const notes = gitnotes(Text) as NotesUse.Text;
    expect(() => notes.copy.at(GitObject)).not.toThrowError();
  });

  it('should throw Error if not given anything (Empty)', () => {
    const git = gitnotes() as NotesUse.Manually;
    expect(() => git.at(GitObject).copy(Text)).not.toThrowError();
  });
}

describe.skip('Copy Notes', () => {
  const loremIpsum = `headline of the notes
  # 😋 Lorem Ipsum
  * Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
  * Aliquam tincidunt mauris eu risus.
  * Vestibulum auctor dapibus neque.
  `;
  describe('when use full SHA', () =>
    test('d48fd751a2beca2b61838a34b933c3df463830e9', loremIpsum));
  describe('when use abbreviated SHA', () => test('d48fd75', loremIpsum));
});
