"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { columns, CategoryColumn } from "./columns";
import Heading from "../heading/Heading";
import { DataTable } from "../data-table";
import { Separator } from "../ui/separator";
import { ApiList } from "../api-list";


interface CategoriesClientProps {
  data: CategoryColumn[];
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Categories (${data.length})`} description="Manage categories for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};
