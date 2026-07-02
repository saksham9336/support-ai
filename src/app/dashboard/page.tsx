import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";

export default async function Dashboard() {
    const session = await getSession()
    if (!session) redirect("/")
    return (
        <>
            <DashboardClient ownerId={session?.id!} />
        </>
    )
}