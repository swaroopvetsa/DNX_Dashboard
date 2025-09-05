// imports
import React from "react";
import "../styles.css";

// function component
function Mentors({ mentors = [], onFollow }) {
  return (
    <section className="mentors-grid">
      {mentors.map((m) => (
        <article key={m._id} className="card mentor-card">
          <div className="mentor-top">
            <img src={m.avatar} alt={m.name} className="mentor-avatar" />
            <div className="mentor-id">
              <h3 className="mentor-name">{m.name}</h3>
              <div className="mentor-role">{m.role}</div>
            </div>
            <button
              className={`btn btn-light ms-auto ${m.following ? "is-following" : ""}`}
              onClick={() => onFollow?.(m._id)}
            >
              {m.following ? "Followed" : "+ Follow"}
            </button>
          </div>

          <p className="mentor-bio">{m.bio}</p>

          <div className="mentor-stats">
            <span className="pill">🌀 {m.tasks} Task</span>
            <span className="pill">★ {m.rating} ({m.reviews} Reviews)</span>
          </div>
        </article>
      ))}
    </section>
  );
}

// export
export default Mentors;
