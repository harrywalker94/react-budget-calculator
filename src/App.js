import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "uuid/v4";

// Hooks are functions that let you "hook into" React state and lifecycle features from functoin components
// 1. Import useState from react
// 2. function returns [] with two values
// 1st the actual value of the state - 2nd function for updates and control
//useEffect let's perform side effects
// runs after every render
// first paramater -  callback function (runs after render)
// second paramater - array - for letting react know when to run useEffect.
// react re-renders when state has changed or props

// set initialExpenses array
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
function App() {
  // ====================state values ==================== //
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  // - Pass in default value of empty string
  const [charge, setCharge] = useState("");
  // single amount
  // - Pass in default value of empty string
  const [amount, setAmount] = useState("");
  // alert
  // - Initially set propery to show false
  const [alert, setAlert] = useState({ show: false });
  // edit
  // - Initially set useState to false
  const [edit, setEdit] = useState(false);
  // edit item
  // - Set useState to 0
  const [id, setId] = useState(0);
  // ************* useEffect *******************
  useEffect(() => {
    console.log("we called useEffect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  // ************* functionality *******************
  // handle charge
  // - Pass in event object
  // - Using setCharge control from useState to pass in the event to the target property
  // - When user inputs tex, function is called and takes the value of the user input using e.target.value
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  // handle amount
  // - Pass in event object
  // - Using setCharge control from useState to pass in the event to the target property
  // - When user inputs tex, function is called and takes the value of the user input using e.target.value
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  // handle alert
  // - get setAlert from useState
  // - When alert show was passed in, then set show property to true
  // - setTimeout as callback function to 3 seconds and set show back to false
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  // - handle submit
  // - The preventDefault() method cancels the event, meaning that the default action that belongs to the event will not occur.
  // - If charge is NOT equal to empty string and amount is bigger than 0 perform function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      /* 
      // - If we click on edit button, we are going to be editing and edit will be set to true
      // - If we are editing, iterate through particular array using .map
      // - If ID of item matches id within the state then using ternary operator, use one functionality and return item as it is if not use different functionality
      // If it does match, return the item as well as charge and amount if it is not matching return item
      // - setExpenses to tempExoenses and setEdit back to false
      // - handleAlert to success
      // - else, if we are not editing we are going to do our submission
      // - else handleAlert

      */
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        /* Using spreadoperator, take expenses array and new created singleExpense array and combine  */
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      // Set charge to empty string
      // Set amount to empty string
      setCharge("");
      setAmount("");
    } else {
      // handle alert called
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount value has to be bigger than zero`,
      });
    }
  };
  // clear all items
  // - Set setExenses to empty array once clear expenses is clicked
  // - Return handleAlert function
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };
  // handle delete
  // - Pass in id available to us in the expenseItem
  // - Set tempExpenses array and use the filter method to iterate through expenses array,
  //  and return items that do not match that id
  // - The filter() method creates a new array with all elements that pass the test implemented by the provided function.
  // - Set setExpenses to tempExpenses
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };
  // handle edit
  // - Let expense equal to expenses array from the state values
  // - Use the find method to iterate through the array
  // - The find() method returns the value of the first element in an array that pass a test (provided as a function).
  // - If item has the id that matches the id that is being passed in, then return this parricular item
  // - Destructure properties,
  // - setCharge to charge from expense array to edit
  // - setAmount to amount from expense array to edit
  // - setEdit to true
  // - setID to id passed in as parameter and place in same position in expenseList as before
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {/* 
    - Check property of alert (initially set to false)
    - Only if the property is true then display alert component (success or danger)
    */}
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        {/* Pass down props from ExpenseFormjs to expense form components */}
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        {/* Pass down props from ExpenseListjs to expense list component */}
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          £{" "}
          {/* 
          1. The reduce() method reduces the array to a single value.
          2. set up 2 parametres acc(accumulator/total) and curr(current item in iteration)
          3. The call back function will be applied for each and every item we have in the array
          4. parseInt() parses a string and returns an integer.
          
          */}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
