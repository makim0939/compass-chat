import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    if (req.headers.get("x-api-key") !== process.env.API_KEY) throw new Error("Invalid API key");
    const { id, nickname, unique_name } = await req.json();
    const { data, error } = await supabase
      .from("profile")
      .insert({ id, nickname, unique_name })
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
