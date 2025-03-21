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
    // Save feedback to database (Replace with your actual DB logic)
    // await db.feedback.create({ data: { text: feedback } });

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
