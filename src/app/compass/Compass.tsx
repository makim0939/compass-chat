import React, { useEffect, useState, useCallback } from "react";
import useGeolocation from "./hooks/useGeolocation";
import useCompass from "./hooks/useCompass";
import useDeviceType from "./hooks/useDeviceType";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  RealTimeListenerOptions,
  subscribeRealTimeListener,
  unsubscribeRealTimeListener,
} from "@/app/utils/realTimeListener";
import { deleteGeolocation, selectGeolocationByUserId } from "../utils/supabaseFunctions";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { GeolocationData, Profile } from "@/app/types/database.types";
import styles from "./compass.module.scss";

const COMPASS_IMG = "/assets/compass.png";
const COMPASS_BUTTON_IMG = "../../assets/compass_button.svg";

export type LocationData = {
  lat: number;
  lng: number;
};
export type DeviceType = "android" | "iosUnder13" | "iosOver13" | "other";

const Compass = ({
  loginUser,
  room_id,
  member,
}: {
  loginUser: Profile;
  room_id: number;
  member: Profile;
}) => {
  const [isUseCompass, setIsUseCompass] = useState(false);
  const [memberLocation, setMemberLocation] = useState<LocationData | null>(null);
  const deviceType = useDeviceType();
  const { geolocation: myLocation, prevGeolocation: prevMyLocation } = useGeolocation({
    userId: loginUser.id,
    isUseCompass,
  });
  const direction = useCompass({ myLocation, memberLocation }, isUseCompass, deviceType);

  const handleClick = async () => {
    //AndroidまたはiOS13未満
    if (deviceType === "android" || deviceType === "iosUnder13") {
      setIsUseCompass(true);
      const location = await getMemberLocation();
      setMemberLocation(location);
      return;
    }
    //iOS13以上
    if (deviceType === "iosOver13") {
      const DOE = DeviceOrientationEvent as any;
      await DOE.requestPermission().then(async (val: string) => {
        if (val !== "denied") {
          setIsUseCompass(true);
          const location = await getMemberLocation();
          setMemberLocation(location);
        } else {
          //センサの使用が拒否
          alert("コンパスを使用するにはブラウザアプリを開き直してください");
        }
      });
      return;
    }
  };

  const onClickCompass = () => {
    const finish = window.confirm("コンパスを終了します");
    if (!finish) return;
    setIsUseCompass(false);
    clearMyLocation();
  };

  //memo:useEffectの中と外の両方で使うため、依存関係を明確にするためuseCallbackを使う
  const getMemberLocation = useCallback(async (): Promise<LocationData | null> => {
    const res = await selectGeolocationByUserId(member.id);
    if (!res || !res.location) return null;
    const [lat, lng] = res.location.coordinates;
    return { lat, lng };
  }, [member.id]);

  const clearMyLocation = useCallback(async () => {
    const res = await deleteGeolocation(loginUser.id);
    console.log("clearMyLocation");
    return res;
  }, [loginUser.id]);

  useEffect(() => {
    const fetchRealtimeDataCallback = (
      payload: RealtimePostgresChangesPayload<{
        [key: string]: any;
      }>,
    ) => {
      if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
        const { user_id, location } = payload.new as GeolocationData;
        if (!location) return;
        const [lat, lng] = location.coordinates;
        setMemberLocation({ lat, lng });
        return;
      }
      if (payload.eventType === "DELETE") setMemberLocation(null);
    };

    const listenerOptions: RealTimeListenerOptions = {
      channel: "geolocation" + member.id,
      filter: {
        event: "*",
        schema: "public",
        table: "geolocation",
        filter: `user_id=eq.${member.id}`,
      },
      callback: fetchRealtimeDataCallback,
    };
    const channel = subscribeRealTimeListener(listenerOptions);

    (async () => {
      const location = await getMemberLocation();
      setMemberLocation(location);
    })();

    return () => {
      if (channel) unsubscribeRealTimeListener(channel);
      clearMyLocation();
    };
  }, [member.id, getMemberLocation, clearMyLocation]);

  if (!isUseCompass)
    return (
      <button onClick={handleClick}>
        <Image
          src={COMPASS_BUTTON_IMG}
          alt=""
          className={styles.compass_button}
          width={72}
          height={72}
        />
      </button>
    );
  return (
    <div className={styles.compass_wrapper}>
      {!memberLocation ? (
        <button onClick={onClickCompass}>waiting</button>
      ) : (
        <div className={styles.compass_container} onClick={onClickCompass}>
          <motion.img
            src={COMPASS_IMG}
            animate={{ rotate: direction }}
            transition={{ duration: 0 }}
            className={styles.compass_needle}
          />
        </div>
      )}
    </div>
  );
};

export default Compass;
