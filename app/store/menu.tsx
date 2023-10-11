import { create } from "zustand";
import { MenuItem, MenuItems } from "../types";

const menuStore = create((set) => ({
  menuItems: [],
  setMenuItems: (munchies: MenuItems) => set(() => ({ menuItems: munchies })),
  setNewMenuItem: (menuItem: MenuItem) =>
    set((state: any) => ({ menuItems: [...state.menuItems, menuItem] })),
  editedItem: {},
  setEditItem: (menuItem: MenuItem) =>
    set(() => ({ editedItem: {...menuItem} })),
  deletedItem: {},
  setDeleteItem: (menuItem: MenuItem) => 
  set(() => ({ deletedItem: {...menuItem} })),
}));

export { menuStore };
