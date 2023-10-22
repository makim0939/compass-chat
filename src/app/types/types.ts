import { Database } from "./database.types";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type ProfileInsertProps = Database["public"]["Tables"]["profile"]["Insert"];
export type RoomUserRelation = Database["public"]["Tables"]["room_user"]["Row"];
export type MessageData = Database["public"]["Tables"]["message"]["Row"];
export type Room = Database["public"]["Tables"]["room"]["Row"];
export type GeolocationData = Database["public"]["Tables"]["geolocation"]["Row"];
export type Connection = Database["public"]["Tables"]["connection"]["Row"];
