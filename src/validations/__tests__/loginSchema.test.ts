import { loginSchema } from '../loginSchema';

describe('loginSchema', () => {
  it('should validate correct login data', async () => {
    const validData = {
      email: 'test@example.com',
      password: 'Password123!',
    };

    await expect(loginSchema.validate(validData)).resolves.toEqual(validData);
  });

  it('should reject invalid email format', async () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'Password123!',
    };

    await expect(loginSchema.validate(invalidData)).rejects.toThrow();
  });

  it('should reject missing email', async () => {
    const invalidData = {
      password: 'Password123!',
    };

    await expect(loginSchema.validate(invalidData)).rejects.toThrow(/email/i);
  });

  it('should reject missing password', async () => {
    const invalidData = {
      email: 'test@example.com',
    };

    await expect(loginSchema.validate(invalidData)).rejects.toThrow(/password/i);
  });

  it('should reject empty email', async () => {
    const invalidData = {
      email: '',
      password: 'Password123!',
    };

    await expect(loginSchema.validate(invalidData)).rejects.toThrow();
  });

  it('should reject empty password', async () => {
    const invalidData = {
      email: 'test@example.com',
      password: '',
    };

    await expect(loginSchema.validate(invalidData)).rejects.toThrow();
  });

  it('should accept valid email variations', async () => {
    const emails = [
      'user@example.com',
      'user123@example.com',
      'testuser@domain.com',
    ];

    for (const email of emails) {
      const data = { email, password: 'Password123!' };
      await expect(loginSchema.validate(data)).resolves.toBeDefined();
    }
  });
});
