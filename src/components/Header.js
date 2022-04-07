import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { expenses } = this.props;
    const savedValueExpenses = expenses.map((expense) => {
      const { value, exchangeRates, currency } = expense;
      const exchange = exchangeRates[currency].ask;
      const exchangeCompleted = value * exchange;
      return exchangeCompleted;
    });
    // console.log(savedValueExpenses);
    const total = savedValueExpenses.reduce((acc, curr) => acc + curr, 0).toFixed(2);
    const { email } = this.props;
    return (
      <header>
        <div>
          <span>Email:</span>
          <span data-testid="email-field">{email}</span>
        </div>
        <div>
          <span>Despesa Total:</span>
          <span data-testid="total-field">{total}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
