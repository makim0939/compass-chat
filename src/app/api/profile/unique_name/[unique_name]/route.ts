import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

//ニックネームからユーザ情報を取得
export const GET = async (req: Request) => {
  const url = decodeURIComponent(req.url);
  const unique_name = url.split("unique_name/")[1];
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("unique_name", unique_name)
      .single();
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
