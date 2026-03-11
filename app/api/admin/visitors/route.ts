import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  const visitors = await prisma.visitor.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(visitors);

}