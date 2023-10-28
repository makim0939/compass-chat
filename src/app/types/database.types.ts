export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      connection: {
        Row: {
          created_at: string;
          id: number;
          isAccepted: boolean;
          isRejected: boolean;
          user1_id: string;
          user2_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          isAccepted?: boolean;
          isRejected?: boolean;
          user1_id: string;
          user2_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          isAccepted?: boolean;
          isRejected?: boolean;
          user1_id?: string;
          user2_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "connection_user1_id_fkey";
            columns: ["user1_id"];
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "connection_user2_id_fkey";
            columns: ["user2_id"];
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
        ];
      };
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
          avatar_url: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          nickname?: string | null;
          unique_name?: string | null;
          avatar_url: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          nickname?: string | null;
          unique_name?: string | null;
          avatar_url?: string | null;
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
          talkroom_name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          room_id: number;
          user_id: string;
          talkroom_name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          room_id?: number;
          user_id?: string;
          talkroom_name?: string;
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
    };
  };
}
export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type ProfileInsertProps = Database["public"]["Tables"]["profile"]["Insert"];
export type RoomUser = Database["public"]["Tables"]["room_user"]["Row"];
export type MessageData = Database["public"]["Tables"]["message"]["Row"];
export type Room = Database["public"]["Tables"]["room"]["Row"];
export type GeolocationData = Database["public"]["Tables"]["geolocation"]["Row"];
