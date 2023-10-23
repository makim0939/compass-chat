import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

//ユーザIDからユーザプロフィールを取得
export const GET = async (req: Request) => {
  const user_id = req.url.split("user_id/")[1];
  try {
    const { data, error } = await supabase
      .from("connection")
      .select("*")
      .or(`user1_id.eq.${user_id},user2_id.eq.${user_id}`);
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
