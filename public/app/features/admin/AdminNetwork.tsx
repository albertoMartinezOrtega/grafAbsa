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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// checkbox
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

//switch
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

//wifi password
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//menu list
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

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
      '&&:hover': {
        backgroundColor: '#d9d9d9',
        opacity: '0.5',
      },
    },
    '&$checked + $track': {
      backgroundColor: '#d9d9d9',
    },
    '&:not($checked) + $track': {
      backgroundColor: '#d9d9d9',
    },
  },
  checked: {},
  track: {},
})(Switch);

const backendSrv = getBackendSrv();

type Settings = { [key: string]: { [key: string]: string } };

interface Props {
  navModel: NavModel;
}

interface State {
  shrinkWifi: boolean;
  shrinkPswd: boolean;
  shrinkIP: boolean;
  shrinkSubnet: boolean;
  shrinkGateway: boolean;
  shrinkDNS: boolean;
  settings: Settings;
  isLoading: boolean;
  valid: boolean;
  isCheckedDHCP: boolean;
  isCheckedWifi: boolean;
  showPassword: boolean;
  selectedWifi: boolean;
  wifi: string;
  wifiName: string;
  wifiPswd: string;
  ipAddress: string;
  subMask: string;
  dfGateway: string;
  dns: string;
  validSearch: boolean;
}

export class AdminNetwork extends React.Component<Props, State> {
  state: State = {
    shrinkWifi: false,
    shrinkPswd: false,
    shrinkIP: true,
    shrinkSubnet: true,
    shrinkGateway: true,
    shrinkDNS: true,
    settings: {},
    isLoading: true,
    valid: false,
    isCheckedDHCP: false,
    isCheckedWifi: false,
    showPassword: false,
    selectedWifi: false,
    wifi: '0',
    wifiName: '',
    wifiPswd: '',
    ipAddress: '',
    subMask: '',
    dfGateway: '',
    dns: '',
    validSearch: true,
  };

  searchingNetworks = () => {
    this.setState(
      {
        validSearch: !this.state.validSearch,
        selectedWifi: true,
      },
      () => {
        getBackendSrv()
          .get('http://192.168.100.200:8030/api/connectwifi')
          .then((result: any) => {
            this.options = [];
            for (let i = 0; i < result.length; i++) {
              this.options.push(result[i].ssid);
            }
            this.setState(
              {
                validSearch: !this.state.validSearch,
                wifi: '0',
                valid: this.validate(
                  this.state.selectedWifi,
                  this.state.wifiPswd,
                  this.state.ipAddress,
                  this.state.subMask,
                  this.state.dfGateway,
                  this.state.dns
                ),
              },
              () => {
                this.setState({
                  wifiName: this.options[parseInt(this.state.wifi, 10)],
                });
              }
            );
          })
          .catch(() => {
            console.log('Unexpected Error: No route found');
          });
      }
    );
  };

  loadNetworkConfig = () => {
    //   {
    //     "gtwid": "dc:a6:32:4f:d5:e8",
    //     "gtwname": "knesys-gateway",
    //     "ethernet": false,
    //     "ipStatic": false,
    //     "ethernetConf": {
    //         "ip": "",
    //         "mask": "",
    //         "gateway": "",
    //         "dns": "192.168.100.1"
    //     },
    //     "wifi": true,
    //     "wifiConf": {
    //         "wifiName": "",
    //         "wifiPass": "",
    //         "ipStatic": false,
    //         "ipStaticConf": {
    //             "ip": "192.168.100.200",
    //             "mask": "255.255.255.0",
    //             "gateway": "192.168.100.1",
    //             "dns": "192.168.100.1"
    //         }
    //     }
    // }
    getBackendSrv()
      .get('http://192.168.100.200:8030/api/setupnetwork')
      .then((result: any) => {
        console.log(result);
        if (result.ethernet) {
          this.setState({
            isCheckedDHCP: result.ipStatic,
            isCheckedWifi: false,
            ipAddress: result.ethernetConf.ip,
            subMask: result.ethernetConf.mask,
            dfGateway: result.ethernetConf.gateway,
            dns: result.ethernetConf.dns,
          });
        } else {
          this.setState({
            isCheckedDHCP: result.wifiConf.ipStatic,
            isCheckedWifi: true,
            wifiName: result.wifiConf.wifiName,
            wifiPswd: result.wifiConf.wifiPass,
            ipAddress: result.wifiConf.ipStaticConf.ip,
            subMask: result.wifiConf.ipStaticConf.mask,
            dfGateway: result.wifiConf.ipStaticConf.gateway,
            dns: result.wifiConf.ipStaticConf.dns,
          });
        }
      })
      .catch(() => {
        console.log('Unexpected Error: No route found');
      });
  };

