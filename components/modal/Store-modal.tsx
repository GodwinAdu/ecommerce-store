"use client";

import { Modal } from "./Modal";
import { useStoreModal } from "@/hooks/use-store-modal";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createStore } from "@/lib/actions/store.actions";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const loading = form.formState.isLoading

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      const response = await createStore({
        name:values.name,
    });


    form.reset();

    toast({
      title: "Store created",
      description: "Your new store successfully created",
    }),
    window.location.assign(`/${response?._id!}`)
    
    } catch (error:any) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "something went wrong",
        description: "Please try again later.",
      })
    }
    
  }

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="E-commerce" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex justify-end items-center">
              <Button disabled={loading} variant='outline' onClick={storeModal.onClose}>Cancel</Button>
              <Button disabled={loading} type='submit'>Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
