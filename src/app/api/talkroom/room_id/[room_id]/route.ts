import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const room_id = req.url.split("room_id/")[1];
  try {
    console.log(req.headers.get("x-api-key"));
    if (req.headers.get("x-api-key") !== process.env.API_KEY) throw new Error("Invalid API key");
    const { data } = await supabase.from("room").select("*").eq("id", room_id).single();
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error: any) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message, error }, { status: 401 });
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
