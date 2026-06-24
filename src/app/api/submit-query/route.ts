import { EmailTemplate } from '@/components/EmailTemplate'
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json();
    const { name, contact, email, message } = body;

    try {
        const { data, error } = await resend.emails.send({
            from: 'Zenith Events & Financial Consultancy <onboarding@resend.dev>',
            to: ['zefc2026@gmail.com'],
            subject: 'Query Submitted',
            react: React.createElement(EmailTemplate, {
                name,
                email,
                contact,
                message,
            }),
        });

        if (error) {
            console.log(error);
            return NextResponse.json({
                success: false,
                message: `Could not sent mail`
            }, { status: 503 });
        }

        return NextResponse.json({
            success: true,
            message: `Mail sent`
        }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 });
    }
}