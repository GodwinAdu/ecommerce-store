"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";


import { columns, BillboardColumn } from "./columns";
import Heading from "../heading/Heading";
import { Separator } from "../ui/separator";
import { DataTable } from "../data-table";
import { ApiList } from "../api-list";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();
  console.log(data,"data")
  // console.log(colums,"colums")

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Billboards (${data?.length})`} description="Manage billboards for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      {data && (<DataTable searchKey="label" columns={columns} data={data} />)}
      <Heading title="API" description="API Calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};
