import React from "react";
import Item from "./ExpenseItem";
import { RiDeleteBin7Line } from "react-icons/ri";
// Pass in props
const ExpenseList = ({ expenses, handleEdit, handleDelete, clearItems }) => {
  return (
    <>
      <ul className="list">
        {/* 
        1. Use .map method to iterate through the expenses array taken from initial expenses in app.js
        2. Pass in call back function applied to each and every item in the array
        3. add key props into <Item />
        4. key={expenses.id} passes in id expense={expense} passes in all other items from expenses array
        */}
        {expenses.map((expense) => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {/* 
      - If expenses length is bigger than 0, anything after && will be rendered
      - If nothing is going to be in the list, then the clear items btn will not be displayed
       */}
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          clear expenses <RiDeleteBin7Line className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
