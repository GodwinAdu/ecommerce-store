import { BillboardClient } from '@/components/billboard/BillboardClient'
import { getBillboard } from '@/lib/actions/billboard.actions'
import React from 'react'

const page = async ({
  params
}: {
  params: { storeId: string }
}) => {
 const billboard = await getBillboard({storeId:params.storeId})
 console.log("billboardclient",billboard)
  return (
    <div className="flex-col">
    <div className="flex-1 space-y-4 p-8 pt-6">
      <BillboardClient data={billboard} />
    </div>
  </div>
  )
}

export default page
