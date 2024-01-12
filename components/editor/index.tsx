"use client";

import { Icon } from "@/components/Icons";
import MainHeader from "@/components/MainHeader";
import ColorPicker from "@/components/editor/color-picker";
import EmojiPicker from "@/components/editor/emoji-picker";
import NoiseTexture from "@/components/editor/noise-texture";
import {
  BackgroundFillPresets,
  FillType,
  IconInfo,
} from "@/components/editor/styles";
import CopyIcon from "@/components/icons/copy";
import ExportIcon from "@/components/icons/export";
import ImageIcon from "@/components/icons/image";
import LinkIcon from "@/components/icons/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IconButton } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/modal";
import { toCamelCase } from "@/lib/utils";

import * as Select from "@radix-ui/react-select";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FolderUp,
  LayoutDashboard,
  Palette,
  Search,
} from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { useEffect, useState } from "react";

export default function SvgEditor() {
  const [openExportMenu, setOpenExportMenu] = useState(false);
  const [openEmojiPicker, setEmojiPicker] = useState(false);
  const [showBottomLeftPanel, setShowBottomLeftPanel] =
    useState<boolean>(false);
  const [showBottomRightPanel, setShowBottomRightPanel] =
    useState<boolean>(false);

  const [iconInfo, setIconInfo] = useState<IconInfo>({
    type: "svg",
    value: "search", // TODO
    totalSize: 256,
    centerIconSize: 200,
    fillStyle: {
      fillType: "Linear",
      primaryColor: "#F5AF19",
      secondaryColor: "#F12711",
      angle: "45",
    },
    background: {
      radialGlare: false,
      noiseTexture: false,
      noiseOpacity: 25,
      radius: "128",
      strokeSize: "0",
      strokeColor: "#FFFFFF",
      strokeOpacity: "100",
    },
  });

  const [seachNameResult, setseachNameResult] = useState<string[]>([]);
  const [suppotIcons, setSuppotIcons] = useState<string[]>([]);

  const [iconPage, setIconPage] = useState(1);
  const [perPage] = useState(100);
  const startIndex = (iconPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  useEffect(() => {
    if (Object.keys(dynamicIconImports).length > 0) {
      setSuppotIcons(Object.keys(dynamicIconImports));
    }
  }, [dynamicIconImports]);

  const isDisabled = (disable: boolean) => (disable ? "text-gray-400" : "");

  const handleSearchIcon = (key: string) => {
    setseachNameResult(suppotIcons.filter((item) => item.includes(key)));
  };

  const IconItem = (item: string) => {
    return (
      <div
        className="flex items-center justify-center cursor-pointer max-h-[64px] p-6 rounded bg-[#ffffff0d] hover:bg-[#ececec36] transition-all duration-300"
        data-id={item}
        key={item}
        onClick={() => {
          setIconInfo({ ...iconInfo, type: "svg", value: item });
        }}>
        <Icon
          className="text-[#ffffffce] w-4 h-4"
          name={toCamelCase(item) as any}
        />
      </div>
    );
  };

  const renderLeftPanel = () => (
    <div className="">
      <div className="flex items-center gap-2 justify-between">
        <label className="relative inline-flex">
          <Search className="w-4 h-4 absolute top-3 left-4 z-10 text-[#ffffff99]" />
          <input
            onChange={(e) => handleSearchIcon(e.target.value)}
            type="text"
            className="w-full md:w-[190px] h-10 text-sm text-white pl-10 pr-11 bg-[#3d3d3d] focus:border-gray-500 caret-slate-100 transition-all duration-300 outline-none rounded-md shadow-inner border border-[#ffffff0d]"
            placeholder="Search Icons…"
          />
        </label>

        <DropdownMenu open={openEmojiPicker} onOpenChange={setEmojiPicker}>
          <DropdownMenuTrigger className="">
            <div className="w-10 h-10 inline-flex items-center justify-center transition-all duration-300 bg-[#ffffff1a] outline-none rounded-md border border-[#ffffff0d] hover:bg-[#ececec36]">
              {iconInfo.type === "emoji" ? iconInfo.value : "😎"}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#2e3031] border border-[#ffffff0d] text-sm text-[#fff6]"
            onMouseLeave={() => setEmojiPicker(false)}>
            <EmojiPicker
              onEmojiSelect={(e) => {
                setIconInfo({ ...iconInfo, type: "emoji", value: e });
                setEmojiPicker(false);
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        <IconButton>
          <FolderUp className="w-4 h-4 text-[#ffffff99]" />
        </IconButton>
      </div>

      <motion.div
        className="grid grid-cols-4 gap-2 mt-4 mb-4 overflow-auto"
        style={{ height: "calc(100vh - 250px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        {seachNameResult.length > 0
          ? seachNameResult.map((item) => IconItem(item))
          : suppotIcons
              .slice(startIndex, endIndex)
              .map((item) => IconItem(item))}
      </motion.div>
      <div className="flex items-center justify-end gap-3">
        <span className="text-[#ffffffce] text-sm">
          {iconPage} / {Math.ceil(suppotIcons.length / perPage)}
        </span>
        <IconButton
          name="chevron-left"
          onClick={() => {
            if (iconPage > 1) {
              setIconPage(iconPage - 1);
            }
          }}>
          <ChevronLeft className="w-4 h-4 text-[#ffffff99]" />
        </IconButton>
        <IconButton
          onClick={() => {
            if (iconPage < Math.ceil(suppotIcons.length / perPage)) {
              setIconPage(iconPage + 1);
            }
          }}>
          <ChevronRight className="w-4 h-4 text-[#ffffff99]" />
        </IconButton>
      </div>
    </div>
  );

  const renderRightPanel = () => (
    <div className="flex flex-col gap-3">
      <Accordion
        className="w-full"
        type="single"
        defaultValue="item-1"
        collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-slate-300 bg-gradient-1 shadow-md hover:bg-[#4b4b4b] rounded-md font-bold text-xs px-3">
            Fill Presets
          </AccordionTrigger>
          <AccordionContent className="p-2 grid grid-cols-7 gap-4 items-start justify-start pt-3">
            {BackgroundFillPresets.map((item, index) => (
              <svg
                className="rounded cursor-pointer w-5 h-5 flex-shrink-0 overflow-hidden"
                key={index}
                onClick={() =>
                  setIconInfo({
                    ...iconInfo,
                    fillStyle: { ...iconInfo.fillStyle, ...item },
                  })
                }
                width="20"
                height="20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                <rect
                  id={`ra${index}`}
                  width="20"
                  height="20"
                  x="0"
                  y="0"
                  rx="0"
                  fill={`url(#rt${index})`}
                  stroke="#FFFFFF"
                  strokeWidth="0"
                  strokeOpacity="100%"
                  paintOrder="stroke"></rect>
                <clipPath id="clip">
                  <use xlinkHref={`ra${index}`}></use>
                </clipPath>
                <defs>
                  <linearGradient
                    id={`rt${index}`}
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="rotate(45)"
                    style={{ transformOrigin: "center center" }}>
                    <stop stopColor={item.primaryColor}></stop>
                    <stop offset="1" stopColor={item.secondaryColor}></stop>
                  </linearGradient>
                  <radialGradient
                    id="r9"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(10) rotate(90) scale(20)">
                    <stop stopColor="white"></stop>
                    <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                  </radialGradient>
                </defs>
              </svg>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion
        className="w-full"
        type="single"
        defaultValue="item-1"
        collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-slate-300 bg-gradient-1 shadow-md hover:bg-[#4b4b4b] rounded-md font-bold text-xs px-3">
            Fill Styles
          </AccordionTrigger>
          <AccordionContent className="space-y-2 p-2">
            <div className="flex items-center justify-between text-white mt-2">
              <span className="text-xs">Fill Type</span>
              <Select.Root
                defaultValue={iconInfo.fillStyle.fillType}
                onValueChange={(val) =>
                  setIconInfo({
                    ...iconInfo,
                    fillStyle: {
                      ...iconInfo.fillStyle,
                      fillType: val as FillType,
                    },
                  })
                }>
                <Select.Trigger className="SelectTrigger">
                  {iconInfo.fillStyle.fillType}
                  <Select.Icon>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Content className="SelectContent" position="popper">
                  <Select.Item className="SelectItem" value="Linear">
                    Linear
                  </Select.Item>
                  <Select.Item className="SelectItem" value="Solid">
                    Solid
                  </Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
            <div className="flex items-center justify-between text-white mt-2">
              <span className="text-xs">Primary Color</span>
              <ColorPicker
                defaultColor={iconInfo.fillStyle.primaryColor}
                onChoose={(color) =>
                  setIconInfo({
                    ...iconInfo,
                    fillStyle: {
                      ...iconInfo.fillStyle,
                      primaryColor: color,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between text-white mt-2">
              <span
                className={
                  "text-xs " +
                  `${isDisabled(iconInfo.fillStyle.fillType === "Solid")}`
                }>
                Secondary Color
              </span>
              <ColorPicker
                defaultColor={iconInfo.fillStyle.secondaryColor}
                onChoose={(color) =>
                  setIconInfo({
                    ...iconInfo,
                    fillStyle: {
                      ...iconInfo.fillStyle,
                      secondaryColor: color,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between text-white mt-2">
              <span
                className={
                  "text-xs " +
                  `${isDisabled(iconInfo.fillStyle.fillType === "Solid")}`
                }>
                Angle
              </span>
              <div className="relative">
                <input
                  className="bg-[#0003] text-white after:content-['*'] w-[100px] rounded-[6px] px-2 py-1 border focus:border-gray-500 border-[#ffffff0a] outline-none transition-all duration-300"
                  type="number"
                  defaultValue={iconInfo.fillStyle.angle}
                  onInput={(v) => v.currentTarget.value.replace(/[^\d]/g, "")}
                  onChange={(e) =>
                    setIconInfo({
                      ...iconInfo,
                      fillStyle: {
                        ...iconInfo.fillStyle,
                        angle: e.target.value || "45",
                      },
                    })
                  }
                />
                <div className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-400">
                  °
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion className="w-full" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-slate-300 bg-gradient-1 shadow-md hover:bg-[#4b4b4b] rounded-md font-bold text-xs px-3">
            Background
          </AccordionTrigger>
          <AccordionContent className="space-y-3 p-2">
            <div className="flex items-center justify-between text-white mt-2">
              <span className="text-xs">Radial glare</span>
              <Switch.Root
                className="SwitchRoot"
                id="airplane-mode"
                defaultChecked={iconInfo.background.radialGlare}
                onCheckedChange={(e) =>
                  setIconInfo({
                    ...iconInfo,
                    background: {
                      ...iconInfo.background,
                      radialGlare: e,
                    },
                  })
                }>
                <Switch.Thumb className="SwitchThumb" />
              </Switch.Root>
            </div>
            <div className="flex items-center justify-between text-white mt-2">
              <span className="text-xs">Noise texture</span>
              <Switch.Root
                className="SwitchRoot"
                id="airplane-mode"
                defaultChecked={iconInfo.background.noiseTexture}
                onCheckedChange={(e) =>
                  setIconInfo({
                    ...iconInfo,
                    background: {
                      ...iconInfo.background,
                      noiseTexture: e,
                    },
                  })
                }>
                <Switch.Thumb className="SwitchThumb" />
              </Switch.Root>
            </div>
            <div className="flex items-center justify-between text-white mt-2">
              <span
                className={`text-xs ${isDisabled(
                  !iconInfo.background.noiseTexture
                )}`}>
                Noise Opacity
              </span>

              <div className="flex items-center justify-end gap-1">
                <span className="text-xs text-slate-400">
                  {iconInfo.background.noiseOpacity}%
                </span>
                <Slider.Root
                  className="SliderRoot"
                  defaultValue={[iconInfo.background.noiseOpacity]}
                  max={100}
                  step={1}
                  onValueChange={(e) =>
                    setIconInfo({
                      ...iconInfo,
                      background: {
                        ...iconInfo.background,
                        noiseOpacity: e[0],
                      },
                    })
                  }>
                  <Slider.Track className="SliderTrack">
                    <Slider.Range className="SliderRange" />
                  </Slider.Track>
                  <Slider.Thumb className="SliderThumb" aria-label="Volume" />
                </Slider.Root>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="svg-editor w-screen h-screen">
      <header className="h-14 px-4 flex justify-between items-center bg-[#1f2023] shadow backdrop-blur-xl">
        <div className="logo text-left flex items-center gap-4">
          <MainHeader />
          {/* <div className="w-[1px] h-[16px] bg-[#fff3] rounded-[3px]"></div>
          <div className="actions gap-1">
            <Button className="text-white gap-1" variant="ghost" size="sm">
              <UndoIcon />
              Undo
            </Button>
            <Button className="text-white gap-1" variant="ghost" size="sm">
              <RedoIcon />
              Redo
            </Button>
          </div> */}
        </div>
        <div className="md:block hidden mx-auto text-gray-500 text-center text-sm font-bold">
          <input
            defaultValue="filename"
            className="text-center border-none outline-none  bg-[#1f2023]"
            type="text"
          />
        </div>
        <div className="text-right">
          <DropdownMenu open={openExportMenu} onOpenChange={setOpenExportMenu}>
            <DropdownMenuTrigger className="">
              <div
                className="flex items-center justify-center text-slate-300 border outline-none px-3 py-1 rounded-md text-sm font-semibold bg-gradient-2 border-slate-600/70"
                onMouseMove={() => setOpenExportMenu(true)}>
                <ExportIcon /> <span className="pl-2">Export icon</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#2e3031] border border-[#ffffff0d] text-sm text-[#fff6]"
              onMouseLeave={() => setOpenExportMenu(false)}>
              <DropdownMenuItem className="DropdownMenuItem">
                <ImageIcon />
                <span className="pl-2">Download</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="DropdownMenuItem">
                <CopyIcon />
                <span className="pl-2">Copy Image</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="DropdownMenuItem">
                <LinkIcon />
                <span className="pl-2">Copy Link</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main
        className="relative dot-bg overflow-auto"
        style={{
          height: "calc(100vh - 54px)",
        }}>
        {/* tools */}
        <div className="block md:hidden">
          <button
            className="absolute top-6 left-0 rounded-r-lg bg-[#232526] p-4 shadow-md text-slate-500 hover:bg-[#3b3d3f]"
            onClick={() => {
              setShowBottomRightPanel(false);
              setShowBottomLeftPanel(!showBottomLeftPanel);
            }}>
            <LayoutDashboard />
          </button>
          <button
            className="absolute top-6 right-0 rounded-l-lg bg-[#232526] p-4 shadow-md text-slate-500 hover:bg-[#3b3d3f]"
            onClick={() => {
              setShowBottomLeftPanel(false);
              setShowBottomRightPanel(!showBottomRightPanel);
            }}>
            <Palette />
          </button>
        </div>

        <PanelWrapper position="left">{renderLeftPanel()}</PanelWrapper>

        <div
          className="preview absolute top-[50%] left-[50%] text-white"
          style={{
            transform: "translate(-50%,-50%)",
            width: iconInfo.totalSize,
            height: iconInfo.totalSize,
          }}>
          <div className="relative">
            <svg
              className=""
              width={iconInfo.totalSize}
              height={iconInfo.totalSize}
              viewBox={`0 0 512 512`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <rect
                id="r4"
                width="512"
                height="512"
                x="0"
                y="0"
                rx="128"
                fill={
                  iconInfo.fillStyle.fillType === "Linear"
                    ? "url(#r5)"
                    : iconInfo.fillStyle.primaryColor
                }
                stroke="#FFFFFF"
                strokeWidth="0"
                strokeOpacity="100%"
                paintOrder="stroke"></rect>
              {iconInfo.background.radialGlare && (
                <rect
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  fill="url(#r6)"
                  rx="128"
                  style={{ mixBlendMode: "overlay" }}></rect>
              )}
              {iconInfo.background.noiseTexture && (
                <NoiseTexture opacity={iconInfo.background.noiseOpacity} />
              )}
              <clipPath id="clip">
                <use xlinkHref="#r4"></use>
              </clipPath>
              <defs>
                <linearGradient
                  id="r5"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform={`rotate(${iconInfo.fillStyle.angle})`}
                  style={{ transformOrigin: "center center" }}>
                  <stop stopColor={iconInfo.fillStyle.primaryColor}></stop>
                  <stop
                    offset="1"
                    stopColor={iconInfo.fillStyle.secondaryColor}></stop>
                </linearGradient>
                <radialGradient
                  id="r6"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(256) rotate(90) scale(512)">
                  <stop stopColor="white"></stop>
                  <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                </radialGradient>
              </defs>
              {iconInfo.type === "svg" ? (
                <Icon
                  className="text-white"
                  name={toCamelCase(iconInfo.value) as any}
                  width={iconInfo.centerIconSize}
                  height={iconInfo.centerIconSize}
                  x={156}
                  y={156}
                />
              ) : (
                <text
                  x="50%" // 将文本水平居中
                  y="50%" // 将文本垂直居中
                  fontSize={iconInfo.centerIconSize}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="middle">
                  {iconInfo.value}
                </text>
              )}
            </svg>
            <span
              className="text-center absolute top-[105%] left-[50%] text-xs px-2 py-1 text-[#ffffff66] bg-[#ffffff1a] rounded-[20px] min-w-[70px]"
              style={{ transform: "translate(-50%,-20%)" }}>
              {iconInfo.totalSize}x{iconInfo.totalSize}
            </span>
          </div>
        </div>

        <PanelWrapper position="right">{renderRightPanel()}</PanelWrapper>
      </main>

      <Modal
        showModal={showBottomLeftPanel}
        setShowModal={setShowBottomLeftPanel}
        showBlur={false}>
        <div className="p-4">{renderLeftPanel()}</div>
      </Modal>
      <Modal
        showModal={showBottomRightPanel}
        setShowModal={setShowBottomRightPanel}
        showBlur={false}>
        <div className="p-4">{renderRightPanel()}</div>
      </Modal>
    </div>
  );
}

export const PanelWrapper = ({
  children,
  position,
}: {
  children: React.ReactNode;
  position: "right" | "left";
}) => {
  return (
    <div
      className={`
      ${
        position == "left"
          ? "left-sider left-6 -translate-x-180 animate-slide-left-fade"
          : "right-sider right-6 translate-x-180 animate-slide-right-fade"
      } absolute top-6 z-10 hidden w-80 overflow-y-auto backdrop-blur-xl rounded-lg bg-[#434a4d28] border border-[#ffffff0d] p-4 shadow-md transition-all duration-500 md:block`}
      style={{
        animationDelay: "0.15s",
        animationFillMode: "forwards",
        height: "calc(100vh - 102px)",
      }}>
      {children}
    </div>
  );
};
