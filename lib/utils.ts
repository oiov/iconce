import { IconInfo } from "@/components/editor/styles";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmail(str: string) {
  const reg = /^([a-zA-Z\d._%+-]+)@([a-zA-Z\d.-]+\.[a-zA-Z]{2,})$/;
  return reg.test(str);
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function toCamelCase(str: string) {
  return (
    str
      // 将字符串按照连字符分割
      .split("-")
      // 将数组中的每个单词首字母大写
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      // 将单词数组连接成一个字符串
      .join("")
  );
}

export async function copySvgAsPngToClipboard(
  svgElement: SVGSVGElement | null
): Promise<void> {
  if (!svgElement) return;

  const svgData = new XMLSerializer().serializeToString(svgElement);

  const canvas = document.createElement("canvas");
  const svgSize = svgElement.getBoundingClientRect();
  canvas.width = svgSize.width;
  canvas.height = svgSize.height;

  const img = new Image();
  img.src =
    "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));

  img.onload = async function () {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(async (blob) => {
        if (!blob) {
          console.error("Unexpected error in toBlob()");
          return;
        }
        const items = [new ClipboardItem({ "image/png": blob })];
        await navigator.clipboard.write(items);
      });
    }
  };
}

export function downloadSvgAsPng(
  svgElement: SVGSVGElement,
  filename: string
): void {
  const svgData = new XMLSerializer().serializeToString(svgElement);

  const canvas = document.createElement("canvas");
  const svgSize = svgElement.getBoundingClientRect();
  canvas.width = svgSize.width;
  canvas.height = svgSize.height;

  const img = new Image();
  img.src =
    "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));

  img.onload = function () {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      const imgsrc = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.download = filename;
      a.href = imgsrc;
      a.click();
    }
  };
}

export function downloadSvg(svgElement: SVGSVGElement, filename: string): void {
  // 序列化 SVG 元素
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svgElement);

  // 创建 Blob 对象
  const blob = new Blob([svgStr], { type: "image/svg+xml" });

  // 创建 URL
  const url = URL.createObjectURL(blob);

  // 创建下载链接
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  // 模拟点击以开始下载
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // 清理 URL
  URL.revokeObjectURL(url);
}

export async function copySvgToClipboard(
  svgElement: SVGSVGElement | null
): Promise<void> {
  if (!svgElement) return;

  const svgData = new XMLSerializer().serializeToString(svgElement);
  try {
    await navigator.clipboard.writeText(svgData);
    console.log("SVG copied to clipboard");
  } catch (err) {
    console.error("Error in copying SVG: ", err);
  }
}

export const generateURL = (params: IconInfo) => {
  const flattenObject = (obj: any): any => {
    return Object.keys(obj).reduce((acc: any, key: any) => {
      if (typeof obj[key] === "object")
        Object.assign(acc, flattenObject(obj[key]));
      else acc[key] = obj[key];
      return acc;
    }, {});
  };

  const flatParams = flattenObject(params);
  const query = Object.entries(flatParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`
    )
    .join("&");

  return `https://iconce.com/?${query}`;
};

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}
