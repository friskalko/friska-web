import { NextResponse } from "next/server";

export async function GET(req) {
    console.log("hello");
    return NextResponse.json({ status: "success", products: [] });
}
