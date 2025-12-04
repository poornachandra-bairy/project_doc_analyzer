const products = [
    "Hydraulic Power Packs.",
    "Hydraulic Presses.",
    "Hydraulic Test Rigs.",
    "Hydraulic Special Purpose Machines.",
    "Hydraulic Cylinders.",
    "Hydraulic Scissor Lifts.",
    "Hydraulic Fixture.",
    "Production of Press Components.",
    "Electrical Control Panels.",
    "PLC Based Automation Panels.",
    "Drives Panels.",
    "Instrumentation Panels.",
    "Generator Control Panel.",
    "PCC Panels.",
    "Control Desk Panels.",
    "Motor Control Center (MCC) Panels.",
    "Synchronizing Panels.",
    "Automatic P.F. Correction Panels.",
    "Power Distribution Board (PDB) Panels.",
    "MIMIC Panels.",
    "Stainless Steel Control Panels.",
];

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
                {/* Heading */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300">
                            Products
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
                            Products We Manufacture
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                            We design and manufacture a wide range of hydraulic systems,
                            automation panels, and custom-built machinery to meet industrial
                            requirements across multiple sectors.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-2 text-[0.7rem] text-slate-400 md:items-end">
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1">
                            <span className="h-2 w-2 rounded-full bg-indigo-400" />
                            <span className="font-semibold text-indigo-100">
                                20+ product categories
                            </span>
                        </div>
                        <p>Manufactured & delivered for OEMs, factories & industries.</p>
                    </div>
                </div>

                {/* Gradient Card Wrapper */}
                <div className="rounded-[1.75rem] bg-gradient-to-br from-indigo-500/20 via-slate-900 to-slate-950 p-[1px] shadow-2xl shadow-indigo-950/60">
                    <div className="rounded-[1.65rem] border border-slate-900 bg-slate-950/85 p-6 md:p-8">

                        {/* Card Header */}
                        <div className="mb-6 flex flex-col gap-3 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Our Manufacturing Portfolio
                                </p>
                                <p className="mt-1 text-[0.8rem] text-slate-400">
                                    From hydraulic machines to electrical control panels — we
                                    deliver engineered solutions with precision and reliability.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 text-[0.7rem]">
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                                    Hydraulic Systems
                                </span>
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                                    Electrical Panels
                                </span>
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                                    Industrial Machinery
                                </span>
                            </div>
                        </div>

                        {/* Product List */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <div
                                    key={product}
                                    className="group flex items-start gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-sm text-slate-200 shadow-sm shadow-slate-950/60 transition hover:-translate-y-[1px] hover:border-indigo-500/60 hover:bg-slate-900 hover:shadow-md hover:shadow-indigo-900/60"
                                >
                                    {/* Arrow icon */}
                                    <span className="mt-[2px] inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-indigo-500/15 text-[0.7rem] text-indigo-300 group-hover:bg-indigo-500/25 group-hover:text-indigo-50">
                                        ➜
                                    </span>

                                    {/* Product name */}
                                    <span className="leading-snug">{product}</span>
                                </div>
                            ))}
                        </div>

                        {/* Footer note */}
                        <p className="mt-6 text-[0.7rem] text-slate-500">
                            We also undertake custom machine development, panel engineering,
                            precision fabrication, and end-to-end hydraulic automation
                            projects tailored to customer requirements.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
