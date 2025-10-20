import type { SessionStatus } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";
import { updateSessionStatus } from "@/services/mentoring-session";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> },
) {
  try {
    const { sessionId } = await context.params;
    const { status } = await request.json();

    const session = await updateSessionStatus(
      sessionId,
      status as SessionStatus,
    );
    return NextResponse.json(session);
  } catch (error) {
    console.error("Error updating session status:", error);
    return NextResponse.json(
      { error: "Failed to update session" },
      { status: 500 },
    );
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ sessionId: string }> },
) {
  try {
    const { sessionId } = await context.params;
    console.log(sessionId);

    const session = await prisma.mentoringSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error("Error getting session:", error);
    return NextResponse.json(
      { error: "Failed to get session" },
      { status: 500 },
    );
  }
}
