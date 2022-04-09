import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpenseAction } from '../actions';
import '../styles/ExpensesTable.css';

class ExpensesTable extends Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    return (
      <div className='expenses-container m-auto'>
        <h3 className='title mt-5'>Tabela de Despesas</h3>
        <div className="table-responsive table-container col-12 m-auto">
          <table className="table align-middle table-css content-table">
            <thead>
              <tr className='align-middle table-title'>
                <th scope="col">Descrição</th>
                <th scope="col">Tag</th>
                <th scope="col">Método de pagamento</th>
                <th scope="col">Valor</th>
                <th scope="col">Moeda</th>
                <th scope="col">Câmbio utilizado</th>
                <th scope="col">Valor convertido</th>
                <th scope="col">Moeda de conversão</th>
                <th scope="col">Editar/Excluir</th>
              </tr>
            </thead>
            <tbody className='align-middle table-body'>
              {expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{`${expense.value}.00`}</td>
                  {/* Usei o método split para pegar meu array e dividir em dois outros arrays e peguei
                  no index 0 que seria referente à primeira metade da divisão. */}
                  <td>{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
                  <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                  <td>
                    {`R$ ${(expense.exchangeRates[expense.currency]
                      .ask * expense.value).toFixed(2)}`}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => deleteExpense(expense) }
                      className="btn btn-danger"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(deleteExpenseAction(expense)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
