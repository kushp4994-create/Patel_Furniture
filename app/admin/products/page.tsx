"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* =========================================================
   TYPES
========================================================= */

interface Product {
  id: string;
  name: string;
  price: string | number;
  category?: string | null;
  image: string;
  description?: string | null;
}

interface ProductForm {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
}

interface FormErrors {
  name?: string;
  price?: string;
  category?: string;
  image?: string;
  description?: string;
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

interface UploadResponse {
  imageUrl?: string;
  error?: string;
  message?: string;
}

type SortOption =
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "name-az"
  | "name-za";

type ToastType = "success" | "error";

interface Toast {
  type: ToastType;
  message: string;
}

/* =========================================================
   CONSTANTS
========================================================= */

const INITIAL_FORM: ProductForm = {
  id: "",
  name: "",
  price: "",
  category: "",
  image: "",
  description: "",
};

const PRODUCT_CATEGORIES = [
  "Sofa",
  "Sofa Set",
  "Bed",
  "Dining Table",
  // "Chair",
  "Wardrobe",
  "TV Unit",
  // "Coffee Table",
  // "Side Table",
  "Cabinet",
  "Office Furniture",
  "Outdoor Furniture",
  "Kids Furniture",
  "Other",
];

const MAX_NAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_PRICE = 100000000;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function getErrorMessage(
  error: unknown,
  fallback: string
): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

async function parseResponse<T>(
  response: Response
): Promise<T | null> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

function getApiErrorMessage(
  data: ApiErrorResponse | null,
  fallback: string
): string {
  if (
    data &&
    typeof data.error === "string" &&
    data.error.trim()
  ) {
    return data.error;
  }

  if (
    data &&
    typeof data.message === "string" &&
    data.message.trim()
  ) {
    return data.message;
  }

  return fallback;
}

function isValidProduct(
  value: unknown
): value is Product {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const product =
    value as Record<string, unknown>;

  return (
    typeof product.id === "string" &&
    typeof product.name === "string" &&
    (typeof product.price === "string" ||
      typeof product.price === "number") &&
    typeof product.image === "string"
  );
}

function formatPrice(
  price: string | number
): string {
  const numericPrice =
    typeof price === "number"
      ? price
      : Number(price);

  if (!Number.isFinite(numericPrice)) {
    return "₹0.00";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

function getNumericPrice(
  price: string | number
): number {
  const value =
    typeof price === "number"
      ? price
      : Number(price);

  return Number.isFinite(value)
    ? value
    : 0;
}

function validateImageFile(
  file: File
): string | undefined {
  if (
    !ALLOWED_IMAGE_TYPES.includes(
      file.type
    )
  ) {
    return "Only JPG, JPEG, and WEBP images are allowed.";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "Image size must be 5 MB or smaller.";
  }

  if (file.size <= 0) {
    return "The selected image is empty.";
  }

  return undefined;
}

function validateForm(
  form: ProductForm,
  file: File | null
): FormErrors {
  const errors: FormErrors = {};

  const name = form.name.trim();
  const priceText = form.price.trim();
  const description =
    form.description.trim();
  const category = form.category.trim();

  /* NAME */

  if (!name) {
    errors.name =
      "Product name is required.";
  } else if (name.length < 2) {
    errors.name =
      "Product name must contain at least 2 characters.";
  } else if (
    name.length > MAX_NAME_LENGTH
  ) {
    errors.name = `Product name cannot exceed ${MAX_NAME_LENGTH} characters.`;
  }

  /* PRICE */

  if (!priceText) {
    errors.price = "Price is required.";
  } else {
    const price = Number(priceText);

    if (!Number.isFinite(price)) {
      errors.price =
        "Please enter a valid price.";
    } else if (price <= 0) {
      errors.price =
        "Price must be greater than 0.";
    } else if (price > MAX_PRICE) {
      errors.price = `Price cannot exceed ₹${MAX_PRICE.toLocaleString(
        "en-IN"
      )}.`;
    }
  }

  /* CATEGORY */

  if (!category) {
    errors.category =
      "Product category is required.";
  }

  /* DESCRIPTION */

  if (!description) {
    errors.description =
      "Product description is required.";
  } else if (
    description.length >
    MAX_DESCRIPTION_LENGTH
  ) {
    errors.description = `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters.`;
  }

  /* IMAGE */

  if (file) {
    const imageError =
      validateImageFile(file);

    if (imageError) {
      errors.image = imageError;
    }
  } else if (
    !form.id &&
    !form.image
  ) {
    errors.image =
      "Product image is required.";
  }

  return errors;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AdminProducts() {
  /* -------------------------------------------------------
     PRODUCT STATE
  ------------------------------------------------------- */

  const [products, setProducts] =
    useState<Product[]>([]);

  /* -------------------------------------------------------
     FORM STATE
  ------------------------------------------------------- */

  const [form, setForm] =
    useState<ProductForm>({
      ...INITIAL_FORM,
    });

  const [errors, setErrors] =
    useState<FormErrors>({});

  /* -------------------------------------------------------
     IMAGE STATE
  ------------------------------------------------------- */

  const [file, setFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  /* -------------------------------------------------------
     LOADING STATE
  ------------------------------------------------------- */

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  /* -------------------------------------------------------
     UI STATE
  ------------------------------------------------------- */

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState<SortOption>("newest");

  const [toast, setToast] =
    useState<Toast | null>(null);

  const [pageError, setPageError] =
    useState("");

  const [deleteProduct, setDeleteProduct] =
    useState<Product | null>(null);

  const [brokenImages, setBrokenImages] =
    useState<Set<string>>(
      new Set()
    );

  /* -------------------------------------------------------
     REFS
  ------------------------------------------------------- */

  const formRef =
    useRef<HTMLFormElement | null>(
      null
    );

  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const previewUrlRef =
    useRef<string>("");

  const toastTimerRef =
    useRef<ReturnType<
      typeof setTimeout
    > | null>(null);

  const deleteButtonRef =
    useRef<HTMLButtonElement | null>(
      null
    );

  /* =======================================================
     TOAST
  ======================================================= */

  const showToast = useCallback(
    (
      type: ToastType,
      message: string
    ) => {
      if (toastTimerRef.current) {
        clearTimeout(
          toastTimerRef.current
        );
      }

      setToast({
        type,
        message,
      });

      toastTimerRef.current =
        setTimeout(() => {
          setToast(null);
        }, 3500);
    },
    []
  );

  /* =======================================================
     CLEANUP TOAST
  ======================================================= */

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(
          toastTimerRef.current
        );
      }
    };
  }, []);

  /* =======================================================
     FETCH PRODUCTS
  ======================================================= */

  const fetchProducts =
    useCallback(async () => {
      try {
        setLoading(true);
        setPageError("");

        const response =
          await fetch(
            "/api/products",
            {
              method: "GET",
              cache: "no-store",
            }
          );

        const data =
          await parseResponse<unknown>(
            response
          );

        if (!response.ok) {
          throw new Error(
            getApiErrorMessage(
              data as ApiErrorResponse | null,
              "Failed to load products."
            )
          );
        }

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid product data received from the server."
          );
        }

        const validProducts =
          data.filter(
            isValidProduct
          );

        setProducts(
          validProducts
        );
      } catch (error) {
        const message =
          getErrorMessage(
            error,
            "Failed to load products."
          );

        setPageError(message);

        showToast(
          "error",
          message
        );
      } finally {
        setLoading(false);
      }
    }, [showToast]);

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  /* =======================================================
     PREVIEW CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (
        previewUrlRef.current
      ) {
        URL.revokeObjectURL(
          previewUrlRef.current
        );
      }
    };
  }, []);

  /* =======================================================
     DELETE MODAL KEYBOARD
  ======================================================= */

  useEffect(() => {
    if (!deleteProduct) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setDeleteProduct(null);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    const timer =
      setTimeout(() => {
        deleteButtonRef.current?.focus();
      }, 50);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      clearTimeout(timer);
    };
  }, [deleteProduct]);

  /* =======================================================
     FILTER + SORT
  ======================================================= */

  const filteredProducts =
    useMemo(() => {
      const searchTerm =
        search.trim().toLowerCase();

      const filtered =
        products.filter(
          (product) => {
            if (!searchTerm) {
              return true;
            }

            const name =
              product.name
                .toLowerCase();

            const description =
              (
                product.description ??
                ""
              ).toLowerCase();

            const category =
              (
                product.category ??
                ""
              ).toLowerCase();

            return (
              name.includes(
                searchTerm
              ) ||
              category.includes(
                searchTerm
              ) ||
              description.includes(
                searchTerm
              )
            );
          }
        );

      return [...filtered].sort(
        (a, b) => {
          switch (sortBy) {
            case "price-low":
              return (
                getNumericPrice(
                  a.price
                ) -
                getNumericPrice(
                  b.price
                )
              );

            case "price-high":
              return (
                getNumericPrice(
                  b.price
                ) -
                getNumericPrice(
                  a.price
                )
              );

            case "name-az":
              return a.name.localeCompare(
                b.name
              );

            case "name-za":
              return b.name.localeCompare(
                a.name
              );

            case "oldest":
              return (
                Number(a.id) -
                Number(b.id)
              );

            case "newest":
            default:
              return (
                Number(b.id) -
                Number(a.id)
              );
          }
        }
      );
    }, [
      products,
      search,
      sortBy,
    ]);

  /* =======================================================
     RESET FORM
  ======================================================= */

  const resetForm =
    useCallback(() => {
      if (
        previewUrlRef.current
      ) {
        URL.revokeObjectURL(
          previewUrlRef.current
        );

        previewUrlRef.current = "";
      }

      setForm({
        ...INITIAL_FORM,
      });

      setFile(null);
      setPreviewUrl("");
      setErrors({});

      if (fileInputRef.current) {
        fileInputRef.current.value =
          "";
      }
    }, []);

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm(
      (current) => ({
        ...current,
        [name]: value,
      })
    );

    if (
      errors[
      name as keyof FormErrors
      ]
    ) {
      setErrors(
        (current) => ({
          ...current,
          [name]: undefined,
        })
      );
    }
  };

  /* =======================================================
     FILE CHANGE
  ======================================================= */

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile =
      event.target.files?.[0] ??
      null;

    if (
      previewUrlRef.current
    ) {
      URL.revokeObjectURL(
        previewUrlRef.current
      );

      previewUrlRef.current = "";
    }

    setPreviewUrl("");
    setFile(selectedFile);

    if (!selectedFile) {
      setErrors(
        (current) => ({
          ...current,
          image:
            form.id && form.image
              ? undefined
              : "Product image is required.",
        })
      );

      return;
    }

    const imageError =
      validateImageFile(
        selectedFile
      );

    if (imageError) {
      setErrors(
        (current) => ({
          ...current,
          image: imageError,
        })
      );

      return;
    }

    const objectUrl =
      URL.createObjectURL(
        selectedFile
      );

    previewUrlRef.current =
      objectUrl;

    setPreviewUrl(objectUrl);

    setErrors(
      (current) => ({
        ...current,
        image: undefined,
      })
    );
  };

  /* =======================================================
     UPLOAD IMAGE
  ======================================================= */

  const uploadImage = useCallback(
    async (
      selectedFile: File
    ): Promise<string> => {
      const imageError =
        validateImageFile(
          selectedFile
        );

      if (imageError) {
        throw new Error(
          imageError
        );
      }

      setUploading(true);

      try {
        const formData =
          new FormData();

        formData.append(
          "file",
          selectedFile
        );

        const response =
          await fetch(
            "/api/upload",
            {
              method: "POST",
              body: formData,
            }
          );

        const result =
          await parseResponse<UploadResponse>(
            response
          );

        if (!response.ok) {
          throw new Error(
            getApiErrorMessage(
              result,
              "Image upload failed."
            )
          );
        }

        if (
          !result ||
          typeof result.imageUrl !==
          "string" ||
          !result.imageUrl.trim()
        ) {
          throw new Error(
            "Image upload completed, but no image URL was returned."
          );
        }

        return result.imageUrl;
      } catch (error) {
        throw new Error(
          getErrorMessage(
            error,
            "Image upload failed."
          )
        );
      } finally {
        setUploading(false);
      }
    },
    []
  );

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (saving || uploading) {
      return;
    }

    const validationErrors =
      validateForm(
        form,
        file
      );

    setErrors(
      validationErrors
    );

    if (
      Object.keys(
        validationErrors
      ).length > 0
    ) {
      return;
    }

    try {
      setSaving(true);
      setPageError("");

      let imageUrl =
        form.image.trim();

      /*
       * Only upload if a NEW file was selected.
       */
      if (file) {
        imageUrl =
          await uploadImage(file);
      }

      if (!imageUrl) {
        throw new Error(
          "Product image is required."
        );
      }

      const price =
        Number(form.price);

      const payload = {
        id: form.id,
        name: form.name.trim(),
        price: String(price),
        category: form.category.trim(),
        image: imageUrl,
        description:
          form.description.trim(),
      };

      const method =
        form.id ? "PUT" : "POST";

      const response =
        await fetch(
          "/api/products",
          {
            method,
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              payload
            ),
          }
        );

      const result =
        await parseResponse<ApiErrorResponse>(
          response
        );

      if (!response.ok) {
        throw new Error(
          getApiErrorMessage(
            result,
            form.id
              ? "Failed to update product."
              : "Failed to create product."
          )
        );
      }

      /*
       * Refresh product list after
       * successful mutation.
       */
      await fetchProducts();

      showToast(
        "success",
        form.id
          ? "Product updated successfully."
          : "Product added successfully."
      );

      resetForm();
    } catch (error) {
      const message =
        getErrorMessage(
          error,
          "Failed to save product."
        );

      setPageError(message);

      showToast(
        "error",
        message
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     EDIT PRODUCT
  ======================================================= */

  const handleEdit = (
    product: Product
  ) => {
    if (
      saving ||
      deletingId
    ) {
      return;
    }

    setForm({
      id: product.id,
      name: product.name,
      price: String(
        product.price
      ),
      category: product.category ?? "",
      image: product.image,
      description:
        product.description ?? "",
    });

    setFile(null);
    setPreviewUrl("");
    setErrors({});
    setPageError("");

    if (
      previewUrlRef.current
    ) {
      URL.revokeObjectURL(
        previewUrlRef.current
      );

      previewUrlRef.current = "";
    }

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }

    setTimeout(() => {
      formRef.current?.scrollIntoView(
        {
          behavior: "smooth",
          block: "start",
        }
      );
    }, 50);
  };

  /* =======================================================
     DELETE PRODUCT
  ======================================================= */

  const confirmDelete =
    (product: Product) => {
      if (
        saving ||
        deletingId
      ) {
        return;
      }

      setDeleteProduct(product);
    };

  const handleDelete =
    async () => {
      if (
        !deleteProduct ||
        deletingId
      ) {
        return;
      }

      const product =
        deleteProduct;

      try {
        setDeletingId(
          product.id
        );
        setPageError("");

        const response =
          await fetch(
            "/api/products",
            {
              method: "DELETE",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                id: product.id,
              }),
            }
          );

        const result =
          await parseResponse<ApiErrorResponse>(
            response
          );

        if (!response.ok) {
          throw new Error(
            getApiErrorMessage(
              result,
              "Failed to delete product."
            )
          );
        }

        /*
         * Update local state immediately.
         */
        setProducts(
          (current) =>
            current.filter(
              (item) =>
                item.id !==
                product.id
            )
        );

        /*
         * If currently editing this
         * product, reset form.
         */
        if (
          form.id === product.id
        ) {
          resetForm();
        }

        setDeleteProduct(null);

        showToast(
          "success",
          "Product deleted successfully."
        );
      } catch (error) {
        const message =
          getErrorMessage(
            error,
            "Failed to delete product."
          );

        setPageError(message);

        showToast(
          "error",
          message
        );
      } finally {
        setDeletingId(null);
      }
    };

  /* =======================================================
     IMAGE BROKEN
  ======================================================= */

  const handleImageError = (
    productId: string
  ) => {
    setBrokenImages(
      (current) => {
        const next =
          new Set(current);

        next.add(productId);

        return next;
      }
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">
          <p className="text-sm font-semibold text-[#5fb3a9]">
            Admin Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Products
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your products, prices,
            images and descriptions.
          </p>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {pageError && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <div>
              <p className="font-semibold">
                Something went wrong
              </p>

              <p className="mt-1">
                {pageError}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setPageError("")
              }
              className="text-lg font-bold hover:text-red-900"
              aria-label="Close error"
            >
              ×
            </button>
          </div>
        )}

        {/* =================================================
            PRODUCT FORM
        ================================================= */}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          aria-busy={
            saving || uploading
          }
          className="mb-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8"
        >
          {/* FORM HEADER */}

          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {form.id
                  ? "Edit Product"
                  : "Add Product"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {form.id
                  ? "Update the product information below."
                  : "Add a new product to your catalog."}
              </p>
            </div>

            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5fb3a9]/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            {/* NAME */}

            <div>
              <label
                htmlFor="product-name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Product Name
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <input
                id="product-name"
                name="name"
                type="text"
                value={form.name}
                onChange={
                  handleInputChange
                }
                maxLength={
                  MAX_NAME_LENGTH
                }
                required
                autoComplete="off"
                placeholder="e.g. Premium Wooden Sofa"
                aria-invalid={
                  !!errors.name
                }
                aria-describedby={
                  errors.name
                    ? "product-name-error"
                    : undefined
                }
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${errors.name
                  ? "border-red-400 focus:ring-red-100"
                  : "border-gray-300 focus:border-[#5fb3a9] focus:ring-[#5fb3a9]/20"
                  }`}
              />

              {errors.name && (
                <p
                  id="product-name-error"
                  className="mt-1.5 text-sm text-red-600"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* PRICE */}

            <div>
              <label
                htmlFor="product-price"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Price
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>

                <input
                  id="product-price"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={
                    handleInputChange
                  }
                  min="0.01"
                  max={
                    MAX_PRICE
                  }
                  step="0.01"
                  inputMode="decimal"
                  required
                  placeholder="25000"
                  aria-invalid={
                    !!errors.price
                  }
                  aria-describedby={
                    errors.price
                      ? "product-price-error"
                      : undefined
                  }
                  className={`w-full rounded-lg border py-3 pl-9 pr-4 text-sm outline-none transition focus:ring-2 ${errors.price
                    ? "border-red-400 focus:ring-red-100"
                    : "border-gray-300 focus:border-[#5fb3a9] focus:ring-[#5fb3a9]/20"
                    }`}
                />
              </div>

              {errors.price && (
                <p
                  id="product-price-error"
                  className="mt-1.5 text-sm text-red-600"
                >
                  {errors.price}
                </p>
              )}
            </div>

            {/* CATEGORY */}

            <div>
              <label
                htmlFor="product-category"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Product Category
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <select
                id="product-category"
                name="category"
                value={form.category}
                onChange={(event) => {
                  setForm((current) => ({
                    ...current,
                    category: event.target.value,
                  }));

                  setErrors((current) => ({
                    ...current,
                    category: undefined,
                  }));
                }}


                required
                aria-invalid={!!errors.category}
                aria-describedby={
                  errors.category
                    ? "product-category-error"
                    : undefined
                }
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${errors.category
                  ? "border-red-400 focus:ring-red-100"
                  : "border-gray-300 focus:border-[#5fb3a9] focus:ring-[#5fb3a9]/20"
                  }`}
              >
                <option value="">
                  Select Product Category
                </option>

                {PRODUCT_CATEGORIES.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>

              {errors.category && (
                <p
                  id="product-category-error"
                  className="mt-1.5 text-sm text-red-600"
                >
                  {errors.category}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}

            <div className="lg:col-span-2">
              <label
                htmlFor="product-description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Product Description
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <textarea
                id="product-description"
                name="description"
                value={
                  form.description
                }
                onChange={
                  handleInputChange
                }
                rows={5}
                maxLength={
                  MAX_DESCRIPTION_LENGTH
                }
                required
                placeholder="Describe the product, material, features, dimensions, etc."
                aria-invalid={
                  !!errors.description
                }
                aria-describedby={
                  errors.description
                    ? "description-error"
                    : "description-help"
                }
                className={`w-full resize-y rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${errors.description
                  ? "border-red-400 focus:ring-red-100"
                  : "border-gray-300 focus:border-[#5fb3a9] focus:ring-[#5fb3a9]/20"
                  }`}
              />

              <div className="mt-1.5 flex justify-between gap-4">
                <div>
                  {errors.description ? (
                    <p
                      id="description-error"
                      className="text-sm text-red-600"
                    >
                      {
                        errors.description
                      }
                    </p>
                  ) : (
                    <p
                      id="description-help"
                      className="text-xs text-gray-500"
                    >
                      Maximum{" "}
                      {
                        MAX_DESCRIPTION_LENGTH
                      }{" "}
                      characters.
                    </p>
                  )}
                </div>

                <span className="text-xs text-gray-400">
                  {
                    form.description
                      .length
                  }
                  /
                  {
                    MAX_DESCRIPTION_LENGTH
                  }
                </span>
              </div>
            </div>

            {/* IMAGE */}

            <div className="lg:col-span-2">
              <label
                htmlFor="product-image"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Product Image
                {!form.id && (
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                )}
              </label>

              <input
                ref={fileInputRef}
                id="product-image"
                name="image"
                type="file"
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                onChange={
                  handleFileChange
                }
                aria-invalid={
                  !!errors.image
                }
                aria-describedby="image-help image-error"
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-700 outline-none file:mr-4 file:border-0 file:bg-[#5fb3a9] file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-[#4fa69c] focus:ring-2 focus:ring-[#5fb3a9]/20"
              />

              <p
                id="image-help"
                className="mt-2 text-xs text-gray-500"
              >
                JPG, JPEG or WEBP.
                Maximum 5 MB.
                {form.id &&
                  " Leave empty to keep the existing image."}
              </p>

              {errors.image && (
                <p
                  id="image-error"
                  className="mt-1.5 text-sm text-red-600"
                >
                  {errors.image}
                </p>
              )}

              {/* IMAGE PREVIEW */}

              {(previewUrl ||
                form.image) && (
                  <div className="mt-5 overflow-hidden rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
                      <p className="text-sm font-semibold text-gray-700">
                        {previewUrl
                          ? "New Image Preview"
                          : "Current Image"}
                      </p>

                      {file && (
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              previewUrlRef.current
                            ) {
                              URL.revokeObjectURL(
                                previewUrlRef.current
                              );

                              previewUrlRef.current =
                                "";
                            }

                            setPreviewUrl(
                              ""
                            );
                            setFile(null);

                            if (
                              fileInputRef.current
                            ) {
                              fileInputRef.current.value =
                                "";
                            }
                          }}
                          className="text-sm font-semibold text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="h-64 bg-gray-100 sm:h-80">
                      <img
                        src={
                          previewUrl ||
                          form.image
                        }
                        alt={
                          previewUrl
                            ? "New product image preview"
                            : "Current product image"
                        }
                        className="h-full w-full object-contain"
                        onError={() => {
                          if (
                            !previewUrl
                          ) {
                            setPageError(
                              "The existing product image could not be loaded."
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* FORM ACTIONS */}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel Edit
              </button>
            )}

            <button
              type="submit"
              disabled={
                saving ||
                uploading
              }
              aria-busy={
                saving ||
                uploading
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5fb3a9] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4fa69c] focus:outline-none focus:ring-2 focus:ring-[#5fb3a9]/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {(saving ||
                uploading) && (
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                    aria-hidden="true"
                  />
                )}

              {uploading
                ? "Uploading..."
                : saving
                  ? "Saving..."
                  : form.id
                    ? "Update Product"
                    : "Add Product"}
            </button>
          </div>
        </form>

        {/* =================================================
            PRODUCT LIST HEADER
        ================================================= */}

        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Product List
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Showing{" "}
              {
                filteredProducts.length
              }{" "}
              of{" "}
              {products.length}{" "}
              products
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* SEARCH */}

            <div className="relative">
              <label
                htmlFor="product-search"
                className="sr-only"
              >
                Search products
              </label>

              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search products..."
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#5fb3a9] focus:ring-2 focus:ring-[#5fb3a9]/20 sm:w-64"
              />
            </div>

            {/* SORT */}

            <div>
              <label
                htmlFor="product-sort"
                className="sr-only"
              >
                Sort products
              </label>

              <select
                id="product-sort"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target
                      .value as SortOption
                  )
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#5fb3a9] focus:ring-2 focus:ring-[#5fb3a9]/20 sm:w-52"
              >
                <option value="newest">
                  Newest
                </option>

                <option value="oldest">
                  Oldest
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="name-az">
                  Name: A-Z
                </option>

                <option value="name-za">
                  Name: Z-A
                </option>
              </select>
            </div>

            {/* REFRESH */}

            <button
              type="button"
              onClick={() =>
                void fetchProducts()
              }
              disabled={loading}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Loading..."
                : "Refresh"}
            </button>
          </div>
        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <div className="h-56 bg-gray-200" />

                <div className="space-y-4 p-5">
                  <div className="h-5 rounded bg-gray-200" />

                  <div className="h-5 w-1/3 rounded bg-gray-200" />

                  <div className="h-12 rounded bg-gray-200" />

                  <div className="flex gap-2">
                    <div className="h-10 flex-1 rounded bg-gray-200" />
                    <div className="h-10 flex-1 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length ===
          0 ? (
          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
              🛋️
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              {products.length ===
                0
                ? "No products found"
                : "No matching products"}
            </h3>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              {products.length ===
                0
                ? "No products found. Add your first product to get started."
                : "Try changing your search or sorting options."}
            </p>

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                className="mt-5 rounded-lg bg-[#5fb3a9] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4fa69c]"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          /* =================================================
             PRODUCT GRID
          ================================================= */

          <section
            aria-label="Product list"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProducts.map(
              (product) => {
                const imageBroken =
                  brokenImages.has(
                    product.id
                  );

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* IMAGE */}

                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      {imageBroken ||
                        !product.image ? (
                        <div className="flex h-full flex-col items-center justify-center text-gray-400">
                          <span className="text-4xl">
                            🖼️
                          </span>

                          <span className="mt-2 text-sm">
                            Image unavailable
                          </span>
                        </div>
                      ) : (
                        <img
                          src={
                            product.image
                          }
                          alt={`${product.name} product image`}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          onError={() =>
                            handleImageError(
                              product.id
                            )
                          }
                        />
                      )}
                    </div>

                    {/* CONTENT */}

                    <div className="p-5">
                      <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold text-gray-900">
                        {
                          product.name
                        }
                      </h3>

                      {product.category && (
                        <div className="mt-2">
                          <span className="inline-flex items-center rounded-full bg-[#5fb3a9]/10 px-3 py-1 text-xs font-semibold text-[#4d9d94]">
                            {product.category}
                          </span>
                        </div>
                      )}

                      <p className="mt-2 text-xl font-bold text-[#e0b15c]">
                        {formatPrice(
                          product.price
                        )}
                      </p>

                      <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-500">
                        {product.description ||
                          "No description available."}
                      </p>

                      {/* ACTIONS */}

                      <div className="mt-5 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(
                              product
                            )
                          }
                          disabled={
                            saving ||
                            !!deletingId
                          }
                          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            confirmDelete(
                              product
                            )
                          }
                          disabled={
                            saving ||
                            !!deletingId
                          }
                          className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId ===
                            product.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </section>
        )}
      </div>

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ====================================================== */}

      {deleteProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="presentation"
          onMouseDown={(
            event
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setDeleteProduct(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-product-title"
            aria-describedby="delete-product-description"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl">
              ⚠️
            </div>

            <h2
              id="delete-product-title"
              className="mt-5 text-xl font-bold text-gray-900"
            >
              Delete Product?
            </h2>

            <p
              id="delete-product-description"
              className="mt-2 text-sm leading-6 text-gray-500"
            >
              Are you sure you want to
              delete{" "}
              <strong className="font-semibold text-gray-900">
                {deleteProduct.name}
              </strong>
              ? This action cannot be
              undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setDeleteProduct(
                    null
                  )
                }
                disabled={
                  !!deletingId
                }
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                ref={
                  deleteButtonRef
                }
                type="button"
                onClick={() =>
                  void handleDelete()
                }
                disabled={
                  !!deletingId
                }
                aria-busy={
                  !!deletingId
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId && (
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                    aria-hidden="true"
                  />
                )}

                {deletingId
                  ? "Deleting..."
                  : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          TOAST
      ====================================================== */}

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-5 right-5 z-[60] flex max-w-sm items-start gap-3 rounded-xl border p-4 shadow-xl ${toast.type ===
            "success"
            ? "border-green-200 bg-green-50 text-green-800"
            : "border-red-200 bg-red-50 text-red-800"
            }`}
        >
          <span className="text-lg">
            {toast.type ===
              "success"
              ? "✓"
              : "!"}
          </span>

          <div className="flex-1">
            <p className="text-sm font-semibold">
              {toast.type ===
                "success"
                ? "Success"
                : "Error"}
            </p>

            <p className="mt-1 text-sm">
              {toast.message}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setToast(null)
            }
            aria-label="Close notification"
            className="text-lg opacity-60 transition hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}