import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

//emailからユーザ情報を取得
export const GET = async (req: Request) => {
  const email = req.url.split("email/")[1];
  try {
    const { data, error } = await supabase.from("profile").select("*").eq("email", email).single();
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
