import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../App";
import "../App.css";
import { useLoginHandler } from "../config/userLogin";
import {
  getAllEmailAuditEntry,
  pushEmailNotification,
} from "../data/emailPush";
import "./EmailForm.css";
import MaterialTable from "./MaterialTable";
import "./Popup.css";
import RecipientWindow from "./RecipientsPopup.js";
import TemplateWindow from "./TemplatePopup.js";

function EmailForm() {
  const [applicationName, setApplicationName] = useState("");
  const [emailCategory, setEmailCategory] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [emailData, setEmailData] = useState([]);
  const navigate = useNavigate();
  const {
    loading,
    isAuthenticated,
    userPool,
    getAuthenticatedUser,
    signOut,
    setAuthenticated,
  } = useLoginHandler("");
  const { accessToken, user, getAccessTokenFromStorage,getUserTokenFromStorage } = useTokenStore();
  console.log(
    "🚀 ~ file: EmailForm.js:35 ~ EmailForm ~ accessToken:",
    accessToken
  );

  const fetchEmailAudit = useCallback(async () => {
    const token = accessToken || getAccessTokenFromStorage();
    console.log("🚀 ~ file: EmailForm.js:39 ~ fetchEmailAudit ~ token:", token)
    const res = await getAllEmailAuditEntry(token);
    setEmailData(res?.data);
  }, []);
  useEffect(() => {
    if (!getAuthenticatedUser().getUsername()) {
      navigate("/");
    }
    fetchEmailAudit();
  }, []);

  const [recipientId, setRecipientId] = useState("");
  const [showTemplatePopup, setShowTemplatePopup] = useState(false);
  const [showRecipientPopup, setShowRecipientPopup] = useState(false);

  const [formFields, setFormFields] = useState([{ name: "", value: "" }]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const addFields = () => {
    let object = {
      name: "",
      value: "",
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const handleApplicationNameChange = (event) => {
    setApplicationName(event.target.value);
  };

  const handleEmailCategoryChange = (event) => {
    setEmailCategory(event.target.value);
  };

  const handleTemplateIdChange = (event) => {
    setTemplateId(event.target.value);
  };

  const handleRecipientIdChange = (event) => {
    setRecipientId(event.target.value);
  };

  const handleSendEmail = async (event) => {
    event.preventDefault();
    // TODO: Send email using applicationName, emailCategory, templateId, templateData, subject, name, product, and recipientId
    const templateDataObject = formFields.reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});

    const emailPushData = {
      applicationName,
      emailCategory,
      templateId,
      templateData: templateDataObject,
      recipientId: 1,
    };
    const token = accessToken || getAccessTokenFromStorage();
    console.log("🚀 ~ file: EmailForm.js:108 ~ handleSendEmail ~ token:", token)
    try {
      const response = await pushEmailNotification(emailPushData, token);

      if (response.data.isSuccess) {
        alert("Email sent success");
      } else {
        alert("Email sent error");
      }
    } catch (error) {
      alert("Email sent error");
    }
  };

  const handleManageTemplatesClick = () => {
    // setShowTemplatePopup(true);
    navigate("/app/template");
  };

  const handleManageRecipientsClick = () => {
    // setShowRecipientPopup(true);
    navigate("/app/recipient");
  };

  const handleCopytoClipboard=async ()=>{
     try {
      const token = accessToken || getAccessTokenFromStorage();
      if (token) {
        await navigator.clipboard.writeText(token);
        alert("Copied!");
      }
     
    } catch (err) {
      alert("Failed to copy!");
    }
  }

  const handlePopupClose = () => {
    setShowTemplatePopup(false);
    setShowRecipientPopup(false);
  };

  const columns = [
    {
      name: "id",
      value: "emailNotificationAuditPrimaryId",
    },
    {
      name: "emailSubject",
      value: "emailSubject",
    },
    {
      name: "recipientId",
      value: "recipientId",
    },
    {
      name: "sesRequestId",
      value: "sesRequestId",
    },
    {
      name: "createdDate",
      value: "createdDate",
    },
    {
      name: "modifiedDate",
      value: "modifiedDate",
    },
  ];

  return (
    <div className="email-form App">
      <div className="email-form-header">
        <h2>Email Notification Service</h2>

        <div className="email-form-buttons">
          <button onClick={handleCopytoClipboard}>
            Copy token to clipboard
          </button>
          {(user === "spade" ||
            getUserTokenFromStorage() === "spade") && (
              <>
                <button onClick={handleManageTemplatesClick}>
                  Manage Templates
                </button>
                <button onClick={handleManageRecipientsClick}>
                  Manage Recipients
                </button>
              </>
            )}
        </div>
      </div>
      <div className="email-form-body">
        <div className="email-form-input">
          <label htmlFor="applicationName-input">Application Name:</label>
          <input
            type="text"
            id="applicationName-input"
            value={applicationName}
            onChange={handleApplicationNameChange}
          />
        </div>
        <div className="email-form-input">
          <label htmlFor="emailCategory-input">Email Category:</label>
          <input
            type="text"
            id="emailCategory-input"
            value={emailCategory}
            onChange={handleEmailCategoryChange}
          />
        </div>
        <div className="email-form-input">
          <label htmlFor="templateId-input">Template Id:</label>
          <input
            type="text"
            id="templateId-input"
            value={templateId}
            onChange={handleTemplateIdChange}
          />
        </div>
        <div className="email-form-input">
          <label htmlFor="templateData-input">Recipient Id:</label>
          <input
            type="text"
            id="recipientId-input"
            value={recipientId}
            onChange={handleRecipientIdChange}
          />
        </div>
        <div className="email-form-input">
          <label htmlFor="templateData-input">Template Data:</label>
          {/* <input type="text" id="templateData-input" value={templateData} onChange={handleTemplateDataChange} /> */}
        </div>

        <div className="email-form-input">
          <button onClick={addFields} className="send-email-btn">
            Add More..
          </button>
        </div>
        <div className="email-form-input">
          {formFields.map((form, index) => {
            return (
              <div key={index}>
                <input
                  id="product-input"
                  name="name"
                  placeholder="Name"
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.name}
                />
                <input
                  name="value"
                  id="name-input"
                  placeholder="Value"
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.value}
                />
                <button
                  className="send-email-btn"
                  onClick={() => removeFields(index)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <div className="email-form-footer">
          <button className="send-email-btn" onClick={handleSendEmail}>
            Send Email
          </button>
        </div>
        {MaterialTable(emailData, columns)}
      </div>
      {/* {showTemplatePopup && <TemplatePopup onClose={handlePopupClose} />} */}
      {showRecipientPopup && <RecipientPopup onClose={handlePopupClose} />}
    </div>
  );
}

function TemplatePopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <TemplateWindow />
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
