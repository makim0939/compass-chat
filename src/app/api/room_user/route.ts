import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { user_id, room_id, talkroom_name } = await req.json();
    const { data, error } = await supabase
      .from("room_user")
      .insert({ room_id, user_id, talkroom_name })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
