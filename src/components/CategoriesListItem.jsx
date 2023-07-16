import React from "react";

export default function CategoriesListItem({ category }) {
    return (
        <div className="border rounded px-5 py-4 bg-white">{category.name}</div>
    );
}
