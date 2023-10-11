import { z } from "zod";

const Order = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  date: z.string(),
});
const orderSchema = z.array(Order);
type OrderItem = z.infer<typeof Order>;
type OrderItems = z.infer<typeof orderSchema>;

const Item = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  date: z.string(),
});

const menuItem = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  date: z.string(),
}).optional();

const Menu = z.object({
  name: z.string(),
  price: z.number(),
  date: z.string(),
});

const NewishOrder = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  date: z.string()
});

const itemSchema = z.array(Item);
type MenuItem = z.infer<typeof Item>;
type Item = z.infer<typeof Menu>;
type NewOrder = z.infer<typeof NewishOrder>

type MenuItems = z.infer<typeof itemSchema>;

export {
  orderSchema,
  itemSchema,
  menuItem,
  type NewOrder,
  type OrderItem,
  type OrderItems,
  type MenuItem,
  type MenuItems,
  type Item,
};
