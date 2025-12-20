"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <DataProvider>{children}</DataProvider>
        </AuthProvider>
    );
}
