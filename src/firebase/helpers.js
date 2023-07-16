"use client";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    getDoc,
} from "firebase/firestore";
import { categoriesCollection, productsCollection } from "./collections";
import { convertToCapitalWordsString } from "@/utils";
import { firebaseStorage } from "./config";

import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function addProduct(product) {}

async function uploadImageFile(file) {
    if (!file) return null;

    const uniqueFileName = `${uuidv4()}${file.name.substring(
        file.name.lastIndexOf(".")
    )}`;

    const fileRef = ref(firebaseStorage, `products/${uniqueFileName}`);
    await uploadBytes(fileRef, file);
    const fileDownloadUrl = await getDownloadURL(fileRef);
    return fileDownloadUrl;
}

export async function getProduct(productId) {
    const docRef = doc(productsCollection, productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw new Error("Product not found.");
    }
}
export async function createProduct(product) {
    const fileDownloadUrl = await uploadImageFile(product.image);
    console.log(fileDownloadUrl);
    const productData = {
        ...product,
    };

    return null;
}

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

    return categories;
    // return categories;
}
