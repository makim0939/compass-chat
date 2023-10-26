import React from "react";
import { useState, useEffect } from "react";
import { LocationData } from "../Compass";

const useGeolocation = (isUseCompass: boolean) => {
  const [geolocation, setGeolocation] = useState<LocationData | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  const clearWatchLocation = () => {
    console.log("geolocation end");
    if (!watchId) return;
    navigator.geolocation.clearWatch(watchId);
    setWatchId(null);
    setGeolocation(null);
  };

  useEffect(() => {
    if (!isUseCompass && !watchId) return;
    if (!isUseCompass && watchId) {
      clearWatchLocation();
      return;
    }
    console.log("geolocation start");
    const id = navigator.geolocation.watchPosition((pos) => {
      const crd = pos.coords;
      setGeolocation({ lat: crd.latitude, lng: crd.longitude });
    });
    setWatchId(id);
    return clearWatchLocation;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUseCompass]);
  return geolocation;
};

export default useGeolocation;
