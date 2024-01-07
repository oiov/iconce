import { extract_from_url } from "@/lib/clipper/clipper";
import { NextResponse } from "next/server";
import rawBody from "raw-body";
import { Readable } from "stream";

export async function POST(request: Request) {
  const body = await rawBody(Readable.from(Buffer.from(await request.text())));
  const payload = JSON.parse(body.toString());

  // console.log("[payload]", payload);

  if (!payload.url) {
    return NextResponse.json({ message: "No url provided" }, { status: 403 });
  }

  try {
    const clip_res = await extract_from_url(payload.url);
    console.log("[clip_res]", clip_res);
    if (clip_res) {
      return NextResponse.json(
        { message: "success", data: clip_res },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Parse error" }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ message: `[Error] ${error}` }, { status: 500 });
  }
}
