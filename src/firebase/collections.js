"use client";

import { child, ref } from "firebase/database";
import { database } from "./config";

// Assuming you have a root reference for your database
export const dbRef = ref(database);
const rootRef = ref(database);

// Define references to your collections
export const productsRef = [rootRef, "products"];
export const categoriesRef = [rootRef, "categories"];

export const CATEGORIES = "categories";
export const PRODUCTS = "products";
