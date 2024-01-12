export interface IconInfo {
  type: "emoji" | "svg"; // 图标值类型
  value: string; // 图标值
  totalSize: number; // 图标总大小
  centerIconSize: number; // 图标内大小
  fillStyle: FillStyle;
  background: Background;
}

export interface FillStyle {
  fillType: FillType;
  primaryColor: string;
  secondaryColor: string;
  angle: string;
}

export type FillType = "Solid" | "Linear";

export interface Background {
  radialGlare: boolean;
  noiseTexture: boolean;
  noiseOpacity: number;
  radius: string;
  strokeSize: string;
  strokeColor: string;
  strokeOpacity: string;
}

export const BackgroundFillPresets = [
  { primaryColor: "#8E2DE2", secondaryColor: "#4A00E0" },
  { primaryColor: "#99F2C8", secondaryColor: "#1F4037" },
  { primaryColor: "#F953C6", secondaryColor: "#B91D73" },
  { primaryColor: "#91EAE4", secondaryColor: "#7F7FD5" },
  { primaryColor: "#F5AF19", secondaryColor: "#F12711" },
  { primaryColor: "#EAAFC8", secondaryColor: "#EC2F4B" },
  { primaryColor: "#FF7DB4", secondaryColor: "#654EA3" },
  { primaryColor: "#00B4DB", secondaryColor: "#003357" },
  { primaryColor: "#A8C0FF", secondaryColor: "#3F2B96" },
  { primaryColor: "#DD1818", secondaryColor: "#380202" },
  { primaryColor: "#DECBA4", secondaryColor: "#3E5151" },
  { primaryColor: "#FC466B", secondaryColor: "#3F5EFB" },
  { primaryColor: "#CCCFE2", secondaryColor: "#25242B" },
  { primaryColor: "#68AEFF", secondaryColor: "#003EB7" },
  { primaryColor: "#C9D6FF", secondaryColor: "#596AA1" },
  { primaryColor: "#5C5C5C", secondaryColor: "#0F1015" },
];
