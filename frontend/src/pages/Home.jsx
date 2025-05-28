import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import React from "react";
import Features from "@/components/Features";
import Hero from "@/components/Hero";

function Home() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col">
      <Hero />
      <Features />
      <FAQ />
      <Contact />
    </div>
  );
}

export default Home;
