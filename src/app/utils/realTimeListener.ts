import supabase from "./supabase";
import {
  RealtimeChannel,
  RealtimePostgresChangesFilter,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";

export type RealTimeListenerOptions = {
  channel: string;
  filter: RealtimePostgresChangesFilter<"*">;
  callback: (
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any;
    }>,
  ) => void;
};

export const subscribeRealTimeListener = (options: RealTimeListenerOptions) => {
  try {
    const channel = supabase
      .channel(options.channel)
      .on("postgres_changes", options.filter, options.callback)
      .subscribe();
    return channel;
  } catch (err) {
    console.log("err");
  }
};
export const unsubscribeRealTimeListener = async (channel: RealtimeChannel) => {
  try {
    const result = await supabase.removeChannel(channel);
    if (result === "error") throw new Error("Error unsubscribing realtime listener");
  } catch (error) {
    console.log(error);
  }
};
