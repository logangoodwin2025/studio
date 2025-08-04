
"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roles } from "@/lib/mock-data";


interface FormSheetProps<T extends z.ZodObject<any>> {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    isEditing: boolean;
    form: UseFormReturn<z.infer<T>>;
    onSubmit: (values: z.infer<T>) => void;
    schema: T;
    title: string;
    description: string;
}

export function FormSheet<T extends z.ZodObject<any>>({
    isOpen,
    onOpenChange,
    isEditing,
    form,
    onSubmit,
    schema,
    title,
    description,
}: FormSheetProps<T>) {

  const renderField = (name: string, field: any) => {
    const fieldSchema = schema.shape[name];

    if (fieldSchema instanceof z.ZodEnum) {
        return (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={`Select a ${name}`} />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {fieldSchema.options.map((option: string) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        )
    }

    if (name === "role" && fieldSchema instanceof z.ZodString) {
        const roleNames = Object.keys(roles);
         return (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={`Select a role`} />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {roleNames.map((role: string) => (
                        <SelectItem key={role} value={role}>
                            {role}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        )
    }

    return <Input {...field} placeholder={`Enter ${name}`} />
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-8">
            {Object.keys(schema.shape).map((key) => (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{key}</FormLabel>
                    <FormControl>
                        {renderField(key, field)}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </SheetClose>
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

