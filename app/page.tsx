import ChoiceButton from "@/components/choice-button";

export default function Home() {
    return (
        <main className="w-screen grid justify-center mt-4 lg:mt-12">
            <div className="text-center max-w-screen-md">
                <h1 className="text-5xl font-bold">Welkom, feut!</h1>
                <p className="mt-4">
                    Heeft u automatisch inschrijven niet aanstaan en heeft u
                    zich vergeten in te schrijven? Of is de kroeg op donderdag
                    toch niet uw tweede thuis? Dan vindt u hier de oplossing.
                </p>
                <div className="grid grid-cols-2 place-content-center max-w-screen-md gap-8 mt-8">
                    <ChoiceButton icon="box-arrow-in-down" href="/dibs">
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
