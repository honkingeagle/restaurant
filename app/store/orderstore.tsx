import { create } from "zustand";
import { OrderItem, OrderItems } from "../types";

const orderStore = create((set) => ({
    orders: [],
    setAllOrders: (munchies: OrderItems) => set(() => ({orders: munchies})),
    setNewOrder: (menuItem: OrderItem) => set((state: any) => ({ orders: [...state.orders, menuItem] }))
}))


export {orderStore}
