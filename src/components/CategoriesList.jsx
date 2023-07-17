"use client";
import React, { useCallback, useEffect, useState } from "react";

import { getAllCategories } from "@/firebase/helpers";
import CategoriesListItem from "@/components/CategoriesListItem";
import Spinner from "@/components/Spinner";

export default function CategoriesList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    function wait(seconds) {
        return new Promise((resolve) => {
            setTimeout(resolve, seconds * 1000);
        });
    }

    useEffect(() => {
        async function fetchCategories() {
            setLoading((prev) => true);
            try {
                const respCat = await getAllCategories();
                setCategories(respCat);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    return (
        <div className="flex gap-2 flex-col items-stretch h-10">
            {loading ? (
                <Spinner />
            ) : (
                categories.map((category) => (
                    <CategoriesListItem key={category.id} category={category} />
                ))
            )}

            {!loading && categories.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-5 my-5">
                    <p className="text-2xl font-semibold text-gray-800">
                        No Categories found
                    </p>
                    <p className="text-gray-500">
                        Add a new category to get started
                    </p>
                </div>
            )}
        </div>
    );
}
