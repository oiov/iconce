import LogoSVG from "@/components/icons/LogoSVG";
import Link from "next/link";

export default function MainHeader() {
  return (
    <Link href="/" className="flex space-x-2 items-center">
      <LogoSVG className="w-8 h-8" />
      <h1
        className="text-xl md:text-2xl font-[900] text-gradient-1 flex items-center"
        style={{ visibility: "hidden" }}>
        ICONCE
      </h1>
    </Link>
  );
}
