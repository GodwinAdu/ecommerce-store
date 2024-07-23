import Navbar from "@/components/navbar/Navbar";
import { fetchStore } from "@/lib/actions/store.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await fetchStore({
    id: params.storeId,
    userId,
  });

  if (!store) {
    redirect("/");
  }
  return (
    <>
    <Navbar />
      {children}
    </>
  );
}
