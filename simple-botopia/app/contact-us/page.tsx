const contactSections = [
    {
        label: "Address",
        value:
            "#155, 10th Main, 3rd Phase, Peenya Industrial Area, Bengaluru – 560058, Karnataka, India",
    },
    {
        label: "Phone",
        value: "+91 - 80 - 28399917",
    },
    {
        label: "Mobile",
        value:
            "+91 - 9449522312 ( Manjunath B.C ) / +91 - 9449522315 ( Jijo Jacob )",
    },
    {
        label: "Mail",
        value: "sales@paramounthydraulics.com\ninfo@paramounthydraulics.com",
    },
    {
        label: "Website",
        value: "www.paramounthydraulics.com",
    },
];

export default function ContactUsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
                {/* Heading */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300">
                            Contact Us
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
                            Feel Free To Contact Us
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                            Reach out for any enquiry regarding hydraulic systems, industrial
                            automation, custom machinery, or service support. We respond to all
                            messages within our business hours.
                        </p>
                    </div>

                    {/* Right Badge */}
                    <div className="flex flex-col items-start gap-2 text-[0.7rem] text-slate-400 md:items-end">
                        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1">
                            <span className="h-2 w-2 rounded-full bg-sky-400" />
                            <span className="font-semibold text-sky-100">We are here to help</span>
                        </div>
                        <p>Mon–Sat, 9:30 AM – 6:00 PM IST</p>
                    </div>
                </div>

                {/* Main Card */}
                <div className="rounded-[1.75rem] bg-gradient-to-br from-sky-500/20 via-slate-900 to-slate-950 p-[1px] shadow-xl shadow-sky-950/70">
                    <div className="rounded-[1.65rem] border border-slate-900 bg-slate-950/85 p-6 md:p-8">
                        {/* Top Section */}
                        <div className="mb-8 border-b border-slate-800 pb-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Paramount Hydraulics India Private Limited
                            </p>
                            <p className="mt-1 text-[0.8rem] text-slate-400">
                                Hydraulic Systems & Industrial Automation
                            </p>
                        </div>

                        {/* Contact Items */}
                        <div className="grid gap-5 md:grid-cols-2">
                            {contactSections.map((section) => (
                                <div
                                    key={section.label}
                                    className="group flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3.5 shadow-sm shadow-slate-950/60 transition hover:-translate-y-[1px] hover:border-sky-500/60 hover:bg-slate-900 hover:shadow-md hover:shadow-sky-900/60"
                                >
                                    {/* Icon circle */}
                                    <span className="mt-[2px] inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sky-500/20 text-[0.8rem] text-sky-300 group-hover:bg-sky-500/30 group-hover:text-sky-100">
                                        ➜
                                    </span>

                                    {/* Label + value */}
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">
                                            {section.label}
                                        </p>

                                        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-200">
                                            {section.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* FOOTER NOTE */}
                        <p className="mt-8 text-[0.7rem] text-slate-500">
                            For business enquiries, technical questions, quotations, and support
                            requests — please use the online enquiry form or contact us through
                            the details above.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
