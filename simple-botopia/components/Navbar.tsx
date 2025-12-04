import Link from "next/link";

const navItems = [
    { label: "HOME", href: "/" },
    { label: "ONLINE ENQUIRY", href: "/online-enquiry" },
    { label: "CLIENTS", href: "/clients" },
    { label: "SERVICES", href: "/services" },
    { label: "PRODUCTS", href: "/products" },
    { label: "GALLERY", href: "/gallery" },
    { label: "Contact Us", href: "/contact-us" },
];

export default function Navbar() {
    return (
        <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400 shadow-md shadow-sky-900/60">
                        <span className="text-[0.65rem] font-extrabold text-slate-950">
                            PH
                        </span>
                    </div>
                </Link>

                <div className="flex items-left gap-4 text-[0.75rem] font-semibold text-slate-200 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-full px-3 py-1.5 text-xs tracking-wide text-slate-200 transition hover:bg-sky-500/15 hover:text-sky-200"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}
