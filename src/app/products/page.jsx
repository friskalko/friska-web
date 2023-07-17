"use client";
import ProductForm from "@/components/ProductForm";
import Spinner from "@/components/Spinner";
import { getAllCategories, getAllProducts } from "@/firebase/helpers";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
function Products() {
    const [formOpen, setFormOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState([]);
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const respCat = await getAllCategories();

                const tempCategoriesMap = {};
                respCat.forEach((cat) => {
                    tempCategoriesMap[cat.id] = cat.name;
                });
                setCategoriesMap(tempCategoriesMap);

                setCategories(respCat);
            } catch (error) {
                console.log(error);
            } finally {
            }
        })();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const resp = await getAllProducts();
            setProducts(resp);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <button
                onClick={() => setFormOpen(!formOpen)}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-500 font-semibold"
            >
                {formOpen ? "Close form" : "Add a new product"}
            </button>

            {formOpen && (
                <ProductForm onClose={setFormOpen} categories={categories} />
            )}

            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col items-stretch gap-5 my-5">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            categoriesMap={categoriesMap}
                            categories={categories}
                        />
                    ))}
                </div>
            )}

            {!loading && products.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-5 my-5">
                    <p className="text-2xl font-semibold text-gray-800">
                        No products found
                    </p>
                    <p className="text-gray-500">
                        Add a new product to get started
                    </p>
                </div>
            )}
        </>
    );
}

export default Products;

const ProductCard = ({ product, categoriesMap, categories }) => {
    const [editFormOpen, setEditFormOpen] = useState(false);

    return (
        <>
            <div className="flex  items-stretch justify-between bg-white rounded-md shadow-md ">
                {product.image && (
                    <Image
                        width={100}
                        height={100}
                        className="object-cover rounded-l-md h-20 w-auto "
                        src={product.image}
                        alt="Product Image"
                        loading="lazy"
                    />
                )}

                <div className="w-full p-4 py-2">
                    <p className="text-lg font-medium text-gray-800 truncate">
                        {product.name}
                    </p>
                    <p className="text-gray-500 font-light text-md">
                        {categoriesMap[product.category]}
                    </p>
                </div>
                <div
                    className="flex items-center bg-blue-600 rounded-r-md cursor-pointer"
                    onClick={() => {
                        setEditFormOpen(!editFormOpen);
                    }}
                >
                    <GoKebabHorizontal className="text-2xl  text-white rotate-90" />
                </div>
            </div>
            {editFormOpen && (
                <ProductForm
                    onClose={setEditFormOpen}
                    categories={categories}
                    edit
                    product={product}
                />
            )}
        </>
    );
};
