"use client";

import { getAllCategories } from "@/firebase/helpers";
import { useState } from "react";

export default async function ProductForm() {
    const categories = await getAllCategories();

    return (
        <>
            <form
                className="max-w-2xl mx-auto border border-gray-200 rounded-lg px-5 py-7 bg-white"
                onSubmit={(e) => e.preventDefault()}
            >
                <h1 className="text-3xl font-semibold text-center mb-4 text-gray-600">
                    Add new product
                </h1>
                <div className="form__grp">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" />
                </div>
                <div className="form__grp">
                    <label htmlFor="summary">Summary</label>
                    <textarea
                        name="summary"
                        id="summary"
                        cols="25"
                        rows="2"
                    ></textarea>
                </div>
                <div className="form__grp">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        cols="25"
                        rows="3"
                    ></textarea>
                </div>
                <div className="form__grp">
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category">
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <PropertyInput />
                <div className="form__grp">
                    <label htmlFor="Image">Product Image</label>
                    <input type="file" name="image" />
                </div>
                <div className="form__grp">
                    <div className="flex justify-center gap-2">
                        <button
                            type="reset"
                            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-500 font-semibold"
                        >
                            Reset Form
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-500 font-semibold"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

const PropertyInput = () => {
    const [propertyCnt, setPropertyCnt] = useState(1);

    return (
        <div className="form__grp">
            <label htmlFor="Property">Property</label>
            {Array.from({ length: propertyCnt }).map((_, i) => (
                <div key={i} className="flex gap-2">
                    <input type="text" name="key" placeholder="Property Name" />
                    <input
                        type="text"
                        name="value"
                        placeholder="Property Value"
                    />
                </div>
            ))}
            <span
                className="bg-blue-600 px-2 py-1 text-white text-sm cursor-pointer font-semibold rounded-md hover:bg-blue-500 mx-2 self-start"
                type="increase"
                onClick={() => setPropertyCnt(propertyCnt + 1)}
            >
                Add Field +
            </span>
        </div>
    );
};
