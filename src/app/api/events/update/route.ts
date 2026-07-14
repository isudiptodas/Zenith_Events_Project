import { connectDb } from "@/config/connectDB";
import { BounceForm } from "@/models/bounceForm";
import { NextRequest, NextResponse } from "next/server";
import { UdbhavForm } from '@/models/udbhavForm';

export async function PATCH(req: NextRequest) {

    await connectDb();

    try {
        const body = await req.json();
        const { type, id, data } = body;

        if (type === 'bounce') {
            const players = [
                { name: data.player1Name, contact: data.player1Contact },
                { name: data.player2Name, contact: data.player2Contact },
                { name: data.player3Name, contact: data.player3Contact },
                { name: data.player4Name, contact: data.player4Contact },
            ];

            const updated = await BounceForm.findByIdAndUpdate(id, {
                teamName: data.teamName,
                players,
                captainWhatsapp: data.captainWhatsapp,
                captainEmail: data.captainEmail,
            }, { new: true });

            return NextResponse.json({
                success: true,
                message: 'Registration updated',
                data: updated
            }, { status: 200 });
        } else if (type === 'udbhav') {
            const updated = await UdbhavForm.findByIdAndUpdate(id, {
                participants: data.participants,
                school: data.school,
                contact: data.contact,
                email: data.email,
                class: data.class,
                age: data.age,
                choreographer: data.choreographer,
            }, { new: true });

            return NextResponse.json({
                success: true,
                message: 'Registration updated',
                data: updated
            }, { status: 200 });
        }
    } catch (error) {
        console.log(`ERROR -> ${error}`);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        }, { status: 500 });
    }
}
