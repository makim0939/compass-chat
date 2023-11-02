import React from "react";
import { useState, useEffect, useCallback } from "react";
import { LocationData } from "../Compass";

const useGeolocation = (isUseCompass: boolean) => {
  const [geolocation, setGeolocation] = useState<LocationData | null>(null);

  useEffect(() => {
    const clearWatchLocation = (id: number) => {
      console.log("geolocation end");
      navigator.geolocation.clearWatch(id);
      setGeolocation(null);
    };

    console.log("geolocation start");
    const id = navigator.geolocation.watchPosition((pos) => {
      const crd = pos.coords;
      setGeolocation({ lat: crd.latitude, lng: crd.longitude });
    });
    console.log(isUseCompass);
    if (!isUseCompass) clearWatchLocation(id);
    return () => clearWatchLocation(id);
  }, [isUseCompass]);
  return geolocation;
};

export default useGeolocation;
