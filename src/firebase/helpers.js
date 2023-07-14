"use client";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { categoriesCollection } from "./collections";
import { convertToCapitalWordsString } from "@/utils";
function addProduct(product) {}

export async function createCategory(categoryName) {
    const text = convertToCapitalWordsString(categoryName);

    // Check if a document with the same name already exists
    const querySnapshot = await getDocs(
        query(categoriesCollection, where("name", "==", text))
    );

    if (querySnapshot.size > 0) {
        throw new Error("Category already exists.");
    }

    return await addDoc(categoriesCollection, {
        name: text,
    });
}

export async function getAllCategories() {
    const querySnapshot = await getDocs(categoriesCollection);

    const categories = [];
    querySnapshot.forEach((doc) => {
        const category = doc.data();
        category.id = doc.id;
        categories.push(category);
    });

    console.log(categories);
    return categories;
    // return categories;
}
