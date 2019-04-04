```js
const keycloak = require('keycloak-js');

const kc = keycloak({  });

<KeycloakWrapper keycloak={ kc } keycloakOptions={ {  } } tokenUpdateInterval={100}>
  <p>I am protected</p>
</KeycloakWrapper>
```
