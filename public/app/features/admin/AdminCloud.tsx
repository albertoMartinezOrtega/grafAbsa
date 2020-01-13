import React from 'react';
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

//switch
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
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
}

export class AdminCloud extends React.PureComponent<Props, State> {
  state: State = {
    settings: {},
    isLoading: true,
    isCheckedAmazon: false,
    isCheckedAzure: false,
    isCheckedAdira: false,
    isCheckedPropietary: true,
  };

  async componentDidMount() {
    const settings: Settings = await backendSrv.get('/api/admin/cloud-settings');
    this.setState({
      settings,
      isLoading: false,
    });
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

  render() {
    const { isLoading } = this.state;
    const { navModel } = this.props;
    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={isLoading}>
          <div className="grafana-info-box span8" style={{ margin: '20px 0 25px 0' }}>
            Cloud Services Configuration
          </div>
          <form name="networkForm" className="network-form-group gf-form-group">
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
