import React, { useState } from "react";
import "../styles/interview.scss";

const sections = ["Technical Questions", "Behavioral Questions", "Road Map"];

const technicalQuestions = [
  {
    title: "Event loop in Node.js",
    detail:
      "Explain the phases of the event loop and the difference between process.nextTick and setImmediate.",
  },
  {
    title: "Redis rate limiter",
    detail:
      "Design a production-safe rate-limiter using Redis and explain how you handle distributed traffic bursts.",
  },
  {
    title: "MongoDB performance",
    detail:
      "How do you optimize a slow aggregation query and decide when to add an index versus redesigning the query?",
  },
];

const behavioralQuestions = [
  {
    title: "Tell me about a challenge you solved",
    detail:
      "Describe a time when you handled ambiguity, iterated quickly, and shipped a solution under pressure.",
  },
  {
    title: "Conflict handling",
    detail:
      "Share an example of a disagreement with a teammate and how you resolved it without hurting delivery.",
  },
  {
    title: "Leadership & ownership",
    detail:
      "Explain a situation where you took ownership of a project and influenced outcomes beyond your direct responsibility.",
  },
];

const roadmap = [
  {
    day: 1,
    title: "Node.js Internals & Streams",
    points: [
      "Deep dive into the Event Loop phases and process.nextTick vs setImmediate.",
      "Practice implementing Node.js Streams for handling large data sets.",
    ],
  },
  {
    day: 2,
    title: "Advanced MongoDB & Indexing",
    points: [
      "Study Compound Indexes, TTL Indexes, and Text Indexes.",
      "Practice writing complex Aggregation pipelines and using the $explain('executionStats') method.",
    ],
  },
  {
    day: 3,
    title: "Caching & Redis Strategies",
    points: [
      "Read about Redis data types beyond strings (Sets, Hashes, Sorted Sets).",
      "Implement a Redis-based rate limiter or a caching layer for a sample API.",
    ],
  },
  {
    day: 4,
    title: "System Design & Microservices",
    points: [
      "Study Microservices communication patterns (Synchronous vs Asynchronous).",
      "Learn about the API Gateway pattern and Circuit Breakers.",
    ],
  },
  {
    day: 5,
    title: "Message Queues & DevOps Basics",
    points: [
      "Watch introductory tutorials on RabbitMQ or Kafka.",
      "Dockerize a project and write a simple GitHub Actions workflow for CI.",
    ],
  },
  {
    day: 6,
    title: "Data Structures & Algorithms",
    points: [
      "Solve 5-10 Medium LeetCode problems focusing on Arrays, Strings, and Hash Maps.",
      "Review common sorting and searching algorithms.",
    ],
  },
  {
    day: 7,
    title: "Mock Interview & Project Review",
    points: [
      "Conduct a mock interview focusing on explaining the Real-time Chat Application architecture.",
      "Prepare concise summaries for all work experience bullet points.",
    ],
  },
];

const skillGaps = [
  "Message Queues (Kafka/RabbitMQ)",
  "Advanced Docker & CI/CD Pipelines",
  "Distributed Systems Design",
  "Production-level Redis management",
];

const sectionContent = {
  "Technical Questions": technicalQuestions,
  "Behavioral Questions": behavioralQuestions,
  "Road Map": roadmap,
};

const Interview = () => {
  const [activeSection, setActiveSection] = useState("Road Map");
  const currentContent = sectionContent[activeSection] || [];

  return (
    <main className="interview-page">
      <div className="interview-shell">
        <aside className="interview-sidebar">
          <div className="sections-label">SECTIONS</div>
          <nav className="interview-nav" aria-label="Interview sections">
            {sections.map((section, index) => (
              <button
                key={section}
                type="button"
                className={`nav-item ${activeSection === section ? "active" : ""}`}
                onClick={() => setActiveSection(section)}
                aria-pressed={activeSection === section}
              >
                <span className="nav-icon">
                  {index === 0 ? "<" : index === 1 ? "□" : "↳"}
                </span>
                <span>{section}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="interview-main" aria-label="Interview content area">
          <div className="roadmap-header">
            <h2>{activeSection}</h2>
            {activeSection === "Road Map" && (
              <span className="plan-badge">7-day plan</span>
            )}
          </div>

          {activeSection === "Road Map" ? (
            <div className="timeline">
              {currentContent.map((item) => (
                <div key={item.day} className="timeline-item">
                  <div className="timeline-marker-wrap">
                    <div className="timeline-marker">
                      <span>Day {item.day}</span>
                    </div>
                    <div className="timeline-line" />
                  </div>

                  <div className="timeline-content">
                    <h3>{item.title}</h3>
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="question-grid">
              {currentContent.map((item) => (
                <article key={item.title} className="question-card">
                  <div className="question-chip">Focus area</div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="interview-right-panel" aria-label="Skill gaps">
          <div className="score-block">
            <div className="score-label">MATCH SCORE</div>
            <div className="score-ring">
              <div className="score-ring-inner">
                <span className="score-value">88</span>
                <span className="score-percent">%</span>
              </div>
            </div>
            <p className="score-text">Strong match for this role</p>
          </div>

          <div className="skill-panel">
            <div className="skill-heading">SKILL GAPS</div>
            <div className="skill-list">
              {skillGaps.map((skill) => (
                <div key={skill} className="skill-tag">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Interview;
