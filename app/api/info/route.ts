import { getGenerateInfo, updateGenerateInfo } from "@/lib/generate/generate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await getGenerateInfo();

    if (res) {
      return NextResponse.json(
        {
          message: "success",
          data: { generate: res.generate, share: res.share },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "error" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> }
) {
  try {
    const { type } = await req.json();
    await updateGenerateInfo(type);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
