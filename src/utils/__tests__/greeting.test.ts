import { getGreeting, getGreetingEmoji } from '../greeting';

describe('greeting utils', () => {
  describe('getGreeting', () => {
    it('should return morning greeting between 5am and 12pm', () => {
      const morningDate = new Date('2024-01-01T08:00:00');
      jest.spyOn(global, 'Date').mockImplementation(() => morningDate as unknown as string);
      
      const greeting = getGreeting();
      expect(greeting).toBe('Good Morning');
      
      jest.restoreAllMocks();
    });

    it('should return afternoon greeting between 12pm and 5pm', () => {
      const afternoonDate = new Date('2024-01-01T14:00:00');
      jest.spyOn(global, 'Date').mockImplementation(() => afternoonDate as unknown as string);
      
      const greeting = getGreeting();
      expect(greeting).toBe('Good Afternoon');
      
      jest.restoreAllMocks();
    });

    it('should return evening greeting between 5pm and 9pm', () => {
      const eveningDate = new Date('2024-01-01T19:00:00');
      jest.spyOn(global, 'Date').mockImplementation(() => eveningDate as unknown as string);
      
      const greeting = getGreeting();
      expect(greeting).toBe('Good Evening');
      
      jest.restoreAllMocks();
    });

    it('should return night greeting between 9pm and 5am', () => {
      const nightDate = new Date('2024-01-01T23:00:00');
      jest.spyOn(global, 'Date').mockImplementation(() => nightDate as unknown as string);
      
      const greeting = getGreeting();
      expect(greeting).toBe('Good Night');
      
      jest.restoreAllMocks();
    });
  });

  describe('getGreetingEmoji', () => {
    it('should return an emoji string', () => {
      const emoji = getGreetingEmoji();
      expect(typeof emoji).toBe('string');
      expect(emoji.length).toBeGreaterThan(0);
    });

    it('should return one of the expected emojis', () => {
      const expectedEmojis = ['👋', '🌅', '☀️', '🌆', '🌙'];
      const emoji = getGreetingEmoji();
      expect(expectedEmojis).toContain(emoji);
    });
  });
});
