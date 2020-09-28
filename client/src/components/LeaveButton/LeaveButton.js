import React from 'react';

import './LeaveButton.css';

import icon from './icon.svg';

const LeaveButton = ({ handleLeave }) =>  (
  <input
    type="image"
    src={icon}
    alt="leave"
    onClick={handleLeave}
    className="leave-button button-style-off"
  />
)

export default LeaveButton;