import Database from "tauri-plugin-sql-api";
import { Item, MenuItem } from "../types";

const database_url = "sqlite:/home/tiras/Desktop/restaurant/src-tauri/waves.db";

const getMenuItems = async () => {
  try {
    const db = await Database.load(database_url);
    const result = await db.select("SELECT * FROM menu", []);
    const data = JSON.parse(JSON.stringify(result))
    return data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const createMenuItem = async (menuItem: Item) => {
  try {
    const db = await Database.load(database_url);
    const result: MenuItem = await db.select(
      "INSERT INTO menu (name, price, date) VALUES ($1, $2, $3) RETURNING *",
      [menuItem.name, menuItem.price, menuItem.date]
    );
    return result;
  } catch (error) {
    console.log(`${error}`);
  }
};

const deleteMenuItem = async (menuId: number) => {
  try {
    const db = await Database.load(database_url);
    const result = await db.select(
      "DELETE FROM menu WHERE id = $1 RETURNING id",
      [menuId]
    );
    return result;
  } catch (error) {
    console.log(`${error}`);
  }
};

const editMenuItem = async (menuItem: MenuItem) => {
  try {
    const db = await Database.load(database_url);
    const result = await db.select(
      "UPDATE menu SET name = $1, price = $2 WHERE id = $3 RETURNING *",
      [menuItem.name, menuItem.price, menuItem.id]
    );
    return result;
  } catch (error) {
    console.log(`${error}`);
  }
};
export { getMenuItems, createMenuItem, deleteMenuItem, editMenuItem };
