'use client';
import { useState, useEffect } from "react";

export default function page() {
    const [a, b] = useState(0);

    const handleUpdate = (c) => {
        b((prev) => {
            console.log('aaa');
            let temp = prev;
            return (temp + 1)
        });
    }

    return (
        <div>
            <button onClick={() => handleUpdate(1)}>
                {a}
            </button>
        </div>
    )
}
