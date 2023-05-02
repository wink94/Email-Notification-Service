import React, { useState } from 'react';

function TemplatePopup({ onClose }) {
  const [templateName, setTemplateName] = useState("");
  const [subject, setSubject] = useState("");
  const [templateBody, setTemplateBody] = useState("");

  const handleTemplateNameChange = (event) => {
    setTemplateName(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleTemplateBodyChange = (event) => {
    setTemplateBody(event.target.value);
  };

  const handleCancelClick = () => {
    onClose();
  }

  const handleSaveClick = () => {
    console.log('Template Name:', templateName);
    console.log('Subject:', subject);
    console.log('Template Body:', templateBody);
    onClose();
  }
  

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Manage Template</h3>
        <div className="popup-body">
          <div className="popup-input">
            <label htmlFor="template-name-input">Template Name:</label>
            <input type="text" id="template-name-input" value={templateName} onChange={handleTemplateNameChange} style={{width: "100%"}} />
          </div>
          <div className="popup-input">
            <label htmlFor="subject-input">Subject:</label>
            <input type="text" id="subject-input" value={subject} onChange={handleSubjectChange} style={{width: "100%"}} />
          </div>
          <div className="popup-input">
            <label htmlFor="template-body-input">Template Body:</label>
            <textarea id="template-body-input" value={templateBody} onChange={handleTemplateBodyChange} style={{width: "100%", height: "200px"}}></textarea>
          </div>
        </div>
        <div className="popup-buttons">
          <button onClick={handleCancelClick}>Cancel</button>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default TemplatePopup;
