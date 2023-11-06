import React, { useState, useLayoutEffect, useEffect } from "react";
import { LocationData } from "../Compass";
import { DeviceType } from "../Compass";

const useCompass = (
  {
    myLocation,
    memberLocation,
  }: {
    myLocation: LocationData | null;
    memberLocation: LocationData | null;
  },
  isUseCompass: boolean,
  deviceType: DeviceType,
): number => {
  const [direction, setDirection] = useState(0);

  useEffect(() => {
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
      const degree = 90 - Math.atan2(dlat, dlng) * (180 / Math.PI);

      if (degree < 0) return 360 + degree - heading;
      return degree - heading;
    };
    const getDirection = (event: any) => {
      if (!myLocation || !memberLocation) return;
      const heading =
        deviceType === "android"
          ? event.alpha * -1 //compassHeading(event.alpha, event.beta, event.gamma)
          : event.webkitCompassHeading;
      const dir = calcDirection({ myLocation, memberLocation, heading });
      setDirection(dir);
    };
    if (!isUseCompass) return;
    if (deviceType === "android") {
      window.addEventListener("deviceorientationabsolute", getDirection);
    } else if (deviceType === "iosOver13" || deviceType === "iosUnder13") {
      window.addEventListener("deviceorientation", getDirection);
    }
    return () => {
      window.removeEventListener("deviceorientation", getDirection);
    };
  }, [isUseCompass, deviceType, myLocation, memberLocation]);

  return Math.floor(direction);
};
export default useCompass;
