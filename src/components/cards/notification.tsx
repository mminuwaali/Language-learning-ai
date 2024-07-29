"use client";

import Image from "next/image";
import React from "react";

type propType = {
  id: any;
  image: string;
  createdAt: string;
  message: string | React.ReactNode;
  links?: { onClick: React.MouseEventHandler; label: string }[];
};

export default function NotificationCard(props: propType) {
  return (
    <div className="flex w-96 flex-col gap-2 p-6 py-4 shadow">
      <div className="flex w-full items-center justify-between gap-4">
        <Image
          alt=""
          width={100}
          height={100}
          src={props.image}
          className="h-8 w-8 rounded-full bg-black object-contain"
        />

        <p className="flex-auto text-xs">{props.message}</p>

        <div className="flex items-center gap-1">
          <span className="whitespace-nowrap text-xs">
            {new Date(props.createdAt).toLocaleDateString("us-en", {
              month: "short",
              day: "2-digit",
            })}
          </span>
          <span className="h-1.5 w-1.5 flex-none rounded-full bg-orange-400" />
        </div>
      </div>

      {props.links && (
        <div className="flex w-full items-center justify-start gap-3 text-xs text-blue-800">
          {props.links.map((link) => (
            <button key={link.label} onClick={link.onClick} className="">
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
