import React from "react";
import SelfDescription from "./SelfDescription";

const ProfilePanel = () => (
  <aside className="right panel">
    <div className="panel-header">
      <span className="icon">👤</span> Your Profile
    </div>

    <label className="upload-box" htmlFor="resume">
      <div className="upload-inner">
        <div className="cloud">⬆️</div>
        <div className="upload-text">Click to upload or drag & drop</div>
        <small className="upload-hint">PDF or DOCX. Max 5MB</small>
      </div>
    </label>
    <input id="resume" type="file" accept=".pdf,.doc,.docx" hidden />

    <SelfDescription />
  </aside>
);

export default ProfilePanel;
