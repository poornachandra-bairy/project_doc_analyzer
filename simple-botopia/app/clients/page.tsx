const clients = [
    "ABB, Bangalore.",
    "Bharat Electronics Limited, Bangalore.",
    "BEML Limited, Bangalore.",
    "Hindustan Aeronautics Limited, Bangalore.",
    "National Aerospace Laboratories.",
    "Toyota Kirloskar Motors, Bidadi.",
    "Lincoln Helios India Ltd (SKF), Bangalore.",
    "Therelek Engineers Pvt. Ltd., Bangalore.",
    "Weir Minerals (I) Pvt. Ltd., Bangalore.",
    "Kirloskar Electric Company, Tumkur.",
    "Timken India Ltd., Bangalore.",
    "Hawe Hydraulics.",
    "Vacuum Techniques Pvt. Ltd.",
    "Dakshin Foundry Pvt. Ltd, Hosakote.",
    "Nash Industries (EOU), Bangalore.",
    "Rewdale Precision Tools Pvt. Ltd., Bangalore.",
    "Stock Redler India Pvt. Ltd., Bangalore.",
    "KAR Mobiles Ltd., Bangalore.",
    "CNC India Tools & Services Pvt. Ltd., Bangalore.",
    "United Breweries Ltd., Mangalore.",
    "Poineer Industries, Mangalore.",
    "Hyundai Motor India Ltd, Chennai.",
    "Supritha Switch Gears, Bangalore.",
    "MK Agro Tech Pvt. Ltd., Mysore.",
    "Microsun Solar Tech Pvt. Ltd., Bangalore.",
    "TDPS Ltd., Bangalore.",
    "L & T Construction Equipment Ltd, Bangalore.",
    "Wirtgen India Pvt. Ltd, Pune.",
];

export default function ClientsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
                {/* Heading */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300">
                            Clients
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
                            Our Clients List Continues to Grow
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                            Over the years, Paramount Hydraulics has partnered with leading
                            organisations across automotive, aerospace, manufacturing, power,
                            and process industries. A snapshot of some of our valued clients is
                            listed below.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-2 text-[0.7rem] text-slate-400 md:items-end">
                        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1">
                            <span className="h-2 w-2 rounded-full bg-sky-400" />
                            <span className="font-semibold text-sky-100">
                                Trusted by 25+ industrial clients
                            </span>
                        </div>
                        <p>Across Bangalore, Karnataka & pan-India locations.</p>
                    </div>
                </div>

                {/* Gradient Card Wrapper */}
                <div className="rounded-[1.75rem] bg-gradient-to-br from-sky-500/20 via-slate-900 to-slate-950 p-[1px] shadow-2xl shadow-sky-950/60">
                    <div className="rounded-[1.65rem] border border-slate-900 bg-slate-950/85 p-6 md:p-8">
                        {/* Card Header */}
                        <div className="mb-6 flex flex-col gap-3 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Key Customers
                                </p>
                                <p className="mt-1 text-[0.8rem] text-slate-400">
                                    A selection of OEMs, public sector undertakings, and private
                                    industries we have served.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 text-[0.7rem]">
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                                    Automotive & OEMs
                                </span>
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                                    Aerospace & Defence
                                </span>
                                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                                    Process & Power
                                </span>
                            </div>
                        </div>

                        {/* Clients List */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {clients.map((client) => (
                                <div
                                    key={client}
                                    className="group flex items-start gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-200 shadow-sm shadow-slate-950/60 transition hover:-translate-y-[1px] hover:border-sky-500/60 hover:bg-slate-900 hover:shadow-md hover:shadow-sky-900/60"
                                >
                                    {/* Arrow icon */}
                                    <span className="mt-[2px] inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-sky-500/15 text-[0.7rem] text-sky-300 group-hover:bg-sky-500/25 group-hover:text-sky-100">
                                        ➜
                                    </span>
                                    {/* Client name */}
                                    <span className="leading-snug">{client}</span>
                                </div>
                            ))}
                        </div>

                        {/* Footer note */}
                        <p className="mt-6 text-[0.7rem] text-slate-500">
                            This is only a partial list of our customers. Our client base
                            continues to expand as we support new projects, greenfield plants,
                            and modernization initiatives across various industries.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}