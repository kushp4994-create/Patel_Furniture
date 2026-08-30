import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: Number(body.price),
      image: body.image,
      description: body.description,
    },
  });

  return NextResponse.json(product);
}

export async function PUT(req: Request) {
  const body = await req.json();

  if (!body.id) {
    return NextResponse.json(
      { error: "Product ID missing" },
      { status: 400 }
    );
  }

  const product = await prisma.product.update({
    where: { id: body.id },
    data: {
      name: body.name,
      price: Number(body.price),
      image: body.image,
      description: body.description,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}