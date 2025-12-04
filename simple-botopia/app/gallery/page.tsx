const galleryItems = [
    { title: "Hydraulic Power Packs", tag: "Hydraulic Systems" },
    { title: "Hydraulic Presses", tag: "Hydraulic Machines" },
    { title: "Hydraulic Test Rigs", tag: "Testing & R&D" },
    { title: "Hydraulic Special Purpose Machines", tag: "Custom SPMs" },
    { title: "Hydraulic Cylinders", tag: "Actuators" },
    { title: "Hydraulic Scissor Lifts", tag: "Material Handling" },
    { title: "Hydraulic Fixtures", tag: "Tooling & Fixtures" },
    { title: "Production of Press Components", tag: "Components" },
    { title: "Electrical Control Panels", tag: "Control Panels" },
    { title: "PLC Based Automation Panels", tag: "Automation" },
    { title: "Drives Panels", tag: "Drives & Motion" },
    { title: "Instrumentation Panels", tag: "Instrumentation" },
    { title: "Generator Control Panels", tag: "Power" },
    { title: "PCC Panels", tag: "Power Control" },
    { title: "MCC Panels", tag: "Motor Control" },
    { title: "Synchronizing Panels", tag: "Power Management" },
    { title: "Automatic P.F. Correction Panels", tag: "Power Factor" },
    { title: "Power Distribution Board (PDB)", tag: "Distribution" },
    { title: "MIMIC Panels", tag: "Monitoring" },
    { title: "Stainless Steel Control Panels", tag: "Hygienic / SS" },
];

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
                {/* Heading */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300">
                            Gallery
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
                            Products We Manufacture
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                            A visual overview of key products and solutions manufactured by
                            Paramount Hydraulics. These tiles represent typical machines,
                            panels, and systems supplied to our clients.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-2 text-[0.7rem] text-slate-400 md:items-end">
                        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1">
                            <span className="h-2 w-2 rounded-full bg-sky-400" />
                            <span className="font-semibold text-sky-100">
                                Gallery view – 3 per row
                            </span>
                        </div>
                        <p>Later, you can replace these with real product photos.</p>
                    </div>
                </div>

                {/* Gradient Card Wrapper */}
                <div className="rounded-[1.75rem] bg-gradient-to-br from-sky-500/20 via-slate-900 to-slate-950 p-[1px] shadow-2xl shadow-sky-950/60">
                    <div className="rounded-[1.65rem] border border-slate-900 bg-slate-950/90 p-6 md:p-8">
                        {/* Card Header */}
                        <div className="mb-6 flex flex-col gap-3 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Product Gallery
                                </p>
                                <p className="mt-1 text-[0.8rem] text-slate-400">
                                    Each tile below can later be replaced with an actual product
                                    photograph, while keeping the same layout and styling.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 text-[0.7rem]">
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                                    Hydraulic Systems
                                </span>
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                                    Control Panels
                                </span>
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                                    Custom Machinery
                                </span>
                            </div>
                        </div>

                        {/* Gallery Grid – 3 in a row on desktop */}
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {galleryItems.map((item) => (
                                <div
                                    key={item.title}
                                    className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-md shadow-slate-950/70 transition hover:-translate-y-1 hover:border-sky-500/70 hover:shadow-xl hover:shadow-sky-900/70"
                                >
                                    {/* Fake image area */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-500/20 via-slate-950 to-slate-900 text-center text-xs text-slate-100 transition duration-200 group-hover:scale-[1.03] group-hover:brightness-110">
                                            <span className="px-4">
                                                {item.title}
                                                <br />
                                                <span className="mt-1 block text-[0.65rem] text-slate-300">
                                                    {item.tag}
                                                </span>
                                            </span>
                                        </div>

                                        {/* Overlay corner accent */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/0 via-sky-500/5 to-sky-400/15 opacity-0 transition group-hover:opacity-100" />
                                    </div>

                                    {/* Caption bar */}
                                    <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/90 px-3 py-2">
                                        <span className="text-[0.7rem] font-medium text-slate-200">
                                            {item.title}
                                        </span>
                                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/20 text-[0.7rem] text-sky-300">
                                            ➜
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer note */}
                        <p className="mt-6 text-[0.7rem] text-slate-500">
                            To use actual images, place your files in the{" "}
                            <code className="rounded bg-slate-900 px-1">public/</code> folder and
                            replace the gradient blocks above with the Next.js{" "}
                            <code className="rounded bg-slate-900 px-1">Image</code> component
                            pointing to your product photos.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
