import { connectDb } from "@/config/connectDB";
import { Admin } from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    await connectDb();

    const body = await req.json();

    const { type } = body;

    if (type === 'register') {
        try {
            const { email, password } = body;

            const found = await Admin.findOne({ email });
            if (found) {
                return NextResponse.json({
                    message: `User already exists`
                }, { status: 401 });
            }

            const hashed = await bcrypt.hash(password as string, 10);

            const newAdmin = new Admin({
                email, password: hashed
            });

            await newAdmin.save();

            return NextResponse.json({
                success: true,
                message: `User registered`
            }, { status: 201 });
        } catch (error) {
            console.log(`ERROR -> ${error}`);
            return NextResponse.json({
                message: `Something went wrong`
            }, { status: 500 });
        }

    }
    else if (type === 'login') {
        try {
            const { email, password } = body;
            const found = await Admin.findOne({ email });
            if (!found) {
                return NextResponse.json({
                    message: `User not found`
                }, { status: 404 });
            }

            const match = await bcrypt.compare(password as string, found.password);

            if (!match) {
                return NextResponse.json({
                    message: `Password incorrect`
                }, { status: 403 });
            }

            const token = jwt.sign({ id: found._id, email: found.email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
            const response = NextResponse.json({
                success: true,
                message: `User logged in`
            }, { status: 200 });

            response.cookies.set({
                name: "admin-token",
                value: token,
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 60 * 60 * 24,
                path: "/",
            });

            return response;
        } catch (error) {
            console.log(`ERROR -> ${error}`);
            return NextResponse.json({
                message: `Something went wrong`
            }, { status: 500 });

        }
    }
    else if (type === 'logout') {
        const response = NextResponse.json(
            {
                success: true,
                message: "Logged out successfully",
            },
            { status: 200 }
        );

        response.cookies.set({
            name: "admin-token",
            value: "",
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 0,
        });

        return response;
    }
}

export async function PUT(req: NextRequest) {
    await connectDb();

    const { newPassword, currentPassword } = await req.json();
    const token = req.headers.get('cookie')?.split('=')[1].split(';')[0];

    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(token as string, process.env.JWT_SECRET!) as JwtPayload;
    } catch {
        return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }

    if (!decoded.email) {
        return NextResponse.json({ message: "Invalid token payload" }, { status: 403 });
    }

    try {

        const found = await Admin.findOne({ email: decoded?.email as string });

        if (!found) {
            return NextResponse.json({
                message: `User not found`
            }, { status: 404 });
        }

        const match = await bcrypt.compare(currentPassword, found.password);

        if (match) {
            return NextResponse.json({
                success: false,
                message: `New password cannoot be same as old password`
            }, { status: 500 });
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        found.password = hashed;
        await found.save();

        return NextResponse.json({
            success: true,
            message: `Password updated`
        }, { status: 201 });
    } catch (error) {
        console.log(`ERROR -> ${error}`);
        return NextResponse.json({
            success: false,
            message: `Something went wrong`
        }, { status: 500 });

    }
}