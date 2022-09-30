import { store } from "@/utils";

export function IncrementValue({ item }: { item: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const state = store.getState();
        store.setState({
          ...state,
          [item]: state[item] + 1,
        });
      }}
    >
      Increment {item}
    </button>
  );
}
