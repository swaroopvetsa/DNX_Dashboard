import React from "react";
import "../styles.css";

function Header({ title, onSearch }) {
  return (
    <header className="header">
      <h1 className="page-title">{title}</h1>

      <div className="header-actions">
        <div className="search">
          <input
            type="search"
            className="input"
            placeholder="Search Mentors"
            onChange={(e) => onSearch?.(e.target.value)}
          />
          <svg className="search-ico" aria-hidden fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
        </div>

        <button className="icon-btn" title="Notifications">
           <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        </button>
        <div className="profile">
          <img
            src="https://i.pravatar.cc/40?img=1"
            alt="User avatar"
            className="avatar"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;