  postJsonSubmit = () => {
    // console.log('enviado!!!!!!!!!!');
    // console.log(this.state.isCheckedDHCP ? 'dhcp: true' : 'dhcp: false');
    // console.log(this.state.isCheckedWifi ? 'wifi: true' : 'wifi: false');
    // console.log('wifiname: ' + this.state.wifiName);
    // console.log('wifipsw: ' + this.state.wifiPswd);
    // console.log('ip: ' + this.state.ipAddress);
    // console.log('submask: ' + this.state.subMask);
    // console.log('gateway: ' + this.state.dfGateway);
    // console.log('dns: ' + this.state.dns);

    const networkinfo = {
      Wifi: this.state.isCheckedWifi,
      WifiName: this.state.wifiName,
      WifiPassword: this.state.wifiPswd,
      DHCP: this.state.isCheckedDHCP,
      ipAddress: this.state.ipAddress,
      SubnetMask: this.state.subMask,
      DefaultGW: this.state.dfGateway,
      DNS: this.state.dns,
    };

    getBackendSrv()
      .post('http://192.168.100.200:8030/api/setupnetwork', networkinfo)
      .then((response: any) => {
        console.log('respuesta emitida!');
        console.log(response);
      })
      .catch((response: any) => {
        console.log('Unexpected Error: ' + response);
      });
  };

  async componentDidMount() {
    const settings: Settings = await backendSrv.get('/api/admin/network-settings');
    this.setState({
      settings,
      isLoading: false,
    });
    this.loadNetworkConfig();
  }

  handleChange = () => {
    this.setState(
      {
        isCheckedDHCP: !this.state.isCheckedDHCP,
      },
      () => {
        this.setState({
          valid: this.validate(
            this.state.selectedWifi,
            this.state.wifiPswd,
            this.state.ipAddress,
            this.state.subMask,
            this.state.dfGateway,
            this.state.dns
          ),
        });
      }
    );
  };

