import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions';
import Logo from '../images/logo.svg';
import styles from '../styles/Login.module.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateButton);
  }

  validateButton = () => {
    const { email, password } = this.state;
    const minPasswordLength = 6;
    // Regex encontrado no link: https://www.w3resource.com/javascript/form/email-validation.php
    const emailFormatRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (password.length >= minPasswordLength && email.match(emailFormatRegex)) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history, getLogin } = this.props;
    getLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <main className={`col-11 m-auto ${styles['main-login']}`}>
        <div className={styles['login-container']}>
          <figure className="figure">
            <img className={`${styles['logo-image']} figure-img img-fluid rounded`}src={ Logo } alt='Working' />
          </figure>
          <h1 className={`${styles['title-login']} mb-4`}>Trybe Wallet</h1>
          <form className={styles['form-login']}>
            <label htmlFor="loginInput" className={`${styles['form-label']} col-10 mb-3`}>
              <input
                data-testid="email-input"
                type="email"
                name="email"
                id="loginInput"
                onChange={ (event) => this.handleChange(event) }
                value={ email }
                placeholder="Digite o usuário"
                className={styles['input-form']}
              />
            </label>
            <label htmlFor="passwordInput" className='form-label col-10 mb-3'>
              <input
                data-testid="password-input"
                type="password"
                name="password"
                id="passwordInput"
                onChange={ (event) => this.handleChange(event) }
                value={ password }
                placeholder="Digite a senha"
                className={styles['input-form']}
              />
            </label>
            <button
              type="submit"
              onClick={ this.handleSubmit }
              disabled={ isButtonDisabled }
              className={`${styles['login-button']} col-4`}
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getLogin: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
