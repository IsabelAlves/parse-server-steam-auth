Steam authentication module for parse-server made to work with Back4App. 
Based on https://github.com/Maschinen-Mensch/parse-server-gaming-auth

See https://docs.parseplatform.org/parse-server/guide/#custom-authentication for more information


Authentication Provider Registration:
```
steamAuthProvider = {
  authenticate: (options) => {
    return options.error("steam", new Error("no steam auth data"));
  },
  restoreAuthentication: () => {
    return true;
  },
  getAuthType: () => {
    return 'steam';
  }
};
Parse.User._registerAuthenticationProvider(steamAuthProvider);
```

Steam Authdata:
```
"steam": {
  "id": "user's steam ID",
  "access_token": "access ticket from ISteamUser.GetAuthSessionTicket"
}
```

Configuring parse-server for steam:
```
auth: {
  steam: {
    module: 'parse-server-steam-auth',
    webAPIKey: '',  // your steam web API key or publisher key
    appID: '',  // your steam app ID
    publisherKey: true  // set to true if you are using a publisher key, or false if you are using a public web API key (optional, default false)
  }
}
```
