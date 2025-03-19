"use server";

export async function submitFeedback(formData) {
  try {
    const response = await fetch("http://localhost:3000/api/feedback", {
      method: "POST",
      body: formData, // Sending form data directly
    });

    if (!response.ok) {
      throw new Error("Failed to submit feedback");
    }

    return { success: true, message: "Feedback submitted successfully!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
