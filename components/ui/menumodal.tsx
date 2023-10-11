"use client";
import { createMenuItem } from "@/app/database/menu";
import { menuStore } from "@/app/store/menu";
import { MenuItem, itemSchema } from "@/app/types";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { useToast } from "./use-toast";
import { format } from "date-fns";
export default function MenuModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) {
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const setNewMenuItem = menuStore((state: any) => state.setNewMenuItem)
    const { toast } = useToast()


    const addItem = async () => {
        try {
            const item: MenuItem | undefined = await createMenuItem({
                name: name,
                price: parseInt(price),
                date: format(new Date(), "PPP")
            });
            const parsedItem = itemSchema.safeParse(item);
            if (parsedItem.success) {
              setNewMenuItem(parsedItem.data[0])
              toast({
                description: "Item added successfully 🎉",
              })
              setName("");
              setPrice("");
            }else {
              setName("");
              setPrice("");
            }
            onClose();
        }catch(error){
            console.log(`Error ${error}`);
        }
    }

  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Menu</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                label="Name"
                placeholder="barbeque chicken"
                labelPlacement="outside"
                value={name}
                onChange={(event: FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)}
              />
              <Input
                value={price}
                onChange={(event: FormEvent<HTMLInputElement>) => setPrice(event.currentTarget.value)}
                type="text"
                label="Price"
                placeholder="120"
                labelPlacement="outside"
                startContent={
                  <div className="pointer-events-none flex items-center py-2">
                    <span className="text-default-400 text-small">Ksh</span>
                  </div>
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={addItem}>
                Ok
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
