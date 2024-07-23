import { FindFirstStore } from "@/lib/actions/store.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
    children
}:{
    children: React.ReactNode
}){

    const {userId} = auth();

    if(!userId){
        redirect('/sign-in')
    }
console.log(userId)
    const firstStore = await FindFirstStore({userId})

    if(firstStore){
        redirect(`/${firstStore?._id}`)
    }

    return(
        <>
        {children}
        </>
    )
}