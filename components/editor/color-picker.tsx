"use client";

import "@/styles/color-picker.css";
import * as Popover from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";

export default function ColorPicker({
  defaultColor,
  onChoose,
}: {
  defaultColor: string;
  onChoose: (color: string) => void;
}) {
  const [color, setColor] = useState(defaultColor);

  useEffect(() => {
    setColor(defaultColor);
  }, [defaultColor]);

  const onChooseColor = (color: string) => {
    setColor(color);
    onChoose(color);
  };

  return (
    <div className="custom-color-picker">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="IconButton min-w-[100px] flex items-center justify-between text-xs gap-2 rounded-[6px] px-2 py-1 bg-[#0003] border border-[#ffffff0d] active:border-[#ffffff36] enabled:hover:border-[#ffffff36] transition-all duration-300"
            aria-label="Update dimensions">
            <div className="swatch" style={{ backgroundColor: color }} />
            {color}
          </button>
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content className="z-[41]" align="end">
            <div className="custom-color-picker">
              <HexAlphaColorPicker color={color} onChange={onChooseColor} />
              <HexColorInput
                prefixed={true}
                alpha={true}
                color={color}
                onChange={onChooseColor}
              />
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
