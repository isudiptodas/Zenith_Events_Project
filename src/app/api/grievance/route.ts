import { connectDb } from "@/config/connectDB";
import { Grievance } from "@/models/grievanceModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    await connectDb();

    const body = await req.json();
    const { name, id, message } = body;

    try {
        const newGrievance = new Grievance({
            name, referenceID: id, message
        });

        await newGrievance.save();

        return NextResponse.json({
            success: true,
            message: `Issue submitted`
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: `Something went wrong`
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {

    await connectDb();

    try {
        const found = await Grievance.find();
        return NextResponse.json({
            success: true,
            message: `All grievances fetched`,
            grievances: found
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: `Something went wrong`
        }, { status: 500 });
    }
}