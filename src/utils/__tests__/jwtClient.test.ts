import { decodeToken, isTokenExpired } from '../jwtClient';

describe('jwtClient', () => {
  describe('decodeToken', () => {
    it('should decode a valid JWT token', () => {
      // Valid JWT token with payload: { userId: "123", exp: 1234567890 }
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJleHAiOjEyMzQ1Njc4OTB9.signature';
      const decoded = decodeToken(token);
      
      expect(decoded).toBeDefined();
      expect(decoded?.userId).toBe('123');
      expect(decoded?.exp).toBe(1234567890);
    });

    it('should return null for invalid token format', () => {
      const invalidToken = 'invalid.token';
      const decoded = decodeToken(invalidToken);
      
      expect(decoded).toBeNull();
    });

    it('should return null for malformed token', () => {
      const malformedToken = 'not-a-jwt-token';
      const decoded = decodeToken(malformedToken);
      
      expect(decoded).toBeNull();
    });
  });

  describe('isTokenExpired', () => {
    it('should return true for expired token', () => {
      // Token with exp in the past (timestamp: 1234567890 = Feb 2009)
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJleHAiOjEyMzQ1Njc4OTB9.signature';
      
      expect(isTokenExpired(expiredToken)).toBe(true);
    });

    it('should return false for valid token', () => {
      // Create token with exp in the future (1 hour from now)
      const futureExp = Math.floor(Date.now() / 1000) + 3600;
      const payload = btoa(JSON.stringify({ userId: '123', exp: futureExp }));
      const validToken = `header.${payload}.signature`;
      
      expect(isTokenExpired(validToken)).toBe(false);
    });

    it('should return true for token without exp field', () => {
      const payload = btoa(JSON.stringify({ userId: '123' }));
      const tokenWithoutExp = `header.${payload}.signature`;
      
      expect(isTokenExpired(tokenWithoutExp)).toBe(true);
    });

    it('should return true for invalid token', () => {
      expect(isTokenExpired('invalid-token')).toBe(true);
    });
  });
});
