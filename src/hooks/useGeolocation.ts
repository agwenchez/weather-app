import { useEffect, useState, useCallback } from 'react';

interface GeolocationPositionError {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
}

type PositionCallback = (position: GeolocationPosition) => void;
type ErrorCallback = (error: GeolocationPositionError) => void;

const useGeolocation = (): [GeolocationPosition | null, PositionCallback, ErrorCallback] => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);

  const successCallback: PositionCallback = useCallback((pos) => {
    setPosition(pos);
  }, []);

  const errorCallback: ErrorCallback = useCallback((err) => {
    console.error('Geolocation error:', err.message);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [successCallback, errorCallback]);

  return [position, successCallback, errorCallback];
};

export default useGeolocation;
