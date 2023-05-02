import React, { useState } from 'react';

function RecipientPopups({ onClose }) {
  const [toAddresses, setToAddresses] = useState("");
  const [ccAddresses, setCcAddresses] = useState("");
  const [bccAddresses, setBccAddresses] = useState("");
  const [recipientName, setRecipientName] = useState("");

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

  const handleCancelClick = () => {
    onClose();
  };

  const handleSaveClick = () => {
    console.log('To:', toAddresses);
    console.log('CC:', ccAddresses);
    console.log('BCC:', bccAddresses);
    console.log('Recipient Name:', recipientName);
    onClose();
  };
  
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Manage Recipients</h3>
        <div className="popup-body">
          <div className="popup-input">
            <label htmlFor="to-addresses-input">To:</label>
            <input type="text" id="to-addresses-input" value={toAddresses} onChange={handleToAddressesChange} />
          </div>
          <div className="popup-input">
            <label htmlFor="cc-addresses-input">CC:</label>
            <input type="text" id="cc-addresses-input" value={ccAddresses} onChange={handleCcAddressesChange} />
          </div>
          <div className="popup-input">
            <label htmlFor="bcc-addresses-input">BCC:</label>
            <input type="text" id="bcc-addresses-input" value={bccAddresses} onChange={handleBccAddressesChange} />
          </div>
          <div className="popup-input">
            <label htmlFor="recipient-name-input">Recipient Name:</label>
            <input type="text" id="recipient-name-input" value={recipientName} onChange={handleRecipientNameChange} />
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

export default RecipientPopups;
