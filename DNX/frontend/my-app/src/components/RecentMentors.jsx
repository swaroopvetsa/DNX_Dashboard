// imports
import React from "react";
import "../styles.css";

// function component
function RecentMentors({ mentors = [] }) {
  return (
    <section className="card recent">
      <div className="section-head">
        <h2>Recent Mentors</h2>
        <div className="carousel-ctrls" aria-label="scroll recent mentors">
          <button className="icon-btn" aria-label="Prev">←</button>
          <button className="icon-btn" aria-label="Next">→</button>
        </div>
      </div>

      <div className="recent-row">
        {mentors.map((m) => (
          <article key={m._id} className="mentor-chip">
            <img src={m.avatar} alt={m.name} className="chip-avatar" />
            <div className="chip-body">
              <div className="chip-top">
                <h3 className="chip-name">{m.name}</h3>
                <button className="link-btn">{m.following ? "Followed" : "+ Follow"}</button>
              </div>
              <div className="chip-role">{m.role}</div>
              <div className="chip-meta">
                <span>🌀 {m.tasks} Task</span>
                <span>★ {m.rating} ({m.reviews} Reviews)</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// export
export default RecentMentors;
