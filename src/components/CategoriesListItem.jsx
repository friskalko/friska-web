import React, { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import CategoryForm from "./CategoryForm";

export default function CategoriesListItem({ category }) {
    const [editFormOpen, setEditFormOpen] = useState(false);
    return (
        <>
            <div className="border rounded px-5 py-4 bg-white flex items-center justify-between">
                <p>{category.name}</p>

                <span
                    className="cursor-pointer"
                    onClick={() => setEditFormOpen(!editFormOpen)}
                >
                    <GoKebabHorizontal className="text-2xl  text-blue-600 rotate-90" />
                </span>
            </div>

            {editFormOpen && (
                <CategoryForm
                    onClose={setEditFormOpen}
                    edit
                    category={category}
                />
            )}
        </>
    );
}
