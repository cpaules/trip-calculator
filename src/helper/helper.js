export function calculateTotal(state) {
  let total = 0;
  state.students.forEach((student) => {
    total += Number(student.paid);
  })
  return total
}

export function createCreditorDebtorArrays(state, equalShare) {
  let creditorsArr = []
  let debtorsArr = []
  state.students.forEach((student) => {
    student.owes = (equalShare - student.paid)
    if (student.owes > 0) {
      debtorsArr.push(student)
    } else {
      creditorsArr.push(student)
    }
  })
  return { creditorsArr, debtorsArr }
}

export function outputTripCalculations(creditorsArr, debtorsArr) {
  let creditor = creditorsArr.shift();
  let debtor = debtorsArr.shift();
  let outputArr = [];
  while ((typeof creditor !==  "undefined" && typeof debtor !== "undefined") && (creditor.owes > 0.01 || debtor.owes > 0.01)) {
    // if the amount the debtor owes is greater than the amount the creditor is owed, the debtor 
    // pays the creditor everything they are owed and the debtor still has a remaining balance
    if (debtor.owes > Math.abs(creditor.owes)) {
      outputArr.push(`${debtor.name} owes ${creditor.name} $${Math.trunc(Math.abs(creditor.owes) * 100) / 100}`)
      debtor.owes += creditor.owes;
      creditor.owes = 0;
      creditor = creditorsArr.shift();
    }
    // if the amount the debtor owes is less than the amount the creditor is owed, the debtor 
    // gives his remaining balance to the creditor, and the creditor is still owed money from someone else
    else if (debtor.owes < Math.abs(creditor.owes)) {
      outputArr.push(`${debtor.name} owes ${creditor.name} $${Math.trunc(debtor.owes * 100) / 100}`)
      creditor.owes += debtor.owes;
      debtor.owes = 0;
      debtor = debtorsArr.shift();
    }
    // else the amount the debtor owes the creditor is equal to amount the creditor is owed 
    else if (debtor.owes === Math.abs(creditor.owes)) {
      outputArr.push(`${debtor.name} owes ${creditor.name} $${Math.trunc(debtor.owes * 100) / 100}`)
      debtor.owes = 0;
      debtor = debtorsArr.shift();
      creditor.owes = 0;
      creditor = creditorsArr.shift();
    }
  }
  return outputArr;
}