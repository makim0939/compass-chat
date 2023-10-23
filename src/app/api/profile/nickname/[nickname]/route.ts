import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

//ニックネームからユーザ情報を取得
export const GET = async (req: Request) => {
  const url = decodeURIComponent(req.url);
  const nickname = url.split("nickname/")[1];
  try {
    const { data, error } = await supabase.from("profile").select("*").eq("nickname", nickname);
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