  handleChangeWifi = () => {
    this.setState(
      {
        isCheckedWifi: !this.state.isCheckedWifi,
      },
      () => {
        this.setState({
          valid: this.validate(
            this.state.selectedWifi,
            this.state.wifiPswd,
            this.state.ipAddress,
            this.state.subMask,
            this.state.dfGateway,
            this.state.dns
          ),
        });
      }
    );
  };

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  onChangeWifi = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        wifi: e.target.value,
      },
      () => {
        this.setState({
          wifiName: this.options[parseInt(this.state.wifi, 10)],
          valid: this.validate(
            this.state.selectedWifi,
            this.state.wifiPswd,
            this.state.ipAddress,
            this.state.subMask,
            this.state.dfGateway,
            this.state.dns
          ),
        });
      }
    );
  };

  onChangeWifiPswd = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      wifiPswd: e.target.value,
      valid: this.validate(
        this.state.selectedWifi,
        e.target.value,
        this.state.ipAddress,
        this.state.subMask,
        this.state.dfGateway,
        this.state.dns
      ),
    });
  };

  ipRegEx = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm;

  onChangeIP = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ipAddress: e.target.value,
      valid: this.validate(
        this.state.selectedWifi,
        this.state.wifiPswd,
        e.target.value,
        this.state.subMask,
        this.state.dfGateway,
        this.state.dns
      ),
    });
  };

  onChangeSubMask = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      subMask: e.target.value,
      valid: this.validate(
        this.state.selectedWifi,
        this.state.wifiPswd,
        this.state.ipAddress,
        e.target.value,
        this.state.dfGateway,
        this.state.dns
      ),
    });
  };

  onChangeDefaultGw = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      dfGateway: e.target.value,
      valid: this.validate(
        this.state.selectedWifi,
        this.state.wifiPswd,
        this.state.ipAddress,
        this.state.subMask,
        e.target.value,
        this.state.dns
      ),
    });
  };

  onChangeDns = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      dns: e.target.value,
      valid: this.validate(
        this.state.selectedWifi,
        this.state.wifiPswd,
        this.state.ipAddress,
        this.state.subMask,
        this.state.dfGateway,
        e.target.value
      ),
    });
  };

  validate(
    wifiSelected: boolean,
    wifiPswd: string,
    ipAddress: string,
    subMask: string,
    dfGateway: string,
    dns: string
  ) {
    if (this.state.isCheckedWifi && this.state.isCheckedDHCP) {
      return wifiSelected && wifiPswd.length > 0;
    } else if (this.state.isCheckedWifi && !this.state.isCheckedDHCP) {
      return (
        wifiSelected &&
        wifiPswd.length > 0 &&
        ipAddress.match(this.ipRegEx) &&
        true &&
        subMask.match(this.ipRegEx) &&
        true &&
        dfGateway.match(this.ipRegEx) &&
        true &&
        dns.match(this.ipRegEx) &&
        true
      );
    } else if (this.state.isCheckedDHCP && !this.state.isCheckedWifi) {
      return true;
    } else {
      return (
        ipAddress.match(this.ipRegEx) &&
        true &&
        subMask.match(this.ipRegEx) &&
        true &&
        dfGateway.match(this.ipRegEx) &&
        true &&
        dns.match(this.ipRegEx) &&
        true
      );
    }
  }

  shrinkLabel = (sender: string) => {
    switch (sender) {
      case 'wifi':
        this.setState({ shrinkWifi: true });
        break;
      case 'password':
        this.setState({ shrinkPswd: true });
        break;
      case 'ip':
        this.setState({ shrinkIP: true });
        break;
      case 'subnet':
        this.setState({ shrinkSubnet: true });
        break;
      case 'gateway':
        this.setState({ shrinkGateway: true });
        break;
      case 'dns':
        this.setState({ shrinkDNS: true });
        break;
      default:
    }
  };

  unShrinkLabel = (sender: string) => {
    switch (sender) {
      case 'wifi':
        if (this.state.wifi === '') {
          this.setState({ shrinkWifi: false });
        }
        break;
      case 'password':
        if (this.state.wifiPswd === '') {
          this.setState({ shrinkPswd: false });
        }
        break;
      case 'ip':
        if (this.state.ipAddress === '') {
          this.setState({ shrinkIP: false });
        }
        break;
      case 'subnet':
        if (this.state.subMask === '') {
          this.setState({ shrinkSubnet: false });
        }
        break;
      case 'gateway':
        if (this.state.dfGateway === '') {
          this.setState({ shrinkGateway: false });
        }
        break;
      case 'dns':
        if (this.state.dns === '') {
          this.setState({ shrinkDNS: false });
        }
        break;
      default:
    }
  };

  options: any[] = ['Wifi Networks'];

  render() {
    const { isLoading } = this.state;
    const { navModel } = this.props;
    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={isLoading}>
          <div className="grafana-info-box span8" style={{ margin: '20px 0 25px 0' }}>
            Network Configuration
          </div>
          <form name="networkForm" className="network-form-group gf-form-group" onSubmit={this.postJsonSubmit}>
            <FormControl className="network-form-buttons">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Ethernet</Grid>
                <Grid item>
                  <PurpleSwitch
                    checked={this.state.isCheckedWifi}
                    onChange={this.handleChangeWifi}
                    value="checkedWifi"
                  />
                </Grid>
                <Grid item>Wifi</Grid>
              </Grid>
            </FormControl>
            <FormControl className="network-form-buttons">
              <FormControlLabel
                className="network-buttons"
                control={
                  <Checkbox
                    value="checkedDHCP"
                    color="primary"
                    checked={this.state.isCheckedDHCP}
                    onChange={this.handleChange}
                  />
                }
                label="DHCP"
              />
            </FormControl>
            {/**/}
            <FormControl className="network-form-wifi">
              {/* ------------------------------------------------------------------------------------- */}
              <div className="network-wifi-main">
                <div className="d1">
                  <Button
                    variant="contained"
                    disabled={!this.state.isCheckedWifi && this.state.validSearch}
                    onClick={this.searchingNetworks}
                  >
                    Search
                  </Button>
                </div>
                <div className="d2">
                  <InputLabel id="demo-simple-select-label" className="label-wifi">
                    Wifi Networks
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    className="wifi-search-box"
                    id="demo-simple-select"
                    disabled={!this.state.isCheckedWifi}
                    value={parseInt(this.state.wifi, 10)}
                    onChange={this.onChangeWifi}
                  >
                    {this.options.map((network, index) => (
                      <MenuItem key={index} value={index}>
                        {network}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              {/* ------------------------------------------------------------------------------------- */}
            </FormControl>
            <FormControl className="network-form">
              <CssTextField
                className="network-form-input"
                label="Password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.wifiPswd}
                required
                disabled={!this.state.isCheckedWifi}
                onChange={this.onChangeWifiPswd}
                onFocus={() => this.shrinkLabel('password')}
                onBlur={() => this.unShrinkLabel('password')}
                InputLabelProps={{ shrink: this.state.shrinkPswd }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        disabled={!this.state.isCheckedWifi}
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl className="network-form">
              <CssTextField
                className="network-form-input"
                label="IP address"
                value={this.state.ipAddress}
                placeholder="Format: ###.###.###.###"
                disabled={this.state.isCheckedDHCP}
                onChange={this.onChangeIP}
                onFocus={() => this.shrinkLabel('ip')}
                onBlur={() => this.unShrinkLabel('ip')}
                InputLabelProps={{ shrink: this.state.shrinkIP }}
                inputProps={{ maxLength: 15 }}
                error={(this.state.ipAddress.match(this.ipRegEx) && true) || this.state.isCheckedDHCP ? false : true}
                helperText={
                  (this.state.ipAddress.match(this.ipRegEx) && true) || this.state.isCheckedDHCP
                    ? ''
                    : 'Incorrect input.'
                }
                required
              />
            </FormControl>
            <FormControl className="network-form">
              <CssTextField
                className="network-form-input"
                label="Subnet mask"
                placeholder="Format: ###.###.###.###"
                disabled={this.state.isCheckedDHCP}
                value={this.state.subMask}
                onChange={this.onChangeSubMask}
                onFocus={() => this.shrinkLabel('subnet')}
                onBlur={() => this.unShrinkLabel('subnet')}
                InputLabelProps={{ shrink: this.state.shrinkSubnet }}
                inputProps={{ maxLength: 15 }}
                error={(this.state.subMask.match(this.ipRegEx) && true) || this.state.isCheckedDHCP ? false : true}
                helperText={
                  (this.state.subMask.match(this.ipRegEx) && true) || this.state.isCheckedDHCP ? '' : 'Incorrect input.'
                }
                required
              />
            </FormControl>
            <FormControl className="network-form">
              <CssTextField
                className="network-form-input"
                label="Default Gateway"
                placeholder="Format: ###.###.###.###"
                required
                disabled={this.state.isCheckedDHCP}
                value={this.state.dfGateway}
                onChange={this.onChangeDefaultGw}
                onFocus={() => this.shrinkLabel('gateway')}
                onBlur={() => this.unShrinkLabel('gateway')}
                InputLabelProps={{ shrink: this.state.shrinkGateway }}
                inputProps={{ maxLength: 15 }}
                error={(this.state.dfGateway.match(this.ipRegEx) && true) || this.state.isCheckedDHCP ? false : true}
                helperText={
                  (this.state.dfGateway.match(this.ipRegEx) && true) || this.state.isCheckedDHCP
                    ? ''
                    : 'Incorrect input.'
                }
              />
            </FormControl>
            <FormControl className="network-form">
              <CssTextField
                className="network-form-input"
                label="DNS"
                placeholder="Format: ###.###.###.###"
                required
                disabled={this.state.isCheckedDHCP}
                value={this.state.dns}
                onChange={this.onChangeDns}
                onFocus={() => this.shrinkLabel('dns')}
                onBlur={() => this.unShrinkLabel('dns')}
                InputLabelProps={{ shrink: this.state.shrinkDNS }}
                inputProps={{ maxLength: 15 }}
                error={(this.state.dns.match(this.ipRegEx) && true) || this.state.isCheckedDHCP ? false : true}
                helperText={
                  (this.state.dns.match(this.ipRegEx) && true) || this.state.isCheckedDHCP ? '' : 'Incorrect input.'
                }
              />
            </FormControl>
            <div className="network-button-group">
              <Button type="submit" variant="contained" className={`btn btn-large p-x-2 `} disabled={!this.state.valid}>
                Submit
              </Button>
              <Button
                variant="contained"
                className={`btn btn-large p-x-2 `}
                disabled={!this.state.valid}
                onClick={this.postJsonSubmit}
              >
                Submit 2.0
              </Button>
            </div>
          </form>
        </Page.Contents>
      </Page>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  navModel: getNavModel(state.navIndex, 'network-settings'),
});

export default hot(module)(connect(mapStateToProps)(AdminNetwork));
