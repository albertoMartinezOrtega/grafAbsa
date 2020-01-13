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
  wifi: string;
  wifiPswd: string;
  ipAddress: string;
  subMask: string;
  dfGateway: string;
  dns: string;
}

export class AdminNetwork extends React.PureComponent<Props, State> {
  state: State = {
    shrinkWifi: false,
    shrinkPswd: false,
    shrinkIP: false,
    shrinkSubnet: false,
    shrinkGateway: false,
    shrinkDNS: false,
    settings: {},
    isLoading: true,
    valid: false,
    isCheckedDHCP: false,
    isCheckedWifi: false,
    showPassword: false,
    wifi: '',
    wifiPswd: '',
    ipAddress: '',
    subMask: '',
    dfGateway: '',
    dns: '',
  };

  async componentDidMount() {
    const settings: Settings = await backendSrv.get('/api/admin/network-settings');
    this.setState({
      settings,
      isLoading: false,
    });
  }

  validator() {
    this.setState({
      valid: this.validate(
        this.state.wifi,
        this.state.wifiPswd,
        this.state.ipAddress,
        this.state.subMask,
        this.state.dfGateway,
        this.state.dns
      ),
    });
  }

  handleChange = () => {
    this.setState(
      {
        isCheckedDHCP: !this.state.isCheckedDHCP,
      },
      () => {
        this.setState({
          valid: this.validate(
            this.state.wifi,
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
            this.state.wifi,
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
    this.setState({
      wifi: e.target.value,
      valid: this.validate(
        e.target.value,
        this.state.wifiPswd,
        this.state.ipAddress,
        this.state.subMask,
        this.state.dfGateway,
        this.state.dns
      ),
    });
  };

  onChangeWifiPswd = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      wifiPswd: e.target.value,
      valid: this.validate(
        this.state.wifi,
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
        this.state.wifi,
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
        this.state.wifi,
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
        this.state.wifi,
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
        this.state.wifi,
        this.state.wifiPswd,
        this.state.ipAddress,
        this.state.subMask,
        this.state.dfGateway,
        e.target.value
      ),
    });
  };

  validate(wifi: string, wifiPswd: string, ipAddress: string, subMask: string, dfGateway: string, dns: string) {
    if (this.state.isCheckedWifi && this.state.isCheckedDHCP) {
      return wifi.length > 0 && wifiPswd.length > 0;
    } else if (this.state.isCheckedWifi && !this.state.isCheckedDHCP) {
      return (
        wifi.length > 0 &&
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
    this.forceUpdate();
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

  render() {
    const { isLoading } = this.state;
    const { navModel } = this.props;
    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={isLoading}>
          <div className="grafana-info-box span8" style={{ margin: '20px 0 25px 0' }}>
            Network Configuration
          </div>
          <form name="networkForm" className="network-form-group gf-form-group">
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
            <FormControl className="network-form">
              <CssTextField
                className="network-form-input"
                label="Wifi"
                disabled={!this.state.isCheckedWifi}
                onChange={this.onChangeWifi}
                onFocus={() => this.shrinkLabel('wifi')}
                onBlur={() => this.unShrinkLabel('wifi')}
                InputLabelProps={{ shrink: this.state.shrinkWifi }}
                required
              />
            </FormControl>
            <FormControl className="network-form">
              <CssTextField
                className="network-form-input"
                label="Password"
                type={this.state.showPassword ? 'text' : 'password'}
                // value={this.state.password}
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
