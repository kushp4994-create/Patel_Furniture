import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("PRODUCT BODY:", body);
    console.log("CATEGORY RECEIVED:", body.category);

    if (!body.name) {
      return NextResponse.json(
        {
          error: "Product name is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.price) {
      return NextResponse.json(
        {
          error: "Product price is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.image) {
      return NextResponse.json(
        {
          error: "Product image is required",
        },
        {
          status: 400,
        }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: String(body.name).trim(),
        price: Number(body.price),
        image: String(body.image).trim(),
        description: body.description
          ? String(body.description).trim()
          : null,

        // Selected category will be saved here
        category:
          typeof body.category === "string" &&
            body.category.trim()
            ? body.category.trim()
            : "Other",
      },
    });

    return NextResponse.json(product, {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create product",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        {
          error: "Product ID missing",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.name) {
      return NextResponse.json(
        {
          error: "Product name is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.price) {
      return NextResponse.json(
        {
          error: "Product price is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.image) {
      return NextResponse.json(
        {
          error: "Product image is required",
        },
        {
          status: 400,
        }
      );
    }

    const product = await prisma.product.update({
      where: {
        id: body.id,
      },

      data: {
        name: String(body.name).trim(),
        price: Number(body.price),
        image: String(body.image).trim(),
        description: body.description
          ? String(body.description).trim()
          : null,

        // Updated category will be saved here
        category:
          typeof body.category === "string" &&
            body.category.trim()
            ? body.category.trim()
            : "Other",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to update product",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const id = body?.id;

    if (!id) {
      return NextResponse.json(
        {
          error: "Product ID missing",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.product.delete({
      where: {
        id: String(id),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to delete product",
      },
      {
        status: 500,
      }
    );
  }
}