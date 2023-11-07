import { MessageData } from "@/app/types/database.types";
import React, { useEffect, useRef } from "react";

const useMessageScroll = ({
  ref,
  scrollEnabled,
  messages,
}: {
  ref: React.RefObject<HTMLDivElement>;
  scrollEnabled: boolean;
  messages: MessageData[] | undefined;
}) => {
  const smooth = useRef(false);

  useEffect(() => {
    const scrollBottom = (smooth: boolean) => {
      if (!ref.current) return;
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      };
      if (!smooth) scrollOptions.behavior = "instant";
      ref.current.scrollIntoView(scrollOptions);
    };
    if (!scrollEnabled) return;
    scrollBottom(smooth.current);
    smooth.current = true;
  }, [messages, scrollEnabled, smooth, ref]);
  return;
};

export default useMessageScroll;
