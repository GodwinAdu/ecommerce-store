import { SettingsForm } from "@/components/settings/SettingsForm";
import { FindFirstStore } from "@/lib/actions/store.actions";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

interface SettingsProps{
    params:{
        storeId:string
    }
}

 interface Store {
  _id: string;
  userId: string;
  name:string;
  createdAt: Date;
  updatedAt: Date;
  // Other fields...
}

const SettingsPage:React.FC<SettingsProps> = async({params}) => {

    const {userId} =auth();
    console.log(userId)

    if(!userId){
        redirect('/sign-in')
    }

    const store:Store  = await FindFirstStore({userId});

    if(!store){
        redirect('/')
    }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}

export default SettingsPage
