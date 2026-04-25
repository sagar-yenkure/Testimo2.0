import DashboardClient from "@/components/dashboard/DashboardClient"
import { api } from "@/lib/api";
import { headers } from "next/headers";

const DashboardPage = async () => {
    const requestHeaders = await headers();

    const { data } = await api.spaces.get({
        headers: Object.fromEntries(requestHeaders.entries())
    });

    return <DashboardClient spaces={data?.spaces || []} />
}

export default DashboardPage