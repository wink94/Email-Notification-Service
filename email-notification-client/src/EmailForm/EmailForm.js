import React, { useState } from "react";
import "./EmailForm.css";
import "./Popup.css";
import RecipientWindow from './RecipientsPopup.js';
import TemplateWindow from './TemplatePopup.js';



function EmailForm() {
  const [applicationName, setApplicationName] = useState("");
  const [emailCategory, setEmailCategory] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [templateData, setTemplateData] = useState("");
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [showTemplatePopup, setShowTemplatePopup] = useState(false);
  const [showRecipientPopup, setShowRecipientPopup] = useState(false);

  const handleApplicationNameChange = (event) => {
    setApplicationName(event.target.value);
  };

  const handleEmailCategoryChange = (event) => {
    setEmailCategory(event.target.value);
  };

  const handleTemplateIdChange = (event) => {
    setTemplateId(event.target.value);
  };

  const handleTemplateDataChange = (event) => {
    setTemplateData(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  const handleRecipientIdChange = (event) => {
    setRecipientId(event.target.value);
  };

  const handleSendEmail = (event) => {
    event.preventDefault();
    // TODO: Send email using applicationName, emailCategory, templateId, templateData, subject, name, product, and recipientId
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
          <label htmlFor="applicationName-input">Application Name:</label>
          <input type="text" id="applicationName-input" value={applicationName} onChange={handleApplicationNameChange} />
        </div>
        <div className="email-form-input">
          <label htmlFor="emailCategory-input">Email Category:</label>
          <input type="text" id="emailCategory-input" value={emailCategory} onChange={handleEmailCategoryChange} />
        </div>
        <div className="email-form-input">
          <label htmlFor="templateId-input">Template Id:</label>
          <input type="text" id="templateId-input" value={templateId} onChange={handleTemplateIdChange} />
        </div>      
        <div className="email-form-input">
          <label htmlFor="templateData-input">Recipient Id:</label>
          <input type="text" id="recipientId-input" value={recipientId} onChange={handleRecipientIdChange} />
        </div>
        <div className="email-form-input">
          <label htmlFor="templateData-input">Template Data:</label>
          <input type="text" id="templateData-input" value={templateData} onChange={handleTemplateDataChange} />
        </div>
        <div className="email-form-input">
          <label htmlFor="subject-input">Subject:</label>
          <div className="subject-input-wrapper">
            <input type="text" id="subject-input" value={subject} onChange={handleSubjectChange} />
            <span className="subject-input-icon"></span>
          </div>
        </div>
        <div className="email-form-input">
          <label htmlFor="name-input">Name:</label>
          <div className="name-input-wrapper">
            <input type="text" id="name-input" value={name} onChange={handleNameChange} />
            <span className="name-input-icon"></span>
          </div>
        </div>
        <div className="email-form-input">
          <label htmlFor="product-input">Product:</label>
          <div className="product-input-wrapper">
            <input type="text" id="product-input" value={product} onChange={handleProductChange} />
            <span className="product-input-icon"></span>
          </div>
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
        <TemplateWindow/>
      </div>
    </div>
  );
}

function RecipientPopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <RecipientWindow />
      </div>
    </div>
  );
}

export default EmailForm;
