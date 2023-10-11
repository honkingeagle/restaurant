import { create } from "zustand";

const dateStore = create((set) => ({
    date: new Date(),
    setDate: (date: Date | undefined) => set(() => ({date: date})),
}))


export {dateStore}
