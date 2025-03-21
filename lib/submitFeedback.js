"use server";

export async function submitFeedback(feedback) {
  if (!feedback) {
    return { success: false, message: "Feedback cannot be empty" };
  }

  try {
    const response = await fetch(`${process.env.APP_URL}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback }), // Send as JSON
    });

    if (!response.ok) {
      throw new Error("Failed to submit feedback");
    }

    return { success: true, message: "Feedback submitted successfully!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
