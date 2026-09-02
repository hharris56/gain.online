"use client";

import { cn } from "@/helpers/cn";
import {
  Box,
  Camera,
  Code,
  Crosshair,
  Frown,
  Globe,
  Hash,
  Headphones,
  Image,
  Meh,
  Moon,
  Music,
  Package,
  Plus,
  PlusCircle,
  PlusSquare,
  Power,
  Repeat,
  Smile,
  Terminal,
  Tool,
  Triangle,
  Truck,
  Tv,
  Umbrella,
  User,
  Video,
  Volume2,
  Wifi,
  Zap,
} from "react-feather";
import { useState, useEffect } from "react";

export function UniversalHeader() {
  const [icons, setIcons] = useState<any[]>([]);

  useEffect(() => {
    updateIcons();
  }, []);

  function updateIcons() {
    const shuffledIcons = iconArray.map((icon, index) => (
      <div
        className="opacity-0"
        key={`${icon.key}-${index}`}
        style={{
          animation: `pop-in 0.5s ease-out forwards`,
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {icon}
      </div>
    ));
    shuffle(shuffledIcons);
    setIcons(shuffledIcons);
  }

  return (
    <>
      <div
        className={cn(
          // base stuff
          "z-10 sticky top-0 max-w-screen flex items-center justify-start overflow-hidden",
          // mobile view
          "gradient-x min-h-16 p-2 gap-2",
          // desktop view (96px wide btw)
          "md:h-[calc(100vh-4rem)] md:min-w-24 md:gradient-y md:p-4 md:gap-4 md:flex-col md: md:justify-start md:top-8",
        )}
      >
        {/* <b className="text-4xl text-white md:hidden">gain.online</b> */}
        <Plus
          color="white"
          size={50}
          className="shrink-0"
          onClick={updateIcons}
        />
        <div
          className={cn(
            "flex flex-row md:flex-col gap-1",
            "overflow-hidden shrink-0",
          )}
        >
          {icons.length > 0 && icons}
        </div>
      </div>
    </>
  );
}

const iconArray = [
  <Box key="Box" color="white" />,
  <Headphones key="Headphones" color="white" />,
  <Camera key="Camera" color="white" />,
  <Code key="Code" color="white" />,
  <Crosshair key="Crosshair" color="white" />,
  <Frown key="Frown" color="white" />,
  <Globe key="Globe" color="white" />,
  <Hash key="Hash" color="white" />,
  <Image key="Image" color="white" />,
  <Meh key="Meh" color="white" />,
  <Moon key="Moon" color="white" />,
  <Music key="Music" color="white" />,
  <Package key="Package" color="white" />,
  <Power key="Power" color="white" />,
  <Repeat key="Repeat" color="white" />,
  <Smile key="Smile" color="white" />,
  <Terminal key="Terminal" color="white" />,
  <Tool key="Tool" color="white" />,
  <Triangle key="Triangle" color="white" />,
  <Truck key="Truck" color="white" />,
  <Tv key="Tv" color="white" />,
  <Umbrella key="Umbrella" color="white" />,
  <User key="User" color="white" />,
  <Video key="Video" color="white" />,
  <Volume2 key="Volume2" color="white" />,
  <Wifi key="Wifi" color="white" />,
  <Zap key="Zap" color="white" />,
];

// Source - https://stackoverflow.com/a/2450976
// Posted by ChristopheD, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-09, License - CC BY-SA 4.0
function shuffle(array: any) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
