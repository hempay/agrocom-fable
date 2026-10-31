import { Link } from "react-router-dom";
import LegalShell from "@/components/legal/LegalShell";
import { JOBS } from "@/content/careers";

const TEAMS = Array.from(new Set(JOBS.map((j) => j.team)));

const Careers = () => (
  <LegalShell
    eyebrow="Careers"
    title={
      <>
        Help us build the <em className="font-light text-leaf">future</em> of farming
      </>
    }
    meta={`${JOBS.length} open roles · On-site in Abuja, Nigeria`}
  >
    <div className="mx-auto max-w-5xl">
      {TEAMS.map((team) => (
        <section key={team} className="mb-14 last:mb-0">
          <h2 className="eyebrow mb-5 text-haze">{team}</h2>
          <ul className="border-t border-ink/10">
            {JOBS.filter((j) => j.team === team).map((job) => (
              <li key={job.slug} className="border-b border-ink/10">
                <Link
                  to={`/careers/${job.slug}`}
                  className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-display text-2xl font-semibold transition-colors group-hover:text-leaf sm:text-3xl">
                    {job.title}
                  </span>
                  <span className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-haze">
                    {job.type} · {job.location}
                    <span
                      aria-hidden="true"
                      className="text-lg text-leaf transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="mt-16 font-display text-lg font-light italic text-haze">
        Don't see your role? Write to us through the{" "}
        <Link to="/contact" className="text-leaf underline-offset-4 hover:underline">
          contact page
        </Link>{" "}
        and tell us how you'd help Agrocom grow.
      </p>
    </div>
  </LegalShell>
);

export default Careers;
