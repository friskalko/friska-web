"use client";
import { ref, push, update, remove, get, child, set } from "firebase/database";
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
    deleteObject,
} from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
import { convertToCapitalWordsString } from "@/utils";
import {
    productsRef,
    categoriesRef,
    dbRef,
    CATEGORIES,
    PRODUCTS,
} from "./collections";

import { v4 as uuidv4 } from "uuid";
import { firebaseStorage } from "./config";

async function uploadImageFile(file) {
    if (!file) return null;

    const uniqueFileName = uuidv4();

    const fileRef = storageRef(firebaseStorage, `products/${uniqueFileName}`);
    await uploadBytes(fileRef, file);
    const fileDownloadUrl = await getDownloadURL(fileRef);
    return fileDownloadUrl;
}

async function deleteImageFile(fileUrl) {
    if (!fileUrl) return null;

    const fileRef = storageRef(firebaseStorage, fileUrl);
    await deleteObject(fileRef);
}

export async function getAllProducts() {
    const snapshot = await get(child(...productsRef));

    const products = [];
    if (snapshot.exists()) {
        Object.entries(snapshot.val()).forEach(([productId, productData]) => {
            const product = {
                id: productId,
                ...productData,
            };
            products.push(product);
        });
    }

    return products;
}

export async function getProduct(productId) {
    const productSnapshot = await get(child(...productsRef, productId));

    if (productSnapshot.exists()) {
        return productSnapshot.val();
    } else {
        throw new Error("Product not found.");
    }
}

export async function createProduct(product) {
    const fileDownloadUrl = await uploadImageFile(product.image);
    const productData = {
        ...product,
        image: fileDownloadUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };

    const newProductRef = push(child(dbRef, PRODUCTS));
    await set(child(dbRef, `${PRODUCTS}/${newProductRef.key}`), productData);

    return newProductRef.key;
}

export async function updateProduct(productId, product, oldProduct) {
    if (product.image instanceof File) {
        deleteImageFile(oldProduct.image);

        const fileDownloadUrl = await uploadImageFile(product.image);
        product.image = fileDownloadUrl;
    }

    product.updatedAt = serverTimestamp();
    await update(child(dbRef, `${PRODUCTS}/${productId}`), product);
}

export async function deleteProduct(productId, product) {
    if (product.image) {
        deleteImageFile(product.image);
    }

    await remove(child(productsRef, productId));
}

export async function createCategory(categoryName) {
    const text = convertToCapitalWordsString(categoryName);

    const querySnapshot = await get(child(dbRef, `${CATEGORIES}`));

    const categoryExist = Object.values(querySnapshot.val()).find(
        (cat) => cat.name.toLowerCase() === text.toLowerCase()
    );

    if (categoryExist) {
        throw new Error("Category already exists.");
    }

    const newCategoryRef = push(child(dbRef, CATEGORIES));
    await set(child(dbRef, `${CATEGORIES}/${newCategoryRef.key}`), {
        name: text,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}

export async function updateCategory(categoryId, categoryName) {
    const text = convertToCapitalWordsString(categoryName);
    console.log(categoryId);
    const querySnapshot = await get(
        child(dbRef, `${CATEGORIES}/${categoryId}`)
    );

    console.log(querySnapshot.val());

    if (
        (querySnapshot.exists() && querySnapshot.key !== categoryId) ||
        querySnapshot.val().name === text
    ) {
        throw new Error("Category already exists.");
    }

    await update(child(dbRef, `${CATEGORIES}/${categoryId}`), {
        name: text,
        updatedAt: serverTimestamp(),
    });
}

export async function getAllCategories() {
    const snapshot = await get(child(...categoriesRef));

    const categories = [];
    if (snapshot.exists()) {
        Object.entries(snapshot.val()).forEach(([categoryId, categoryData]) => {
            const category = {
                id: categoryId,
                ...categoryData,
            };
            categories.push(category);
        });
    }

    return categories;
}
