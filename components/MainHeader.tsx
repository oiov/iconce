import Image from "next/image";
import Link from "next/link";

export default function MainHeader() {
  return (
    <Link href="/" className="flex space-x-1 items-center">
      <h1 className="text-2xl font-bold text-gradient-1">ICON</h1>
      <Image
        alt="header text"
        src="/ce.svg"
        className="w-8 h-8"
        width="16"
        height="16"
      />
    </Link>
  );
}
