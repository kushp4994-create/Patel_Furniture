"use client";

import { useEffect, useState } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const uploadImage = async () => {
    if (!file) return form.image;

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result.imageUrl;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    const method = form.id ? "PUT" : "POST";

    await fetch("/api/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        image: imageUrl,
      }),
    });

    setForm({ id: "", name: "", price: "", image: "", description: "" });
    setFile(null);
    fetchProducts();
  };

  const handleEdit = (product: any) => {
  setForm({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    description: product.description || "",
  });
};

  const handleDelete = async (id: string) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchProducts();
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow mb-10 space-y-4">

        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2"
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border p-2"
        />

        {/* FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border p-2"
        />

        <textarea
  placeholder="Product Description"
  value={form.description}
  onChange={(e) =>
    setForm({ ...form, description: e.target.value })
  }
  className="w-full border p-2"
/>

        <button className="bg-[#5fb3a9] text-white px-4 py-2">
          {form.id ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow">

            <img
              src={product.image}
              className="w-full h-40 object-cover mb-4"
            />

            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-[#e0b15c] font-bold mb-4">
              ₹ {product.price}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-3 py-1"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </>
  );
}