import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BsCurrencyExchange } from 'react-icons/bs';
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
      <header className='col-12 m-auto header-bar'>
        <div className='header-container col-11 m-auto'>
          <div className='icon-container col-2'>
            <BsCurrencyExchange className='header-icon'/>
          </div>
          <div className='expense-container col-10'>
              <span data-testid="email-field" className='header-text'>{email}</span>
              <div>
                <span className='header-text'>Total de Despesas:</span>
                <span data-testid="total-field" className='header-text'><strong>{` R$ ${total}`}</strong></span>
                {/* <span data-testid="header-currency-field">BRL</span> */}
              </div>
        </div>
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
