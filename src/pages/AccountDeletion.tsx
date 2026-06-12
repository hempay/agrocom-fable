import { useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import LegalShell from "@/components/legal/LegalShell";

const REASONS = [
  "I no longer use the app",
  "Privacy concerns",
  "I have a duplicate account",
  "The app is not useful to me",
  "I'm switching to another platform",
  "Other",
];

const EMPTY = {
  fullName: "",
  email: "",
  phone: "",
  username: "",
  reason: "",
  additionalInfo: "",
};

const AccountDeletion = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState(EMPTY);

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setStatus("idle");
    setForm(EMPTY);
  };

  return (
    <LegalShell
      eyebrow="Your data, your call"
      title={
        <>
          Account <em className="font-light text-clay">Deletion</em>
        </>
      }
      meta="Request permanent deletion of your Agrocom account and data"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex gap-5 rounded-[2rem] border border-clay/30 bg-clay/5 p-7">
          <span className="text-2xl" aria-hidden="true">
            ⚠️
          </span>
          <div>
            <h3 className="mb-1.5 font-display text-xl font-semibold">This action is permanent</h3>
            <p className="text-sm leading-relaxed text-haze">
              Once your account is deleted, all your data — including product listings, messages,
              transaction history, and BrainBag conversations — will be permanently removed and
              cannot be recovered.
            </p>
          </div>
        </div>

        <div className="space-y-12 text-haze">
          <div>
            <h2 className="mb-5 font-display text-2xl font-semibold text-ink">
              What happens when you delete your account?
            </h2>
            <ul className="space-y-3 text-[0.95rem] leading-relaxed">
              {[
                "All personal information (name, email, phone) is permanently erased",
                "Product listings and media are removed from the marketplace",
                "BrainBag conversation history is deleted",
                "Transaction records are anonymized as required by law",
                "Any remaining wallet balance must be withdrawn before deletion",
                "Active subscriptions will be cancelled with no refund for the current period",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 text-clay">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 font-display text-2xl font-semibold text-ink">
              How to delete your account
            </h2>
            <ol className="space-y-3 text-[0.95rem] leading-relaxed">
              {[
                "Log in to your Agrocom account",
                "Go to Settings → Account → Delete Account",
                "Confirm your identity by entering your password or email verification",
                "Your account will be scheduled for deletion within 30 days",
              ].map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span className="font-display text-lg font-light text-clay">0{i + 1}</span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm">
              During the 30-day grace period, you can cancel the deletion by logging back in.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-2xl font-semibold text-ink">Need help?</h2>
            <p className="text-[0.95rem] leading-relaxed">
              If you're unable to access your account or need assistance, contact our support team
              at <span className="font-semibold text-leaf">support@agrocom.cloud</span> with the
              email associated with your account.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="btn-pill bg-clay px-9 py-4 text-cream transition-colors hover:bg-ink"
          >
            Request account deletion
          </button>
        </div>
      </div>

      {/* Request modal — portaled to <body> so ancestor transforms can't trap position:fixed */}
      {open &&
        createPortal(
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm">
          <div
            data-lenis-prevent
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/10 p-6">
              <div>
                <h2 className="font-display text-xl font-semibold">Request Account Deletion</h2>
                <p className="text-xs text-haze">This request will be sent to our support team</p>
              </div>
              <button
                onClick={handleClose}
                className="text-2xl leading-none text-haze transition-colors hover:text-ink"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {status === "success" ? (
                <div className="py-8 text-center">
                  <p className="mb-4 text-4xl" aria-hidden="true">
                    🌱
                  </p>
                  <h3 className="mb-2 font-display text-2xl font-semibold">Request Submitted</h3>
                  <p className="text-sm leading-relaxed text-haze">
                    Your deletion request has been sent to{" "}
                    <span className="font-semibold text-ink">support@agrocom.cloud</span>. A
                    confirmation has been sent to your email. We'll process it within 7 business
                    days.
                  </p>
                  <button onClick={handleClose} className="btn-ink mt-8 px-8 py-3.5">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium">Full Name *</span>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
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

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium">Phone Number</span>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className="field"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium">Username / User ID</span>
                      <input
                        type="text"
                        value={form.username}
                        onChange={(e) => update("username", e.target.value)}
                        className="field"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">Reason for Deletion *</span>
                    <select
                      required
                      value={form.reason}
                      onChange={(e) => update("reason", e.target.value)}
                      className="field appearance-none"
                    >
                      <option value="">Select a reason</option>
                      {REASONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">Additional Information</span>
                    <textarea
                      rows={3}
                      value={form.additionalInfo}
                      onChange={(e) => update("additionalInfo", e.target.value)}
                      placeholder="Any additional details for our support team..."
                      className="field resize-none"
                    />
                  </label>

                  {status === "error" && (
                    <p className="text-sm text-clay">
                      Something went wrong. Please try again or email support@agrocom.cloud
                      directly.
                    </p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={handleClose} className="btn-outline flex-1 px-6 py-3.5">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-pill flex-1 bg-clay px-6 py-3.5 text-cream transition-colors hover:bg-ink disabled:opacity-60"
                    >
                      {status === "loading" ? "Sending…" : "Submit request"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </LegalShell>
  );
};

export default AccountDeletion;
