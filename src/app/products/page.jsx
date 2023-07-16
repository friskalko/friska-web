"use client";
import ProductForm from "@/components/ProductForm";
import React, { useState } from "react";

function Products() {
    const [formOpen, setFormOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setFormOpen(!formOpen)}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-500 font-semibold"
            >
                {formOpen ? "Close form" : "Add a new product"}
            </button>

            {formOpen && <ProductForm onClose={setFormOpen} />}
        </>
    );
}

export default Products;
