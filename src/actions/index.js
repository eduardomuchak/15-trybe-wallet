import getCurrenciesInfo from '../services/currenciesAPI';

export const loginAction = (email) => ({ type: 'LOGIN', email });

export const requestCurrenciesInfoAction = () => ({
  type: 'REQUEST_CURRENCIES_INFO',
});

export const receiveCurrenciesInfoSuccessAction = (currenciesObj) => ({
  type: 'RECEIVE_CURRENCIES_SUCCESS',
  // O método Object.keys() retorna um array cujo os  elementos são strings
  // correspondentes para a propriedade enumerável encontrada diretamento sobre o objeto.
  currencies: Object.keys(currenciesObj),
});

export const receiveCurrenciesInfoFailureAction = (error) => ({
  type: 'RECEIVE_CURRENCIES_FAILURE',
  error,
});

export const saveExpenseAction = (expense) => ({
  type: 'SAVE_EXPENSE', expense });

export const deleteExpenseAction = (expense) => ({
  type: 'DELETE_EXPENSE', expense,
});

// Thunk
export function fetchCurrenciesInfoThunk() {
  // O dispatch é o que vai disparar a action. Ele é recebido através do Middleware.
  return async (dispatch) => {
    dispatch(requestCurrenciesInfoAction());
    try {
      const data = await getCurrenciesInfo();
      dispatch(receiveCurrenciesInfoSuccessAction(data));
    } catch (error) {
      dispatch(receiveCurrenciesInfoFailureAction(error));
    }
  };
}

// Thunk que adiciona os valores das cotações ao final do estado que armazena as infomações
// inseridas pela pessoa usuária no momento em que a pessoa usuária clica no botão de adiciona despesa.
export function fetchAllCurrenciesInfoThunk(state) {
  return async (dispatch) => {
    dispatch(requestCurrenciesInfoAction());
    try {
      const data = await getCurrenciesInfo();
      dispatch(saveExpenseAction({ ...state, exchangeRates: data }));
    } catch (error) {
      dispatch(receiveCurrenciesInfoFailureAction(error));
    }
  };
}
