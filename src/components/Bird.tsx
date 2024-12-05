import { useRive } from "@rive-app/react-canvas";
import mapAccessoriesUrl from "../rive/map-accessories.riv?url";
import { useEffect, useId } from "react";

export default function Bird() {
  const { RiveComponent } = useRive({
    stateMachines: "State Machine 1",
    artboard: "bird",
    src: mapAccessoriesUrl,
    autoplay: true,
  });

  const id = useId();

  useEffect(() => {
    console.log(`[${id}] mount rive 🐓`);
    return () => {
      console.log(`[${id}] unmount rive 🐓`);
    };
  }, [id]);

  return (
    <div id="Rive-🐓" className="size-[100px] ring-1">
      <RiveComponent />
    </div>
  );
}
