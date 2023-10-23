import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

//ニックネームからユーザ情報を取得
export const GET = async (req: Request) => {
  const url = decodeURIComponent(req.url);
  const nickname = url.split("nickname/")[1];
  try {
    if (req.headers.get("x-api-key") !== process.env.API_KEY) throw new Error("Invalid API key");
    const { data, error } = await supabase.from("profile").select("*").eq("nickname", nickname);
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error: any) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message, error }, { status: 401 });
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
