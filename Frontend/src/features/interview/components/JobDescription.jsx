import React from "react";

const JobDescription = () => (
  <section className="left panel">
    <div className="panel-header">
      <span className="icon">📌</span> Target Job Description
    </div>
    <textarea
      id="jobDescription"
      placeholder="Paste the full job description here... e.g. 'Senior Frontend Engineer at Google requires proficiency in React, Typescript...'"
    />
    <div className="meta">
      <span className="char-count">0 / 10000 chars</span>
    </div>
  </section>
);

export default JobDescription;
