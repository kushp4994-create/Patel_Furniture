import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const appointment = await prisma.appointment.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        message: body.message || null,
        date: new Date(body.date),
      },
    });

    return NextResponse.json({
      success: true,
      appointment,
    });

  } catch (error) {
    console.error("APPOINTMENT ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}