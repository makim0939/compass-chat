import React, { useState, useLayoutEffect, useEffect } from "react";
import { LocationData } from "../Compass";

const calcDirection = ({
  myLocation,
  memberLocation,
  heading,
}: {
  myLocation: LocationData;
  memberLocation: LocationData;
  heading: number;
}) => {
  const dlat = memberLocation.lat - myLocation.lat;
  const dlng = memberLocation.lng - myLocation.lng;
  const degree = 90 - Math.atan2(dlng, dlat) * (180 / Math.PI);

  if (degree < 0) return 360 + degree - heading;
  return degree - heading;
};

const useCompass = (
  {
    myLocation,
    memberLocation,
  }: {
    myLocation: LocationData | null;
    memberLocation: LocationData | null;
  },
  isUseCompass: boolean,
): number => {
  const [direction, setDirection] = useState(0);

  const getDirection = (event: any) => {
    if (!myLocation || !memberLocation) return;
    const heading = event.webkitCompassHeading;
    const dir = calcDirection({ myLocation, memberLocation, heading });
    setDirection(dir);
  };

  useEffect(() => {
    if (!isUseCompass) return;
    console.log("compass start");
    window.addEventListener("deviceorientation", getDirection);
    return () => {
      console.log("compass end");
      window.removeEventListener("deviceorientation", getDirection);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myLocation, memberLocation]);

  return Math.floor(direction);
};
export default useCompass;
