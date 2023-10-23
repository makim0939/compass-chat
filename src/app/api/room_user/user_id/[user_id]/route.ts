import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

//ユーザと紐づけられたトークルームの取得
export const GET = async (req: Request) => {
  const user_id = req.url.split("user_id/")[1];
  try {
    if (req.headers.get("x-api-key") !== process.env.API_KEY) throw new Error("Invalid API key");
    const { data, error } = await supabase.from("room_user").select("*").eq("user_id", user_id);
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error: any) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message, error }, { status: 401 });
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
