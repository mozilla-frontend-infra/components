import { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const withTheme = WrappedComponent =>
  class WithTheme extends Component {
    render() {
      return (
        <MuiThemeProvider theme={theme}>
          <WrappedComponent {...this.props} />
        </MuiThemeProvider>
      );
    }
  };

export default withTheme;
