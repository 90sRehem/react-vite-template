import { useStore } from "@/utils";

export function DisplayValue({ item }) {
  return (
    <div>
      {item}: {useStore(state => state[item])}
    </div>
  );
}
