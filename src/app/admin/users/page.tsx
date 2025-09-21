
"use client";

import { UsersDataTable } from "@/components/users-data-table";
import { userList } from "@/lib/mock-data";


export default function CompanyUsersPage() {

    return (
        <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
            <UsersDataTable initialUsers={userList} />
        </main>
    )
}
