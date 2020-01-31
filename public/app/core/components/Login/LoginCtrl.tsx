import React from 'react';
import config from 'app/core/config';

import { updateLocation } from 'app/core/actions';
import { connect } from 'react-redux';
import { StoreState } from 'app/types';
import { PureComponent } from 'react';
import { getBackendSrv } from '@grafana/runtime';
import { hot } from 'react-hot-loader';
import appEvents from 'app/core/app_events';
import { AppEvents } from '@grafana/data';

const isOauthEnabled = () => {
  return !!config.oauth && Object.keys(config.oauth).length > 0;
};

const axios = require('axios');

export interface FormModel {
  user: string;
  password: string;
  email: string;
}
interface Props {
  routeParams?: any;
  updateLocation?: typeof updateLocation;
  children: (props: {
    isLoggingIn: boolean;
    changePassword: (pw: string) => void;
    isChangingPassword: boolean;
    skipPasswordChange: Function;
    login: (data: FormModel) => void;
    disableLoginForm: boolean;
    ldapEnabled: boolean;
    authProxyEnabled: boolean;
    disableUserSignUp: boolean;
    isOauthEnabled: boolean;
    loginHint: string;
    passwordHint: string;
  }) => JSX.Element;
}

interface State {
  isLoggingIn: boolean;
  isChangingPassword: boolean;
}

