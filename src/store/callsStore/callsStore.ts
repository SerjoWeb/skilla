import { create } from "zustand";
import type { ICalls } from "@/api/calls/interfaces";

// import { faker } from "./faker";

export interface IStoreCalls {
  calls: ICalls | null;
  setCalls: (calls: ICalls) => void;
}

export const callsStore = create<IStoreCalls>()((set) => ({
  calls: null,
  setCalls: (calls: ICalls) => set({ calls })
}));
