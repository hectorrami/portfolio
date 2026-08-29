import '@testing-library/jest-dom';

// Node 26 defines `localStorage` and `sessionStorage` as own accessors on
// globalThis that return undefined unless the process was started with
// --localstorage-file. Vitest's populateGlobal skips any key that already
// exists on globalThis unless the key is in its own KEYS list
// (`if (k in global) return keysArray.includes(k)`), and neither storage key
// is in that list — so jsdom's perfectly good Storage objects never make it
// to global scope and every `localStorage.*` call throws.
//
// Copy them across ourselves. On Node 20 (what CI runs) the globals do not
// exist, vitest populates them normally, and this is a no-op.
const jsdomWindow = globalThis.jsdom?.window;

if (jsdomWindow) {
  ['localStorage', 'sessionStorage'].forEach((key) => {
    if (globalThis[key] === undefined && jsdomWindow[key]) {
      Object.defineProperty(globalThis, key, {
        value: jsdomWindow[key],
        configurable: true,
        writable: true,
      });
    }
  });
}
