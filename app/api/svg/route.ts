import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams: sp } = new URL(req.url);

    const iconInfo = {
      filename: sp.get("filename") || "export-icon",
      type:
        sp.get("type") === "gif"
          ? "gif"
          : sp.get("type") === "svg"
          ? "svg"
          : sp.get("type") === "text"
          ? "text"
          : "svg",
      value: sp.get("value") || `at-sign`,
      totalSize: Number(sp.get("totalSize") || "256"),
      animate: Boolean(sp.get("animate") === "true"),
      fillStyle: {
        fillType:
          (sp.get("fillType") === "Linear"
            ? "Linear"
            : sp.get("fillType") === "Solid"
            ? "Solid"
            : "Linear") || "Linear",
        primaryColor: sp.get("primaryColor") || "#00B4DB",
        secondaryColor: sp.get("secondaryColor") || "#003357",
        angle: sp.get("angle") || "45",
      },
      background: {
        radialGlare: Boolean(sp.get("radialGlare") === "true"),
        noiseTexture: Boolean(sp.get("noiseTexture") === "true"),
        noiseOpacity: Number(sp.get("noiseOpacity") || "25"),
        radius: sp.get("radius") || "64",
        strokeSize: Number(sp.get("strokeSize") || "0"),
        strokeColor: sp.get("strokeColor") || "#FFFFFF",
        strokeOpacity: sp.get("strokeOpacity") || "100",
      },
      icon: {
        color: sp.get("color") || "#FFFFFF",
        size: Number(sp.get("size") || "128"),
      },
    };
    console.log(iconInfo);

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
      <clipPath id="clip">
        <use xlink:href="#r4"></use>
      </clipPath>
      <defs>
        <linearGradient
          id="r5"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(${iconInfo.fillStyle.angle})"
          style="transform-origin:center center"
        >
          <stop stop-color="${iconInfo.fillStyle.primaryColor}"></stop>
          <stop offset="1" stop-color="${
            iconInfo.fillStyle.secondaryColor
          }"></stop>
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
      </defs>
      ${
        iconInfo.type === "svg"
          ? `
              <svg>
                
              </svg>
            `
          : iconInfo.type === "text"
          ? `<text
              x="50%"
              y="50%"
              font-size="${iconInfo.icon.size}"
              font-weight="600"
              fill="${iconInfo.icon.color}"
              text-anchor="middle"
              dy="0.35em">
              ${iconInfo.value}
            </text>`
          : iconInfo.type === "gif"
          ? `<image
                href=${iconInfo.value}
                x="${(iconInfo.totalSize - iconInfo.icon.size) / 2}"
                y="${(iconInfo.totalSize - iconInfo.icon.size) / 2}"
                height="${iconInfo.icon.size}"
                width="${iconInfo.icon.size}"
              />`
          : ``
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
