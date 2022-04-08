import React from 'react';
import ExpensesEntries from '../components/ExpensesEntries';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';
import styles from '../styles/Wallet.module.css';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className={`${styles['background-container']} col-11 m-auto mt-5`}>
          <ExpensesEntries />
          <ExpensesTable />
        </div>
      </>
    );
  }
}

export default Wallet;
