"use client";

import SvgEditor from "@/components/editor";
import { UserInfo } from "@/types/user";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";

interface HomePageProps {
  usage: number;
  user: UserInfo | null;
  remaining: number;
  boostPackRemaining: number;
  membershipExpire: number;
  boostPackExpire: number;
}

export default function HomePage({
  usage,
  user,
  remaining,
  boostPackRemaining,
  membershipExpire,
  boostPackExpire,
}: HomePageProps) {
  const [isLoading] = useState(false);
  const [currentUses, setCurrentUses] = useState(0);
  const [remainingCredits, setRemainingCredits] = useState(0);
  const [boostPackRemainingCredits, setBoostPackRemainingCredits] = useState(0);
  const answerRef = useRef<null | HTMLDivElement>(null);

  const scrollToAnswer = () => {
    if (answerRef.current !== null) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {};

  useEffect(() => {
    if (currentUses <= remaining) {
      setRemainingCredits(remaining - currentUses);
      setBoostPackRemainingCredits(boostPackRemaining);
    } else {
      setBoostPackRemainingCredits(
        boostPackRemaining - (currentUses - remaining)
      );
    }
  }, [remaining, boostPackRemaining, currentUses]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <SvgEditor user={user} />

      {/* <form className="max-w-xl w-full mb-10">
        {user ? (
          <>
            <div className="text-left mt-6 mb-2 text-gray-500 text-sm">
              <div>
                剩余 {remainingCredits <= 0 ? 0 : remainingCredits} 额度
                <>
                  {membershipExpire ? (
                    <>
                      (会员订阅截止{" "}
                      {dayjs(membershipExpire).format("YYYY-MM-DD HH:mm")})
                    </>
                  ) : (
                    <></>
                  )}
                </>
              </div>
              {boostPackExpire ? (
                <div>
                  {boostPackRemainingCredits} 额度加油包 (将于{" "}
                  {dayjs(boostPackExpire * 1000).format("YYYY-MM-DD HH:mm")}{" "}
                  过期)
                </div>
              ) : (
                <></>
              )}
            </div>

            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-full"
              disabled={
                isLoading || remainingCredits + boostPackRemainingCredits <= 0
              }
              style={{
                cursor:
                  isLoading || remainingCredits + boostPackRemainingCredits <= 0
                    ? "not-allowed"
                    : "",
              }}>
              {isLoading ? (
                <span className="loading">
                  <span style={{ backgroundColor: "white" }} />
                  <span style={{ backgroundColor: "white" }} />
                  <span style={{ backgroundColor: "white" }} />
                </span>
              ) : remainingCredits + boostPackRemainingCredits <= 0 ? (
                <Link
                  href={
                    user.role === 0 ? "/#subscription-card" : "/#bootsPack-card"
                  }>
                  {
                    user.role === 0
                      ? "成为会员，每天可享受500个积分。"
                      : "立即购买一个加油包以获得更多积分。"
                  }
                </Link>
              ) : (
                <span>开始使用 &rarr;</span>
              )}
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full">
              <span>登录后可用 &rarr;</span>
            </button>
          </Link>
        )}
      </form> */}
    </>
  );
}
