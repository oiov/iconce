import { updateGenerateInfo } from "@/lib/generate/generate";
import { toCamelCase } from "@/lib/utils";
import Icon from "lucide-static";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams: sp } = new URL(req.url);

    const iconInfo = {
      type:
        sp.get("type") === "gif"
          ? "gif"
          : sp.get("type") === "svg"
          ? "svg"
          : sp.get("type") === "text"
          ? "text"
          : "svg",
      value: sp.get("value") || `sparkles`,
      totalSize: Number(sp.get("totalSize") || "256"),
      animate: Boolean(sp.get("animate") === "true"),
      fillStyle: {
        fillType:
          (sp.get("fillType") === "Linear"
            ? "Linear"
            : sp.get("fillType") === "Solid"
            ? "Solid"
            : "Linear") || "Linear",
        primaryColor: sp.get("primaryColor") || "#FC466B",
        secondaryColor: sp.get("secondaryColor") || "#3F5EFB",
        angle: sp.get("angle") || "45",
        clip: Boolean(sp.get("clip") === "true"),
      },
      background: {
        radialGlare: Boolean(sp.get("radialGlare") === "true"),
        noiseTexture: Boolean(sp.get("noiseTexture") === "true"),
        noiseOpacity: Number(sp.get("noiseOpacity") || "50"),
        radius: sp.get("radius") || "64",
        strokeSize: Number(sp.get("strokeSize") || "0"),
        strokeColor: sp.get("strokeColor") || "#FFFFFF",
        strokeOpacity: sp.get("strokeOpacity") || "100",
      },
      icon: {
        color: sp.get("color") || "#FFFFFF",
        size: Number(sp.get("size") || "128"),
        family: sp.get("family") || "sans-serif",
      },
    };

    let svgString = "";
    let svgClipString = "";
    if (iconInfo.type === "svg") {
      const iconD = (Icon as { [key: string]: any })[
        toCamelCase(iconInfo.value)
      ];
      //toCamelCase(iconInfo.value)

      const regex = /<svg.*?>(.*?)<\/svg>/s;
      const match = iconD.match(regex);

      svgString = `
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="${iconInfo.icon.size}"
          height="${iconInfo.icon.size}"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="${iconInfo.icon.color}"
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"  
          alignment-baseline="middle" 
          x="${(iconInfo.totalSize - iconInfo.icon.size) / 2}"
          y="${(iconInfo.totalSize - iconInfo.icon.size) / 2}">
          ${match?.[1]}
        </svg>
        `;
      svgClipString = `
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="${iconInfo.icon.size}"
          height="${iconInfo.icon.size}"
          viewBox="0 0 24 24" 
          fill="black" 
          stroke="black"
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"  
          alignment-baseline="middle" 
          x="${(iconInfo.totalSize - iconInfo.icon.size) / 2}"
          y="${(iconInfo.totalSize - iconInfo.icon.size) / 2}">
          ${match?.[1]}
        </svg>
      `;
    }

    await updateGenerateInfo("2");

    return new Response(
      `<svg
        id="iconce.com"
        width="${iconInfo.totalSize}"
        height="${iconInfo.totalSize}"
        viewBox="0 0 ${iconInfo.totalSize} ${iconInfo.totalSize}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
      <defs>
        <linearGradient
          id="r5"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(${iconInfo.fillStyle.angle})"
          style="transform-origin:center center"
        >
          ${
            iconInfo.animate
              ? `<animateTransform
              attributeName="gradientTransform"
              type="rotate"
              values="0;360"
              dur="5s"
              repeatCount="indefinite"
            />`
              : ""
          }
          <stop stop-color="${iconInfo.fillStyle.primaryColor}">
            ${
              iconInfo.animate
                ? `<animate
                attributeName="stop-color"
                values="${iconInfo.fillStyle.primaryColor};${iconInfo.fillStyle.secondaryColor};${iconInfo.fillStyle.primaryColor}"
                dur="3s"
                repeatCount="indefinite"
              />`
                : ""
            }
          </stop>
          <stop offset="1" stop-color="${iconInfo.fillStyle.secondaryColor}">
            ${
              iconInfo.animate
                ? `<animate
                attributeName="stop-color"
                values="${iconInfo.fillStyle.secondaryColor};${iconInfo.fillStyle.primaryColor};${iconInfo.fillStyle.secondaryColor}"
                dur="3s"
                repeatCount="indefinite"
              />`
                : ""
            }
          </stop>
        </linearGradient>
        <radialGradient
          id="r6"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(256) rotate(90) scale(512)"
        >
          <stop stop-color="white"></stop>
          <stop offset="1" stop-color="white" stop-opacity="0"></stop>
        </radialGradient>
        ${
          iconInfo.type === "svg" && iconInfo.fillStyle.clip
            ? `<mask id="mask">
            <rect
              id="r4"
              width="${iconInfo.totalSize}"
              height="${iconInfo.totalSize}"
              fill="white"
            />
            ${svgClipString}
          </mask>`
            : ""
        }
        ${
          iconInfo.background.noiseTexture
            ? `<mask id="clipmask">
            <rect
              width="${iconInfo.totalSize}"
              height="${iconInfo.totalSize}"
              x="${iconInfo.background.strokeSize / 2}"
              y="${iconInfo.background.strokeSize / 2}"
              fill="white"
              rx="${iconInfo.background.radius}" // 设置圆角
            />
          </mask>`
            : ""
        }
      </defs>
      <rect
        id="r4"
        width="${iconInfo.totalSize - iconInfo.background.strokeSize}"
        height="${iconInfo.totalSize - iconInfo.background.strokeSize}"
        x="${iconInfo.background.strokeSize / 2}"
        y="${iconInfo.background.strokeSize / 2}"
        rx="${iconInfo.background.radius}"
        fill="${
          iconInfo.fillStyle.fillType === "Linear"
            ? "url(#r5)"
            : iconInfo.fillStyle.primaryColor
        }"
        stroke="${iconInfo.background.strokeColor}"
        stroke-width="${iconInfo.background.strokeSize}"
        stroke-opacity="${iconInfo.background.strokeOpacity}%"
        paint-order="stroke"
        mask="${
          iconInfo.type === "svg" && iconInfo.fillStyle.clip
            ? "url(#mask)"
            : undefined
        }"
      ></rect>
      ${
        iconInfo.background.radialGlare
          ? `<rect
        width="${iconInfo.totalSize - iconInfo.background.strokeSize}"
        height="${iconInfo.totalSize - iconInfo.background.strokeSize}"
        x="${iconInfo.background.strokeSize / 2}"
        y="${iconInfo.background.strokeSize / 2}"
        fill="url(#r6)"
        rx="${iconInfo.background.radius}"
        style="mix-blend-mode: overlay"
      ></rect>`
          : ""
      }
      ${iconInfo.type === "svg" ? svgString : ""}
      ${
        iconInfo.type === "text"
          ? `<text
            x="50%"
            y="50%"
            font-size="${iconInfo.icon.size}"
            font-family="${iconInfo.icon.family}"
            font-weight="600"
            fill="${iconInfo.icon.color}"
            text-anchor="middle"
            dy="0.35em">
            ${iconInfo.value}
          </text>`
          : ""
      }
      ${
        iconInfo.type === "gif"
          ? `<image
            href="${iconInfo.value}"
            x="${(iconInfo.totalSize - iconInfo.icon.size) / 2}"
            y="${(iconInfo.totalSize - iconInfo.icon.size) / 2}"
            height="${iconInfo.icon.size}"
            width="${iconInfo.icon.size}"
            crossOrigin="anonymous"
          />`
          : ""
      }
    </svg>`,
      {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
