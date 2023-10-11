"use client";
import { orderStore } from "@/app/store/orderstore";
import { OrderItem, OrderItems } from "@/app/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Button,
  ButtonGroup,
  Tooltip,
} from "@nextui-org/react";
import { useMemo, useState } from "react";

const columns = [
  {
    key: "name",
    title: "ORDER NAME",
  },
  {
    key: "price",
    title: "(KSH) PRICE",
  },
  {
    key: "quantity",
    title: "QUANTITY",
  },
  {
    key: "date",
    title: "DATE",
  },
];


export default function Orders() {
  const orders = orderStore((state: any) => state.orders)

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(orders.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return orders.slice(start, end);
  }, [page, orders]);

  return (
    <section className="rounded-sm flex flex-col">
      <div className="flex items-center justify-between my-2">
        <span>Orders</span>

        <ButtonGroup color="danger">
          <Tooltip showArrow={true} content="Orders of the Day">
            <Button>All</Button>
          </Tooltip>
          <Tooltip showArrow={true} content="Most Bought Menu Items">
            <Button>Most</Button>
          </Tooltip>
          <Tooltip showArrow={true} content="Least Bought Menu Items">
            <Button>Least</Button>
          </Tooltip>
        </ButtonGroup>
      </div>

      <Table
        color={"default"}
        selectionMode="single"
        defaultSelectedKeys={["2"]}
        radius="sm"
        aria-label="orders"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="danger"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.title}</TableColumn>
          )}
        </TableHeader>
        {orders.length > 0 ? (
          <TableBody items={items}>
            {(item: OrderItem) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        )}
      </Table>
    </section>
  );
}
