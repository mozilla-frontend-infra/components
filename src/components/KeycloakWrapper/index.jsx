import React, { Component } from 'react';
import { string, element, any, object, number } from 'prop-types';
import { useAsync } from 'react-use';

export const KeycloakContext = React.createContext();

/**
 * Render children as syntax-highlighted monospace code.
 */
export default class KeycloakWrapper extends Component {
  static propTypes = {
    /** The CSS class name of the wrapper element */
    className: string,

    /**
     * Element which will render when the keycloak is initializing
     */
    loadingElement: element.isRequired,

    /**
     * Element which will render when the error is occurred
     */
    errorElement: element.isRequired,

    /**
     * Child element to render
     */
    children: element.isRequired,

    /**
     * Keycloak instance
     */
    keycloak: any.isRequired,

    /**
     * Options for keycloak
     */
    keycloakOptions: object.isRequired,

    /**
     * Update token in this interval
     */
    tokenUpdateInterval: number.isRequired,
  };

  static defaultProps = {
    className: null,
    loadingElement: <p>Loading...</p>,
    children: null,
    keycloak: null,
    tokenUpdateInterval: null,
  };

  state = {
    profile: null,
    keycloakPromise: null,
  };

  /**
   *
   */
  refreshIntervalId;

  keycloakPromise() {
    const { keycloak } = this.props;

    return new Promise((resolve, reject) => {
      // Call the init keycloak
      keycloak
        .init(this.props.keycloakOptions)
        .success(authenticated => {
          if (authenticated) {
            // Update the token in specific time
            this.refreshIntervalId = setInterval(() => {
              keycloak.updateToken(0).error(err => {
                if (err) {
                  // eslint-disable-next-line
                  this.setState({ error: err });
                }
              });
            }, this.props.tokenUpdateInterval);
          } else {
            keycloak.login();
          }
        })
        .error(reject);
    });
  }

  /**
   * Load the keycloak profile
   * @returns {Promise<any>}
   */
  keycloakProfilePromise() {
    const { keycloak } = this.props;

    return new Promise((resolve, reject) => {
      keycloak
        .loadUserProfile()
        .success(resolve)
        .error(reject);
    });
  }

  componentDidMount() {
    // Set keycloak profile
    this.setState({
      keycloakPromise: useAsync(this.keycloakPromise()),
    });
  }

  componentWillUnmount() {
    // Clear the interval if exits
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
    }
  }

  render() {
    const { children, loadingElement } = this.props;
    const { keycloakPromise } = this.state;
    let child;

    if (keycloakPromise.loading) {
      child = loadingElement;
    } else if (keycloakPromise.error) {
      child = <p>Error occurred {keycloakPromise.error}</p>;
    } else {
      child = children;
    }

    return (
      <KeycloakContext.Provider
        value={{ profile: this.keycloakProfilePromise(), ...this.state }}>
        {child}
      </KeycloakContext.Provider>
    );
  }
}
