import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-ink px-6 text-center text-cream">
      <p className="eyebrow mb-6 text-lime">Lost in the fields</p>
      <h1 className="display-huge text-[28vw] leading-none text-outline-cream sm:text-[18vw]">404</h1>
      <p className="mb-10 mt-4 max-w-sm font-display text-xl font-light italic text-cream/60">
        This plot hasn't been planted yet.
      </p>
      <Link to="/" className="btn-lime px-10 py-4">
        Return to home
      </Link>
    </main>
  );
};

export default NotFound;
