import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const userAgent = req.headers.get("user-agent") || "unknown";

  const visitor = await prisma.visitor.create({
    data: {
      ip,
      userAgent,
    },
  });

  return NextResponse.json(visitor);

}