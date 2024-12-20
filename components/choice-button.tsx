export default function ChoiceButton({
    icon,
    children,
    href,
}: {
    icon: string;
    href: string;
    children: string;
}) {
    return (
        <a
            className="grid bg-red-800 px-2 py-8 font-bold rounded-xl hover:bg-red-900 transition duration-150 hover:cursor-pointer"
            href={href}
        >
            <i className={`bi bi-${icon} text-4xl mb-4`}></i>
            {children}
        </a>
    );
}
