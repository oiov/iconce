import Icons from '@/assets/icons/lucide-name.json';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,) {
  try {
    return NextResponse.json({ message: "success", data: Icons }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}