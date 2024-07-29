"use client";

import Image from "next/image";
import React from "react";

type PropertyType = {
  id: string;
  image: string;
  createdAt: string;
  className?: string;
  message: string | React.ReactNode;
  links?: { onClick: React.MouseEventHandler; label: string }[];
};

export default function NotificationCard(properties: PropertyType) {
  return (
    <div
      className={`flex w-full flex-col gap-2 p-6 py-4 shadow ${properties.className || "w-96"}`}
    >
      <div className="flex w-full items-center justify-between gap-4">
        <Image
          alt=""
          width={100}
          height={100}
          src={properties.image}
          className="h-8 w-8 rounded-full object-contain"
        />

        <p className="flex-auto text-xs">{properties.message}</p>

        <div className="flex items-center gap-1">
          <span className="whitespace-nowrap text-xs">
            {new Date(properties.createdAt).toLocaleDateString("us-en", {
              month: "short",
              day: "2-digit",
            })}
          </span>
          <span className="h-1.5 w-1.5 flex-none rounded-full bg-orange-400" />
        </div>
      </div>

      {properties.links && (
        <div className="flex w-full items-center justify-start gap-3 text-xs text-blue-800">
          {properties.links.map((link) => (
            <button key={link.label} onClick={link.onClick} className="">
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
