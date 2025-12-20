# Testing Guide

This project uses **Jest** and **React Testing Library** for unit testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

Tests are organized using the `__tests__` folder pattern:

```
src/
├── components/
│   └── common/
│       ├── Button.tsx
│       └── __tests__/
│           └── Button.test.tsx
├── utils/
│   ├── jwtClient.ts
│   └── __tests__/
│       └── jwtClient.test.ts
└── validations/
    ├── loginSchema.ts
    └── __tests__/
        └── loginSchema.test.ts
```

## What's Tested

### ✅ Utility Functions
- **JWT Client** (`src/utils/__tests__/jwtClient.test.ts`)
  - Token decoding
  - Token expiration checking
  - Invalid token handling

- **Helpers** (`src/lib/__tests__/helpers.test.ts`)
  - Slug generation
  - Special character handling
  - Edge cases

- **Regex Utils** (`src/lib/__tests__/regexUtils.test.ts`)
  - Regex escaping for ReDoS prevention
  - Input length validation

- **Greeting Utils** (`src/utils/__tests__/greeting.test.ts`)
  - Time-based greeting generation
  - Emoji selection

### ✅ Components
- **Button** (`src/components/common/__tests__/Button.test.tsx`)
  - Click handlers
  - Disabled state
  - Loading state
  - Variants and sizes

- **Footer** (`src/components/company/__tests__/Footer.test.tsx`)
  - Content rendering
  - Dynamic year display
  - Fallback values

### ✅ Validation Schemas
- **Login Schema** (`src/validations/__tests__/loginSchema.test.ts`)
  - Email validation
  - Password validation
  - Required fields
  - Edge cases

## Writing New Tests

### Basic Test Template

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interaction', () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Testing Async Functions

```typescript
it('should handle async operations', async () => {
  const result = await myAsyncFunction();
  expect(result).toBeDefined();
});
```

### Testing API Routes (Future)

For API route testing, consider using `node-mocks-http`:

```typescript
import { createMocks } from 'node-mocks-http';
import handler from '../api/route';

it('should return 200 for valid request', async () => {
  const { req, res } = createMocks({
    method: 'GET',
  });

  await handler(req, res);
  expect(res._getStatusCode()).toBe(200);
});
```

## Coverage Goals

Current coverage thresholds (defined in `jest.config.js`):
- **Branches**: 50%
- **Functions**: 50%
- **Lines**: 50%
- **Statements**: 50%

To view detailed coverage report:
```bash
npm run test:coverage
```

Coverage report will be generated in `coverage/` directory.

## Best Practices

1. **Test behavior, not implementation** - Focus on what the component does, not how it does it
2. **Use descriptive test names** - `it('should disable button when loading')` not `it('test 1')`
3. **Arrange-Act-Assert pattern** - Set up → Execute → Verify
4. **Mock external dependencies** - Database, API calls, etc.
5. **Test edge cases** - Empty strings, null values, invalid inputs
6. **Keep tests isolated** - Each test should be independent
7. **Don't test third-party libraries** - Trust that React, Next.js, etc. work

## Mocked Dependencies

The following are automatically mocked in `jest.setup.js`:
- Next.js router (`useRouter`, `usePathname`, `useSearchParams`)
- Environment variables
- Window/document APIs (via jsdom)

## Common Testing Utilities

```typescript
// Rendering
import { render, screen } from '@testing-library/react';

// User interactions
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Queries
screen.getByText('text')
screen.getByRole('button')
screen.getByLabelText('label')
screen.queryByText('text') // Returns null if not found
screen.findByText('text') // Async, waits for element

// Assertions
expect(element).toBeInTheDocument()
expect(element).toHaveTextContent('text')
expect(element).toBeDisabled()
expect(element).toHaveClass('className')
expect(fn).toHaveBeenCalled()
expect(fn).toHaveBeenCalledWith(arg)
```

## Next Steps

To expand test coverage:

1. **Add API route tests** - Test authentication, company settings, jobs endpoints
2. **Add integration tests** - Test complete user flows
3. **Add E2E tests** - Use Playwright or Cypress for critical paths
4. **Increase coverage** - Aim for 70-80% coverage on critical paths
5. **Add snapshot tests** - For components with complex markup

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
