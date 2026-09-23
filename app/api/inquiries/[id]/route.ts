import prisma from "@/lib/prisma";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function DELETE(
    _req: Request,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        if (!id) {
            return Response.json(
                {
                    message: "Inquiry ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const existingInquiry = await prisma.inquiry.findUnique({
            where: {
                id,
            },
        });

        if (!existingInquiry) {
            return Response.json(
                {
                    message: "Inquiry not found.",
                },
                {
                    status: 404,
                }
            );
        }

        await prisma.inquiry.delete({
            where: {
                id,
            },
        });

        return Response.json({
            message: "Inquiry deleted successfully.",
        });
    } catch (error) {
        console.error("Delete inquiry error:", error);

        return Response.json(
            {
                message: "Failed to delete inquiry.",
            },
            {
                status: 500,
            }
        );
    }
}