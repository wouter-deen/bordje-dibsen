import Image from "next/image";

export default function Bedankt() {
    return (
        <main className="w-screen grid justify-center mt-12 lg:mt-18">
            <div className="lg:w-[768px] mx-4">
                <h1 className="text-4xl font-bold text-center lg:text-left">
                    Je bordje wordt vergeven!
                </h1>
                <Image
                    src="/bedankt.webp"
                    alt="Bedankt"
                    width="500"
                    height="400"
                    className="mt-8"
                ></Image>
            </div>
        </main>
    );
}
