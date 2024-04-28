// import { useCallback } from "react";

// const useDebounce = <T extends (...args: any[]) => void>(
//   callback: T,
//   delay: number
// ): T => {
//   const debounceCallback = useCallback(
//     (...args: Parameters<T>) => {
//       const later = () => callback(...args);
//       clearTimeout(window.debounceTimer);
//       window.debounceTimer = setTimeout(later, delay);
//     },
//     [callback, delay]
//   ) as T;

//   return debounceCallback;
// };

// export default useDebounce;


import { useEffect, useRef, useCallback } from 'react';

const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  return debouncedCallback;
};

export default useDebounce;
;