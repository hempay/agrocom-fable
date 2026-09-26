import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import SmoothScroll, { getLenis } from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Home from "@/pages/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import AccountDeletion from "@/pages/AccountDeletion";
import Contact from "@/pages/Contact";
import OpenInApp from "@/pages/OpenInApp";
import NotFound from "@/pages/NotFound";
import { ScrollTrigger } from "@/lib/gsap";

/* Scroll to top on route change, or to the anchor when a hash is present. */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    if (hash) {
      // Let the page mount first, then glide to the anchor.
      const id = hash.slice(1);
      const t = setTimeout(() => {
        let el = document.getElementById(id);
        if (!el) return;
        // Inside a GSAP-pinned section the element's live position shifts with
        // the pin, so aim at the pin spacer (the section's resting start).
        el = el.closest<HTMLElement>(".pin-spacer") ?? el;
        if (lenis) lenis.scrollTo(el, { offset: -80 });
        else el.scrollIntoView();
      }, 120);
      return () => clearTimeout(t);
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname, hash]);

  return null;
};

const App = () => (
  <BrowserRouter>
    <SmoothScroll>
      <Cursor />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        {/* Mobile app still links to short paths — keep them resolving. */}
        <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
        <Route path="/account-deletion" element={<AccountDeletion />} />
        <Route path="/contact" element={<Contact />} />
        {/* Share / deep links: open-in-app handoff (not 404). */}
        <Route path="/u/:userId" element={<OpenInApp kind="profile" />} />
        <Route path="/p/:postId" element={<OpenInApp kind="post" />} />
        <Route path="/live/:joinStreamId" element={<OpenInApp kind="live" />} />
        <Route path="/stream/:joinStreamId" element={<OpenInApp kind="live" />} />
        <Route path="/communities/join" element={<OpenInApp kind="community" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SmoothScroll>
  </BrowserRouter>
);

export default App;
