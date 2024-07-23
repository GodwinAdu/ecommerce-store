"use server"

import { auth } from "@clerk/nextjs";
import { connectToDB } from "../mongoose"
import Store from "../models/store.models";

interface createStoreProps {
    name: string
}
export async function createStore({ name }: createStoreProps): Promise<void>{
    await connectToDB();

    try {
        const { userId } = auth()
        if (!userId) {
            console.log("Unauthorized")
            return undefined
        };

        const store = new Store({
            userId,
            name
        })

        await store.save();

    } catch (error: any) {
        console.log("Unable to create store", error);
        throw error
    }
};

interface fetchStoreProps {
    id: string;
    userId: string
}

export async function fetchStore({ id, userId }: fetchStoreProps): Promise<typeof Store | undefined> {
    await connectToDB();
    try {
        const store = await Store.findOne({
            _id: id,
            userId
        })

        if (!store) {
            console.log("No store exist")
            return undefined
        }
        return store
    } catch (error) {
        console.log("unable to fetch store", error)
    }
}

interface FindFirstStoreProps{
    userId:string;
}

export async function FindFirstStore({userId}:FindFirstStoreProps) {
    await connectToDB();
    try {
        const store = await Store.findOne({userId});


        if (!store ) {
            console.log("Store don't exist for the given user");
            return null;
          }
        return store;
    } catch (error) {
        console.log("Unable to fetch a store", error);
        throw error
    }

}

interface FindFirstStoreProps{
    userId:string;
}

export async function FindUserStores({userId}:FindFirstStoreProps):Promise<typeof Store[] | null> {
    await connectToDB();
    try {
        const stores = await Store.find({userId});
        if (!stores || stores.length === 0) {
            console.log("Stores don't exist for the given user");
            return [];
          }
        return stores;
    } catch (error) {
        console.log("Unable to fetch a store", error);
        throw error
    }

}

interface UpdateStoreProps {
    id: string | string[];
    name: string;
  }
  
  export async function updateStore({ id, name }: UpdateStoreProps){
    await connectToDB();
  
    try {
      // Use findByIdAndUpdate instead of findAndUpdate
      const updatedStore = await Store.findByIdAndUpdate(id, { name }, { new: true });
  
      if (updatedStore) {
        console.log('Store name updated successfully:', updatedStore);
      } else {
        console.log('Store not found');
      }
    } catch (error:any) {
      console.error('Unable to update store name:', error);
    }
  }


  interface DeleteStoreProps {
    id: string | string[];
  }
  
  export async function deleteStore({ id }: DeleteStoreProps): Promise<void> {
    await connectToDB();
  
    try {
      const deletedStore = await Store.findByIdAndDelete(id);
  
      if (deletedStore) {
        console.log('Store deleted successfully:', deletedStore);
      } else {
        console.log('Store not found');
      }
    } catch (error:any) {
      console.error('Unable to delete store:', error);
    }
  }