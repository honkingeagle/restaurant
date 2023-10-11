"use client";
import {
  Button,
  Card,
  CardFooter,
  Image,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import MenuModal from "./menumodal";

export default function ShowMeat() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };

  return (
    <Card isFooterBlurred radius="lg" className="border-none">
      <Image
        alt="cooked meat with sauce"
        className="object-cover"
        height={200}
        src="/meat.png"
        width={200}
      />
      <CardFooter
        className="before:bg-white/10 
      border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl 
      rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
      >
        <Tooltip showArrow={true} content="quickly add to menu">
          <Button
            onPress={handleOpen}
            className="text-tiny text-white bg-black/20 mx-auto"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            menu 🤤
          </Button>
        </Tooltip>
      </CardFooter>

      <MenuModal isOpen={isOpen} onClose={onClose} />
    </Card>
  );
}
