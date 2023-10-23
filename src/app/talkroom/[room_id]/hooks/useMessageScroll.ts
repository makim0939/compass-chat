import { MessageData } from "@/app/types/database.types";
import React, { useCallback, useEffect, useState } from "react";

const useMessageScroll = ({
  messages,
  ref,
}: {
  messages: MessageData[] | undefined;
  ref: React.RefObject<HTMLDivElement>;
}) => {
  const [isInitial, setIsInitial] = useState<boolean>(false);
  const scrollBottom = useCallback(
    (smooth: boolean) => {
      if (!ref.current) return;
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      };
      if (!smooth) scrollOptions.behavior = "instant";
      ref.current.scrollIntoView(scrollOptions);
    },
    [ref],
  );

  useEffect(() => {
    if (!messages || messages.length === 0) return;
    scrollBottom(isInitial);
    setIsInitial(true);
  }, [messages, isInitial, scrollBottom]);
  return;
};

export default useMessageScroll;
