"use client";
import React, { useEffect, useState } from "react";

import { getAllCategories } from "@/firebase/helpers";
import CategoriesListItem from "@/components/CategoriesListItem";
import Spinner from "@/components/Spinner";

export default function CategoriesList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            setLoading(true);

            (async () => {
                const respCat = await getAllCategories();
                console.log(respCat);
                setCategories(respCat);
            })();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
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
        </div>
    );
}
