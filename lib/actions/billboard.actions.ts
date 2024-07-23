"use server"

import Billboard from "../models/billboard.models";
import { connectToDB } from "../mongoose"


interface CreateBillboardProps {
    storeId: string | string[];
    label: string;
    imageUrl: string;
}

export async function createBillboard({
    storeId,
    label,
    imageUrl
}: CreateBillboardProps) {
    await connectToDB();
    try {
        const billboard = new Billboard({
            storeId,
            label,
            imageUrl
        })
        // const existingBillboard = await Billboard.findOne({ storeId })
        // if (existingBillboard) {
        //     console.log("Billboard exist")
        //     return
        // }

        await billboard.save()

    } catch (error: any) {
        console.log("unable to save billboard", error)
        return null
    }
}



interface GetBillboardProps {
    storeId: string;
}
export async function getBillboard({ storeId }: GetBillboardProps) {
    await connectToDB();
    try {
        console.log("storeId",storeId)
        const billboard = await Billboard.find({
            storeId
        })

        if (!billboard) {
            console.log("billboard does not exist")
            return null
        }
        return JSON.parse(JSON.stringify(billboard))
    } catch (error: any) {
        console.log("couldnt fetch billboard", error)
    }
}
export async function getEditBillboard({ storeId }: GetBillboardProps) {
    await connectToDB();
    try {
        console.log("storeId",storeId)
        const billboard = await Billboard.findOne({
            storeId
        })

        if (!billboard) {
            console.log("billboard does not exist")
            return null
        }
        return billboard
    } catch (error: any) {
        console.log("couldnt fetch billboard", error)
    }
}

interface UpdateBillboardProps {
    storeId: string |string[];
    label: string;
}

export async function updateBillboard({ storeId, label }: UpdateBillboardProps) {
    await connectToDB();
    try {
        const updateBillboard = await Billboard.findOneAndUpdate({storeId}, { label }, { new: true });
        if (updateBillboard) {
            console.log("billboard updated sucessfully")
        } else {
            console.log("billboard not found")
        }
    } catch (error: any) {
        console.log("Unable to update billboard", error)
    }
}