import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

//ユーザIDからユーザプロフィールを取得
export const GET = async (req: Request) => {
  const id = req.url.split("id/")[1];
  try {
    const { data, error } = await supabase.from("profile").select("*").eq("id", id).single();
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
