'use client'

import Bounce from "@/components/OngoingEventsForm/Bounce";
import Udbhav from "@/components/OngoingEventsForm/Udbhav";
import { usePathname } from "next/navigation";

const render = {
    "bounce": <Bounce />,
    "udbhav": <Udbhav/>
}

function page() {

    const pathname = usePathname().split('/').pop() ?? "";

    return render[pathname as keyof typeof render] ?? null;
}

export default page
