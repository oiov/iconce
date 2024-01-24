export default function BetaIconFree({ className }: { className?: string }) {
  return (
    <svg
      id="iconce.com"
      width="90"
      height="20"
      viewBox="0 0 90 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect
        id="r4"
        width="90"
        height="20"
        x="0"
        y="0"
        rx="4"
        fill="url(#r5)"
        stroke="#000000"
        strokeWidth="0"
        strokeOpacity="100%"
        paintOrder="stroke"
      />
      <clipPath id="clip">
        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#r4" />
      </clipPath>
      <defs>
        <linearGradient
          id="r5"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(45)"
          style={{ transformOrigin: "center center" }}>
          <stop stopColor="#91EAE4">
            <animate
              attributeName="stop-color"
              values="#91EAE4;#7F7FD5;#91EAE4"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="1" stopColor="#7F7FD5">
            <animate
              attributeName="stop-color"
              values="#7F7FD5;#91EAE4;#7F7FD5"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
        <radialGradient
          id="r6"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(256) rotate(90) scale(512)">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <text
        x="50%"
        y="50%"
        fontSize="12"
        fontWeight="600"
        fill="#ffffff"
        fontFamily="sans-serif"
        textAnchor="middle"
        dy="0.35em">
        Beta for Free
      </text>
    </svg>
  );
}
