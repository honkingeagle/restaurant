"use client";

import { menuStore } from "@/app/store/menu";
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
import { editMenuItem } from "@/app/database/menu";
import { z } from "zod";
import { MenuItem } from "@/app/types";

const menuItem = z.array(z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  date: z.string()
}))
export default function EditModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) {
  const editedItem = menuStore((state: any) => state.editedItem);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const menuItems = menuStore((state: any) => state.menuItems);
  const setMenuItems = menuStore((state: any) => state.setMenuItems)
  const setNewMenuItem = menuStore((state: any) => state.setNewMenuItem)

  const { toast } = useToast();

  const editItem = async () => {
    try {
      const editedRow = await editMenuItem({
        id: editedItem.id,
        name: name,
        price: parseInt(price),
        date: editedItem.date,
      });

      const parsedRow = menuItem.safeParse(editedRow);
      if (parsedRow.success) {
        const filteredItems = menuItems.filter(
          (menuItem: MenuItem) => menuItem.id !== parsedRow.data[0].id
        );
        setName("");
        setPrice("");
        setMenuItems(filteredItems);
        setNewMenuItem(parsedRow.data[0])
      } else {
        setName("");
        setPrice("");
      }
    } catch (error) {
      toast({
        description: `Error ${error}🎉`,
      });
    }
    onClose();
  };

  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit {editedItem.name} Ksh {editedItem.price}
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                label="Name"
                placeholder="barbeque chicken"
                labelPlacement="outside"
                value={name}
                onChange={(event: FormEvent<HTMLInputElement>) =>
                  setName(event.currentTarget.value)
                }
              />
              <Input
                value={price}
                onChange={(event: FormEvent<HTMLInputElement>) =>
                  setPrice(event.currentTarget.value)
                }
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
              <Button color="primary" onPress={editItem}>
                Ok
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
