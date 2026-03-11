import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, phone, email, subject, message } =
      await req.json();

    if (!name || !phone || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: { name, phone, email, subject, message },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(contacts);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.contact.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Deleted" });
}