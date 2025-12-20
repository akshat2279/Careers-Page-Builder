import { escapeRegex, validateInputLength } from '../regexUtils';

describe('regexUtils', () => {
  describe('escapeRegex', () => {
    it('should escape special regex characters', () => {
      const input = 'test.string*with+special?chars';
      const escaped = escapeRegex(input);
      
      expect(escaped).toBe('test\\.string\\*with\\+special\\?chars');
    });

    it('should escape brackets and parentheses', () => {
      const input = 'test[brackets](parentheses)';
      const escaped = escapeRegex(input);
      
      expect(escaped).toBe('test\\[brackets\\]\\(parentheses\\)');
    });

    it('should escape dollar sign and caret', () => {
      const input = '$100^2';
      const escaped = escapeRegex(input);
      
      expect(escaped).toBe('\\$100\\^2');
    });

    it('should handle empty string', () => {
      expect(escapeRegex('')).toBe('');
    });

    it('should not modify string without special chars', () => {
      const input = 'normalstring123';
      expect(escapeRegex(input)).toBe(input);
    });

    it('should escape backslashes', () => {
      const input = 'path\\to\\file';
      const escaped = escapeRegex(input);
      
      expect(escaped).toBe('path\\\\to\\\\file');
    });
  });

  describe('validateInputLength', () => {
    it('should return true for input within limit', () => {
      expect(validateInputLength('short', 10)).toBe(true);
    });

    it('should return true for input at exact limit', () => {
      expect(validateInputLength('exact', 5)).toBe(true);
    });

    it('should return false for input exceeding limit', () => {
      expect(validateInputLength('toolongstring', 5)).toBe(false);
    });

    it('should return true for empty string', () => {
      expect(validateInputLength('', 10)).toBe(true);
    });

    it('should handle unicode characters', () => {
      expect(validateInputLength('café', 4)).toBe(true);
      expect(validateInputLength('café', 3)).toBe(false);
    });

    it('should return true when maxLength is 0 and input is empty', () => {
      expect(validateInputLength('', 0)).toBe(true);
    });

    it('should return false when input exceeds maxLength of 0', () => {
      expect(validateInputLength('a', 0)).toBe(false);
    });
  });
});
