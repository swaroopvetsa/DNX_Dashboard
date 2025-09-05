// imports
import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import RecentMentors from "./components/RecentMentors";
import Mentors from "./components/Mentors";
import Settings from "./components/Settings";
import "./styles.css";

// Explore Mentors Page Component
function ExploreMentors({ allMentors, recent, q, setQ, toggleFollow }) {
  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return allMentors;
    return allMentors.filter(
      (m) =>
        m.name.toLowerCase().includes(k) ||
        m.role.toLowerCase().includes(k) ||
        m.bio.toLowerCase().includes(k)
    );
  }, [q, allMentors]);

  return (
    <>
      <Header title="Explore Mentors" onSearch={setQ} />
      <div className="toolbar">
        <button className="btn btn-light">Category</button>
        <div className="spacer" />
        <label className="select">
          <select>
            <option>Sort By : Popular</option>
            <option>Rating</option>
            <option>Tasks</option>
            <option>Newest</option>
          </select>
        </label>
      </div>
      <RecentMentors mentors={recent} onFollow={toggleFollow} />
      <h2 className="section-title">Mentors</h2>
      <Mentors mentors={filtered} onFollow={toggleFollow} />
    </>
  );
}

// Main App Component
function App() {
  const [allMentors, setAllMentors] = useState([]);
  const [recent, setRecent] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [mRes, rRes] = await Promise.all([
          fetch("/api/mentors"),
          fetch("/api/mentors/recent"),
        ]);
        setAllMentors(await mRes.json());
        setRecent(await rRes.json());
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      }
    }
    load();
  }, []);

  const toggleFollow = async (id) => {
    const updatedMentors = allMentors.map((m) =>
      m._id === id ? { ...m, following: !m.following } : m
    );
    setAllMentors(updatedMentors);

    const updatedRecent = recent.map((m) =>
      m._id === id ? { ...m, following: !m.following } : m
    );
    setRecent(updatedRecent);

    try {
      await fetch(`/api/mentors/${id}/follow`, { method: "POST" });
    } catch (error) {
      console.error("Failed to update follow status:", error);
      setAllMentors(allMentors);
      setRecent(recent);
    }
  };

  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Settings />} />
            <Route
              path="/mentors"
              element={
                <ExploreMentors
                  allMentors={allMentors}
                  recent={recent}
                  q={q}
                  setQ={setQ}
                  toggleFollow={toggleFollow}
                />
              }
            />
            <Route path="/overview" element={<Header title="Overview"/>} />
            <Route path="/task" element={<Header title="Task"/>} />
            <Route path="/message" element={<Header title="Message"/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;