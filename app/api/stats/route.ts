import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const products = await prisma.product.count();

    const inquiries = await prisma.inquiry.count();

    const contacts = await prisma.contact.count();

    const visitors = await prisma.visitor.count();

    const appointments = await prisma.appointment.count();

    return NextResponse.json({
      products,
      inquiries,
      contacts,
      visitors,
      appointments
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      products: 0,
      inquiries: 0,
      contacts: 0,
      visitors: 0,
      appointments: 0
    });

  }

}