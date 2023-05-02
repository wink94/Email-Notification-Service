import React, { useState } from "react";
import "./EmailForm.css";
import "./Popup.css";

function EmailForm() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [showTemplatePopup, setShowTemplatePopup] = useState(false);
  const [showRecipientPopup, setShowRecipientPopup] = useState(false);

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSendEmail = (event) => {
    event.preventDefault();
    // TODO: Send email using to, subject, and body
  };

  const handleManageTemplatesClick = () => {
    setShowTemplatePopup(true);
  };

  const handleManageRecipientsClick = () => {
    setShowRecipientPopup(true);
  };

  const handlePopupClose = () => {
    setShowTemplatePopup(false);
    setShowRecipientPopup(false);
  };

  return (
    <div className="email-form">
      <div className="email-form-header">
        <h2>Email Notification Service</h2>
        <div className="email-form-buttons">
          <button onClick={handleManageTemplatesClick}>Manage Templates</button>
          <button onClick={handleManageRecipientsClick}>Manage Recipients</button>
        </div>
      </div>
      <div className="email-form-body">
        <div className="email-form-input">
          <label htmlFor="to-input">To:</label>
          <input type="email" id="to-input" value={to} onChange={handleToChange} />
        </div>
        <div className="email-form-input">
          <label htmlFor="subject-input">Subject:</label>
          <input type="text" id="subject-input" value={subject} onChange={handleSubjectChange} />
        </div>
        <div className="email-form-input">
          <label htmlFor="body-input">Body:</label>
          <textarea id="body-input" rows="10" cols="50" value={body} onChange={handleBodyChange} />
        </div>
        <div className="email-form-footer">
          <button className="send-email-btn" onClick={handleSendEmail}>Send Email</button>
        </div>
      </div>
      {showTemplatePopup && <TemplatePopup onClose={handlePopupClose} />}
      {showRecipientPopup && <RecipientPopup onClose={handlePopupClose} />}
    </div>
  );
}

function TemplatePopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Manage Templates</h3>
        <p>text</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function RecipientPopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Manage Recipients</h3>
        <p>text</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default EmailForm;
