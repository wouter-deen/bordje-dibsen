"use client";
import Button from "@/components/button";
import { db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    date: Date;
    available: boolean;
}

export default function Geef() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        date: new Date(),
        available: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const docRef = doc(collection(db, "bordjes"));
            formData.date = getNextThursday();
            formData.available = true;
            await setDoc(docRef, formData);
            console.log("Document written successfully!");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                date: new Date(),
                available: true,
            }); // Clear the form
            router.push("/bedankt");
        } catch (err) {
            console.error("Error writing document:", err);
            setError("There was an error submitting the form.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="w-screen grid justify-center mt-12 lg:mt-18">
            <div className="max-w-screen-md mx-4">
                <h1 className="text-5xl font-bold">Bordje weggeven</h1>
                <p className="mt-4">
                    Geef een bordje weg voor donderdag{" "}
                    {getNextThursday().getDate() +
                        " " +
                        getNextThursday().toLocaleString("nl-NL", {
                            month: "long",
                        })}
                    .
                </p>
                <form
                    className="flex flex-col mt-8 gap-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="firstName">Voornaam</label>
                        <input
                            type="text"
                            id="firstName"
                            className="border rounded-md px-3 py-2 text-black"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="lastName">Achternaam</label>
                        <input
                            type="text"
                            id="lastName"
                            className="border rounded-md px-3 py-2 text-black"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">E-mailadres</label>
                        <input
                            type="email"
                            id="email"
                            className="border rounded-md px-3 py-2 text-black"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <Button type="submit" disabled={loading}>
                        {loading ? "Laden..." : "Doneren"}
                    </Button>
                </form>
            </div>
        </main>
    );
}

// Als het vandaag donderdag is, geeft hij vandaag aan als volgende donderdag
function getNextThursday(): Date {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilThursday = (4 - dayOfWeek + 7) % 7; // 4 is donderdag

    const nextThursday = new Date(today);
    nextThursday.setDate(
        today.getDate() + (daysUntilThursday === 0 ? 0 : daysUntilThursday),
    );

    nextThursday.setHours(23, 59, 59, 999);

    return nextThursday;
}
