"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Gedibst() {
    const [searchParams, setSearchParams] = useState<URLSearchParams>(
        new URLSearchParams(window.location.search),
    );
    const router = useRouter();
    useEffect(() => {
        setSearchParams(new URLSearchParams(window.location.search));
    }, [router]);

    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");
    return (
        <main className="w-screen grid justify-center mt-12 lg:mt-18">
            <div className="lg:w-[768px] mx-4">
                <h1 className="text-5xl font-bold text-center lg:text-left">
                    Gedibst!
                </h1>
                <p className="mt-4">
                    Je hebt het bordje gedibst van {firstName} {lastName}.
                </p>
                <Image
                    src="/gedibst.webp"
                    alt="Bedankt"
                    width="500"
                    height="400"
                    className="mt-8"
                ></Image>
            </div>
        </main>
    );
}
