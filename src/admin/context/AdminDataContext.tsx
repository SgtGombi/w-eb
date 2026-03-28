"use client";

import React, { createContext, useContext } from "react";

export type AdminBaseData = {
  id: number;
  shelter_id: number | null;
  shelter_name: string | null;
  name: string;
  email: string;
  role: string;
  phone: string;
} | null;

const AdminDataContext = createContext<AdminBaseData | undefined>(undefined);

export function AdminDataProvider({
  value,
  children,
}: {
  value: AdminBaseData;
  children: React.ReactNode;
}) {
  return (
    <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (context === undefined) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}
