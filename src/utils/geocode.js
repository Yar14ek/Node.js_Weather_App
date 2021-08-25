const request = require('request');

const takeGeoCode = (city, calback) => {
  const geocodURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoieWFyb3NsYXZvbGVmaXJlbmtvIiwiYSI6ImNrcnVtc3R3cTEzdWUybm5wbWlkaDFtaWUifQ.CzvaHLTHCTQjIy-8CLo9AA&limit=1`;
  request({ url: geocodURL, json: true }, (err, res) => {
    if (err) calback(undefined, err);
    else if (res.body.message) calback(undefined, res.body.message);
    else if (!res.body.features.length)
      calback(undefined, 'Unable to find location, try enother search');
    else {
      const feature = res.body.features[0];
      const places = feature.place_name;
      const [lat, long] = feature.center;
      calback([lat, long, places], undefined);
    }
  });
};
module.exports = {
  takeGeoCode,
};
