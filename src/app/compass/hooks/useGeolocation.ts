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
    let id: number | null = null;
    if (isUseCompass) {
      const id = navigator.geolocation.watchPosition((pos) => {
        const crd = pos.coords;
        setGeolocation({ lat: crd.latitude, lng: crd.longitude });
      });
    }
    if (!id) return;
    if (!isUseCompass) clearWatchLocation(id);
    return () => {
      if (id) clearWatchLocation(id);
    };
  }, [isUseCompass]);
  return geolocation;
};

export default useGeolocation;
