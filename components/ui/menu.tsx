"use client";

import { menuStore } from "@/app/store/menu";
import { MenuItem } from "@/app/types";
import { Card, CardHeader, useDisclosure } from "@nextui-org/react";
import { Pen, Trash } from "lucide-react";
import DeleteModal from "./deletemenumodal";
import EditModal from "./editmenumodal";

export default function Menu({selectedKeys}: {selectedKeys: any}) {
  const menuItems = menuStore((state: any) => state.menuItems);
  const setEditItem = menuStore((state: any) => state.setEditItem)
  const setDeleteItem = menuStore((state: any) => state.setDeleteItem)

  const deleteModal = useDisclosure();
  const editModal = useDisclosure();

  const handleDelete = (item: MenuItem) => {
    setDeleteItem(item)
    deleteModal.onOpen();
  };

  const handleEdit = (item: MenuItem) => {
    setEditItem(item);
    editModal.onOpen();
  };

  return (
    <section className={`${selectedKeys.currentKey === "menu" ? "block": "hidden"}`}>
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
      />
      <EditModal
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
      />
      <p className="px-6 py-8">Menu</p>
      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-3 p-6 overflow-y-auto">
        {menuItems.map((item: MenuItem) => (
          <div key={item.id}>
            <Card className="max-w-[90%] py-10">
              <CardHeader className="justify-between">
                <div className="flex gap-5">
                  <div className="ml-2 flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {item.name}
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400">
                      Ksh {item.price}
                    </h5>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <div
                    className="bg-transparent text-foreground 
                    hover:text-red-500 p-4 cursor-pointer
                    hover:shadow-md rounded-full"
                    onClick={() => handleEdit(item)}
                  >
                    <Pen size={18} />
                  </div>
                  <div
                    onClick={() => handleDelete(item)}
                    className="bg-transparent text-foreground 
                    hover:text-red-500 p-4 cursor-pointer
                    hover:shadow-md rounded-full"
                  >
                    <Trash size={18} />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
