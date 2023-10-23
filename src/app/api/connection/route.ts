import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    if (req.headers.get("x-api-key") !== process.env.API_KEY) throw new Error("Invalid API key");
    const { user1_id, user2_id } = await req.json();
    const { data, error } = await supabase
      .from("connection")
      .insert({ user1_id, user2_id })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 201 });
  } catch (error: any) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message, error }, { status: 401 });
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
