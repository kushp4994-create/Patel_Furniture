import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const inquiry = await prisma.inquiry.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
        productId: body.productId,
      },
      include: {
        product: true,
      },
    });

    return Response.json(inquiry, { status: 201 });
  } catch (error) {
    console.error("Create inquiry error:", error);

    return Response.json(
      {
        message: "Failed to create inquiry.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(inquiries);
  } catch (error) {
    console.error("Get inquiries error:", error);

    return Response.json(
      {
        message: "Failed to fetch inquiries.",
      },
      {
        status: 500,
      }
    );
  }
}