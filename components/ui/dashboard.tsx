"use client";

import Orders from "./orders";
import Summary from "./summary";

export default function Dashboard({selectedKeys}: {selectedKeys: any}) {
    return (
        <div className={`${selectedKeys.currentKey === "dashboard" ? "block": "hidden"}`}>
            <Summary />
            <Orders />
        </div>
    )
}