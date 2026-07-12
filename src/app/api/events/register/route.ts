import { connectDb } from "@/config/connectDB";
import { imagekit } from "@/config/imagekit";
import { BounceForm } from "@/models/bounceForm";
import { NextRequest, NextResponse } from "next/server";
import React from 'react';
import { EventConfirmationTemplate } from '@/components/EventConfirmationTemplate';
import { Resend } from "resend";
import { UdbhavForm } from '@/models/udbhavForm';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {

    await connectDb();

    const formData = await req.formData();
    const type = formData.get('type') as string;

    if (type === 'bounce') {
        const file = formData.get('file') as File;
        const data = JSON.parse(formData.get('data') as string);

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

            //send mail to user
            const { data: Data, error: err } = await resend.emails.send({
                from: 'Zenith Events & Financial Consultancy <events@zefc.in>',
                to: [data.captainEmail],
                subject: 'Event Registration Confirmed',
                react: React.createElement(EventConfirmationTemplate, {
                    name: data.Player1Name,
                    email: data.captainEmail,
                    eventName: type as string
                }),
            });

            if (err) {
                console.log(err);
                return NextResponse.json({
                    success: false,
                    message: `Could not sent mail`
                }, { status: 503 });
            }

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
    else if (type === 'udbhav') {
        const file = formData.get('file') as File;
        const data = JSON.parse(formData.get('data') as string);

        const extension = file.name.split(".").pop();
        const originalName = file.name.split(".")[0];
        const fileName = `${originalName}-${Date.now()}.${extension}`;
        const buffer = Buffer.from(await file.arrayBuffer());

        try {
            const uploadedImage = await imagekit.upload({
                file: buffer,
                fileName,
                folder: "/zenith-events/udbhav-payments",
            });

            const url = uploadedImage.url;

            const registration = await UdbhavForm.create({
                category: data.category,
                subCategory: data.subCategory,
                participants: data.participants,
                school: data.school,
                contact: data.contact,
                email: data.email,
                class: data.class,
                age: data.age,
                choreographer: data.choreographer,
                paymentScreenshot: url
            });

            // send mail to user
            const { data: Data, error: err } = await resend.emails.send({
                from: 'Zenith Events & Financial Consultancy <events@zefc.in>',
                to: [data.email],
                subject: 'Event Registration Confirmed',
                react: React.createElement(EventConfirmationTemplate, {
                    email: data.email,
                    eventName: type as string
                }),
            });

            if (err) {
                console.log(err);
                return NextResponse.json({
                    success: false,
                    message: `Could not sent mail`
                }, { status: 503 });
            }

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
}