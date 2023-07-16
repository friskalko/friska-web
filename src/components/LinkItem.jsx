"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkItem({ href, label, icon }) {
    const pathname = usePathname();

    const bgColor = pathname === href ? "bg-zinc-100" : "";
    const textColor = pathname === href ? "text-blue-600" : "text-gray-400";
    return (
        <li className={``}>
            <Link
                href={href}
                className={`flex gap-4 items-center text-lg font-medium text-gray-700  px-4 py-2 rounded ${bgColor} hover:bg-zinc-100`}
            >
                <span className={`text-2xl  ${textColor}`}>{icon}</span>
                <span>{label}</span>
            </Link>
        </li>
    );
}
