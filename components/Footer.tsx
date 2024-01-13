import Github from "@/components/icons/GitHub";
import Twitter from "@/components/icons/Twitter";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 sm:mb-0 mb-3">
      <div className="">
        <a
          className=" text-cyan-600"
          href="https://lemonsqueezy.com"
          target="_blank">
          Iconce
        </a>
      </div>
      <div className="flex gap-2 pb-4 sm:pb-0">
        <Link
          href="https://twitter.com/yesmoree"
          className="group"
          aria-label="yesmoree Twitter"
          target="_blank">
          <Twitter className="h-5 w-5" />
        </Link>
        <Link
          href="https://github.com/yesmore"
          className="group"
          aria-label="GitHub"
          target="_blank">
          <Github />
        </Link>
      </div>
    </footer>
  );
}
