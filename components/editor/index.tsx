"use client";

import { Icon } from "@/components/Icons";
import MainHeader from "@/components/MainHeader";
import CopyIcon from "@/components/icons/copy";
import ExportIcon from "@/components/icons/export";
import ImageIcon from "@/components/icons/image";
import LinkIcon from "@/components/icons/link";
import RedoIcon from "@/components/icons/redo";
import UndoIcon from "@/components/icons/undo";
import { Button, IconButton } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/modal";
import { toCamelCase } from "@/lib/utils";
import { ChevronLeft, ChevronRight, FolderUp, LayoutDashboard, Palette, Search, Shuffle } from "lucide-react";
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { useEffect, useState } from "react";

export default function SvgEditor() {
  const [openExportMenu, setOpenExportMenu] = useState(false);
  const [showBottomLeftPanel, setShowBottomLeftPanel] = useState<boolean>(false);
  const [showBottomRightPanel, setShowBottomRightPanel] = useState<boolean>(false);

  const [svgSize, setSvgSize] = useState<number>(256);
  const [seachNameResult, setseachNameResult] = useState<string[]>([])
  const [suppotIcons, setSuppotIcons] = useState<string[]>([])

  const [iconPage, setIconPage] = useState(1)
  const [perPage] = useState(100)
  const startIndex = (iconPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  useEffect(() => {
    if (Object.keys(dynamicIconImports).length > 0) {
      setSuppotIcons(Object.keys(dynamicIconImports))
    }
  }, [dynamicIconImports])

  const handleSearchIcon = (key: string) => {
    setseachNameResult(suppotIcons.filter(item => item.includes(key)))
  }

  const IconItem = (item: string) => {
    return <div  
      className="flex items-center justify-center cursor-pointer w-[64px] h-[64px] p-3 rounded bg-[#ffffff0d] hover:bg-[#ececec36] transition-all duration-300" 
      data-id={item} 
      key={item}
    >
      <Icon className="text-[#ffffffce] w-4 h-4" name={toCamelCase(item) as any}/>
    </div>
  }

  const renderLeftPanel = () => <div className="">
    <div className="flex items-center gap-2 justify-between">
      <label className="relative inline-flex">
        <Search className="w-4 h-4 absolute top-3 left-4 z-10 text-[#ffffff99]"/>
        <input onChange={(e) => handleSearchIcon(e.target.value)} type="text" className="w-full md:w-[190px] h-10 text-sm text-white pl-10 pr-11 bg-[#343434] focus:border-gray-500 caret-slate-100 transition-all duration-300 outline-none rounded-md border border-[#ffffff0d]" placeholder="Search Icons…" />
      </label>
      <IconButton><Shuffle className="w-4 h-4 text-[#ffffff99]"/></IconButton>
      <IconButton><FolderUp className="w-4 h-4 text-[#ffffff99]"/></IconButton>
    </div>

    <div className=" flex items-start justify-start flex-wrap gap-2 mt-4 mb-4 overflow-auto" style={{ height: "calc(100vh - 250px)" }}>
      {seachNameResult.length > 0 ? 
        seachNameResult.map(item => 
          IconItem(item)
        )  
      : suppotIcons.slice(startIndex, endIndex).map(item => 
        IconItem(item)
      )}
    </div>
    <div className="flex items-center justify-end gap-3 absolute">
      <span className="text-[#ffffffce] text-sm">{iconPage} / {Math.ceil(suppotIcons.length / 100)}</span>
      <IconButton name="chevron-left" onClick={() => {
        if (iconPage > 1) {
          setIconPage(iconPage-1)
        }
      }}>
        <ChevronLeft className="w-4 h-4 text-[#ffffff99]"/>
      </IconButton>
      <IconButton onClick={() => {
        if (iconPage < Math.ceil(suppotIcons.length / 100)) {
          setIconPage(iconPage+1)
        }
      }}>
        <ChevronRight className="w-4 h-4 text-[#ffffff99]"/>
      </IconButton>
    </div>
  </div>

  const renderRightPanel = () => <div>
    2
  </div>

  return (
    <div className="svg-editor w-screen h-screen">
      <header className="h-14 px-4 flex justify-between items-center bg-[#1f2023] shadow backdrop-blur-xl">
        <div className="logo text-left flex items-center gap-4">
          <MainHeader />
          <div className="w-[1px] h-[16px] bg-[#fff3] rounded-[3px]"></div>
          <div className="actions gap-1">
            <Button className="text-white gap-1" variant="ghost" size="sm">
              <UndoIcon />
              Undo
            </Button>
            <Button className="text-white gap-1" variant="ghost" size="sm">
              <RedoIcon />
              Redo
            </Button>
          </div>
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
                className="flex items-center justify-center px-3 py-1 rounded-md text-sm font-semibold bg-slate-700/70 border-slate-500/70"
                onMouseMove={() => setOpenExportMenu(true)}>
                <ExportIcon /> <span className="pl-2">Export icon</span>
              </div>
              {/* <Button
                className="bg-slate-700/70 border-slate-500/70"
                size="sm"
                onMouseMove={() => setOpenExportMenu(true)}>
                <ExportIcon /> <span className="pl-2">Export icon</span>
              </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#2e3031] border border-[#ffffff0d] text-sm text-[#fff6]"
              onMouseLeave={() => setOpenExportMenu(false)}>
              <DropdownMenuItem className=" hover:text">
                <ImageIcon />
                <span className="pl-2">Download</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CopyIcon />
                <span className="pl-2">Copy Image</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
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
            }}
          >
            <LayoutDashboard/>
          </button>
          <button
            className="absolute top-6 right-0 rounded-l-lg bg-[#232526] p-4 shadow-md text-slate-500 hover:bg-[#3b3d3f]"
            onClick={() => {
              setShowBottomLeftPanel(false);
              setShowBottomRightPanel(!showBottomRightPanel);
            }}
          >
            <Palette/>
          </button>
        </div>

        <PanelWrapper position="left">
          {renderLeftPanel()}
        </PanelWrapper>

        <div className="preview absolute top-[50%] left-[50%] text-white" style={{ transform: 'translate(-50%,-50%)', width: svgSize, height: svgSize }}>
          <div className="relative">
            <svg width={svgSize} height={svgSize} viewBox={`0 0 512 512`} fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className=""><rect id="r4" width="512" height="512" x="0" y="0" rx="128" fill="url(#r5)" stroke="#FFFFFF" strokeWidth="0" strokeOpacity="100%" paintOrder="stroke"></rect><clipPath id="clip"><use xlinkHref="#r4"></use></clipPath><defs><linearGradient id="r5" gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)" style={{transformOrigin: "center center"}}><stop stopColor="#F5AF19"></stop><stop offset="1" stopColor="#F12711"></stop></linearGradient><radialGradient id="r6" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(256) rotate(90) scale(512)"><stop stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></radialGradient></defs><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="200" height="200" x="156" y="156" alignmentBaseline="middle" style={{color: "rgb(255, 255, 255)"}}><path d="M14.25 8a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.25 8a3.25 3.25 0 1 1-6.5 0 3.25 3.25 0 0 1 6.5 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></svg>
            <span className="text-center absolute top-[105%] left-[50%] text-xs px-2 py-1 text-[#ffffff66] bg-[#ffffff1a] rounded-[20px] min-w-[70px]" style={{transform: 'translate(-50%,-20%)'}}>{svgSize}x{svgSize}</span>
          </div>
        </div>

        <PanelWrapper position="right">
          {renderRightPanel()}
        </PanelWrapper>
      </main>

      <Modal
        showModal={showBottomLeftPanel}
        setShowModal={setShowBottomLeftPanel}
        showBlur={false}
      >
        <div className="p-4">{renderLeftPanel()}</div>
      </Modal>
      <Modal
        showModal={showBottomRightPanel}
        setShowModal={setShowBottomRightPanel}
        showBlur={false}
      >
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
      ${position == "left"
          ? "left-sider left-6 -translate-x-180 animate-slide-left-fade"
          : "right-sider right-6 translate-x-180 animate-slide-right-fade"
        } absolute top-6 z-10 hidden w-80 overflow-y-auto rounded-lg bg-[#232526] p-4 shadow-md transition-all duration-500 md:block`}
      style={{
        animationDelay: "0.15s",
        animationFillMode: "forwards",
        height: "calc(100vh - 102px)",
      }}
    >
      {children}
    </div>
  );
};
