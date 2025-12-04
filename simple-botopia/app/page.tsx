import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* MAIN HERO / WELCOME BLOCK */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        {/* Outer card – gives stylish, glassy look */}
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-2xl shadow-sky-900/40">
          <div className="grid gap-10 p-8 md:grid-cols-[1.15fr,1fr] md:p-12 lg:p-16">
            {/* LEFT: TEXT CONTENT */}
            <div>
              {/* Tiny top label */}
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Since 2007 • Peenya, Bangalore
              </div>

              {/* Main heading */}
              <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-50 md:text-4xl lg:text-5xl">
                PARAMOUNT HYDRAULICS
              </h1>

              {/* Subheading */}
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                Design • Engineering • Manufacturing
              </p>

              {/* First paragraph */}
              <p className="mt-6 text-sm leading-relaxed text-slate-200 md:text-base">
                We would like to introduce ourselves as one of the leading
                companies, established in the year 2007 and based in Peenya,
                Bangalore, engaged in the business of design, engineering, and
                manufacturing of all types of Hydraulic Systems and Industrial
                automation control panels and process automation panels.
              </p>

              {/* Second paragraph */}
              <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
                We are a professionally managed industry promoted by well
                experienced technocrats. We are well equipped with adequate
                infrastructure to design and manufacture all types of Hydraulic
                Systems and Control Panels required for plant electrification,
                which makes us highly competitive in this field in terms of
                quality, delivery, and price.
              </p>

              {/* Highlight chips */}
              <div className="mt-6 flex flex-wrap gap-3 text-xs md:text-sm">
                <span className="rounded-full bg-sky-500/15 px-4 py-1 font-medium text-sky-300 ring-1 ring-sky-500/40">
                  Custom Hydraulic Systems
                </span>
                <span className="rounded-full bg-emerald-500/10 px-4 py-1 font-medium text-emerald-300 ring-1 ring-emerald-500/40">
                  Industrial Automation Panels
                </span>
                <span className="rounded-full bg-amber-500/10 px-4 py-1 font-medium text-amber-200 ring-1 ring-amber-500/40">
                  Process Control Solutions
                </span>
              </div>

              {/* Small bottom strip */}
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-800 pt-5 text-xs text-slate-400">
                <div>
                  <span className="font-semibold text-sky-300">18+ years</span>{" "}
                  of engineering excellence
                </div>
                <span className="hidden h-1 w-1 rounded-full bg-slate-600 md:inline-block" />
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-900 px-3 py-1">
                    Turnkey projects
                  </span>
                  <span className="rounded-full bg-slate-900 px-3 py-1">
                    End-to-end support
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: 3-COLUMN IMAGE GALLERY */}
            <div className="flex flex-col gap-4">
              {/* Gallery label */}
              <div className="flex items-center justify-between text-xs text-slate-400">
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Card that pops out + zooms as a whole */}
                <div className="group">
                  <div
                    className="relative aspect-[4/1] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80 shadow-lg shadow-slate-950/60 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-sky-900/70"
                  >
                    <Image
                      src="/home-img-1.jpg"
                      alt="Hydraulic Power Units"
                      fill
                      className="object-cover object-center"
                    />

                    {/* Optional subtle highlight on hover */}
                    <span
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/0 via-sky-500/10 to-sky-400/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
