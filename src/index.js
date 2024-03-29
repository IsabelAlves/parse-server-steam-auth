const httpsRequest = require('./httpsRequest');

function validateAuthData(authData, options) {
  if (!options) {
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      'steam auth configuration missing'
    );
  }
  let request = "ISteamUserAuth/AuthenticateUserTicket/v1/"
    +"?key="+options.webAPIKey
    +"&appid="+options.appID
    +"&ticket="+authData.sessionTicket
  if(options.serviceId)
    request += "&identity="+options.serviceId

  return steamApiRequest(options.publisherKey,request)
  .then(data => {
    if (data.response.error != null)
    {
      throw new Parse.Error(
        Parse.Error.OBJECT_NOT_FOUND,
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
      throw new Parse.Error(
        Parse.Error.OBJECT_NOT_FOUND,
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