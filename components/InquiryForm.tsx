"use client"

import { useState } from "react"

export default function InquiryForm({ productId }: any) {

  const [open,setOpen] = useState(false)

  async function handleSubmit(e:any){
    e.preventDefault()

    const form = new FormData(e.target)

    await fetch("/api/inquiries",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({
        name:form.get("name"),
        email:form.get("email"),
        message:form.get("message"),
        productId
      })
    })

    alert("Inquiry Sent")
  }

  return(

    <div>

      <button
        onClick={()=>setOpen(!open)}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Inquiry
      </button>

      {open && (

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">

          <input
            name="name"
            placeholder="Name"
            className="border p-2 w-full"
          />

          <input
            name="email"
            placeholder="Email"
            className="border p-2 w-full"
          />

          <textarea
            name="message"
            placeholder="Message"
            className="border p-2 w-full"
          />

          <button className="bg-black text-white px-4 py-2">
            Submit
          </button>

        </form>

      )}

    </div>

  )
}