"use client";
import {
  Card,
  CardBody,
  Listbox,
  ListboxItem,
  ListboxSection,
} from "@nextui-org/react";
import { BarChart2, Beef, HeartCrack, Rocket } from "lucide-react";

export default function ListboxWrapper({
  selectedKeys,
  setSelectedKeys,
}: {
  selectedKeys: any;
  setSelectedKeys: any;
}) {
  return (
    <section className="mx-auto w-[90%] px-1 py-2">
      <Card>
        <CardBody>
          <Listbox
            color="danger"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            aria-label="Listbox menu with sections"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <ListboxSection title="Actions">
              <ListboxItem
                key="dashboard"
                description="head to main page"
                startContent={<Rocket size={27} />}
              >
                Dashboard
              </ListboxItem>
              <ListboxItem
                key="menu"
                description="add, edit & delete menu items"
                startContent={<Beef size={27} />}
              >
                Menu
              </ListboxItem>
              <ListboxItem
                key="stats"
                description="coming soon..."
                startContent={<BarChart2 size={27} />}
              >
                All Time Stats
              </ListboxItem>
            </ListboxSection>
            {/* <ListboxSection title="Danger zone">
              <ListboxItem
                key="delete"
                color="danger"
                description="Permanently delete all orders"
                startContent={<HeartCrack size={25} />}
              >
                Delete
              </ListboxItem>
            </ListboxSection> */}
          </Listbox>
        </CardBody>
      </Card>
    </section>
  );
}
