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
            <CategoryFrom />

            <ProductForm />
        </>
    );
}

export async function GET() {
    console.log("GET");
}
