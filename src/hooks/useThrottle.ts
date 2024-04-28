import { useCallback, useState } from "react";

const useThrottle = <T extends (...args: any[]) => void>(
  callback: T,
  limit: number
): T => {
  const [inThrottle, setInThrottle] = useState<boolean>(false);

  const throttleCallback = useCallback(
    (...args: Parameters<T>) => {
      if (!inThrottle) {
        callback(...args);
        setInThrottle(true);
        setTimeout(() => setInThrottle(false), limit);
      }
    },
    [callback, inThrottle, limit]
  ) as T;

  return throttleCallback;
};

export default useThrottle;
