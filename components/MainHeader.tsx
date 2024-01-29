import Image from "next/image";
import Link from "next/link";

export default function MainHeader() {
  return (
    <Link href="/" className="flex space-x-2 items-center">
      <Image
        alt="header text"
        src="/ce.svg"
        className="w-8 h-8"
        width="16"
        height="16"
      />
      <h1 className="text-xl md:text-2xl font-[900] text-gradient-1 flex items-center">
        𝐈𝐂𝐎𝐍𝐂𝐄
      </h1>
    </Link>
  );
}
