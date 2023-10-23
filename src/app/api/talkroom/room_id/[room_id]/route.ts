import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const room_id = req.url.split("room_id/")[1];
  try {
    const { data } = await supabase.from("room").select("*").eq("id", room_id).single();
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
