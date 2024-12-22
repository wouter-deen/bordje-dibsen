"use client";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
    collection,
    getDocs,
    query,
    where,
    Timestamp,
    doc,
    updateDoc,
} from "firebase/firestore";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

interface Bordje {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    available: boolean;
    date: Timestamp;
}

export default function Dibs() {
    const [bordjes, setBordjes] = useState<Bordje[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchBordjes();
    }, []);

    const fetchBordjes = async () => {
        try {
            const currentDate = new Date();
            const bordjesRef = collection(db, "bordjes");
            const q = query(
                bordjesRef,
                where("available", "==", true),
                where("date", ">=", Timestamp.fromDate(currentDate)),
            );

            const querySnapshot = await getDocs(q);
            setBordjes(
                querySnapshot.docs.map(
                    (doc) =>
                        ({
                            id: doc.id,
                            ...doc.data(),
                        }) as Bordje,
                ),
            );
        } catch (error) {
            console.error("Error fetching bordjes:", error);
            setBordjes([]);
        }
    };

    async function dibs(bordjeId: string) {
        try {
            const bordjeRef = doc(db, "bordjes", bordjeId);
            await updateDoc(bordjeRef, {
                available: false,
                claimedAt: Timestamp.now(),
            });
            const bordje = bordjes.find((b) => b.id === bordjeId);
            router.push(
                `/gedibst?firstName=${bordje?.firstName}&lastName=${bordje?.lastName}`,
            );
            await fetchBordjes();
            return true;
        } catch (error) {
            console.error("Error claiming bordje:", error);
            return false;
        }
    }

    return (
        <main className="w-screen grid justify-center mt-12 lg:mt-18">
            <div className="lg:w-[768px] mx-4">
                <h1 className="text-5xl font-bold">Bordje dibsen</h1>
                <p className="mt-4">
                    Hieronder zijn alle beschikbare bordjes te vinden.
                </p>
                {bordjes.length === 0 && (
                    <div className="mt-8 w-full text-center place-content-center">
                        <div className="bg-white rounded-lg px-8 py-4 w-fit">
                            <i
                                className={`bi bi-slash-circle text-4xl mb-4 text-red-500`}
                            ></i>
                            <p className="text-lg font-bold text-red-950">
                                Geen bordjes beschikbaar
                            </p>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-2 w-full gap-4 place-content-center mt-8">
                    {bordjes.map((bordje) => (
                        <div
                            key={bordje.id}
                            className="bg-white rounded-xl p-4 shadow-xl w-full"
                        >
                            <p className="text-lg font-bold text-black">
                                {bordje.firstName} {bordje.lastName}
                            </p>
                            <p className="text-sm text-neutral-500">
                                {bordje.email}
                            </p>
                            <Button
                                onClick={() => dibs(bordje.id)}
                                className="mt-4"
                            >
                                Dibsen
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
