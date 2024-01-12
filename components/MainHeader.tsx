import Link from "next/link";

export default function MainHeader() {
  return (
    <Link href="/" className="flex space-x-3">
      {/* <Image
        alt="header text"
        src="/logo.svg"
        className="sm:w-12 sm:h-12 w-8 h-8"
        width={32}
        height={32}
      /> */}
      {/* <h1 className=" tracking-tight font-extralight flex items-center">
        
      </h1> */}
      <h1 className="text-2xl font-bold text-gradient-1">ICONCE</h1>
    </Link>
  );
}
