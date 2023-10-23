import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useGeolocation from "./hooks/useGeolocation";
import { useAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { deleteData, fetchData, postData, putData } from "@/app/utils/clientFunctions";
import { GeolocationData, MessageData, Profile, Room } from "@/app/types/database.types";
import useCompass from "./hooks/useCompass";
import {
  RealTimeListenerOptions,
  subscribeRealTimeListener,
  unsubscribeRealTimeListener,
} from "@/app/utils/realTimeListener";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { loginUserAtom } from "../atoms";
import styles from "./compass.module.scss";
import Image from "next/image";

const COMPASS_IMG = "/assets/compass.png";
const COMPASS_BUTTON_IMG = "../../assets/compass_button.svg";

export type LocationData = {
  lat: number;
  lng: number;
};

const Compass = ({ room_id, member }: { room_id: number; member: Profile }) => {
  const [isUseCompass, setIsUseCompass] = useState(false);
  const [memberLocation, setMemberLocation] = useState<LocationData | null>(null);
  const [prevMyLocation, setPrevMyLocation] = useState<LocationData | null>(null);
  const myLocation = useGeolocation(isUseCompass);
  const direction = useCompass({ myLocation, memberLocation }, isUseCompass);
  //ユーザ、部屋情報の取得
  const [loginUser] = useAtom(loginUserAtom);
  if (!loginUser) throw new Error("loginUser is null");
  const handleClick = async () => {
    //Android
    //iOS
    const DOE = DeviceOrientationEvent as any;
    await DOE.requestPermission().then((val: string) => {
      console.log(val);
      if (val !== "denied") {
        setIsUseCompass(true);
        getMemberLocation();
      } else {
        //センサの使用が拒否
      }
    });
  };

  const onClickCompass = () => {
    const finish = window.confirm("コンパスを終了します");
    if (!finish) return;
    setIsUseCompass(false);
    clearMyLocation();
  };

  const sendLocationData = async () => {
    if (!isUseCompass) return;
    const url = document.location.origin + "/api/compass/geolocation/user_id/" + loginUser.id;
    const data = {
      user_id: loginUser.id,
      latitude: myLocation?.lat,
      longitude: myLocation?.lng,
    };
    const res = await postData({ url, data });
    return res;
  };

  const getMemberLocation = async (): Promise<LocationData | null> => {
    const url = document.location.origin + "/api/compass/geolocation/user_id/" + member.id;
    const res = await fetchData<GeolocationData>(url);
    if (!res || !res.location) return null;
    const [lat, lng] = res.location.coordinates;
    setMemberLocation({ lat, lng });

    return { lat, lng };
  };
  const clearMyLocation = async () => {
    const url = document.location.origin + "/api/compass/geolocation/user_id/" + loginUser.id;
    const res = await deleteData({ url });
    console.log("clearMyLocation");
    setPrevMyLocation(null);
    return res;
  };

  const fetchRealtimeDataCallback = (
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any;
    }>,
  ) => {
    console.log(payload);
    if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
      const { user_id, location } = payload.new as GeolocationData;
      if (!loginUser || !location) return;
      const [lat, lng] = location.coordinates;
      console.log({ lat, lng });
      setMemberLocation({ lat, lng });
    }
    if (payload.eventType === "DELETE") {
      setMemberLocation(null);
    }
  };

  useEffect(() => {
    console.log(member.id);
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
    })();

    return () => {
      console.log("unsubscribed");
      if (channel) unsubscribeRealTimeListener(channel);
      clearMyLocation();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!myLocation) return;
    if (!prevMyLocation) {
      console.log("sendLocationData");
      setPrevMyLocation(myLocation);
      const res = sendLocationData();
      return;
    }
    if (prevMyLocation.lat === myLocation.lat && prevMyLocation.lng === myLocation.lng) return;
    console.log("sendLocationData");
    const res = sendLocationData();
    setPrevMyLocation(myLocation);
    console.log("prev", prevMyLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myLocation]);

  return (
    <>
      {!isUseCompass ? (
        <>
          <button onClick={handleClick}>
            <Image
              src={COMPASS_BUTTON_IMG}
              alt=""
              className={styles.compass_button}
              width={72}
              height={72}
            />
          </button>
        </>
      ) : (
        <>
          <div className={styles.compass_wrapper}>
            {!memberLocation ? (
              <>
                <button onClick={onClickCompass}>waiting</button>
              </>
            ) : (
              <>
                <div className={styles.compass_container} onClick={onClickCompass}>
                  <motion.img
                    src={COMPASS_IMG}
                    animate={{ rotate: direction }}
                    transition={{ duration: 0 }}
                    className={styles.compass_needle}
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Compass;
