"use client"

import * as z from "zod"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Trash } from "lucide-react"

import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { AlertModal } from "../modal/alert-modal"
import Heading from "../heading/Heading"
import { Separator } from "../ui/separator"
import ImageUpload from "../image-upload"
import { toast } from "../ui/use-toast"
import { createBillboard, updateBillboard } from "@/lib/actions/billboard.actions"
import Billboard from "@/lib/models/billboard.models"


const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialData:  typeof Billboard | null;
};

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData
}) => {
  console.log(initialData,"forms")
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit billboard' : 'Create billboard';
  const description = initialData ? 'Edit a billboard.' : 'Add a new billboard';
  const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? {
      label: '',
      imageUrl: ''
    }
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await updateBillboard({
          storeId:params.storeId,
          label:data.label,
        })
      } else {
        await createBillboard({
          storeId:params.storeId,
          label:data.label,
          imageUrl:data.imageUrl
        })
      }
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      // toast.success(toastMessage);
    } catch (error: any) {
    
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
    //   await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      // toast.success('Billboard deleted.');
    } catch (error: any) {
      // toast.error('Make sure you removed all categories using this billboard first.');
    } finally {
      setLoading(false);
      setOpen(false);
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
     <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background image</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value ? [field.value] : []} 
                      disabled={loading} 
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
