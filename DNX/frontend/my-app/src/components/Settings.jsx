import React, { useState, useEffect } from "react";
import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    language: "English (Default)",
    timezone: "GMT+5:30 (IST)",
    format: "12 Hours",
    notifications: {
      message: true,
      taskUpdate: false,
      taskDeadline: true,
      mentorHelp: false,
    },
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) setFormData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, format: e.target.value });
  };

  const toggleNotification = (key) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleSave = async () => {
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert("✅ Settings saved!");
    } catch(err) {
      alert("❌ Could not save settings.");
    }
  };

  const notificationLabels = {
    message: "Message",
    taskUpdate: "Task Update",
    taskDeadline: "Task Deadline",
    mentorHelp: "Mentor Help",
  };

  return (
    <div className="settings-wrapper">
      <h2 className="settings-title">Settings</h2>

      <div className="tabs">
        <button
          className={activeTab === "general" ? "tab active" : "tab"}
          onClick={() => setActiveTab("general")}
        >
          General
        </button>
        <button
          className={activeTab === "notification" ? "tab active" : "tab"}
          onClick={() => setActiveTab("notification")}
        >
          Notification
        </button>
      </div>

      <div className="card settings-card">
        {activeTab === "general" && (
          <div className="tab-content">
            {/* Form groups remain the same */}
            <div className="form-group">
              <label>Language</label>
              <select name="language" value={formData.language} onChange={handleChange}>
                <option>English (Default)</option>
                <option>French</option>
                <option>Spanish</option>
              </select>
            </div>
            <div className="form-group">
              <label>Timezone</label>
              <select name="timezone" value={formData.timezone} onChange={handleChange}>
                <option>GMT-5 (EST)</option>
                <option>GMT+0 (UTC)</option>
                <option>GMT+5:30 (IST)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Time Format</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="format" value="24 Hours" checked={formData.format === "24 Hours"} onChange={handleRadioChange} />
                  <span>24 Hours</span>
                </label>
                <label>
                  <input type="radio" name="format" value="12 Hours" checked={formData.format === "12 Hours"} onChange={handleRadioChange} />
                  <span>12 Hours</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notification" && (
          <div className="tab-content">
            {Object.keys(formData.notifications).map((key) => (
              <div key={key} className="toggle-switch">
                <span>{notificationLabels[key]}</span>
                <label className="switch">
                  <input type="checkbox" checked={formData.notifications[key]} onChange={() => toggleNotification(key)} />
                  <span className="slider"></span>
                </label>
              </div>
            ))}
          </div>
        )}
        
        {/* --- THIS IS THE CHANGE --- */}
        {/* The Save button is now inside the card */}
        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;