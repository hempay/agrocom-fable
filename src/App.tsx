import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SmoothScroll, { getLenis } from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Home from "@/pages/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import AccountDeletion from "@/pages/AccountDeletion";
import Contact from "@/pages/Contact";
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
        const el = document.getElementById(id);
        if (!el) return;
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
        <Route path="/account-deletion" element={<AccountDeletion />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SmoothScroll>
  </BrowserRouter>
);

export default App;
