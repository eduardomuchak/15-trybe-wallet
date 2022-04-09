import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllCurrenciesInfoThunk, fetchCurrenciesInfoThunk } from '../actions';
import styles from '../styles/ExpensesEntries.module.css';

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
      <div className={`${styles['form-container']} m-auto`}>
        <form className={`${styles.form} col-12 m-auto`}>
          <section className={`${styles['entries-container']} col-12`}>
            <div className={`col-4`}>
              <label htmlFor="value">
                <h4>
                  Valor
                </h4>
                <input
                  data-testid="value-input"
                  type="number"
                  name="value"
                  id="value"
                  placeholder="Digite o valor da Despesa"
                  value={ value }
                  onChange={ (event) => this.handleChange(event) }
                  className={styles.input}
                />
              </label>
              <label htmlFor="currency">
                <select
                  name="currency"
                  id="currency"
                  value={ currency }
                  onChange={ (event) => this.handleChange(event) }
                  data-testid="currency-input"
                  className={styles.select}
                >
                  {currencies.map((currencyName, index) => (
                    <option key={ index } value={ currencyName }>
                      {currencyName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={`col-4`}>
              <label htmlFor="method" className={`col-11`}>
                <h4>
                  Forma de Pagamento
                </h4>
                <select
                  name="method"
                  id="method"
                  value={ method }
                  onChange={ (event) => this.handleChange(event) }
                  data-testid="method-input"
                  className={styles.select}
                >
                  {paymentMethods.map((paymentWay, index) => (
                    <option key={ index }>
                      {paymentWay}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={`col-4`}>
              <label htmlFor="tag" className={`col-12`}>
                  <h4>
                    Categoria
                  </h4>
                  <select
                    name="tag"
                    id="tag"
                    value={ tag }
                    onChange={ (event) => this.handleChange(event) }
                    data-testid="tag-input"
                    className={styles.select}
                  >
                    {expenseCategory.map((category, index) => (
                      <option key={ index } value={ category }>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
            </div>
          </section>
          <label htmlFor="description" className={`mt-4`}>
            <h4>
              Descrição
            </h4>
            <input
              data-testid="description-input"
              type="text"
              name="description"
              id="description"
              placeholder="Digite a descrição da Despesa"
              value={ description }
              onChange={ (event) => this.handleChange(event) }
              className={styles.input}
            />
          </label>
          <button
            type="submit"
            onClick={ this.handleSubmit }
            className={`${styles.button} m-auto mt-4 mb-5`}
          >
            Adicionar despesa
          </button>
        </form>
      </div>
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
