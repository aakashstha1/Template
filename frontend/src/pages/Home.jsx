import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import React from "react";

function Home() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col">
      <FAQ />
      <Contact />
    </div>
  );
}

export default Home;
