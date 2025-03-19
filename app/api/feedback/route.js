import { NextResponse } from "next/server";

export async function POST(req) {
    
  try {
    const data = await req.formData(); // Parse form data
    const feedback = data.get("feedback");

    if (!feedback || feedback.trim() === "") {
      return NextResponse.json(
        { error: "Feedback is required" },
        { status: 400 }
      );
    }

    console.log("Received Feedback:", feedback);

    return NextResponse.json(
      { message: "Feedback submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
