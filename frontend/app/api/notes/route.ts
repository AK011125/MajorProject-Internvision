import { NextResponse } from "next/server";

const BACKEND = "http://127.0.0.1:5000/api/notes";

export async function GET() {
  try {
    const res = await fetch(BACKEND, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Backend not reachable" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(BACKEND, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Backend not reachable" }, { status: 500 });
  }
}