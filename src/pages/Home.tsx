import { useState } from "react";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import Manifesto from "@/components/sections/Manifesto";
import Features from "@/components/sections/Features";
import BrainBag from "@/components/sections/BrainBag";
import HowItWorks from "@/components/sections/HowItWorks";
import Stories from "@/components/sections/Stories";
import Pricing from "@/components/sections/Pricing";
import AppDownload from "@/components/sections/AppDownload";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";

const Home = () => {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Nav />
      <main>
        <Hero ready={ready} />
        <MarqueeStrip />
        <Manifesto />
        <Features />
        <BrainBag />
        <HowItWorks />
        <Stories />
        <Pricing />
        <AppDownload />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
};

export default Home;
