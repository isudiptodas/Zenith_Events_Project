import { connectDb } from "@/config/connectDB";
import { BounceForm } from "@/models/bounceForm";
import { UdbhavForm } from "@/models/udbhavForm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    await connectDb();

    try {
        const body = await req.json();
        const { type, id } = body;

        if (!id) {
            return NextResponse.json({ success: false, message: "Missing row id" }, { status: 400 });
        }

        if (type === "bounce") {
            await BounceForm.findByIdAndDelete(id);
        } else if (type === "udbhav") {
            await UdbhavForm.findByIdAndDelete(id);
        } else {
            return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: "Row deleted" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}
