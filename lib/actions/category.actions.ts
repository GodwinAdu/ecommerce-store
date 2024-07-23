"use server"

import Category from "../models/category.models";
import { connectToDB } from "../mongoose"

interface GetCategoriesProps{
    storeId:string;
}
export async function getCategories({storeId}:GetCategoriesProps){

    await connectToDB();

    try {
        const  category = await Category.find({storeId});

        if (!category || category.length === 0) {
            console.log("Categories don't exist for the given user");
            return [];
          }
          return JSON.parse(JSON.stringify(category));

    } catch (error:any) {
        console.log("Unable to fetch a category", error);
        throw error
    }
}


export async function fetchCategoryById({id}:{id:string}){
    await connectToDB();
    console.log
    try {
        const  category = await Category.find({storeId:id});

        if (!category) {
            console.log("Categories don't exist for the given user");
            return;
          }
          return JSON.parse(JSON.stringify(category));
    } catch (error:any) {
        console.log("Unable to fetch a category", error);
        throw error
    }
}