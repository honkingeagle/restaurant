"use client";
import { getOrders } from "./database/orders";
import { useEffect, useState } from "react";
import { orderSchema, itemSchema } from "./types";
import ListboxWrapper from "@/components/ui/listboxwrapper";
import { orderStore } from "./store/orderstore";
import { getMenuItems } from "./database/menu";
import { menuStore } from "./store/menu";
import { format } from "date-fns";
import Menu from "@/components/ui/menu";
import Stats from "@/components/ui/stats";
import Dashboard from "@/components/ui/dashboard";

export default function Home() {
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["dashboard"]));
  const setAllOrders = orderStore((state: any) => state.setAllOrders);
  const setMenuItems = menuStore((state: any) => state.setMenuItems);

  useEffect(() => {
    const fetchData = async () => {
      const items = await getOrders(format(new Date(), "PPP"));
      const menuItems = await getMenuItems();

      const parsedMenuItems = itemSchema.safeParse(menuItems);
      const parsedItems = orderSchema.safeParse(items);
      if (parsedItems.success && parsedMenuItems.success) {
        setAllOrders(parsedItems.data);
        setMenuItems(parsedMenuItems.data);
      }
    };
    fetchData();
  }, [setAllOrders, setMenuItems]);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-5 h-screen">
      <section className="lg:col-start-1 lg:col-end-2  hidden lg:flex flex-col justify-between py-5">
        <ListboxWrapper
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      </section>
      <section className="lg:col-start-2 lg:col-end-6 px-5 py-2">
        <Dashboard selectedKeys={selectedKeys} />
        <Menu selectedKeys={selectedKeys} />
        <Stats selectedKeys={selectedKeys} />
      </section>
    </main>
  );
}
