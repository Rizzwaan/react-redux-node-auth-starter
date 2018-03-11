import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LOG_IN_SUCCESS } from '../../utils/constants';
import * as pageActionCreator from '../../actionCreators/authActionCreator';
import './SignInPage.css';

class SignInPageComponent extends Component {
  componentDidUpdate() {
    console.log('this.props.pageStatus', this.props.pageStatus);
    if (this.props.pageStatus === LOG_IN_SUCCESS) {
      setTimeout(() => {
        this.props.history.push('/');
      }, 2000);
    }
  }

  render() {
    const { error, message } = this.props;

    let notification = '';
    if (error) {
      notification = <div className="error">{error}</div>;
    } else {
      notification = <div className="message">{message}</div>;
    }

    return (
      <div className="sign-in-page">
        <header className="header">
          <h1 className="title">Sign In</h1>
        </header>
        <div className="content">
          <div className="username">Username:</div><input ref="username" name="username" type="text" /><br />
          <div className="password">Password:</div><input ref="password" name="password" type="password" /><br />
          <button className="login" onClick={() => { this.props.login(this.refs.username.value, this.refs.password.value); }}>Login</button>
          {notification}
          <a className="register" href="/register">Register</a>
        </div>
      </div>
    );
  }
}

SignInPageComponent.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  pageStatus: PropTypes.string,
  message: PropTypes.string,
  error: PropTypes.string
};

SignInPageComponent.defaultProps = {
  pageStatus: '',
  message: '',
  error: '',
  history: null
};

const mapStateToProps = (state) => {
  return {
    pageStatus: state.auth.pageStatus,
    message: state.auth.message,
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: pageActionCreator.login
  }, dispatch);
};

const SignInPage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPageComponent));

export default SignInPage;

