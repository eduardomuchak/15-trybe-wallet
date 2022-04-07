import React from 'react';
import ExpensesEntries from '../components/ExpensesEntries';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ExpensesEntries />
        <ExpensesTable />
      </>
    );
  }
}

export default Wallet;
