import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock mongoose to avoid ESM issues
jest.mock('mongoose', () => ({
  __esModule: true,
  default: {
    connect: jest.fn(),
    connection: {
      readyState: 1,
    },
    models: {},
    model: jest.fn(),
    Schema: class {
      constructor() {}
      static Types = {
        ObjectId: String,
      }
    },
  },
}))

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
process.env.MONGODB_URI = 'mongodb://localhost:27017/test'
process.env.JWT_SECRET = 'test-secret-key'
