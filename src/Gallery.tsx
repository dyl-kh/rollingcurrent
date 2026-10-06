import { useEffect, useState } from "react";
import { withBase } from "./paths";

export type Job = {
  id: string;
  title: string;
  category: string;
  vehicle: string;
  summary: string;
  details: string;
  image: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const JOBS: Job[] = [
  {
    id: "wagon-dual-battery",
    title: "Wagon dual battery",
    category: "Dual Battery",
    vehicle: "4WD wagon",
    summary: "Lithium house battery and a DC-DC charger, so the fridge runs all night.",
    details:
      "200Ah lithium, a Victron DC-DC charger, and a fused fridge circuit. The starter battery stays isolated, so the wagon still fires after a cold night.",
    image: img("photo-1511527844068-006b95d162c2"),
  },
  {
    id: "pickup-light-bar",
    title: "Pickup light bar",
    category: "Lighting",
    vehicle: "4WD pickup",
    summary: "Light bar and driving lights on relays, switches, and proper fusing.",
    details:
      "LED light bar and driving lights on relays, switched from the cab. Each circuit is fused back at the battery and loomed clear of heat and moving parts.",
    image: img("photo-1559416523-140ddc3d238c"),
  },
  {
    id: "camper-solar",
    title: "Camper solar system",
    category: "Solar",
    vehicle: "Pop-top camper",
    summary: "Rooftop panels into a Victron MPPT, sized for days off the grid.",
    details:
      "Rooftop solar, a Victron MPPT, and a lithium bank sized for the fridge, lights, and a few cloudy days. It charges from the car while driving and from the panels once you are set up.",
    image: img("photo-1527786356703-4b100091cd2c"),
  },
  {
    id: "van-reverse-camera",
    title: "Touring van reverse camera",
    category: "Cameras",
    vehicle: "Touring van",
    summary: "Rear camera and monitor that stay live while you are manoeuvring.",
    details:
      "Camera at the rear, wired to a monitor up front. The picture comes on with reverse and can be left on while parking on a tight site.",
    image: img("photo-1469854523086-cc02fe5d8800"),
  },
  {
    id: "caravan-fitout",
    title: "Caravan 12V fitout",
    category: "Caravans",
    vehicle: "Touring caravan",
    summary: "Interior power, lighting, and an Anderson plug for the tow.",
    details:
      "House power and lighting in the van, plus an Anderson plug, electric brakes, and a breakaway battery on the tow. Wired so the caravan can sit on its own once you unhitch.",
    image: img("photo-1523987355523-c7b5b0dd90a7"),
  },
  {
    id: "wagon-house-battery",
    title: "Wagon house battery",
    category: "Dual Battery",
    vehicle: "4WD wagon",
    summary: "A second battery for weekends away, isolated from the starter.",
    details:
      "AGM house battery, DC-DC charging, and a cabin switch for the accessories. Cable runs are fused at the battery so a fault in the back cannot take the starter with it.",
    image: img("photo-1533473359331-0135ef1b58bf"),
  },
  {
    id: "camper-conversion",
    title: "Camper van electrics",
    category: "Fitouts",
    vehicle: "Camper van",
    summary: "Living electrics for a weekender: lights, USB, and a house battery.",
    details:
      "House battery, fused distribution, warm interior lighting, and USB through the living space. Laid out so the van can sit off-grid for a weekend without a generator.",
    image: img("photo-1561361513-2d000a50f0dc"),
  },
];

const FILTERS = ["All", ...Array.from(new Set(JOBS.map((job) => job.category)))];

function JobCard({
  job,
  featured,
  onOpen,
}: {
  job: Job;
  featured?: boolean;
  onOpen: (job: Job) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(job)}
      className={`group relative overflow-hidden rounded-lg text-left border border-[#e0d8cc] bg-[#e8e0d4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e04a1a] ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <img
        src={job.image}
        alt=""
        className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
          featured ? "aspect-[16/10] md:aspect-[16/8]" : "aspect-[4/3]"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c2b3a]/85 via-[#1c2b3a]/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p
          className="text-[11px] font-semibold uppercase tracking-wide text-[#f4c7b4]"
          style={{ fontFamily: "Source Sans 3, sans-serif" }}
        >
          {job.category}
        </p>
        <h3
          className="mt-1 text-xl font-bold text-white"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {job.title}
        </h3>
        <p
          className="mt-1 text-sm text-white/75"
          style={{ fontFamily: "Source Sans 3, sans-serif" }}
        >
          {job.vehicle}
        </p>
      </div>
    </button>
  );
}

function JobDialog({
  job,
  jobs,
  onClose,
  onSelect,
}: {
  job: Job;
  jobs: Job[];
  onClose: () => void;
  onSelect: (job: Job) => void;
}) {
  const index = jobs.findIndex((item) => item.id === job.id);
  const prev = jobs[(index - 1 + jobs.length) % jobs.length];
  const next = jobs[(index + 1) % jobs.length];

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onSelect(prev);
      if (event.key === "ArrowRight") onSelect(next);
    }
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onSelect, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#1c2b3a]/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-dialog-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-xl bg-[#faf7f2] shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <img src={job.image} alt="" className="w-full aspect-[16/9] object-cover bg-[#e8e0d4]" />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 text-[#1c2b3a] flex items-center justify-center hover:bg-white"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <div className="p-6 sm:p-8">
          <p
            className="text-xs font-semibold uppercase tracking-wide text-[#e04a1a]"
            style={{ fontFamily: "Source Sans 3, sans-serif" }}
          >
            {job.category} · {job.vehicle}
          </p>
          <h2
            id="job-dialog-title"
            className="mt-2 text-3xl font-bold text-[#1c2b3a]"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {job.title}
          </h2>
          <p
            className="mt-4 text-[#1c2b3a]/70 leading-relaxed"
            style={{ fontFamily: "Source Sans 3, sans-serif" }}
          >
            {job.details}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={withBase("/#contact")}
              className="px-5 py-2.5 rounded bg-[#e04a1a] text-white text-sm font-semibold hover:bg-[#c43c10] transition-colors"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Get a quote for a job like this
            </a>
            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                onClick={() => onSelect(prev)}
                className="px-3 py-2 rounded border border-[#e0d8cc] text-sm text-[#1c2b3a]/70 hover:border-[#1c2b3a]/30"
                style={{ fontFamily: "Source Sans 3, sans-serif" }}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => onSelect(next)}
                className="px-3 py-2 rounded border border-[#e0d8cc] text-sm text-[#1c2b3a]/70 hover:border-[#1c2b3a]/30"
                style={{ fontFamily: "Source Sans 3, sans-serif" }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkPreview() {
  const preview = JOBS.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p
              className="text-[#e04a1a] text-sm font-semibold mb-2"
              style={{ fontFamily: "Source Sans 3, sans-serif" }}
            >
              Recent jobs
            </p>
            <h2
              className="text-4xl font-bold text-[#1c2b3a]"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Work from the workshop
            </h2>
          </div>
          <a
            href={withBase("/gallery")}
            className="text-sm font-semibold text-[#e04a1a] hover:text-[#c43c10]"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            View the gallery
          </a>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {preview.map((job) => (
            <a key={job.id} href={withBase(`/gallery#${job.id}`)} className="group block">
              <div className="overflow-hidden rounded-lg border border-[#e0d8cc] bg-[#e8e0d4]">
                <img
                  src={job.image}
                  alt=""
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <p
                className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#e04a1a]"
                style={{ fontFamily: "Source Sans 3, sans-serif" }}
              >
                {job.category}
              </p>
              <h3
                className="text-lg font-semibold text-[#1c2b3a] group-hover:text-[#e04a1a] transition-colors"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {job.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Job | null>(null);
  const jobs = filter === "All" ? JOBS : JOBS.filter((job) => job.category === filter);

  useEffect(() => {
    document.title = "Gallery · Rollingcurrent";
    const id = window.location.hash.slice(1);
    const job = JOBS.find((item) => item.id === id);
    if (job) setActive(job);
    return () => {
      document.title = "Rollingcurrent";
    };
  }, []);

  return (
    <main className="pt-28 pb-24 bg-[#faf7f2]">
      <div className="max-w-5xl mx-auto px-6">
        <p
          className="text-[#e04a1a] text-sm font-semibold mb-3"
          style={{ fontFamily: "Source Sans 3, sans-serif" }}
        >
          Gallery
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold text-[#1c2b3a] leading-tight max-w-xl"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Jobs we have built
        </h1>
        <p
          className="mt-4 text-[#1c2b3a]/60 text-lg max-w-xl leading-relaxed"
          style={{ fontFamily: "Source Sans 3, sans-serif" }}
        >
          Dual batteries, solar, cameras, lighting, and full 12V fitouts. A look at the kind of work that leaves the workshop.
        </p>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter jobs">
          {FILTERS.map((name) => {
            const selected = filter === name;
            return (
              <button
                key={name}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(name)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selected
                    ? "bg-[#1c2b3a] text-white"
                    : "bg-white text-[#1c2b3a]/60 border border-[#e0d8cc] hover:text-[#1c2b3a]"
                }`}
                style={{ fontFamily: "Source Sans 3, sans-serif" }}
              >
                {name}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {jobs.map((job, index) => (
            <JobCard
              key={job.id}
              job={job}
              featured={filter === "All" && index === 0}
              onOpen={setActive}
            />
          ))}
        </div>

        <div className="mt-14 rounded-lg border border-[#e0d8cc] bg-white px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <h2
              className="text-2xl font-bold text-[#1c2b3a]"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Planning a similar build?
            </h2>
            <p
              className="mt-1 text-sm text-[#1c2b3a]/55"
              style={{ fontFamily: "Source Sans 3, sans-serif" }}
            >
              Tell us about the rig and how you travel. We will quote the system that actually fits.
            </p>
          </div>
          <a
            href={withBase("/#contact")}
            className="shrink-0 px-5 py-2.5 rounded bg-[#e04a1a] text-white text-sm font-semibold text-center hover:bg-[#c43c10] transition-colors"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Get a Quote
          </a>
        </div>
      </div>

      {active && (
        <JobDialog
          job={active}
          jobs={jobs}
          onClose={() => setActive(null)}
          onSelect={setActive}
        />
      )}
    </main>
  );
}
