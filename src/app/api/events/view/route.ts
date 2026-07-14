import { connectDb } from "@/config/connectDB";
import { BounceForm } from "@/models/bounceForm";
import { UdbhavForm } from "@/models/udbhavForm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    await connectDb();

    try {
        const bounce = await BounceForm.find();
        const udbhav = await UdbhavForm.find();

        return NextResponse.json({
            success: true,
            message: `Responses fetched`,
            bounce, udbhav
        }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: `Something went wrong`
        }, { status: 500 });
    }
}