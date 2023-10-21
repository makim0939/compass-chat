import { atom } from "jotai";
import { Profile } from "./types/database.types";

export const loginUserAtom = atom<Profile | null>(null);
