"use client";
import * as z from "zod"
import { Trash } from "lucide-react";
import Heading from "../heading/Heading";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { AlertModal } from "../modal/alert-modal";
import { deleteStore, updateStore } from "@/lib/actions/store.actions";
import { toast } from "../ui/use-toast";
import { ApiAlert } from "../alert/api-alert";

interface Store {
  _id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const formSchema = z.object({
    name: z.string().min(2),
  });

  type SettingsFormValues = z.infer<typeof formSchema>
interface SettingsFormProps {
  initialData: Store;
}
export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
    const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const {storeId}= params;
      console.log(storeId)
      setLoading(true);
      await updateStore({
        id:storeId,
        name:values.name
      });
      router.refresh();
      toast({
        title: "Updated Store sucessfully",
        description: "Your store name updated sucessfully",
      })
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      toast({
        variant:"destructive",
        title: "Something went wrong",
        description: "Please try again later",
      })
    }
  }
  
  const onDelete = async() =>{
    try {
      setLoading(true);
      await deleteStore({id:params.storeId})
      router.push("/")
      toast({
        title: "Store deleted sucessfully",
        description: "Your store was deleted sucessfully",
      })
        router.refresh();
      setLoading(false)
    } catch (error:any) {
      toast({
        variant:"destructive",
        title: "Something went wrong",
        description: "Store was unable to delete",
      })
    }
  }

  return (
    <>
     <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
      <div className="flex justify-between items-center">
        <Heading title="Settings" description="Manage store preferencesss" />
        <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Store name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert 
        title="NEXT_PUBLIC_API_URL" 
        variant="public" 
        description={`${origin}/${params.storeId}`}
      />
    </>
  );
};
