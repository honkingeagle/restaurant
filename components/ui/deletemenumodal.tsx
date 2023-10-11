"use client";

import { deleteMenuItem } from "@/app/database/menu";
import { menuStore } from "@/app/store/menu";
import { MenuItem } from "@/app/types";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { z } from "zod";
import { useToast } from "./use-toast";


const deletedId = z.array(z.object({ id: z.number() }));
export default function DeleteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) {
  const deletedItem = menuStore((state: any) => state.deletedItem);
  const menuItems = menuStore((state: any) => state.menuItems);
  const setMenuItems = menuStore((state: any) => state.setMenuItems)
  const { toast } = useToast()


  const handleClick = async () => {
    try {
      const deletedRow = await deleteMenuItem(deletedItem.id);
      const parsedId = deletedId.safeParse(deletedRow);
      if (parsedId.success) {
        const filteredItems = menuItems.filter(
          (menuItem: MenuItem) => menuItem.id !== parsedId.data[0].id
        );
        setMenuItems(filteredItems);
        toast({
          description: "Item Deleted 🎉",
        })

      }
    } catch (error) {
      toast({
        description: `Error ${error}🎉`,
      })
    }
    onClose();
  };
  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete {deletedItem.name}
            </ModalHeader>
            <ModalBody>
              <span>Are you sure you want to delete this item? 🥲</span>
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
