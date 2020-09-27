// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters,
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
const msalConfig = {
  auth: {
    clientId: "3edeef46-55ae-40ec-ba25-73f49888ab2d",
    authority:
      "https://login.microsoftonline.com/f7a15417-57cb-4855-8d36-064f95aada17", //"f7a15417-57cb-4855-8d36-064f95aada17",
    redirectUri: "http://localhost",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// URL to get info :
// https://login.microsoftonline.com/f7a15417-57cb-4855-8d36-064f95aada17/.well-known/openid-configuration

// Add here the scopes to request when obtaining an access token for MS Graph API
// for more, visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-core/docs/scopes.md
const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
};

// Add here scopes for access token to be used at MS Graph API endpoints.
const tokenRequest = {
  scopes: ["Mail.Read"],
};

export { msalConfig, loginRequest };
