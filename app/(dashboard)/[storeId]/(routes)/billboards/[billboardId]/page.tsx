import { BillboardForm } from "@/components/billboard/BillboardForm";
import { getEditBillboard } from "@/lib/actions/billboard.actions";




const BillboardPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
    const billboard = await getEditBillboard({storeId:params.storeId})
    console.log(billboard,"Billboardpage")
  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}

export default BillboardPage;
