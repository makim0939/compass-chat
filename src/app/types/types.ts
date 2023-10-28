import { Database } from "./database.types";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type ProfileInsertProps = Database["public"]["Tables"]["profile"]["Insert"];
export type ProfileUpdateProps = Database["public"]["Tables"]["profile"]["Update"];
export type RoomUserRelation = Database["public"]["Tables"]["room_user"]["Row"];
export type RoomUserRelationInsertProps = Database["public"]["Tables"]["room_user"]["Insert"];
export type Room = Database["public"]["Tables"]["room"]["Row"];
export type RoomInsertProps = Database["public"]["Tables"]["room"]["Insert"];
export type MessageData = Database["public"]["Tables"]["message"]["Row"];
export type MessageInsertProps = Database["public"]["Tables"]["message"]["Insert"];
export type GeolocationData = Database["public"]["Tables"]["geolocation"]["Row"];
export type GeolocationInsertProps = Database["public"]["Tables"]["geolocation"]["Insert"];
export type Connection = Database["public"]["Tables"]["connection"]["Row"];
export type ConnectionInsertProps = Database["public"]["Tables"]["connection"]["Insert"];
