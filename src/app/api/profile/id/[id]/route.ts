import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

//ユーザIDからユーザプロフィールを取得
export const GET = async (req: Request) => {
  const id = req.url.split("id/")[1];
  try {
    if (req.headers.get("x-api-key") !== process.env.API_KEY) throw new Error("Invalid API key");
    const { data, error } = await supabase.from("profile").select("*").eq("id", id).single();
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error: any) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message, error }, { status: 401 });
    return NextResponse.json({ message: "Error", data: null }, { status: 500 });
  }
};
