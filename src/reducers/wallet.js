const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'RECEIVE_CURRENCIES_SUCCESS':
    return {
      ...state,
      currencies: action.currencies.filter((currency) => currency !== 'USDT'),
    };
  case 'RECEIVE_CURRENCIES_FAILURE':
    return {
      ...state,
      error: action.error,
    };
  case 'SAVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case 'DELETE_EXPENSE':
    // console.log(action);
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expense.id),
    };
  default:
    return state;
  }
}

export default wallet;
