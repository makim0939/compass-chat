import { Profile } from "../types/database.types";
import {
  Connection,
  ConnectionInsertProps,
  GeolocationData,
  GeolocationInsertProps,
  MessageData,
  MessageInsertProps,
  ProfileInsertProps,
  ProfileUpdateProps,
  Room,
  RoomInsertProps,
  RoomUserRelation,
  RoomUserRelationInsertProps,
} from "../types/types";
import supabase from "./supabase";

//select profile
export const selectProfileById = async (id: string): Promise<Profile | null> => {
  try {
    const { data: profile, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", id)
      .single();
    return profile as Profile;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const selectProfilesByNickname = async (nickname: string): Promise<Profile[] | null> => {
  try {
    const { data: profile, error } = await supabase
      .from("profile")
      .select("*")
      .eq("nickname", nickname);
    return profile as Profile[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const selectProfileByUniqueName = async (unique_name: string): Promise<Profile | null> => {
  try {
    const { data: profile, error } = await supabase
      .from("profile")
      .select("*")
      .eq("unique_name", unique_name)
      .single();
    return profile as Profile;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//insert profile
export const insertProfile = async (insertData: ProfileInsertProps): Promise<Profile | null> => {
  try {
    const { data: profile, error } = await supabase
      .from("profile")
      .insert(insertData)
      .select()
      .single();
    return profile as Profile;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateProfile = async ({
  id,
  updateData,
}: {
  id: string;
  updateData: ProfileUpdateProps;
}): Promise<Profile | null> => {
  try {
    const { data: profile, error } = await supabase
      .from("profile")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();
    return profile as Profile;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//select roomUserRelation
export const selectRoomUserRelationsByUserId = async (
  user_id: string,
): Promise<RoomUserRelation[] | null> => {
  try {
    const { data: roomUserRelations, error } = await supabase
      .from("room_user")
      .select("*")
      .eq("user_id", user_id);
    return roomUserRelations as RoomUserRelation[];
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const selectRoomUserRelationsByRoomId = async (
  room_id: number,
): Promise<RoomUserRelation[] | null> => {
  try {
    const { data: roomUserRelations, error } = await supabase
      .from("room_user")
      .select("*")
      .eq("room_id", room_id);
    return roomUserRelations as RoomUserRelation[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const insertRoomUserRelation = async (
  insertData: RoomUserRelationInsertProps,
): Promise<RoomUserRelation | null> => {
  try {
    const { data: RoomUserRelation, error } = await supabase
      .from("room_user")
      .insert(insertData)
      .select()
      .single();
    return RoomUserRelation as RoomUserRelation;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//select room
export const selectTalkRoomById = async (id: number): Promise<Room | null> => {
  try {
    const { data: talkRoom, error } = await supabase.from("room").select("*").eq("id", id).single();
    return talkRoom as Room;
  } catch (error) {
    console.log(error);
    return null;
  }
};
//insert room
export const insertTalkRoom = async (insertData: RoomInsertProps): Promise<Room | null> => {
  try {
    const { data: room, error } = await supabase.from("room").insert(insertData).select().single();
    return room as Room;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//select message
export const selectMessagesByRoomId = async (room_id: number): Promise<MessageData[] | null> => {
  try {
    const { data: messages, error } = await supabase
      .from("message")
      .select("*")
      .eq("room_id", room_id);
    return messages as MessageData[];
  } catch (error) {
    console.log(error);
    return null;
  }
};
//insert message
export const insertMessage = async (
  insertData: MessageInsertProps,
): Promise<MessageData | null> => {
  try {
    const { data: message, error } = await supabase
      .from("message")
      .insert(insertData)
      .select()
      .single();
    return message as MessageData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//select geolocation
export const selectGeolocationByUserId = async (
  user_id: string,
): Promise<GeolocationData | null> => {
  try {
    const { data, error } = await supabase
      .from("geolocation")
      .select("*")
      .eq("user_id", user_id)
      .single();
    if (error) throw error;
    return data as GeolocationData;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
//upsert geolocation
export const upsertGeolocation = async ({
  user_id,
  lat,
  lng,
}: {
  user_id: string;
  lat?: number;
  lng?: number;
}): Promise<GeolocationData | null> => {
  try {
    const { data, error } = await supabase
      .from("geolocation")
      .upsert({ user_id, location: `POINT(${lat} ${lng})` })
      .select()
      .single();
    if (error) throw error;
    return data as GeolocationData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//delete geolocation
export const deleteGeolocation = async (user_id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from("geolocation").delete().eq("user_id", user_id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//select connection
export const selectConnectionsByUserId = async (user_id: string): Promise<Connection[] | null> => {
  try {
    const { data, error } = await supabase
      .from("connection")
      .select("*")
      .or(`user1_id.eq.${user_id},user2_id.eq.${user_id}`);
    if (error) throw error;
    return data as Connection[];
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

//insert connection
export const insertConnection = async (
  insertData: ConnectionInsertProps,
): Promise<Connection | null> => {
  try {
    const { data, error } = await supabase.from("connection").insert(insertData).select().single();
    if (error) throw error;
    return data as Connection;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
