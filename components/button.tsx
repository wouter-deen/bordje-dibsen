"use client";

import { useRouter } from "next/navigation";

export default function Button({
    icon,
    href,
    type,
    disabled,
    onClick,
    className,
    children,
}: {
    icon?: string;
    href?: string;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    children: string;
}) {
    const router = useRouter();
    return (
        <button
            className={`grid bg-red-800 px-4 py-2 font-bold rounded-md hover:bg-red-900 transition duration-150 hover:cursor-pointer text-center ${className}`}
            onClick={() =>
                href ? router.push(href) : onClick ? onClick() : null
            }
            disabled={disabled}
            type={type}
        >
            <i className={`bi bi-${icon} mr-4`}></i>
            {children}
        </button>
    );
}
