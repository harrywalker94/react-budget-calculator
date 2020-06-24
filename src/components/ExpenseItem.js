import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
// Pass in props
const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
  // Destructure props
  const { id, charge, amount } = expense;
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">£{amount}</span>
      </div>
      <div>
        <button
          className="edit-btn"
          aria-label="edit button"
          /* - Pass in handleEdit function onClick 
          - Pass in id so only the single item clicked upon gets edited
          */
          onClick={() => handleEdit(id)}
        >
          <MdEdit />
        </button>
        <button
          className="clear-btn"
          aria-label="delete button"
          /* - Pass in handleDelete function onClick 
          - Pass in id so only the single item clicked upon gets edited
          */
          onClick={() => handleDelete(id)}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
