import CategoryForm from "@/components/CategoryForm";
import CategoriesList from "@/components/CategoriesList";

import React from "react";

async function Categories() {
    return (
        <>
            <CategoryForm />
            <h1 className="text-3xl text-center font-semibold my-5">
                Categories
            </h1>
            <CategoriesList />
        </>
    );
}

export default Categories;
