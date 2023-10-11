"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Calculator } from "lucide-react";
import { FormEvent, useState } from "react";
import { MenuItem, OrderItem, orderSchema } from "@/app/types";
import { createOrder } from "@/app/database/orders";
import OrderCombobox from "./ordercombobox";
import { orderStore } from "@/app/store/orderstore";
import { useToast } from "./use-toast";
import { format } from "date-fns";
import { dateStore } from "@/app/store/date";

export default function OrderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) {
  
  const setNewOrder = orderStore((state: any) => state.setNewOrder);
  const date = dateStore((state: any) => state.date)
  const { toast } = useToast();

  const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>();
  const [quantity, setQuantity] = useState<string>("1");
  const handleClick = async () => {
    if (selectedItem !== undefined) {
      try {
        const item: OrderItem | undefined = await createOrder({
          name: selectedItem.name,
          price: selectedItem.price * parseInt(quantity),
          quantity: parseInt(quantity),
          date: format(date, "PPP"),
        });
        const parsedItem = orderSchema.safeParse(item);
        if (parsedItem.success) {
          console.log(`Item ${JSON.stringify(parsedItem.data[0])}`);
          setNewOrder(parsedItem.data[0]);
          toast({
            description: "Order added successfully 🎉",
          });
          setSelectedItem(undefined);
          setQuantity("1");
        } else {
          setSelectedItem(undefined);
          setQuantity("1");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          description: `Error ${error}`,
        })
      }
    } else {
    }
    onClose();
  };

  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Order</ModalHeader>
            <ModalBody>
              <OrderCombobox
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
              <Input
                value={quantity}
                onChange={(event: FormEvent<HTMLInputElement>) =>
                  setQuantity(event.currentTarget.value)
                }
                type="text"
                label="Quantity"
                placeholder="1"
                defaultValue={"1"}
                labelPlacement="outside"
                className="py-4"
                startContent={
                  <div className="pointer-events-none flex items-center py-2">
                    <span className="text-default-400 text-small">
                      <Calculator size={25} />
                    </span>
                  </div>
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleClick}>
                Ok
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
