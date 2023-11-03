import React, { useState, useLayoutEffect, useEffect } from "react";
import { LocationData } from "../Compass";
import { DeviceType } from "./useDevicetype";

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
    const compassHeading = (alpha: number, beta: number, gamma: number) => {
      const degtorad = Math.PI / 180; // Degree-to-Radian conversion

      const _x = beta ? beta * degtorad : 0; // beta value
      const _y = gamma ? gamma * degtorad : 0; // gamma value
      const _z = alpha ? alpha * degtorad : 0; // alpha value

      const cX = Math.cos(_x);
      const cY = Math.cos(_y);
      const cZ = Math.cos(_z);
      const sX = Math.sin(_x);
      const sY = Math.sin(_y);
      const sZ = Math.sin(_z);

      // Calculate Vx and Vy components
      const Vx = -cZ * sY - sZ * sX * cY;
      const Vy = -sZ * sY + cZ * sX * cY;

      // Calculate compass heading
      let compassHeading = Math.atan(Vx / Vy);

      // Convert compass heading to use whole unit circle
      if (Vy < 0) {
        compassHeading += Math.PI;
      } else if (Vx < 0) {
        compassHeading += 2 * Math.PI;
      }

      return compassHeading * (180 / Math.PI); // Compass Heading (in degrees)
    };
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
    console.log("compass start");
    console.log(deviceType);
    if (deviceType === "android") {
      window.addEventListener("deviceorientationabsolute", getDirection);
    } else if (deviceType === "iosOver13" || deviceType === "iosUnder13") {
      window.addEventListener("deviceorientation", getDirection);
    }
    return () => {
      console.log("compass end");
      window.removeEventListener("deviceorientation", getDirection);
    };
  }, [isUseCompass, deviceType, myLocation, memberLocation, setDirection]);

  return Math.floor(direction);
};
export default useCompass;
