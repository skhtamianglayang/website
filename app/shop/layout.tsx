"use client";

import { ReactNode } from "react";
import { CartProvider } from "../context/CartContext";

export default function ShopLayout({ children }: { children: ReactNode }) {
    return <CartProvider>{children}</CartProvider>;
}
