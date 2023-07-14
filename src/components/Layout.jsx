import React from "react";
import { FaHome } from "react-icons/fa";
import {
    AiOutlineShoppingCart,
    AiOutlineHome,
    AiOutlineMail,
    AiOutlineFolderOpen,
} from "react-icons/ai";

import LinkItem from "./LinkItem";
export default function Layout({ children }) {
    return (
        <div className="grid grid-cols-[250px,1fr] grid-rows-[50px,1fr] w-full h-full">
            <div id="sidebar" className="h-full row-span-full border-r">
                <h1 className="text-5xl font-semibold text-center my-10 text-blue-600">
                    Friska
                </h1>
                <ul className="flex flex-col gap-5 px-5">
                    <LinkItem
                        href="/"
                        icon={<AiOutlineHome />}
                        label={"Dashboard"}
                    />
                    <LinkItem
                        href="/products"
                        icon={<AiOutlineShoppingCart />}
                        label={"Products"}
                    />
                    <LinkItem
                        href="/categories"
                        icon={<AiOutlineFolderOpen />}
                        label={"Categories"}
                    />
                    <LinkItem
                        href="/enquiries"
                        icon={<AiOutlineMail />}
                        label={"Enquiries"}
                    />
                </ul>
            </div>

            <div
                id="header"
                className="col-start-2 col-end-[-1] border-b"
            ></div>

            <div id="content" className="overflow-scroll bg-zinc-50 p-4">
                {children}
            </div>
        </div>
    );
}
