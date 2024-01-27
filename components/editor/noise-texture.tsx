export default function NoiseTexture({
  opacity,
  size,
  data,
}: {
  opacity: number;
  size: number;
  data: string;
}) {
  return (
    <image
      href={data}
      width={size}
      height={size}
      x="0"
      y="0"
      mask="url(#clipmask)"
      clipPath="url(#clip)"
      opacity={`${opacity ?? 50}%`}></image>
  );
}