export class LoginCtrl extends PureComponent<Props, State> {
  result: any = {};
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      isChangingPassword: false,
    };

    /*if (config.loginError) {
      appEvents.emit(AppEvents.alertWarning, ['Login Failed', config.loginError]);
    }*/
  }

  changePassword = (password: string) => {
    const pw = {
      newPassword: password,
      confirmNew: password,
      oldPassword: 'admin',
    };
    getBackendSrv()
      .put('/api/user/password', pw)
      .then(() => {
        this.toGrafana();
      })
      .catch((err: any) => console.log(err));
  };

  login = (formModel: FormModel) => {
    this.setState({
      isLoggingIn: true,
    });
    let isAdmin = { isGrafanaAdmin: true };
    getBackendSrv()
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then((result: any) => {
        console.log(result);
      })
      .catch(() => {
        console.log('questapasando');
      });
    console.log(formModel);
    if (formModel.user === 'gomaxx') {
      appEvents.emit(AppEvents.alertWarning, ['Login Failed', 'Wrong Credentials']);
      this.setState({
        isLoggingIn: false,
      });
      return;
    }
    getBackendSrv()
      .post('/login', formModel)
      .then((result: any) => {
        this.result = result;
        if (formModel.password !== 'admin' || config.ldapEnabled || config.authProxyEnabled) {
          this.toGrafana();
          return;
        } else {
          this.changeView();
        }
      })
      .catch(() => {
        console.log('login aun no registrado');
        const usuarioAChecar = {
          password: formModel.password,
          account: formModel.user,
        };
        console.log('usuario a checar: ', usuarioAChecar);
        axios
          .post('https://api.knesys.com/ksum/API/admin/grafana/login', usuarioAChecar)
          .then((respuesta: any) => {
            console.log('entro a parte then');
            console.log(respuesta);
            isAdmin = respuesta.data.Data === 'read,admin' ? { isGrafanaAdmin: true } : { isGrafanaAdmin: false };
            if (respuesta.data.Status === 'Ok') {
              console.log('-------------------------si existe el usuario---------------------------');
              const singUpInfo = {
                name: formModel.user,
                email: formModel.user + '@' + formModel.user,
                login: formModel.user,
                password: formModel.password,
              };
              getBackendSrv()
                .post('/createUser', singUpInfo)
                .then(() => {
                  if (isAdmin.isGrafanaAdmin) {
                    getBackendSrv()
                      .get(`/searchUsers`)
                      .then((result: any) => {
                        const found = result.find((element: any) => {
                          return element.name === formModel.user;
                        });
                        getBackendSrv().put('/users/' + found.id + '/permissionsChange', isAdmin);
                      });
                  }
                  getBackendSrv()
                    .post('/login', formModel)
                    .then((result: any) => {
                      const info = {
                        theme: '',
                        homeDashboardId: 1,
                        timezone: 'browser',
                      };
                      getBackendSrv()
                        .put('/api/user/preferences', info)
                        .then((resultado: any) => {
                          console.log('hecho!');
                          console.log(resultado);
                        })
                        .catch((resultado: any) => {
                          console.log('error: ', resultado);
                        });

                      this.result = result;
                      if (formModel.password !== 'admin' || config.ldapEnabled || config.authProxyEnabled) {
                        this.toGrafana();
                        return;
                      } else {
                        this.changeView();
                      }
                    })
                    .catch(() => {
                      this.setState({
                        isLoggingIn: false,
                      });
                    });
                });
              console.log('------------------------------------------------------------------------');
            } else {
              console.log('-------------------------no existe el usuario---------------------------');
              appEvents.emit(AppEvents.alertWarning, ['Login Failed', 'Wrong Credentials']);
              this.setState({
                isLoggingIn: false,
              });
              return;
              console.log('------------------------------------------------------------------------');
            }
          })
          .catch((resultado: any) => {
            console.log('Error con la api de cristobal: ', resultado);
          });
        // const singUpInfo = {
        //   name: formModel.user,
        //   email: formModel.user + '@' + formModel.user,
        //   login: formModel.user,
        //   password: formModel.password,
        // };
        // getBackendSrv()
        //   .post('/createUser', singUpInfo)
        //   .then(() => {
        //     if (isAdmin.isGrafanaAdmin) {
        //       getBackendSrv()
        //         .get(`/searchUsers`)
        //         .then((result: any) => {
        //           const found = result.find((element: any) => {
        //             return element.name === formModel.user;
        //           });
        //           getBackendSrv().put('/users/' + found.id + '/permissionsChange', isAdmin);
        //         });
        //     }
        //     getBackendSrv()
        //       .post('/login', formModel)
        //       .then((result: any) => {
        //         const info = {
        //           "theme": "",
        //           "homeDashboardId": 1,
        //           "timezone": "browser"
        //         };
        //         getBackendSrv()
        //         .put('/api/user/preferences', info)
        //         .then((resultado: any) => {
        //           console.log("hecho!");
        //           console.log(resultado);
        //         })
        //         .catch((resultado: any) => {
        //           console.log("error: ",resultado);
        //         });
        //         this.result = result;
        //         if (formModel.password !== 'admin' || config.ldapEnabled || config.authProxyEnabled) {
        //           // this.toGrafana();
        //           return;
        //         } else {
        //           // this.changeView();
        //         }
        //       })
        //       .catch(() => {
        //         this.setState({
        //           isLoggingIn: false,
        //         });
        //       });
        //   });
        this.setState({
          isLoggingIn: false,
        });
      });
  };

  changeView = () => {
    this.setState({
      isChangingPassword: true,
    });
  };

  toGrafana = () => {
    const params = this.props.routeParams;
    console.log(params);
    // Use window.location.href to force page reload
    if (params.redirect && params.redirect[0] === '/') {
      window.location.href = config.appSubUrl + params.redirect;
    } else if (this.result.redirectUrl) {
      window.location.href = config.appSubUrl + this.result.redirectUrl;
    } else {
      window.location.href = config.appSubUrl + '/';
    }
  };

  render() {
    const { children } = this.props;
    const { isLoggingIn, isChangingPassword } = this.state;
    const { login, toGrafana, changePassword } = this;
    const { loginHint, passwordHint, disableLoginForm, ldapEnabled, authProxyEnabled, disableUserSignUp } = config;

    return (
      <>
        {children({
          isOauthEnabled: isOauthEnabled(),
          loginHint,
          passwordHint,
          disableLoginForm,
          ldapEnabled,
          authProxyEnabled,
          disableUserSignUp,
          login,
          isLoggingIn,
          changePassword,
          skipPasswordChange: toGrafana,
          isChangingPassword,
        })}
      </>
    );
  }
}

export const mapStateToProps = (state: StoreState) => ({
  routeParams: state.location.routeParams,
});

const mapDispatchToProps = { updateLocation };

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(LoginCtrl));
