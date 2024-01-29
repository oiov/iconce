export default function LogoSVG({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      className={className}
      id="iconce-svg"
      width="256"
      height="256"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect
        id="r4icon"
        width="256"
        height="256"
        x="0"
        y="0"
        rx="64"
        fill="url(#r5icon)"
        stroke="#FFFFFF"
        strokeWidth="0"
        strokeOpacity="100%"
        paintOrder="stroke"
      />
      <clipPath id="clip-icon">
        <use xlinkHref="#r4icon" />
      </clipPath>
      <defs>
        <linearGradient
          id="r5icon"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(45)"
          style={{ transformOrigin: "center center" }}>
          <stop stopColor="#8E2DE2" />
          <stop offset="1" stopColor="#4A00E0" />
        </linearGradient>
        <radialGradient
          id="r6icon"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(256) rotate(90) scale(512)">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
