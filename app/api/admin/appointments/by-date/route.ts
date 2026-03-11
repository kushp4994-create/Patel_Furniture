import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json([]);
    }

    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("DATE FETCH ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}