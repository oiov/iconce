"use client";

import DropDown, { LanguageType } from "@/components/DropDown";
import Subscribe from "@/components/subscribe/Subscribe";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { axios } from "@/lib/axios";
import { formatNumber } from "@/lib/data";
import { UserInfo } from "@/types/user";
import { useCompletion } from "ai/react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

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
  const [currentUses, setCurrentUses] = useState(0);
  const [remainingCredits, setRemainingCredits] = useState(0);
  const [boostPackRemainingCredits, setBoostPackRemainingCredits] = useState(0);
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState<LanguageType>("English");
  const answerRef = useRef<null | HTMLDivElement>(null);

  const scrollToAnswer = () => {
    if (answerRef.current !== null) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { complete, completion, isLoading, handleSubmit } = useCompletion({
    api: "/api/completion",
    body: {
      language,
      prompt: content,
    },
    headers: {
      token: user?.accessToken || "",
    },
    onResponse: (res) => {
      if (res.status === 429) {
        toast.error("You are being rate limited. Please try again later.");
        return;
      }
      setCurrentUses((pre) => pre + 1);
      scrollToAnswer();
    },
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    []
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    complete(content);
    handleSubmit(e);
  };

  const answer = completion;

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

  const handleClip = async () => {
    const res = await axios.post("/api/clipper", {
      url: "https://yesmore.cc/cn/%E6%B5%81%E9%87%8F%E5%8D%A1/",
    });
    console.log("[res]", res);
  };

  return (
    <>
      <div
        className="mx-auto mt-6 flex items-center justify-center space-x-5"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
        <Button onClick={handleClip}>截取</Button>
      </div>
      <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
        {siteConfig.description}
      </h1>

      <p className="text-slate-500 mt-5">
        {formatNumber({ value: Number(usage) + currentUses })} Excel formulas
        generated so far.
      </p>
      <form className="max-w-xl w-full" onSubmit={onSubmit}>
        <div className="flex mt-10 items-center space-x-3">
          <Image src="/1-black.png" width={30} height={30} alt="1 icon" />
          <p className="text-left font-medium">
            Describe what Excel formulas you would like.
          </p>
        </div>
        <textarea
          value={content}
          onChange={handleInputChange}
          rows={4}
          className="w-full rounded-md bg-white border border-gray-300 shadow-sm focus:border-black focus:ring-black my-5 px-2 py-1"
          placeholder={"e.g. Identify gender based on ID card."}
        />
        <div className="flex mb-5 items-center space-x-3">
          <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
          <p className="text-left font-medium">Select your language.</p>
        </div>
        <div className="block">
          <DropDown
            language={language}
            setLanguage={(newLanguage) => setLanguage(newLanguage)}
          />
        </div>

        {user ? (
          <>
            <div className="text-left mt-6 mb-2 text-gray-500 text-sm">
              <div>
                {remainingCredits <= 0 ? 0 : remainingCredits} credits remaining
                <>
                  {membershipExpire ? (
                    <>
                      (Membership Expires on:{" "}
                      {dayjs(membershipExpire).format("YYYY-MM-DD HH:mm")})
                    </>
                  ) : (
                    <></>
                  )}
                </>
              </div>
              {boostPackExpire ? (
                <div>
                  {boostPackRemainingCredits} boost pack credits (Expires on:{" "}
                  {dayjs(boostPackExpire * 1000).format("YYYY-MM-DD HH:mm")})
                </div>
              ) : (
                <></>
              )}
            </div>

            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-full"
              type="submit"
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
                    /**
                     * 普通用户的引导文字：引导购买会员
                     * 会员用户的引导文字：引导购买加油包
                     * Prompt for regular users: Guide to purchase membership
                     * Prompt for member users: Guide to purchase a boost package
                     */
                    user.role === 0
                      ? "Become a member to enjoy 500 credits every day."
                      : "Purchase a Boost Pack to get more credits right now."
                  }
                </Link>
              ) : (
                <span>Generate Excel formulas &rarr;</span>
              )}
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full">
              <span>Available after logging in &rarr;</span>
            </button>
          </Link>
        )}
      </form>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <hr className="h-px bg-gray-700 border-1" />
      <output className="space-y-10 my-10">
        {answer && (
          <>
            <div>
              <h2
                className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                ref={answerRef}>
                The formula you need
              </h2>
            </div>
            <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
              <div
                className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                onClick={() => {
                  navigator.clipboard.writeText(answer);
                  toast("Copied", {
                    icon: "✂️",
                  });
                }}>
                <div className="whitespace-pre-wrap text-left">{answer}</div>
              </div>
            </div>
          </>
        )}
      </output>

      {/* subscribe */}
      <Subscribe user={user} />
    </>
  );
}
