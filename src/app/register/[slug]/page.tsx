'use client'

import Bounce from "@/components/OngoingEventsForm/Bounce";
import { usePathname } from "next/navigation";

const render = {
    "bounce": <Bounce />
}

function page() {

    //const pathname = usePathname().split('register/')[1];

    return render.bounce
}

export default page
