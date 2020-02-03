import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import { getBackendSrv } from '@grafana/runtime';
import { NavModel } from '@grafana/data';

import { StoreState } from 'app/types';
import { getNavModel } from 'app/core/selectors/navModel';
import Page from 'app/core/components/Page/Page';

// custom textfield
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//switch
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

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

const PurpleSwitch = withStyles({
  switchBase: {
    color: '#00a0ff',
    '&$checked': {
      color: '#00a0ff',
    },
    '&$checked + $track': {
      backgroundColor: '#d9d9d9',
    },
    '&$track': {
      color: '#00a0ff',
    },
  },
  checked: {},
  track: {},
})(Switch);

const axios = require('axios');
const backendSrv = getBackendSrv();

type Settings = { [key: string]: { [key: string]: string } };

interface Props {
  navModel: NavModel;
}

interface State {
  settings: Settings;
  isLoading: boolean;
  isCheckedAmazon: boolean;
  isCheckedAzure: boolean;
  isCheckedAdira: boolean;
  isCheckedPropietary: boolean;
  shrinkConnectionUrl: boolean;
  urlAdira: string;
}

export class AdminCloud extends React.PureComponent<Props, State> {
  state: State = {
    settings: {},
    isLoading: true,
    isCheckedAmazon: false,
    isCheckedAzure: false,
    isCheckedAdira: false,
    isCheckedPropietary: true,
    shrinkConnectionUrl: false,
    urlAdira: '',
  };

  loadCloudConfig = () => {
    // const userInfo = {
    //   "email": "knesys@knesys.com",
    //   "password": "knesys123",
    //   "name": "knesys",
    //   "role": "user",
    //   "phrase": "fdbcb5be4656ced7bdb58bc960fd1c56b55c7c16"
    // };
    // getBackendSrv()
    // .post('http://192.168.100.200:3001/apigw/v1/auth/register', userInfo)
    // .then((result: any) => {
    //   console.log("satisfactorio");
    //   console.log(result);
    const ipRegex = /http:\/\/(.+)\/admin/;
    const ipAdd = ipRegex.exec(window.location.href);
    console.log(ipAdd);
    const userInfo2 = {
      email: 'knesys@knesys.com',
      password: 'knesys123',
      name: 'knesys',
    };
    getBackendSrv()
      .post(
        'http://' + ipAdd[1] + '/apigw/v1/auth/login' /*'http://192.168.100.200:3001/apigw/v1/auth/login'*/,
        userInfo2
      )
      .then((result2: any) => {
        // const token = result2.token.accessToken;
        // console.log("satisfactorio get token");
        // console.log(result2);
        // console.log("tokem = ",result2.token.accessToken);
        const config = {
          headers: { Authorization: `Bearer ${result2.token.accessToken}` },
        };
        console.log(config);
        axios
          .get('http://' + ipAdd[1] + '/apigw/v1/cloud/gateway' /*'http://apigw:3001/apigw/v1/cloud/gateway'*/, config)
          .then((result3: any) => {
            // console.log("success result3");
            // console.log(result3);
            this.setState(
              {
                isCheckedAdira: result3.data.adira.service,
                urlAdira: result3.data.adira.connectionString,
                isCheckedPropietary: result3.data.knesys.service,
              },
              () => {
                if (this.state.isCheckedAdira) {
                  this.setState({
                    shrinkConnectionUrl: true,
                  });
                }
              }
            );
          })
          .catch((result3: any) => {
            console.log('error result3: ', result3);
          });
      })
      .catch((result2: any) => {
        console.log('error retrieving the token: ', result2);
      });
    // })
    // .catch((result: any) => {
    //   console.log("--------------error--------------");
    //   console.log(result);
    // });
  };

  patchJsonSubmit = () => {
    const userInfo2 = {
      email: 'knesys@knesys.com',
      password: 'knesys123',
      name: 'knesys',
    };

    const bodyPatch = {
      adira: {
        service: this.state.isCheckedAdira,
        connectionString: this.state.urlAdira,
      },
      knesys: {
        service: this.state.isCheckedPropietary,
      },
    };
    console.log(window.location.href);
    const ipRegex = /http:\/\/(.+)\/admin/;
    const ipAdd = ipRegex.exec(window.location.href);
    console.log(ipAdd);
    getBackendSrv()
      .post(
        'http://' + ipAdd[1] + '/apigw/v1/auth/login' /*'http://192.168.100.200:3001/apigw/v1/auth/login'*/,
        userInfo2
      )
      .then((result2: any) => {
        // console.log("satisfactorio get token");
        // console.log(result2);
        // console.log("tokem = ",result2.token.accessToken);
        const config = {
          headers: { Authorization: `Bearer ${result2.token.accessToken}` },
        };
        // console.log(config);
        axios
          .patch(
            'http://' + ipAdd[1] + '/apigw/v1/cloud/gateway' /*'http://192.168.100.200:3001/apigw/v1/cloud/gateway'*/,
            bodyPatch,
            config
          )
          .then((result3: any) => {
            // console.log("success result3");
            // console.log(result3);
          })
          .catch((result3: any) => {
            console.log('error result3: ', result3);
          });
      })
      .catch((result2: any) => {
        console.log('error retrieving the token: ', result2);
      });
  };

