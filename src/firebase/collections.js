"use client";
import { firestore } from "./config";
import { collection } from "firebase/firestore";
export const productsCollection = collection(firestore, "products");
export const categoriesCollection = collection(firestore, "categories");
