import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import EmbedClient from "@/components/EmbedClient";

export default async function Embed() {
    const session = await getSession()
    if (!session) redirect("/")
    return (
        <>
            <EmbedClient ownerId={session?.id!} />
        </>
    )
}