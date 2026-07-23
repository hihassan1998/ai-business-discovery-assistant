require('@testing-library/jest-dom');

// Polyfill global Web APIs for Next.js NextRequest/NextResponse in Jest Node environment
if (typeof global.Request === 'undefined') {
  global.Request = globalThis.Request;
  global.Response = globalThis.Response;
  global.Headers = globalThis.Headers;
}

// Mock react-chartjs-2 to avoid canvas issues in JSDOM environment
jest.mock('react-chartjs-2', () => ({
  Doughnut: () => <div data-testid="mock-doughnut" />,
}));

// Mock browser-specific global objects safely
if (typeof window !== 'undefined') {
  window.scrollTo = jest.fn();
}

// Mock scrollIntoView for chat feed auto-scrolling
if (typeof Element !== 'undefined' && Element.prototype) {
  Element.prototype.scrollIntoView = jest.fn();
}
