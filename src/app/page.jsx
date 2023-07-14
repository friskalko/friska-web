"use client";
import Image from "next/image";
import ProductForm from "@/components/ProductForm";
import { createCategory, getAllCategories } from "@/firebase/helpers";
export default async function Home() {
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
            <ProductForm />
        </>
    );
}

export async function GET() {
    console.log("GET");
}
