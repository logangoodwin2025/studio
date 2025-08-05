

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FormSheet } from "./form-sheet";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
};

const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  role: z.string(),
});

export function UsersDataTable({ initialUsers, showHeader = true }: { initialUsers: User[], showHeader?: boolean }) {
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: "", email: "", role: "Basic User" },
  });

  const handleAddNew = () => {
    setEditingUser(null);
    form.reset({ name: "", email: "", role: "Basic User" });
    setSheetOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.reset(user);
    setSheetOpen(true);
  };

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    // Simulate API call
    setTimeout(() => {
      if (editingUser) {
        setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...values } : u)));
        toast({ title: "User Updated", description: "The user details have been successfully updated." });
      } else {
        const newUser = { ...values, id: `usr_${Date.now()}`, avatar: `https://i.pravatar.cc/150?u=${Date.now()}`};
        setUsers([newUser, ...users]);
        toast({ title: "User Added", description: "A new user has been successfully added." });
      }
      setSheetOpen(false);
    }, 500);
  };
  
  const cardHeader = showHeader ? (
    <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-headline">User Management</CardTitle>
            <CardDescription>Add, edit, or remove users from this company.</CardDescription>
          </div>
          <Button onClick={handleAddNew} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>
      </CardHeader>
  ) : null;

  return (
    <>
    <Card>
      {cardHeader}
      <CardContent className={showHeader ? "" : "pt-6"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(user)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
      <FormSheet 
          isOpen={isSheetOpen}
          onOpenChange={setSheetOpen}
          isEditing={!!editingUser}
          form={form}
          onSubmit={onSubmit}
          schema={userSchema}
          title={editingUser ? "Edit User" : "Add New User"}
          description={editingUser ? "Update the user's details below." : "Fill in the form to add a new user."}
      />
    </>
  );
}