  async componentDidMount() {
    const settings: Settings = await backendSrv.get('/api/admin/cloud-settings');
    this.setState({
      settings,
      isLoading: false,
    });
    this.loadCloudConfig();
  }

  handleChangeAmazon = () => {
    this.setState({
      isCheckedAmazon: !this.state.isCheckedAmazon,
    });
  };

  handleChangeAzure = () => {
    this.setState({
      isCheckedAzure: !this.state.isCheckedAzure,
    });
  };

  handleChangeAdira = () => {
    this.setState({
      isCheckedAdira: !this.state.isCheckedAdira,
    });
  };

  handleChangePropietary = () => {
    this.setState({
      isCheckedPropietary: !this.state.isCheckedPropietary,
    });
  };

  onChangeAdira = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      urlAdira: e.target.value,
    });
  };

  shrinkLabel = (sender: string) => {
    switch (sender) {
      case 'connection-url':
        this.setState({ shrinkConnectionUrl: true });
        break;
      default:
    }
  };

  unShrinkLabel = (sender: string) => {
    switch (sender) {
      case 'connection-url':
        if (this.state.urlAdira === '') {
          this.setState({ shrinkConnectionUrl: false });
        }
        break;
      default:
    }
  };

  render() {
    const { isLoading } = this.state;
    const { navModel } = this.props;
    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={isLoading}>
          <div className="grafana-info-box span8" style={{ margin: '20px 0 25px 0' }}>
            Cloud Services Configuration
          </div>
          <form name="networkForm" className="network-form-group gf-form-group" onSubmit={this.patchJsonSubmit}>
            <FormControl className="network-form-buttons">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <PurpleSwitch
                    checked={this.state.isCheckedAmazon}
                    onChange={this.handleChangeAmazon}
                    value={this.state.isCheckedAmazon}
                    disabled={true}
                  />
                </Grid>
                <Grid item>Amazon</Grid>
              </Grid>
            </FormControl>
            <FormControl className="network-form-buttons">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <PurpleSwitch
                    checked={this.state.isCheckedAzure}
                    onChange={this.handleChangeAzure}
                    value={this.state.isCheckedAzure}
                    disabled={true}
                  />
                </Grid>
                <Grid item>Azure</Grid>
              </Grid>
            </FormControl>
            <FormControl className="network-form-buttons">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <PurpleSwitch
                    checked={this.state.isCheckedAdira}
                    onChange={this.handleChangeAdira}
                    value={this.state.isCheckedAdira}
                  />
                </Grid>
                <Grid item>Adira</Grid>
              </Grid>
            </FormControl>
            <FormControl className="network-form-buttons-cloud">
              <CssTextField
                className="network-form-input-adira"
                label="Connection String"
                value={this.state.urlAdira}
                disabled={!this.state.isCheckedAdira}
                onChange={this.onChangeAdira}
                InputLabelProps={{ shrink: this.state.shrinkConnectionUrl }}
                onFocus={() => this.shrinkLabel('connection-url')}
                onBlur={() => this.unShrinkLabel('connection-url')}
                required
              />
            </FormControl>
            <FormControl className="network-form-buttons">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <PurpleSwitch
                    checked={this.state.isCheckedPropietary}
                    onChange={this.handleChangePropietary}
                    value={this.state.isCheckedPropietary}
                  />
                </Grid>
                <Grid item>Propietary</Grid>
              </Grid>
            </FormControl>
            <div className="network-button-group">
              <Button type="submit" variant="contained" className={`btn btn-large p-x-2 `}>
                Submit
              </Button>
              <Button variant="contained" className={`btn btn-large p-x-2 `} onClick={this.patchJsonSubmit}>
                Submit2.0
              </Button>
            </div>
          </form>
        </Page.Contents>
      </Page>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  navModel: getNavModel(state.navIndex, 'cloud-settings'),
});

export default hot(module)(connect(mapStateToProps)(AdminCloud));
