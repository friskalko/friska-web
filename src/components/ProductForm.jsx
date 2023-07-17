"use client";

import {
    getAllCategories,
    createProduct,
    updateProduct,
} from "@/firebase/helpers";
import { convertToCapitalWordsString } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductForm({ onClose, categories, edit, product }) {
    const [imageFile, setImageFile] = useState(product?.image || null);
    const [submitting, setSubmitting] = useState(false);

    async function submitFormHandler(e) {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData(e.target);

        const productData = {
            name: formData.get("name"),
            summary: formData.get("summary"),
            description: formData.get("description"),
            category: formData.get("category"),
            image: imageFile,
        };

        const specifications = [];
        for (let i = 0; i < formData.getAll("key").length; i++) {
            if (formData.getAll("key")[i].trim() === "") {
                continue;
            }
            specifications.push({
                key: convertToCapitalWordsString(formData.getAll("key")[i]),
                value: convertToCapitalWordsString(formData.getAll("value")[i]),
            });
        }
        productData.specifications = specifications;

        try {
            const resp = await (edit
                ? updateProduct(product.id, productData, product)
                : createProduct(productData));
            console.log(resp);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
        setSubmitting(false);
    }
    return (
        <>
            <form
                className="max-w-3xl min-w-[38rem] my-5 mx-auto border border-gray-200 rounded-lg px-5 py-7 bg-white"
                onSubmit={submitFormHandler}
            >
                <h1 className="text-3xl font-semibold text-center mb-4 text-gray-600">
                    {edit ? "Edit product" : "Add new product"}
                </h1>
                <div className="form__grp">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        required
                        defaultValue={edit ? product.name : ""}
                    />
                </div>
                <div className="form__grp">
                    <label htmlFor="summary">Summary</label>
                    <textarea
                        defaultValue={edit ? product.summary : ""}
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
                        defaultValue={edit ? product.description : ""}
                    ></textarea>
                </div>
                <div className="form__grp">
                    <label htmlFor="category">Category</label>
                    <select
                        name="category"
                        id="category"
                        defaultValue={edit ? product.category : ""}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <SpecificationsInput edit={edit} product={product} />

                {/* IMAGE  UPLOAD INPUT  */}
                <div className="form__grp">
                    <label htmlFor="Image">Product Image</label>
                    <input
                        type="file"
                        name="image"
                        required={edit ? product.image !== imageFile : true}
                        accept="image/*"
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
                                src={
                                    !edit
                                        ? URL.createObjectURL(imageFile)
                                        : imageFile == product?.image
                                        ? product?.image
                                        : URL.createObjectURL(imageFile)
                                }
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
                            disabled={submitting}
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-500 font-semibold  disabled:bg-gray-500 disabled:cursor-not-allowed"
                        >
                            {edit
                                ? submitting
                                    ? "Saving..."
                                    : "Save Changes"
                                : submitting
                                ? "Adding..."
                                : "Add Product"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
const SpecificationsInput = ({ edit, product }) => {
    const [specifications, setSpecifications] = useState(
        edit ? product?.specifications : [{ key: "", value: "" }]
    );
    const [propertyCnt, setPropertyCnt] = useState(specifications?.length || 1);

    const handleDelete = (index) => {
        setSpecifications((prevSpecs) => {
            const newSpecs = [...prevSpecs];
            newSpecs.splice(index, 1);
            return newSpecs;
        });
        setPropertyCnt((prevCount) => prevCount - 1);
    };

    const handleChange = (index, field, value) => {
        setSpecifications((prevSpecs) => {
            const newSpecs = [...prevSpecs];
            newSpecs[index][field] = value;
            return newSpecs;
        });
    };

    return (
        <div className="form__grp">
            <label htmlFor="Property">Specifications</label>

            {Array.from({ length: propertyCnt || 1 }).map((_, i) => (
                <div key={i} className="flex gap-2 items-center">
                    <input
                        value={specifications?.[i]?.key || ""}
                        type="text"
                        name="key"
                        placeholder="Specification Name"
                        onChange={(e) => handleChange(i, "key", e.target.value)}
                    />
                    <input
                        value={specifications?.[i]?.value || ""}
                        type="text"
                        name="value"
                        placeholder="Specification Value"
                        onChange={(e) =>
                            handleChange(i, "value", e.target.value)
                        }
                    />
                    <span
                        className="bg-red-600 px-2 py-1 text-white text-sm cursor-pointer font-semibold rounded hover:bg-red-500 mx-2 self-center"
                        type="decrease"
                        onClick={() => handleDelete(i)}
                    >
                        X
                    </span>
                </div>
            ))}
            <span
                className="bg-blue-600 px-2 py-1 text-white text-sm cursor-pointer font-semibold rounded hover:bg-blue-500 mx-2 self-start"
                type="increase"
                onClick={() => {
                    if (specifications?.[propertyCnt - 1]?.key === "") {
                        return;
                    }

                    setPropertyCnt(propertyCnt + 1);
                    setSpecifications((prevSpecs) => {
                        const newSpecs = [...prevSpecs];
                        newSpecs.push({ key: "", value: "" });
                        return newSpecs;
                    });
                }}
            >
                Add Field +
            </span>
        </div>
    );
};
