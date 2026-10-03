import React, { useState } from "react";
import JobDescription from "./JobDescription";
import ProfilePanel from "./ProfilePanel";
import GenerateButton from "./GenerateButton";
import "../styles/home.scss";

const sections = ["Technical Questions", "Behavioral Questions", "Road Map"];

const technicalQuestions = [
  {
    title:
      "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
    intention:
      "To assess the candidate's deep understanding of Node.js internal architecture and non-blocking I/O.",
    modelAnswer:
      "The candidate should explain the different phases of the event loop (timers, pending callbacks, idle, prepare, poll, check, close). They should mention how Libuv handles the thread pool and how the callback queue works with the call stack to ensure performance without blocking the main thread.",
  },
  {
    title:
      "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
    intention:
      "To test practical experience with database performance and the candidate's claim of reducing response times by 35%.",
    modelAnswer:
      "Focus on using $match as early as possible to reduce the dataset, ensuring field usage in $match and $sort are indexed, and avoiding $unwind if possible as it inflates the document count. Mention the use of 'explain()' to analyze execution plans.",
  },
  {
    title:
      "Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?",
    intention:
      "To assess the candidate's ability to apply caching strategies in real distributed systems.",
    modelAnswer:
      "Describe the flow where the app checks Redis before querying the database, writes through on cache miss, and invalidates stale entries on updates. Use it when read-heavy workloads or repeated expensive queries need lower latency.",
  },
  {
    title:
      "What are the challenges of migrating a monolithic application to a modular service-based architecture?",
    intention:
      "To evaluate the candidate's thinking around decomposition, domain boundaries, and operational risk.",
    modelAnswer:
      "Discuss bounded contexts, transaction boundaries, data consistency, shared libraries, deployment pipelines, monitoring, and gradual cutover strategies. A good answer balances engineering trade-offs with business risk.",
  },
];

const behavioralQuestions = [
  {
    title:
      "Describe a time when you had to optimize a piece of code that was causing production delays. How did you identify the bottleneck?",
  },
  {
    title:
      "How do you approach learning a new technology, such as your recent work with the Gemini API?",
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

const sectionContentMap = {
  "Technical Questions": technicalQuestions,
  "Behavioral Questions": behavioralQuestions,
  "Road Map": roadmap,
};

const InterviewLayout = () => {
  const [showReport, setShowReport] = useState(false);
  const [activeSection, setActiveSection] = useState("Technical Questions");

  if (showReport) {
    const activeContent = sectionContentMap[activeSection] || [];

    return (
      <main className="report-page">
        <div className="report-shell">
          <aside className="report-sidebar">
            <div className="sections-label">SECTIONS</div>
            <nav className="report-nav" aria-label="Interview sections">
              {sections.map((section, index) => (
                <button
                  key={section}
                  type="button"
                  className={`report-nav-item ${activeSection === section ? "active" : ""}`}
                  onClick={() => setActiveSection(section)}
                >
                  <span className="nav-icon">
                    {index === 0 ? "<" : index === 1 ? "□" : "↳"}
                  </span>
                  <span>{section}</span>
                </button>
              ))}
            </nav>
          </aside>

          <section className="report-main">
            <div className="report-header">
              {activeSection === "Road Map" ? (
                <>
                  <h2>Preparation Road Map</h2>
                  <span className="plan-badge">7-day plan</span>
                </>
              ) : (
                <h2>{activeSection}</h2>
              )}
            </div>

            {activeSection === "Road Map" ? (
              <div className="timeline">
                {activeContent.map((item) => (
                  <div key={item.day} className="timeline-item">
                    <div className="timeline-marker-wrap">
                      <div className="timeline-marker">Day {item.day}</div>
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
              <div className="qa-list">
                <div className="qa-header">
                  <span>{activeSection}</span>
                  <span className="qa-count">
                    {activeContent.length} questions
                  </span>
                </div>

                {activeContent.map((item, index) => (
                  <div key={item.title} className="qa-item">
                    <div className="qa-question">
                      <span className="qa-no">Q{index + 1}</span>
                      <span>{item.title}</span>
                    </div>

                    {item.intention && (
                      <>
                        <div className="qa-label">INTENTION</div>
                        <p>{item.intention}</p>
                        <div className="qa-label answer-label">
                          MODEL ANSWER
                        </div>
                        <p>{item.modelAnswer}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="report-right-panel">
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
  }

  return (
    <main className="home">
      <div className="interview-card">
        <div className="header">
          <h1>
            Create Your Custom <span className="accent">Interview Plan</span>
          </h1>
          <p className="sub">
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </div>

        <div className="content">
          <JobDescription />
          <ProfilePanel />
        </div>

        <div className="footer">
          <GenerateButton onClick={() => setShowReport(true)} />
        </div>
      </div>
    </main>
  );
};

export default InterviewLayout;
