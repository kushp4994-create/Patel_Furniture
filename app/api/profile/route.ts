import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(admin);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }

    const data: any = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      instagram: body.instagram,
      facebook: body.facebook,
      whatsapp: body.whatsapp, // number only
    };

    if (body.password) {
      data.password = await bcrypt.hash(body.password, 10);
    }

    const updated = await prisma.user.update({
      where: { id: admin.id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}