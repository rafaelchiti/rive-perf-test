import type { RiveEventPayload } from "@rive-app/react-canvas";
import { type Rive, EventType, type Event } from "@rive-app/canvas";
import { useCallback, useEffect } from "react";

type UseRiveEvents = {
  rive: Rive | null;
  handlers: Record<string, (eventName: Event) => void>;
};

const ANY_EVENT = "*";

export const useRiveEvents = ({ rive, handlers }: UseRiveEvents) => {
  const handleEvent = useCallback(
    (riveEvent: Event) => {
      const data = riveEvent.data;
      if (!isRiveEventPayload(data)) return;
      const handler = handlers[data.name];
      if (handler) {
        return handler(riveEvent);
      } else if (handlers[ANY_EVENT]) {
        return handlers[ANY_EVENT](riveEvent);
      }
    },
    [handlers]
  );

  useEffect(() => {
    if (!rive) return;
    if (rive) {
      rive.on(EventType.RiveEvent, handleEvent);
    }
    return () => {
      rive.off(EventType.RiveEvent, handleEvent);
    };
  }, [handleEvent, rive]);
};

useRiveEvents.any = ANY_EVENT;

export function isRiveEventPayload(
  data: Event["data"]
): data is RiveEventPayload {
  return !!(data && typeof data === "object" && "name" in data);
}
