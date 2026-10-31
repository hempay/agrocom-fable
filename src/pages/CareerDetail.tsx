import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import LegalShell, { LegalSection } from "@/components/legal/LegalShell";
import NotFound from "@/pages/NotFound";
import { getJob } from "@/content/careers";

const CareerDetail = () => {
  const { slug } = useParams();
  const job = getJob(slug);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    link: "",
    note: "",
  });

  if (!job) return <NotFound />;

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  // Applications go through the contact endpoint, tagged with the role in the subject.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          subject: `Job Application: ${job.title}`,
          message: `CV / Portfolio: ${form.link}\n\n${form.note}`,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <LegalShell
      eyebrow={`Careers · ${job.team}`}
      title={job.title}
      meta={`${job.type} · ${job.location}`}
    >
      <div className="mx-auto max-w-5xl">
        <Link to="/careers" className="eyebrow text-leaf hover:underline">
          ← All open roles
        </Link>

        <LegalSection num="01" heading="About the Role">
          <p>{job.about}</p>
        </LegalSection>

        <LegalSection num="02" heading="Key Responsibilities">
          {job.responsibilities.map((group, i) => (
            <div key={group.heading ?? i}>
              {group.heading && <p className="mb-2 font-semibold text-ink">{group.heading}</p>}
              <ul className="list-disc space-y-2 pl-5">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </LegalSection>

        <LegalSection num="03" heading="Requirements">
          <ul className="list-disc space-y-2 pl-5">
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection num="04" heading="Apply" id="apply">
          {status === "success" ? (
            <div className="rounded-[2rem] border border-leaf/25 bg-parchment p-10 text-center">
              <h3 className="mb-3 font-display text-3xl font-semibold text-ink">Application sent!</h3>
              <p className="mx-auto max-w-md">
                Thank you for applying for the {job.title} role. We've sent a confirmation to your
                email and our team will be in touch if your profile is a fit.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-[2rem] border border-ink/10 bg-parchment p-7 text-ink sm:p-10"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">First Name *</span>
                  <input
                    type="text"
                    required
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Last Name *</span>
                  <input
                    type="text"
                    required
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    className="field"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Phone Number *</span>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Email Address *</span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="field"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">CV / Portfolio / LinkedIn link *</span>
                <input
                  type="url"
                  required
                  placeholder="https://"
                  value={form.link}
                  onChange={(e) => update("link", e.target.value)}
                  className="field"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Why you? *</span>
                <textarea
                  required
                  rows={5}
                  value={form.note}
                  onChange={(e) => update("note", e.target.value)}
                  placeholder="Tell us about your experience and why this role fits you..."
                  className="field resize-none"
                />
              </label>

              {status === "error" && (
                <p className="text-sm text-clay">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-ink w-full px-10 py-4 disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? "Sending…" : "Submit application"}
              </button>
            </form>
          )}
        </LegalSection>
      </div>
    </LegalShell>
  );
};

export default CareerDetail;
