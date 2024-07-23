"use client";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;
interface Store {
  _id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[] | null;
}
export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const storeModal = useStoreModal();
  const router = useRouter();
  const params = useParams();

  const formattedItems = items?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const currentStore = formattedItems?.find(
    (item) => item.value === params.storeId
  );

  const onSelectStore = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          <Store className="w-4 h-4 mr-2" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandGroup heading="Stores">
            {formattedItems?.map((store) => (
              <CommandItem
                key={store.value}
                value={store.value}
                onSelect={() => onSelectStore(store)}
                className="text-sm"
              >
                <Store className="mr-2 h-4 w-4" />
                  {store.label}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    currentStore?.value === store?.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
