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
import Typography from '@material-ui/core/Typography';

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
    },
    '&$checked + $track': {
      backgroundColor: '#d9d9d9',
    },
  },
  checked: {},
  track: {},
})(Switch);

// import MaskedInput from 'react-text-mask';
// function TextMaskCustom(props: { [x: string]: any; inputRef: any; }) {
//   const { inputRef, ...other } = props;

//   return (
//     <MaskedInput
//       {...other}
//       ref={(ref: { inputElement: any; }) => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//       mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/]}
//       placeholderChar={'\u2000'}
//     />
//   );
// }

const backendSrv = getBackendSrv();

type Settings = { [key: string]: { [key: string]: string } };

interface Props {
  navModel: NavModel;
}

interface State {
  settings: Settings;
  isLoading: boolean;
  valid: boolean;
  isCheckedDHCP: boolean;
  isCheckedWifi: boolean;
  showPassword: boolean;
  errorText: string;
  wifi: string;
  wifiPswd: string;
  ipAddress: string;
  subMask: string;
  dfGateway: string;
  dns: string;
}

export class AdminNetwork extends React.PureComponent<Props, State> {
  state: State = {
    settings: {},
    isLoading: true,
    valid: false,
    isCheckedDHCP: false,
    isCheckedWifi: false,
    showPassword: false,
    errorText: '',
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

  handleChange = () => {
    this.setState({
      isCheckedDHCP: !this.state.isCheckedDHCP,
      valid: this.validate(
        this.state.wifi,
        this.state.wifiPswd,
        this.state.ipAddress,
        this.state.subMask,
        this.state.dfGateway,
        this.state.dns
      ),
    });
  };

  handleChangeWifi = () => {
    this.setState({
      isCheckedWifi: !this.state.isCheckedWifi,
      valid: this.validate(
        this.state.wifi,
        this.state.wifiPswd,
        this.state.ipAddress,
        this.state.subMask,
        this.state.dfGateway,
        this.state.dns
      ),
    });
  };

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  onChangeWifi = () => {
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
  };

  ipRegEx = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm;

  onChangeIP = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(this.ipRegEx)) {
      this.setState({
        errorText: '',
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
    } else {
      this.setState({
        errorText: 'Invalid format: ###.###.###.###',
        valid: false,
      });
    }
  };

  onChangeSubMask = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(this.ipRegEx)) {
      this.setState({
        errorText: '',
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
    } else {
      this.setState({
        errorText: 'Invalid format: ###.###.###.###',
        valid: false,
      });
    }
  };

  onChangeDefaultGw = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(this.ipRegEx)) {
      this.setState({
        errorText: '',
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
    } else {
      this.setState({
        errorText: 'Invalid format: ###.###.###.###',
        valid: false,
      });
    }
  };

  onChangeDns = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(this.ipRegEx)) {
      this.setState({
        errorText: '',
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
    } else {
      this.setState({
        errorText: 'Invalid format: ###.###.###.###',
        valid: false,
      });
    }
  };

  validate(wifi: string, wifiPswd: string, ipAddress: string, subMask: string, dfGateway: string, dns: string) {
    if (this.state.isCheckedWifi && this.state.isCheckedDHCP) {
      return wifi.length > 0 && wifiPswd.length > 0;
    } else if (this.state.isCheckedWifi) {
      return (
        wifi.length > 0 &&
        wifiPswd.length > 0 &&
        ipAddress.length > 0 &&
        subMask.length > 0 &&
        dfGateway.length > 0 &&
        dns.length > 0
      );
    } else if (!this.state.isCheckedDHCP) {
      return true;
    } else {
      return ipAddress.length > 0 && subMask.length > 0 && dfGateway.length > 0 && dns.length > 0;
    }
  }

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
            <FormControl className="network-form">
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
              <Typography className="network-wifi">
                <p className="netwotk-label">Connection</p>
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
              </Typography>
            </FormControl>
            <FormControl className="network-form">
              <CssTextField
                className="network-form-input"
                id="custom-css-standard-input"
                label="Wifi"
                disabled={!this.state.isCheckedWifi}
                onChange={this.onChangeWifi}
                required
              />
            </FormControl>
            <FormControl className="network-form">
              <CssTextField
                className="network-form-input"
                id="custom-css-standard-input"
                label="Password"
                type={this.state.showPassword ? 'text' : 'password'}
                // value={this.state.password}
                required
                disabled={!this.state.isCheckedWifi}
                onChange={this.onChangeWifi}
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
            <FormControl className="login-form">
              <p>texto de error: {this.state.errorText}</p>
              <CssTextField
                className="network-form-input"
                id="custom-css-standard-input"
                label="IP address"
                disabled={this.state.isCheckedDHCP}
                onChange={this.onChangeIP}
                required
              />
            </FormControl>
            <FormControl className="network-form">
              <CssTextField
                className="network-form-input"
                id="custom-css-standard-input"
                label="Subnet mask"
                disabled={this.state.isCheckedDHCP}
                onChange={this.onChangeSubMask}
                required
              />
            </FormControl>
            <FormControl className="network-form">
              <CssTextField
                className="network-form-input"
                id="custom-css-standard-input"
                label="Default Gateway"
                required
                disabled={this.state.isCheckedDHCP}
                onChange={this.onChangeDefaultGw}
              />
            </FormControl>
            <FormControl className="network-form">
              <CssTextField
                className="network-form-input"
                id="custom-css-standard-input"
                label="DNS"
                required
                disabled={this.state.isCheckedDHCP}
                onChange={this.onChangeDns}
              />
            </FormControl>
            <div className="network-button-group">
              <p>valid: {this.state.valid}</p>
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
