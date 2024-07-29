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
    <div className="relative flex w-80 flex-col md:w-96">
      <div
        ref={containerReference}
        onClick={() => setVisible(!visible)}
        className="z-20 flex w-full items-center justify-between rounded-t-3xl bg-black p-4"
      >
        {properties.headerLeft}
        {properties.headerRight}
      </div>

      {visible && (
        <motion.div
          {...motionProperites}
          className="absolute top-full z-10 mt-1 w-full rounded-b-md bg-white shadow-lg"
        >
          {properties.options?.map((option, index) => {
            if ("component" in option)
              return <option.component {...option.attributes} key={index} />;
            return (
              <button
                key={index}
                className="flex flex-row items-center justify-start gap-2"
              >
                <Image
                  width={100}
                  height={100}
                  src={option.icon}
                  alt={option.label}
                  className="h-6 w-6 object-contain"
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
