export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      geolocation: {
        Row: {
          created_at: string;
          location: { coordinates: [number, number] } | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          location?: { coordinates: [number, number] } | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          location?: { coordinates: [number, number] } | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "geolocation_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      message: {
        Row: {
          created_at: string;
          id: number;
          message: string | null;
          room_id: number;
          sender_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          message?: string | null;
          room_id: number;
          sender_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          message?: string | null;
          room_id?: number;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "message_room_id_fkey";
            columns: ["room_id"];
            referencedRelation: "room";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "message_sender_id_fkey";
            columns: ["sender_id"];
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      profile: {
        Row: {
          created_at: string;
          id: string;
          nickname: string | null;
          unique_name: string | null;
        };
        Insert: {
          created_at?: string;
          id: string;
          nickname?: string | null;
          unique_name?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          nickname?: string | null;
          unique_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      room: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      room_user: {
        Row: {
          created_at: string;
          id: number;
          room_id: number;
          user_id: string;
          usernames: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          room_id: number;
          user_id: string;
          usernames: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          room_id?: number;
          user_id?: string;
          usernames?: string;
        };
        Relationships: [
          {
            foreignKeyName: "room_user_room_id_fkey";
            columns: ["room_id"];
            referencedRelation: "room";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "room_user_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
      spatial_ref_sys: {
        Row: {
          auth_name: string | null;
          auth_srid: number | null;
          proj4text: string | null;
          srid: number;
          srtext: string | null;
        };
        Insert: {
          auth_name?: string | null;
          auth_srid?: number | null;
          proj4text?: string | null;
          srid: number;
          srtext?: string | null;
        };
        Update: {
          auth_name?: string | null;
          auth_srid?: number | null;
          proj4text?: string | null;
          srid?: number;
          srtext?: string | null;
        };
        Relationships: [];
      };
    };
  };
}
export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type ProfileInsertProps = Database["public"]["Tables"]["profile"]["Insert"];
export type RoomUser = Database["public"]["Tables"]["room_user"]["Row"];
export type MessageData = Database["public"]["Tables"]["message"]["Row"];
export type Room = Database["public"]["Tables"]["room"]["Row"];
export type GeolocationData = Database["public"]["Tables"]["geolocation"]["Row"];
