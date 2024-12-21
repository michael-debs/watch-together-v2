"use server"
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function login({ username }: { username: string }): Promise<ApiResponseType> {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ username }, jwtSecret);
    const cookieStore = await cookies();
    cookieStore.set('token', token, { httpOnly: true });
    return {
        message: "Login successful",
        status: 200,
    };
}

export async function logout(): Promise<ApiResponseType> {
    const cookieStore = await cookies();
    cookieStore.set('token', '', { httpOnly: true, expires: new Date(0) });
    return {
        message: "Logout successful",
        status: 200,
    };
}