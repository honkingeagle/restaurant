import Database from "tauri-plugin-sql-api";
import { NewOrder, OrderItem } from "../types";

const database_url = "sqlite:/home/tiras/Desktop/restaurant/src-tauri/waves.db";

const getOrders = async (date: string) => {
  try {
    const db = await Database.load(database_url);
    const result = await db.select("SELECT * FROM orders WHERE date = $1", [date]);
    const data = JSON.parse(JSON.stringify(result))
    return data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const createOrder = async (orderItem: NewOrder) => {
  try {
    const db = await Database.load(database_url);
    const result: OrderItem = await db.select(
      "INSERT INTO orders (name, price, quantity, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [orderItem.name, orderItem.price, orderItem.quantity, orderItem.date]
    );
    return result;
  } catch (error) {
    console.log(`${error}`);
  }
};
export { getOrders, createOrder };
