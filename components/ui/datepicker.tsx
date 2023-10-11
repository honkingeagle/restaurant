"use client";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./calendar";
import { dateStore } from "@/app/store/date";
import { getOrders } from "@/app/database/orders";
import { orderSchema } from "@/app/types";
import { orderStore } from "@/app/store/orderstore";


export default function DatePicker() {
  const date = dateStore((state: any) => state.date)
  const setDate = dateStore((state: any) => state.setDate)
  const setAllOrders = orderStore((state: any) => state.setAllOrders);

  const handleClick = async (day: any) => {
    try {
      const items = await getOrders(format(day, "PPP"));
      const parsedItems = orderSchema.safeParse(items);
      if (parsedItems.success) {
        setAllOrders(parsedItems.data);
      }
    }catch(error) {
        console.log(`Error ${error}`)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day) => {
            setDate(day)
            handleClick(day)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
