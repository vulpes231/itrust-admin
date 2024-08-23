import React from "react";

const Section = ({ children }) => {
  return (
    <section className="section w-full bg-slate-100 p-6">
      <div className="lg:w-[1000px] lg:mx-auto h-full">{children}</div>
    </section>
  );
};

export default Section;
