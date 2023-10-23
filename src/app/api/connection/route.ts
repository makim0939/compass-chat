import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { user1_id, user2_id } = await req.json();
    const { data, error } = await supabase
      .from("connection")
      .insert({ user1_id, user2_id })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
