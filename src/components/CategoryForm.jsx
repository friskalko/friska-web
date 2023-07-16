"use client";

import { useState } from "react";
import { createCategory } from "@/firebase/helpers";
import Spinner from "./Spinner";
export default function CategoryForm() {
    const [submitting, setSubmitting] = useState(false);
    async function submitFormHandler(e) {
        e.preventDefault();
        try {
            setSubmitting(true);
            const respCat = await createCategory(e.target.name.value);
            console.log(respCat);
            window.location.reload();
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <form
                className="max-w-2xl mx-auto border border-gray-200 rounded-lg px-5 py-7 bg-white"
                onSubmit={submitFormHandler}
            >
                <h1 className="text-3xl font-semibold text-center mb-4 text-gray-600">
                    Add new category
                </h1>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        name="name"
                        className="flex-1"
                        required
                    />
                    <button
                        disabled={submitting}
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-500 font-semibold flex gap-2 items-stretch disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Adding" : "Add"}
                    </button>
                </div>
            </form>
        </>
    );
}
