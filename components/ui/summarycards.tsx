import { OrderItem, OrderItems } from "@/app/types";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { Beef, PiggyBank } from "lucide-react";

export default function SummaryCards({ orders }: { orders: OrderItems }) {
  const total_quantity = orders.reduce(
    (accumulator: number, order: OrderItem) => accumulator + order.quantity,
    0
  );
  const total_cash = orders.reduce(
    (accumulator: number, order: OrderItem) => accumulator + order.price,
    0
  );
  return (
    <div className="lg:col-start-1 lg:col-end-2 flex flex-col">
      <Tabs className="" aria-label="Options">
        <Tab key="money" title="Cash">
          <Card>
            <CardBody className="flex items-center bg-red-400">
              <div className="flex items-center my-10 mx-20">
                <PiggyBank size={40} />
                <div className="ml-5 flex flex-col items-start">
                  <span className="my-2">Cash</span>
                  <span>Ksh {total_cash > 0 ? total_cash : 0}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="orders" title="Orders">
          <Card>
            <CardBody className="flex items-center bg-red-400">
              <div className="flex items-center my-10 mx-20">
                <Beef size={40} />
                <div className="ml-5 flex flex-col items-start">
                  <span className="my-2">Orders</span>
                  <span>{total_quantity > 0 ? total_quantity : 0}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
