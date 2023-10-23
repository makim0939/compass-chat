import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

//ユーザと紐づけられたトークルームの取得
export const GET = async (req: Request) => {
  const room_id = req.url.split("room_id/")[1];
  try {
    const { data, error } = await supabase.from("room_user").select("*").eq("room_id", room_id);
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
