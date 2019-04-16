import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import PersonForm from './components/PersonForm';
import { calculateTotal, createCreditorDebtorArrays, outputTripCalculations } from './helper/helper';

let container;
let mockState = {
  students: [{ 
    name: "Louis",
    paid: "53.54",
    owes: 0
   },
  {
    name: "Carter",
    paid: "50.23",
    owes: 0 
  },
  {
    name: "David",
    paid: "113.41",
    owes: 0 
  }]
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and add a student', () => {
  act(() => {
    ReactDOM.render(<PersonForm />, container);
  });
  const addStudentButton = container.querySelector('.addStudent');
  expect(addStudentButton.value).toBe("Add Student");

  act(() => {
    addStudentButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  const student2 = container.querySelector('#student2Name')
  expect(student2.placeholder).toBe("Student #2 name");
});

//Test helper functions
it('can calculate the total', () => {
  let total = calculateTotal(mockState);
  expect(total).toBe(217.18);
});

it('can create the creditorsArr and debtorsArr', () => {
  const equalShare = 72.39
  let { creditorsArr, debtorsArr } = createCreditorDebtorArrays(mockState, equalShare);
  expect(creditorsArr).toEqual([{"name": "David", "owes": -41.019999999999996, "paid": "113.41"}]);
  expect(debtorsArr).toEqual([{"name": "Louis", "owes": 18.85, "paid": "53.54"}, {"name": "Carter", "owes": 22.160000000000004, "paid": "50.23"}]);
});

it('can create the outputArr', () => {
  const creditorsArr = [{"name": "David", "owes": -41.019999999999996, "paid": "113.41"}];
  const debtorsArr = [{"name": "Louis", "owes": 18.85, "paid": "53.54"}, {"name": "Carter", "owes": 22.160000000000004, "paid": "50.23"}];
  let outputArr = outputTripCalculations(creditorsArr, debtorsArr);
  expect(outputArr).toEqual(["Louis owes David $18.85", "Carter owes David $22.16"]);
});