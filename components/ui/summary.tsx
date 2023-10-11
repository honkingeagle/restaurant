"use client";
import {
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Bot } from "lucide-react";
import ShowMeat from "./showmeat";
import DatePicker from "./datepicker";
import { orderStore } from "@/app/store/orderstore";
import OrderModal from "./ordermodal";
import SummaryCards from "./summarycards";

export default function Summary() {
  const orders = orderStore((state: any) => state.orders);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <SummaryCards orders={orders} />
      <div className="hidden lg:flex flex-col lg:col-start-2 lg:col-end-3 mt-8">
        <div
          className="border-none bg-background/60 dark:bg-default-100/50 
          max-w-[80%] w-[80%] my-2 ml-auto"
        >
          <div className="flex justify-between">
            <ShowMeat />
            <div className="flex flex-col">
              <DatePicker />
              <Button
                variant="flat"
                color="danger"
                onPress={() => handleOpen()}
                className="capitalize ml-auto my-5 py-14"
              >
                Order Now <Bot size={25} />
              </Button>
            </div>
          </div>
        </div>

        <OrderModal isOpen={isOpen} onClose={onClose} />
      </div>
    </section>
  );
}
