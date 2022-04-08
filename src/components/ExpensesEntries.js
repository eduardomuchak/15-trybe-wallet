import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllCurrenciesInfoThunk, fetchCurrenciesInfoThunk } from '../actions';
import '../styles/ExpensesEntries.css';

class ExpensesEntries extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { getCurrenciesInfo } = this.props;
    getCurrenciesInfo();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { saveExpenseAction, expenses } = this.props;
    saveExpenseAction({ id: expenses.length, ...this.state });
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const expenseCategory = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            id="value"
            placeholder="Digite o valor da Despesa"
            value={ value }
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
            placeholder="Digite a descrição da Despesa"
            value={ description }
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ (event) => this.handleChange(event) }
            data-testid="currency-input"
          >
            {currencies.map((currencyName, index) => (
              <option key={ index } value={ currencyName }>
                {currencyName}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Forma de Pagamento:
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ (event) => this.handleChange(event) }
            data-testid="method-input"
          >
            {paymentMethods.map((paymentWay, index) => (
              <option key={ index }>
                {paymentWay}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ (event) => this.handleChange(event) }
            data-testid="tag-input"
          >
            {expenseCategory.map((category, index) => (
              <option key={ index } value={ category }>
                {category}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesInfo: () => dispatch(fetchCurrenciesInfoThunk()),
  saveExpenseAction: (expense) => dispatch(fetchAllCurrenciesInfoThunk(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

ExpensesEntries.propTypes = {
  getCurrenciesInfo: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesEntries);
