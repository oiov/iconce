import Link from "next/link";

export default async function NotFound() {
  return (
    <>
      <div className="h-screen bg-[#1f2023] text-white flex w-screen flex-col items-center justify-center">
        Oops, Cat Not Found!
        <Link href="/">
          <button className="mt-4 rounded-md border px-4 py-2 text-sm hover:border-gray-800">
            Back to home
          </button>
        </Link>
      </div>
    </>
  );
}
