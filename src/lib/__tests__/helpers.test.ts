import { generateSlug } from '../helpers';

describe('helpers', () => {
  describe('generateSlug', () => {
    it('should convert text to lowercase slug', () => {
      expect(generateSlug('Hello World')).toBe('hello-world');
    });

    it('should replace spaces with hyphens', () => {
      expect(generateSlug('My Company Name')).toBe('my-company-name');
    });

    it('should remove special characters', () => {
      expect(generateSlug('Company@#$%Name!')).toBe('company-name');
    });

    it('should handle multiple spaces', () => {
      expect(generateSlug('Too    Many    Spaces')).toBe('too-many-spaces');
    });

    it('should remove leading and trailing hyphens', () => {
      expect(generateSlug('  Leading and Trailing  ')).toBe('leading-and-trailing');
    });

    it('should handle already lowercase text', () => {
      expect(generateSlug('already-lowercase')).toBe('already-lowercase');
    });

    it('should handle numbers', () => {
      expect(generateSlug('Company 123')).toBe('company-123');
    });

    it('should handle empty string', () => {
      expect(generateSlug('')).toBe('');
    });

    it('should handle text with only special characters', () => {
      expect(generateSlug('@#$%^&*()')).toBe('');
    });

    it('should handle unicode characters', () => {
      expect(generateSlug('Café Company')).toBe('caf-company');
    });
  });
});
