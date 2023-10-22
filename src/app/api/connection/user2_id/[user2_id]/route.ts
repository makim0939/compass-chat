import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

//ユーザIDからユーザプロフィールを取得
export const GET = async (req: Request) => {
  const user2_id = req.url.split("user2_id/")[1];
  try {
    const { data, error } = await supabase
      .from("connection")
      .select("*")
      .eq("user2_id", user2_id)
      .single();
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
