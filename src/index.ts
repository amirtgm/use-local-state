import { Draft } from "immer/dist/internal";
import React from "react";
import { useImmer } from "use-immer";

export function useStickyState<T>(
  defaultValue: T | null,
  key: string
): [T, (f: T | ((draft: T | Draft<T>) => void)) => void] {
  const stickyValue = window.localStorage.getItem(key);
  const initialValue =
    stickyValue !== null ? (JSON.parse(stickyValue) as T) : (defaultValue as T);
  const [value, setValue] = useImmer<T>(initialValue);
  React.useEffect(() => {
    console.log("effect", { key, value });
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
