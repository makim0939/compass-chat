import { useState, useEffect, useCallback, useRef } from "react";
import { LocationData } from "../Compass";
import { upsertGeolocation } from "@/app/utils/supabaseFunctions";

const useGeolocation = ({ userId, isUseCompass }: { userId: string; isUseCompass: boolean }) => {
  const [prevGeolocation, setPrevGeolocation] = useState<LocationData | null>(null);
  const geolocation = useRef<LocationData | null>(null);

  useEffect(() => {
    const clearWatchLocation = (id: number) => {
      navigator.geolocation.clearWatch(id);
      setPrevGeolocation(null);
      geolocation.current = null;
    };

    const sendLocationData = async ({
      current,
      prev,
    }: {
      current: LocationData;
      prev: LocationData | null;
    }) => {
      const data = {
        user_id: userId,
        lat: current.lat,
        lng: current.lng,
      };
      if (prev && prev.lat === current.lat && prev.lng === current.lng) return;
      const res = await upsertGeolocation(data);
      return;
    };

    let id: number | null = null;
    if (isUseCompass) {
      id = navigator.geolocation.watchPosition((pos) => {
        const crd = pos.coords;
        sendLocationData({
          current: { lat: crd.latitude, lng: crd.longitude },
          prev: geolocation.current,
        });
        geolocation.current = { lat: crd.latitude, lng: crd.longitude };
        setPrevGeolocation(geolocation.current);
      });
    }
    if (!id) return;
    if (!isUseCompass) clearWatchLocation(id);
    return () => {
      if (id) clearWatchLocation(id);
    };
  }, [userId, isUseCompass]);
  return { geolocation: geolocation.current, prevGeolocation };
};

export default useGeolocation;
