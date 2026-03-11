import prisma from "@/lib/prisma"
import InquiryForm from "@/components/InquiryForm"
import ContactForm from "@/components/ContactForm"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id }
  })

  if (!product) {
    return <div className="p-10">Product Not Found</div>
  }

  return (

    <div className="max-w-6xl mx-auto py-16 px-6">

      <div className="grid md:grid-cols-2 gap-14 items-start">

        {/* LEFT SIDE IMAGE */}
        <div>
          <img
            src={product.image}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div className="space-y-6">

          <h1 className="text-4xl font-semibold text-gray-800">
            {product.name}
          </h1>

          <p className="text-green-600 text-2xl font-bold">
            ₹ {product.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed max-w-lg">
            {product.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-5 pt-2">

            <InquiryForm productId={product.id} />

            <ContactForm productName={product.name} />

          </div>

        </div>

      </div>

    </div>

  )
}