import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  // Simulates successful upload in local mock mode
  return NextResponse.json({
    success: true,
    message: "File received successfully by Omniflow Development Mock Storage.",
  });
}
