"use client";
import Image from "next/image";
import ProductForm from "@/components/ProductForm";
import CategoryFrom from "@/components/CategoryForm";
import { createCategory, getAllCategories } from "@/firebase/helpers";
import Layout from "@/components/Layout";
export default function Home() {
    const submitData = async (e) => {
        e.preventDefault();
        try {
            const resp = await createCategory(e.target.name.value);
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <h1 className="text-3xl text-white font-bold p-10 bg-blue-600 text-center">
                G1 Aqua DASHBOARD
            </h1>
        </>
    );
}
