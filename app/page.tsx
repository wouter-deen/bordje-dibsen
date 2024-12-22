"use client";
import ChoiceButton from "@/components/choice-button";
import {
    collection,
    getDocs,
    query,
    Timestamp,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function Home() {
    const [bordjesCount, setBordjesCount] = useState<number>(0);

    useEffect(() => {
        const fetchBordjesCount = async () => {
            try {
                const currentDate = new Date();
                const bordjesRef = collection(db, "bordjes");
                const q = query(
                    bordjesRef,
                    where("available", "==", true),
                    where("date", ">=", Timestamp.fromDate(currentDate)),
                );

                const querySnapshot = await getDocs(q);
                setBordjesCount(querySnapshot.size);
            } catch (error) {
                console.error("Error fetching bordjes count:", error);
            }
        };

        fetchBordjesCount();
    }, []);

    return (
        <main className="w-screen grid justify-center mt-12 lg:mt-18">
            <div className="max-w-screen-md mx-4">
                <h1 className="text-5xl font-bold">Hey, feut!</h1>
                <p className="mt-4">
                    Heb je automatisch inschrijven uit staan en ben je je
                    vergeten in te schrijven? Of is de kroeg op donderdag toch
                    niet jouw tweede thuis? Dan vind je hier de oplossing.
                </p>
                <div className="grid grid-cols-2 place-content-center max-w-screen-md gap-8 mt-8">
                    <ChoiceButton icon="box-arrow-in-down" href="/dibs">
                        <span className="absolute right-0 bg-red-500 px-2 rounded-bl-md rounded-tr-md">
                            {bordjesCount}
                        </span>
                        Bordje dibsen
                    </ChoiceButton>
                    <ChoiceButton icon="gift" href="/geef">
                        Bordje weggeven
                    </ChoiceButton>
                </div>
            </div>
        </main>
    );
}
