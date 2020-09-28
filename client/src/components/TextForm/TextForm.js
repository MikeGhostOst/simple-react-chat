import React from 'react';

import './TextForm.css';

const TextForm = ({ handleSubmit, inputText, setInputText }) => {
  const handleChange = e => {
    const value = e.target.value;

    if (value.length > 100) {
      return setInputText( value.slice(0, 100) );
    }

    setInputText(value);
  }

  return (
    <form onSubmit={handleSubmit} className="text-form flex-column grey-background">
      <label className="label" htmlFor="messageInput">Type text and press "Enter":</label>
      <input className="input" id="messageInput" name="messageInput" type="text" onChange={handleChange} value={inputText} />
    </form>
  );
}

export default TextForm;