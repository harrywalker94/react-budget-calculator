import React from "react";
// Pass down props
const Alert = ({ type, text }) => {
  /* 
  - Set up className dynamic using curly-braces and template literals to access,
   particular type in app.css (alert or danger) 
   
   
   */
  return <div className={`alert alert-${type}`}>{text}</div>;
};

export default Alert;
