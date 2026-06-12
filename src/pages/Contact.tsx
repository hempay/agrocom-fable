import { useState, type FormEvent } from "react";
import LegalShell from "@/components/legal/LegalShell";

const SUBJECTS = [
  "General Inquiry",
  "Agrocom App Support",
  "Partnership / Business",
  "Investor Relations",
  "Media & Press",
  "Other",
];

const INFO = [
  { label: "Email", value: "info@vivorafarms.com", glyph: "✉" },
  { label: "Phone", value: "+234 800 000 0000", glyph: "☏" },
  { label: "Location", value: "Lagos, Nigeria", glyph: "✦" },
];

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <LegalShell
      eyebrow="Say hello"
      title={
        <>
          We'd love to <em className="font-light text-leaf">hear</em> from you
        </>
      }
      meta="Questions, partnerships, support — our team answers promptly"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Contact info rail */}
        <div className="space-y-4">
          {INFO.map((item) => (
            <div key={item.label} className="flex items-start gap-4 rounded-[1.5rem] border border-ink/10 bg-parchment p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf text-lg text-cream" aria-hidden="true">
                {item.glyph}
              </span>
              <div>
                <p className="eyebrow mb-1.5 text-haze">{item.label}</p>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
          <p className="px-2 pt-4 font-display text-lg font-light italic text-haze">
            "Every great harvest starts with a conversation."
          </p>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          {status === "success" ? (
            <div className="rounded-[2rem] border border-leaf/25 bg-parchment p-12 text-center">
              <p className="mb-5 text-5xl" aria-hidden="true">
                🌾
              </p>
              <h3 className="mb-3 font-display text-3xl font-semibold">Message sent!</h3>
              <p className="mx-auto max-w-md leading-relaxed text-haze">
                We've received your message and sent a confirmation to your email. Our team will be
                in touch soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-[2rem] border border-ink/10 bg-parchment p-7 sm:p-10"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">First Name *</span>
                  <input
                    type="text"
                    required
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
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="field"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Subject *</span>
                <select
                  required
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className="field appearance-none"
                >
                  <option value="">Select a subject</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Message *</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Write your message here..."
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
                {status === "loading" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </LegalShell>
  );
};

export default Contact;
