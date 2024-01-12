export default function NoiseTexture({ opacity }: { opacity: number }) {
  return (
    <image
      width="512"
      height="512"
      x="0"
      y="0"
      clipPath="url(#clip)"
      opacity={`${opacity ?? 25}%`}></image>
  );
}