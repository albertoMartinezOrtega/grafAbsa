import React, { ChangeEvent, PureComponent, SyntheticEvent } from 'react';
import { e2e } from '@grafana/e2e';

// import clsx from 'clsx';
// import { makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { withStyles } from '@material-ui/core/styles';
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

import Button from '@material-ui/core/Button';

import { FormModel } from './LoginCtrl';

interface Props {
  displayForgotPassword: boolean;
  onChange?: (valid: boolean) => void;
  onSubmit: (data: FormModel) => void;
  isLoggingIn: boolean;
  passwordHint: string;
  loginHint: string;
}

interface State {
  user: string;
  password: string;
  email: string;
  showPassword: boolean;
  valid: boolean;
}

export class LoginForm extends PureComponent<Props, State> {
  // private userInput: HTMLInputElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      email: '',
      showPassword: false,
      valid: false,
    };
  }

  //------------------------------------------
  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };
  //--------------------------------------------

  // componentDidMount() {
  //   this.userInput.focus();
  // }
  onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const { user, password, email } = this.state;
    if (this.state.valid) {
      this.props.onSubmit({ user, password, email });
    }
  };

  onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value,
      valid: this.validate(this.state.user, e.target.value),
    });
  };

  onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      user: e.target.value,
      valid: this.validate(e.target.value, this.state.password),
    });
  };

  validate(user: string, password: string) {
    return user.length > 0 && password.length > 0;
  }

  render() {
    return (
      <form name="loginForm" className="login-form-group gf-form-group">
        {/* <div className="login-form">
          <input
            ref={input => {
              this.userInput = input;
            }}
            type="text"
            name="user"
            className="gf-form-input login-form-input"
            required
            placeholder={this.props.loginHint}
            aria-label={e2e.pages.Login.selectors.username}
            onChange={this.onChangeUsername}
          />
        </div> */}
        <FormControl className="login-form">
          {/* <InputLabel htmlFor="standard-adornment-user">Email or Username</InputLabel> */}
          {/* <Input
            // ref={input => {
            //   this.userInput = input;
            // }}
            id="standard-adornment-user"
            type="text"
            value={this.state.user}
            className="login-form-input"
            required
            aria-label={e2e.pages.Login.selectors.username}
            onChange={this.onChangeUsername}
          /> */}
          <CssTextField
            className="login-form-input"
            id="custom-css-standard-input"
            label="Email or Username"
            value={this.state.user}
            required
            aria-label={e2e.pages.Login.selectors.username}
            onChange={this.onChangeUsername}
          />
        </FormControl>
        <div></div>
        {/* <div className="login-form">
          <input
            type="password"
            name="password"
            className="gf-form-input login-form-input"
            required
            ng-model="formModel.password"
            id="inputPassword"
            placeholder={this.props.passwordHint}
            aria-label={e2e.pages.Login.selectors.password}
            onChange={this.onChangePassword}
          />
        </div> */}
        <FormControl className="login-form">
          {/* <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            // id="standard-adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            className="login-form-input"
            required
            onChange={this.onChangePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={this.handleClickShowPassword}>
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          /> */}
          <CssTextField
            className="login-form-input"
            id="custom-css-standard-input"
            label="Password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            required
            aria-label={e2e.pages.Login.selectors.username}
            onChange={this.onChangePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={this.handleClickShowPassword}>
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        {/* <div className="login-button-group">
          {!this.props.isLoggingIn ? (
            <button
              type="submit"
              border-radius= "20px"
              aria-label={e2e.pages.Login.selectors.submit}
              className={`btn btn-large p-x-2 ${this.state.valid ? 'btn-primary' : 'btn-inverse'}`}
              onClick={this.onSubmit}
              disabled={!this.state.valid}
            >
              Log In
            </button>
          ) : (
            <button type="submit" className="btn btn-large p-x-2 btn-inverse btn-loading">
              Logging In<span>.</span>
              <span>.</span>
              <span>.</span>
            </button>
          )}

          {this.props.displayForgotPassword ? (
            <div className="small login-button-forgot-password">
              <a href="user/password/send-reset-email">Forgot your password?</a>
            </div>
          ) : null}
        </div> */}
        <div className="login-button-group">
          {!this.props.isLoggingIn ? (
            <Button
              type="submit"
              variant="contained"
              className={`btn btn-large p-x-2 ${this.state.valid ? 'btn-knesys-login' : 'btn-knesys-login-disabled'}`}
              onClick={this.onSubmit}
              disabled={!this.state.valid}
            >
              Log In
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              className="btn btn-large p-x-2 btn-knesys-login-disabled btn-loading"
              onClick={this.onSubmit}
              disabled={!this.state.valid}
            >
              Logging In<span>.</span>
              <span>.</span>
              <span>.</span>
            </Button>
          )}
        </div>
        {this.props.displayForgotPassword ? (
          <div className="small login-button-forgot-password">
            <a href="user/password/send-reset-email">Forgot your password?</a>
          </div>
        ) : null}
      </form>
    );
  }
}
