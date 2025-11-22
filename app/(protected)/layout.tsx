// @/app/(protected)/layout.tsx
import Navbar from "@/components/ui/Navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
    children
}: {
    children: React.ReactNode
}) {
    const supabase = createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error("Auth error:", error);
        redirect("/login");
    }

    if (!user) {
        redirect("/login");
    }

    return (
        <>
            <Navbar></Navbar>
            {children}
        </>);
}