import { connectDb } from "@/config/connectDB";
import { BounceForm } from "@/models/bounceForm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    await connectDb();

    try {
        const found = await BounceForm.find();

        return NextResponse.json({
            success: true,
            message: `Responses fetched`,
            found
        }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: `Something went wrong`
        }, { status: 500 });
    }
}