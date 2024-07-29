"use client";

import { AnimationProps, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

type OptionObject = {
  icon: string;
  label: string;
};

type OptionComponentObject<T> = {
  attributes: T;
  component: React.JSXElementConstructor<T>;
};

type DropdownType<T> = {
  hideOnPressOption?: boolean;
  headerLeft?: string | React.ReactNode;
  headerRight?: string | React.ReactNode;
  options?: Array<OptionObject | OptionComponentObject<T>>;
};

export default function Dropdown<T>(properties: DropdownType<T>) {
  const [visible, setVisible] = React.useState(false);
  const containerReference = React.useRef<HTMLDivElement>(null);
  const motionProperites = React.useMemo<AnimationProps>(
    () => ({
      exit: { opacity: 0, y: -15 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
      initial: { opacity: 0, y: -15 },
    }),
    [],
  );

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerReference.current &&
        !containerReference.current?.contains(event.target as Node)
      )
        setVisible(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col w-80 md:w-96">
      <div
        ref={containerReference}
        onClick={() => setVisible(!visible)}
        className="z-20 flex justify-between items-center bg-black p-4 rounded-t-3xl w-full"
      >
        {properties.headerLeft}
        {properties.headerRight}
      </div>

      {visible && (
        <motion.div
          {...motionProperites}
          className="top-full z-10 absolute bg-white shadow-lg mt-1 rounded-b-md w-full"
        >
          {properties.options?.map((option, index) => {
            if ("component" in option)
              return <option.component {...option.attributes} key={index} />;
            return (
              <button
                key={index}
                className="flex flex-row justify-start items-center gap-2"
              >
                <Image
                  width={100}
                  height={100}
                  src={option.icon}
                  alt={option.label}
                  className="w-6 h-6 object-contain"
                />
                <span className="text-sm">{option.label}</span>
              </button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
