import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals: any = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval > 1) {
      return `${interval} ${key}s ago`;
    }
    if (interval === 1) {
      return `${interval} ${key} ago`;
    }
  }

  return "just now";
}

export async function GET() {
  try {

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 3
    });

    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 3
    });

    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
      take: 3
    });

    const visitors = await prisma.visitor.findMany({
      orderBy: { createdAt: "desc" },
      take: 3
    });

    const activities: any[] = [];

    products.forEach((p) => {
      activities.push({
        id: p.id,
        type: "product",
        action: `New product added: ${p.name}`,
        time: timeAgo(p.createdAt)
      });
    });

    inquiries.forEach((i) => {
      activities.push({
        id: i.id,
        type: "inquiry",
        action: `New inquiry from ${i.name}`,
        time: timeAgo(i.createdAt)
      });
    });

    appointments.forEach((a) => {
      activities.push({
        id: a.id,
        type: "appointment",
        action: `Appointment booked by ${a.name}`,
        time: timeAgo(a.createdAt)
      });
    });

    visitors.forEach((v) => {
      activities.push({
        id: v.id,
        type: "visitor",
        action: `New visitor on website`,
        time: timeAgo(v.createdAt)
      });
    });

    activities.sort((a, b) => 0);

    return NextResponse.json(activities.slice(0, 10));

  } catch (error) {

    console.log(error);

    return NextResponse.json([]);

  }
}