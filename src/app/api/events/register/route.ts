import { connectDb } from "@/config/connectDB";
import { imagekit } from "@/config/imagekit";
import { BounceForm } from "@/models/bounceForm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    await connectDb();

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const data = JSON.parse(formData.get('data') as string);
    const type = formData.get('type') as string;

    try {

        const buffer = Buffer.from(await file.arrayBuffer());
        const extension = file.name.split(".").pop();
        const originalName = file.name.split(".")[0];
        const fileName = `${originalName}-${Date.now()}.${extension}`;

        const uploadedImage = await imagekit.upload({
            file: buffer,
            fileName,
            folder: "/zenith-events/bounce-payments",
        });

        const url = uploadedImage.url;

        const players = [
            {
                name: data.player1Name,
                contact: data.player1Contact,
            },
            {
                name: data.player2Name,
                contact: data.player2Contact,
            },
            {
                name: data.player3Name,
                contact: data.player3Contact,
            },
            {
                name: data.player4Name,
                contact: data.player4Contact,
            },
        ];

        const form = new BounceForm({
            teamName: data.teamName,
            players,
            captainWhatsapp: data.captainWhatsapp,
            captainEmail: data.captainEmail,
            paymentScreenshot: url,
            type: type,
            confirmDetails: data.confirmDetails,
            agreeRules: data.agreeRules,
            agreeCancellation: data.agreeCancellation,
        });
        await form.save();

        return NextResponse.json({
            success: true,
            message: `Form submitted`
        }, { status: 200 });
    } catch (error) {
        console.log(`ERROR -> ${error}`);
        return NextResponse.json({
            message: `Something went wrong`
        }, { status: 500 });
    }
}