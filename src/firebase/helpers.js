"use client";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    getDoc,
    setDoc,
    doc,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { categoriesCollection, productsCollection } from "./collections";
import { convertToCapitalWordsString } from "@/utils";
import { firebaseStorage } from "./config";

import { v4 as uuidv4 } from "uuid";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";

export async function getAllProducts() {
    const querySnapshot = await getDocs(
        query(productsCollection, orderBy("updatedAt", "desc"))
    );

    const products = [];
    querySnapshot.forEach((doc) => {
        const productData = doc.data();
        const productId = doc.id;
        const product = {
            id: productId,
            ...productData,
        };
        products.push(product);
    });

    return products;
}

async function uploadImageFile(file) {
    if (!file) return null;

    const uniqueFileName = uuidv4();

    const fileRef = ref(firebaseStorage, `products/${uniqueFileName}`);
    await uploadBytes(fileRef, file);
    const fileDownloadUrl = await getDownloadURL(fileRef);
    return fileDownloadUrl;
}

async function deleteImageFile(fileUrl) {
    if (!fileUrl) return null;

    const fileRef = ref(firebaseStorage, fileUrl);
    await deleteObject(fileRef);
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
        image: fileDownloadUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };

    console.log(productData);

    return await addDoc(productsCollection, productData);
}

export async function updateProduct(productId, product, oldProduct) {
    if (product.image instanceof File) {
        // delete old product.image
        //old product image is a string url
        deleteImageFile(oldProduct.image);

        // upload new product.image

        const fileDownloadUrl = await uploadImageFile(product.image);
        product.image = fileDownloadUrl;
    }

    product.updatedAt = serverTimestamp();
    return await setDoc(doc(productsCollection, productId), product);
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
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}

export async function updateCategory(categoryId, categoryName) {
    const text = convertToCapitalWordsString(categoryName);

    // Check if a document with the same name already exists
    const querySnapshot = await getDocs(
        query(categoriesCollection, where("name", "==", text))
    );

    if (querySnapshot.size > 0) {
        throw new Error("Category already exists.");
    }

    return await setDoc(
        doc(categoriesCollection, categoryId),
        {
            name: text,
            updatedAt: serverTimestamp(),
        },
        { merge: true }
    );
}

export async function getAllCategories() {
    const querySnapshot = await getDocs(
        query(categoriesCollection, orderBy("updatedAt", "desc"))
    );

    const categories = [];

    querySnapshot.forEach((doc) => {
        const category = doc.data();
        category.id = doc.id;
        categories.push(category);
    });

    return categories;
    // return categories;
}
