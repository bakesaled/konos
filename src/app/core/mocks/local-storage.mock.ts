let store = {};
export const localStorageMock = {
  getItem: (key: string): string => {
    return store[key];
  },
  setItem: (key: string, value: string) => {
    store[key] = `${value}`;
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    store = {};
  }
};
