"use client";

import { useState } from "react";

export default function OnlineEnquiryPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<null | "success" | "error">(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        const formData = new FormData(e.currentTarget);

        const payload = {
            name: formData.get("name") as string,
            designation: formData.get("designation") as string,
            companyName: formData.get("companyName") as string,
            email: formData.get("email") as string,
            telephone: formData.get("telephone") as string,
            mobile: formData.get("mobile") as string,
            address: formData.get("address") as string,
            enquiry: formData.get("enquiry") as string,
        };

        try {
            const res = await fetch("/api/send-enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed");

            setStatus("success");

            // FIXED reset bug — explicitly cast HTMLFormElement
            const form = e.target as HTMLFormElement;
            form.reset();
        } catch (err) {
            console.error(err);
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <section className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
                {/* Page Heading */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300">
                            Online Enquiry
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-slate-50 md:text-4xl">
                            Request a Quote / Send an Enquiry
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                            Please fill in the details below. Our team at Paramount Hydraulics
                            will review your requirement and get back to you as soon as possible.
                        </p>
                    </div>
                </div>

                {/* Outer Gradient Border */}
                <div className="rounded-[1.75rem] bg-gradient-to-br from-sky-500/20 via-slate-900 to-slate-950 p-[1px] shadow-2xl shadow-sky-950/60">
                    {/* Inner Card */}
                    <div className="rounded-[1.65rem] border border-slate-900 bg-slate-950/80 p-6 md:p-8">
                        {/* Section Header */}
                        <div className="mb-6 flex flex-col gap-3 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Enquiry Details
                                </p>
                                <p className="mt-1 text-[0.8rem] text-slate-400">
                                    Share your requirement clearly to help us propose the right solution.
                                </p>
                            </div>
                        </div>

                        {/* FORM START */}
                        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
                            {/* Name */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                                    Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="h-10 rounded-xl border border-slate-700 bg-slate-950/80 px-3 text-sm text-slate-50 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2"
                                    placeholder="Your full name"
                                />
                            </div>

                            {/* Designation */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    name="designation"
                                    className="h-10 rounded-xl border border-slate-700 bg-slate-950/80 px-3 text-sm text-slate-50 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2"
                                    placeholder="e.g. Manager, Engineer"
                                />
                            </div>

                            {/* Company Name */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    className="h-10 rounded-xl border border-slate-700 bg-slate-950/80 px-3 text-sm text-slate-50 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2"
                                    placeholder="Company / Organisation"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                                    E-mail ID <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="h-10 rounded-xl border border-slate-700 bg-slate-950/80 px-3 text-sm text-slate-50 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2"
                                    placeholder="yourname@example.com"
                                />
                            </div>

                            {/* Telephone */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                                    Telephone No.
                                </label>
                                <input
                                    type="tel"
                                    name="telephone"
                                    className="h-10 rounded-xl border border-slate-700 bg-slate-950/80 px-3 text-sm text-slate-50 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2"
                                    placeholder="With STD code"
                                />
                            </div>

                            {/* Mobile */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                                    Mobile No. <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    required
                                    className="h-10 rounded-xl border border-slate-700 bg-slate-950/80 px-3 text-sm text-slate-50 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2"
                                    placeholder="+91 ..."
                                />
                            </div>

                            {/* Address */}
                            <div className="flex flex-col gap-1 md:col-span-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                                    Address
                                </label>
                                <textarea
                                    rows={3}
                                    name="address"
                                    className="rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2"
                                    placeholder="Office / site address with city and PIN code"
                                />
                            </div>

                            {/* Enquiry */}
                            <div className="flex flex-col gap-1 md:col-span-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                                    Feedback / Enquiry <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    name="enquiry"
                                    required
                                    className="rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2"
                                    placeholder="Describe your requirement, application details, capacity, quantity, etc."
                                />
                            </div>

                            {/* Button Row */}
                            <div className="md:col-span-2 mt-8 flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-5 md:flex-row md:items-center">
                                <div className="space-y-1 text-[0.7rem] text-slate-400">
                                    <p>
                                        Fields marked with <span className="text-red-400">*</span> are required.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-7 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/50 transition hover:-translate-y-[1px] hover:bg-sky-400 hover:shadow-sky-700/60 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Sending..." : "Submit Enquiry"}
                                </button>
                            </div>
                        </form>

                        {/* Status Messages */}
                        {status === "success" && (
                            <p className="mt-4 text-sm text-emerald-400">
                                ✅ Your enquiry has been sent successfully. We will get back to you soon.
                            </p>
                        )}

                        {status === "error" && (
                            <p className="mt-4 text-sm text-red-400">
                                ❌ Something went wrong while sending your enquiry. Please try again later.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}