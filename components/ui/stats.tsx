"use client";

export default function Stats({selectedKeys}: {selectedKeys: any}) {
    return (
        <section className={`${selectedKeys.currentKey === "stats" ? "block": "hidden"}`}>
            All time Stats
        </section>
    )
}