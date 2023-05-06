import React, { useCallback, useEffect, useState } from "react";
import { addRecipient, getRecipients } from "../data/recipient";
import MaterialTable from "./MaterialTable";
import { recipientEmailConverter } from "../config/constant";

function RecipientPopups({ onClose }) {
  const [toAddresses, setToAddresses] = useState("");
  const [ccAddresses, setCcAddresses] = useState("");
  const [bccAddresses, setBccAddresses] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientId, setRecipientId] = useState(null);

    const [tableData, setTableData] = useState([]);

  const columns = [
    {
      name: "id",
      value: "recipientId",
    },
    {
      name: "recipientName",
      value: "recipientName",
    },
    {
      name: "active",
      value: "active",
    },
    {
      name: "emailAddresses",
      value: "emailAddresses",
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
    const res = await getRecipients();
    setTableData(recipientEmailConverter(res?.data));
  }, []);
  useEffect(() => {
    fetchTableData();
  }, []);

  const handleToAddressesChange = (event) => {
    setToAddresses(event.target.value);
  };

  const handleCcAddressesChange = (event) => {
    setCcAddresses(event.target.value);
  };

  const handleBccAddressesChange = (event) => {
    setBccAddresses(event.target.value);
  };

  const handleRecipientNameChange = (event) => {
    setRecipientName(event.target.value);
  };

  const handleRecipientIdChange = (event) => {
    setRecipientId(event.target.value);
  };

  const handleCancelClick = () => {
    onClose();
  };

  const handleSaveClick = async () => {
    const pushData = {
      toAddresses:toAddresses.split(','),
      ccAddresses:ccAddresses.split(','),
      bccAddresses:bccAddresses.split(','),
      recipientName,
      recipientId,
    };

    try {
      let response = { data: { isSuccess: false } };
      if (!recipientId) {
        response = await addRecipient(pushData, "add");
        console.log(
          "🚀 ~ file: RecipientPopup.js:70 ~ handleSaveClick ~ response:",
          response
        );
      } else {
        response = await addRecipient(pushData, "update");
      }
      if (response.status === "success") {
        alert("Recipient added success");
      } else {
        alert("Recipient error");
      }
    } catch (error) {
      alert("Recipient error");
    }
  };

  return (
    <div className="email-form App popup-overlay">
      <div className="popup">
        <h3>Manage Recipients</h3>
        <div className="popup-body">
          <div className="popup-input">
            <label htmlFor="Recipient-name-input">{`Recipient Id (optinal):`}</label>
            <input
              type="text"
              id="Recipient-name-input"
              value={recipientId}
              onChange={handleRecipientIdChange}
              style={{ width: "100%" }}
            />
          </div>
          <div className="popup-input">
            <label htmlFor="to-addresses-input">To:</label>
            <input
              type="text"
              id="to-addresses-input"
              value={toAddresses}
              onChange={handleToAddressesChange}
            />
          </div>
          <div className="popup-input">
            <label htmlFor="cc-addresses-input">CC:</label>
            <input
              type="text"
              id="cc-addresses-input"
              value={ccAddresses}
              onChange={handleCcAddressesChange}
            />
          </div>
          <div className="popup-input">
            <label htmlFor="bcc-addresses-input">BCC:</label>
            <input
              type="text"
              id="bcc-addresses-input"
              value={bccAddresses}
              onChange={handleBccAddressesChange}
            />
          </div>
          <div className="popup-input">
            <label htmlFor="recipient-name-input">Recipient Name:</label>
            <input
              type="text"
              id="recipient-name-input"
              value={recipientName}
              onChange={handleRecipientNameChange}
            />
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

export default RecipientPopups;
