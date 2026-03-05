import { NextRequest, NextResponse } from "next/server";

// Mock chat API - returns "AI Reply" for now
// TODO: Replace with actual Anthropic API integration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Simulate a small delay like a real API would have
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return mock response
    return NextResponse.json({
      message: "AI Reply",
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
