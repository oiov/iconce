"use client"; // Error components must be Client Components

// import { Note_Storage_Key } from "@/lib/consts";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="z-10 mt-32 text-center">
      <h2>Oops, Something went wrong!</h2>

      <Link href="/">
        <button className="mt-4 rounded-md border px-4 py-2 text-sm hover:border-gray-800">
          Back to home
        </button>
      </Link>

      {/* <button
        className="mt-4 rounded-md border px-4 py-2 text-sm text-red-500 hover:border-gray-800"
        onClick={() => {
          localStorage.removeItem(Note_Storage_Key);
        }}
      >
        Clear local storage
      </button> */}
    </div>
  );
}
