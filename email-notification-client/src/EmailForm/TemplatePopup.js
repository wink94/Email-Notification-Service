import React, { useCallback, useEffect, useState } from "react";
import { addtemplate, getTemplate } from "../data/template";
import { getRecipients } from "../data/recipient";
import MaterialTable from "./MaterialTable";

function TemplatePopup({ onClose }) {
  const [templateName, setTemplateName] = useState("");
  const [subject, setSubject] = useState("");
  const [templateBody, setTemplateBody] = useState("");
  const [templateId, setTemplateId] = useState(null);
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      name: "id",
      value: "templateId",
    },
    {
      name: "templateName",
      value: "templateName",
    },
    {
      name: "active",
      value: "active",
    },
    {
      name: "templateSubject",
      value: "templateSubject",
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

  const fetchTableData = useCallback(async () => {
    const res = await getTemplate();
    setTableData(res?.data);
  }, []);
  useEffect(() => {
    fetchTableData();
  }, []);

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

  const handleTemplateNameChange = (event) => {
    setTemplateName(event.target.value);
  };

  const handleTemplateIdChange = (event) => {
    setTemplateId(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleTemplateBodyChange = (event) => {
    setTemplateBody(event.target.value);
  };

  const handleCancelClick = () => {
    onClose();
  };

  const handleSaveClick = async () => {
    const templateDataObject = formFields.reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});

    const pushData = {
      templateBody: { Template: templateDataObject },
      templateName,
      templateId,
      templateSubject: subject,
    };

    try {
      let response = { data: { isSuccess: false } };
      if (!templateId) {
        response = await addtemplate(pushData, "add");
        console.log(
          "🚀 ~ file: TemplatePopup.js:70 ~ handleSaveClick ~ response:",
          response
        );
      } else {
        response = await addtemplate(pushData, "update");
      }
      if (response.status === "success") {
        alert("Template added success");
      } else {
        alert("Template error");
      }
    } catch (error) {
      alert("Template error");
    }
  };

  return (
    <div className="email-form App popup-overlay">
      <div className="popup">
        <h3>Manage Template</h3>
        <div className="popup-body">
          <div className="popup-input">
            <label htmlFor="template-name-input">{`Template Id (optinal):`}</label>
            <input
              type="text"
              id="template-name-input"
              value={templateId}
              onChange={handleTemplateIdChange}
              style={{ width: "100%" }}
            />
          </div>
          <div className="popup-input">
            <label htmlFor="template-name-input">Template Name:</label>
            <input
              type="text"
              id="template-name-input"
              value={templateName}
              onChange={handleTemplateNameChange}
              style={{ width: "100%" }}
            />
          </div>
          <div className="popup-input">
            <label htmlFor="subject-input">Subject:</label>
            <input
              type="text"
              id="subject-input"
              value={subject}
              onChange={handleSubjectChange}
              style={{ width: "100%" }}
            />
          </div>
          <div className="popup-input">
            <label htmlFor="template-body-input">Template Body:</label>
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
        </div>
        <div className="popup-buttons">
          <button onClick={(event) => (window.location.href = "/app")}>
            Cancel
          </button>
          <button onClick={handleSaveClick}>Save</button>
        </div>
        {MaterialTable(tableData, columns)}
      </div>
    </div>
  );
}

export default TemplatePopup;
