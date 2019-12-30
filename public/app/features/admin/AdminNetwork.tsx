import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import { getBackendSrv } from '@grafana/runtime';
import { NavModel } from '@grafana/data';

import { StoreState } from 'app/types';
import { getNavModel } from 'app/core/selectors/navModel';
import Page from 'app/core/components/Page/Page';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
}

export class AdminNetwork extends React.PureComponent<Props, State> {
  state: State = {
    settings: {},
    isLoading: true,
    valid: false,
  };

  async componentDidMount() {
    const settings: Settings = await backendSrv.get('/api/admin/settings');
    this.setState({
      settings,
      isLoading: false,
    });
  }

  render() {
    const { isLoading } = this.state;
    const { navModel } = this.props;

    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={isLoading}>
          <div className="grafana-info-box span8" style={{ margin: '20px 0 25px 0' }}>
            Configuracion de red
          </div>
          <form name="loginForm" className="login-form-group gf-form-group">
            <FormControl className="login-form">
              <CssTextField
                className="login-form-input"
                id="custom-css-standard-input"
                label="IP address"
                required
                // InputProps={{
                //   inputComponent: TextMaskCustom,
                // }}
              />
            </FormControl>
            <FormControl className="login-form">
              <CssTextField className="login-form-input" id="custom-css-standard-input" label="Subnet mask" required />
            </FormControl>
            <FormControl className="login-form">
              <CssTextField
                className="login-form-input"
                id="custom-css-standard-input"
                label="Default Gateway"
                required
              />
            </FormControl>
            <div className="login-button-group">
              <Button type="submit" variant="contained" className={`btn btn-large p-x-2 'btn-knesys-login'`}>
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
