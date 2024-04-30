import { useEffect, useState } from 'react';
import { formatUnixTimestamp } from '../utils';
import { ForecastData } from '../@types';

const useUniqueDays = (data: ForecastData | undefined) => {
  const [uniqueDays, setUniqueDays] = useState<string[]>([]);

  useEffect(() => {
    const calculateUniqueDays = () => {
      if (!data) return;

      const days = new Set<string>();
      data?.list?.forEach((item: { dt: number; }) => {
        const formattedDay = formatUnixTimestamp(item.dt);
        if (!days.has(formattedDay)) {
          days.add(formattedDay);
        }
      });
      setUniqueDays(["All Days", ...Array.from(days)]);
    };

    calculateUniqueDays();
  }, [data]);

  return uniqueDays;
};

export default useUniqueDays;
