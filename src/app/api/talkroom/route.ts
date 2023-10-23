import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { data, error } = await supabase.from("room").insert({}).select().single();
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
