"use client";
import { menuStore } from "@/app/store/menu";
import { MenuItem } from "@/app/types";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Coffee } from "lucide-react";

export default function OrderCombobox({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: MenuItem | undefined;
  setSelectedItem: any;
}) {
  const menuItems = menuStore((state: any) => state.menuItems);
  const handleClick = (item: MenuItem) => {
    setSelectedItem(item);
  };
  const dropDownItems = menuItems.map((menuItem: MenuItem) => (
    <div
      className="rounded-lg p-2 mx-2 hover:bg-red-400  hover:text-white hover:shadow-lg cursor-pointer"
      key={menuItem.id}
      onClick={() => handleClick(menuItem)}
    >
      {menuItem.name}
    </div>
  ));
  return (
    <Popover placement="bottom" offset={20} showArrow={true}>
      <PopoverTrigger>
        <Button variant="bordered">
          {selectedItem !== undefined ? selectedItem.name : "Select menu item"}<Coffee size={25} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="my-2 flex flex-col gap-2 w-full h-[222px] max-h-[222px] overflow-y-auto mx-4">
          <div className="mx-2">
            <Input
              placeholder="e.g barbeque chicken"
              labelPlacement="outside"
              label="Search"
              size="md"
            />
          </div>
          {dropDownItems}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// {value
//   ? frameworks.find((framework) => framework.value === value)?.label
//   : "Select Menu Item..."}
