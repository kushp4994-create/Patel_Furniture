import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  const inquiries = await prisma.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: "desc" }
  });

  const contacts = await prisma.contact.findMany({
    take: 5,
    orderBy: { createdAt: "desc" }
  });

  const appointments = await prisma.appointment.findMany({
    take: 5,
    orderBy: { createdAt: "desc" }
  });

  const products = await prisma.product.findMany({
    take: 5,
    orderBy: { createdAt: "desc" }
  });

  const notifications = [
    ...inquiries.map((i) => ({
      id: i.id,
      title: "New Inquiry",
      message: `${i.name} sent an inquiry`,
      time: i.createdAt,
    })),

    ...contacts.map((c) => ({
      id: c.id,
      title: "New Contact Message",
      message: `${c.name} contacted you`,
      time: c.createdAt,
    })),

    ...appointments.map((a) => ({
      id: a.id,
      title: "New Appointment",
      message: `${a.name} booked an appointment`,
      time: a.createdAt,
    })),

    ...products.map((p) => ({
      id: p.id,
      title: "New Product Added",
      message: `${p.name} added to store`,
      time: p.createdAt,
    })),
  ];

  notifications.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  return NextResponse.json(notifications.slice(0, 10));
}