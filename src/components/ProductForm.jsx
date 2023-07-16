"use client";

import { getAllCategories, createProduct } from "@/firebase/helpers";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductForm({ onClose }) {
    const [categories, setCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        try {
            (async () => {
                const respCat = await getAllCategories();
                console.log(respCat);
                setCategories(respCat);
            })();
        } catch (error) {
            console.log(error);
        } finally {
        }
    }, []);

    function submitFormHandler(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const productData = {
            name: formData.get("name"),
            summary: formData.get("summary"),
            description: formData.get("description"),
            category: formData.get("category"),
            image: imageFile,
        };

        try {
            (async () => {
                const resp = await createProduct(productData);
                console.log(resp);
            })();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form
                className="max-w-2xl my-5 mx-auto border border-gray-200 rounded-lg px-5 py-7 bg-white"
                onSubmit={submitFormHandler}
            >
                <h1 className="text-3xl font-semibold text-center mb-4 text-gray-600">
                    Add new product
                </h1>
                <div className="form__grp">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" required />
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
                <SpecificationsInput />

                {/* IMAGE  UPLOAD INPUT  */}
                <div className="form__grp">
                    <label htmlFor="Image">Product Image</label>
                    <input
                        type="file"
                        name="image"
                        required
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    {imageFile && (
                        <div>
                            <p className="text-center text-white rounded py-1 font-bold my-2 bg-blue-500">
                                Image Preview
                            </p>
                            <Image
                                height={200}
                                width={200}
                                src={URL.createObjectURL(imageFile)}
                                alt="Product Image"
                                className="w-auto max-h-40 object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* FORM CONTROL BUTTONS  */}
                <div className="form__grp">
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => onClose(false)}
                            type="reset"
                            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-500 font-semibold"
                        >
                            Close Form
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-500 font-semibold"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

const SpecificationsInput = () => {
    const [propertyCnt, setPropertyCnt] = useState(1);

    return (
        <div className="form__grp">
            <label htmlFor="Property">Specifications</label>
            {Array.from({ length: propertyCnt }).map((_, i) => (
                <div key={i} className="flex gap-2">
                    <input
                        type="text"
                        name="key"
                        placeholder="Specification Name"
                    />
                    <input
                        type="text"
                        name="value"
                        placeholder="Specification Value"
                    />
                </div>
            ))}
            <span
                className="bg-blue-600 px-2 py-1 text-white text-sm cursor-pointer font-semibold rounded hover:bg-blue-500 mx-2 self-start"
                type="increase"
                onClick={() => setPropertyCnt(propertyCnt + 1)}
            >
                Add Field +
            </span>
        </div>
    );
};
