import { create } from "zustand";
import type { IStoreRecord } from "./interfaces";

export interface IStoreRecords {
  records: IStoreRecord[];
  addRecord: (record: IStoreRecord) => void;
}

export const recordsStore = create<IStoreRecords>()((set) => ({
  records: [],
  addRecord: (record: IStoreRecord) => set((state) => ({ records: [...state.records, record] }))
}));
