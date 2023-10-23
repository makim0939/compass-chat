import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
  const user_id = req.url.split("user_id/")[1];
  try {
    if (req.headers.get("x-api-key") !== process.env.API_KEY) throw new Error("Invalid API key");
    const { data, error } = await supabase
      .from("geolocation")
      .select("*")
      .eq("user_id", user_id)
      .single();
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error: any) {
    if (error.code && error.code === "PGRST116") {
      return NextResponse.json({ message: "No geolocation data", data: null }, { status: 200 });
    } else if (error instanceof Error) {
      return NextResponse.json({ message: error.message, error }, { status: 401 });
    }
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    if (req.headers.get("x-api-key") !== process.env.API_KEY) throw new Error("Invalid API key");
    const { user_id, latitude, longitude } = await req.json();
    const { data, error } = await supabase
      .from("geolocation")
      .upsert({ user_id, location: `POINT(${latitude} ${longitude})` })
      .select();
    if (error) throw error;
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, error }, { status: 401 });
    }
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    if (req.headers.get("x-api-key") !== process.env.API_KEY) throw new Error("Invalid API key");
    const { user_id, latitude, longitude } = await req.json();
    const { data, error } = await supabase
      .from("geolocation")
      .update({ latitude, longitude })
      .eq("user_id", user_id)
      .select();
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, error }, { status: 401 });
    }
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    if (req.headers.get("x-api-key") !== process.env.API_KEY) throw new Error("Invalid API key");
    const user_id = req.url.split("user_id/")[1];
    const { error } = await supabase.from("geolocation").delete().eq("user_id", user_id);
    if (error) throw error;
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, error }, { status: 401 });
    }
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
