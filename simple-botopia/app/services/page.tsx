const services = [
    "Hydraulic Test Rig",
    "Hydraulic Press.",
    "Hydraulic Power Pack.",
    "Hydraulic Scissor Lift.",
    "Hydraulic SPMs.",
    "Hydraulic Cylinders.",
    "Reconditioning of Hydraulics Systems.",
    "Pipe line installations (hydraulic or grease line).",
    "PLC Programming.",
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
                {/* Heading */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300">
                            Services
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
                            Services We Provide
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                            Paramount Hydraulics offers end-to-end hydraulic and automation
                            solutions — from design and manufacturing to installation,
                            commissioning, and after-sales support.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-2 text-[0.7rem] text-slate-400 md:items-end">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            <span className="font-semibold text-emerald-100">
                                Turnkey hydraulic solutions
                            </span>
                        </div>
                        <p>Custom-built systems for OEMs, process plants, and industries.</p>
                    </div>
                </div>

                {/* Gradient Card Wrapper */}
                <div className="rounded-[1.75rem] bg-gradient-to-br from-emerald-500/20 via-slate-900 to-slate-950 p-[1px] shadow-2xl shadow-emerald-950/60">
                    <div className="rounded-[1.65rem] border border-slate-900 bg-slate-950/85 p-6 md:p-8">
                        {/* Card Header */}
                        <div className="mb-6 flex flex-col gap-3 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Core Expertise
                                </p>
                                <p className="mt-1 text-[0.8rem] text-slate-400">
                                    Design, fabrication, installation, and commissioning of hydraulic
                                    and automation systems tailored to your application.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 text-[0.7rem]">
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                                    Custom Systems
                                </span>
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                                    Retrofits & Upgrades
                                </span>
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                                    On-site Support
                                </span>
                            </div>
                        </div>

                        {/* Services List */}
                        <div className="grid gap-4 md:grid-cols-2">
                            {services.map((service) => (
                                <div
                                    key={service}
                                    className="group flex items-start gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-sm text-slate-200 shadow-sm shadow-slate-950/60 transition hover:-translate-y-[1px] hover:border-emerald-500/60 hover:bg-slate-900 hover:shadow-md hover:shadow-emerald-900/60"
                                >
                                    {/* Arrow icon */}
                                    <span className="mt-[2px] inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/15 text-[0.7rem] text-emerald-300 group-hover:bg-emerald-500/25 group-hover:text-emerald-50">
                                        ➜
                                    </span>
                                    {/* Service text */}
                                    <span className="leading-snug">{service}</span>
                                </div>
                            ))}
                        </div>

                        {/* Footer note */}
                        <p className="mt-6 text-[0.7rem] text-slate-500">
                            In addition to the above, we also undertake project-specific
                            customisation, reconditioning of existing systems, and PLC-based
                            automation solutions as per customer requirements.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
