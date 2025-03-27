import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json(); // Parse JSON request body
    const feedback = data.feedback;

    if (!feedback || feedback.trim() === "") {
      return NextResponse.json(
        { error: "Feedback is required" },
        { status: 400 }
      );
    }
    await fetch(`${process.env.FIREBASE_URL}/feedback.json`, {
      method: "POST",
      body: JSON.stringify({ Feedback: feedback }),
    });

    return NextResponse.json(
      { message: "Feedback submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
