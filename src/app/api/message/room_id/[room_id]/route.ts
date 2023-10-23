import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

//メッセージの取得
export const GET = async (req: Request) => {
  const room_id = req.url.split("room_id/")[1];
  try {
    if (req.headers.get("x-api-key") !== process.env.API_KEY) throw new Error("Invalid API key");
    const { data, error } = await supabase.from("message").select("*").eq("room_id", room_id);
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error: any) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message, error }, { status: 401 });
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    if (req.headers.get("x-api-key") !== process.env.API_KEY) throw new Error("Invalid API key");
    const { message, room_id, sender_id } = await req.json();
    const { data, error } = await supabase
      .from("message")
      .insert({ message, room_id, sender_id })
      .select()
      .single();
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error: any) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message, error }, { status: 401 });
    return NextResponse.json({ message: "Error", error }, { status: 501 });
  }
};
