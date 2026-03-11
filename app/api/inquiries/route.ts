import prisma from "@/lib/prisma"

export async function POST(req:Request){

  const body = await req.json()

  const inquiry = await prisma.inquiry.create({

    data:{
      name:body.name,
      email:body.email,
      message:body.message,
      productId:body.productId
    }

  })

  return Response.json(inquiry)

}
export async function GET() {

  const inquiries = await prisma.inquiry.findMany({
    include:{
      product:true
    },
    orderBy:{
      createdAt:"desc"
    }
  });

  return Response.json(inquiries);
}