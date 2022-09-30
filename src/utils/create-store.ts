import { useEffect, useState } from "react";

export function createStore<T>(initialState: T) {
  let currentState = initialState;
  const listeners = new Set();
  return {
    getState: () => currentState,
    setState: (newState: T) => {
      currentState = newState;
      listeners.forEach(listener => listener(currentState));
    },
    subscribe: listener => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export const store = createStore({
  value1: 0,
  value2: 0,
});

export const useStore = (selector = state => state) => {
  const [state, setState] = useState(selector(store.getState()));
  useEffect(() => {
    store.subscribe(state => setState(selector(state)));
  }, []);
  return state;
};
