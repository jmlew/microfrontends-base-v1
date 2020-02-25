import { MutableRefObject, useEffect, useRef } from 'react';

export const usePrevious = <T extends {}>(value: T) => {
  const ref: MutableRefObject<T | undefined> = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
