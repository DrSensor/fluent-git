// @ts-ignore
import bundled_module from '../dist';
import 'jest-extended';

describe('Edge case testing', () => {
  it('should return string', () => {
    expect(bundled_module()).toBeString();
  });
});
