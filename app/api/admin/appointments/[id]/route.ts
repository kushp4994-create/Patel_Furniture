import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params;

    const body = await req.json();

    const appointment = await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json({
      success: true,
      appointment,
    });

  } catch (error) {

    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );

  }
}