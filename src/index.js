const httpsRequest = require('./httpsRequest');

function validateAuthData(authData, options) {
  let GoodParse = global[options.parseLink]
  if (!options) {
    throw new GoodParse.Error(
      GoodParse.Error.INTERNAL_SERVER_ERROR,
      'steam auth configuration missing'
    );
  }

  return steamApiRequest(options.publisherKey,
    "ISteamUserAuth/AuthenticateUserTicket/v1/"
    +"?key="+options.webAPIKey
    +"&appid="+options.appID
    +"&ticket="+authData.sessionTicket
  ).then(data => {
    if (data.response.error != null)
    {
      throw new GoodParse.Error(
        GoodParse.Error.OBJECT_NOT_FOUND,
        'Steam returned error ' + data.response.error.errordesc
      );
    }
    returnedID = data.response.params.steamid
    if (returnedID == authData.id)
    {
      return Promise.resolve();
    }
    else
    {
      throw new GoodParse.Error(
        GoodParse.Error.OBJECT_NOT_FOUND,
        'steam auth is invalid for this user.'
      );
    }
  });
}

// we actually validate app id on validateAuthData
function validateAppId() {
  return Promise.resolve();
}

function steamApiRequest(publisherKey, path) {
  url = (publisherKey) ? "https://partner.steam-api.com/" : "https://api.steampowered.com/"
  return httpsRequest.get(url + path);
}

module.exports = {
  validateAppId,
  validateAuthData,
};