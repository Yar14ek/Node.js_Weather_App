const request = require('request');

const forecast = ([lat, long, places], colback) => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    qs: { q: `${lat},${long}` },
    headers: {
      'x-rapidapi-key': 'e73d545744msha59c756235c881dp14b086jsn104b900c12f3',
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      useQueryString: true,
    },
    json: true,
  };

  request(options, function (error, res) {
    if (error) colback(error);
    else if (res.body.error) colback(res.body.error.message);
    else {
      console.log('res.body.current :>> ', res.body.current);
      const { temp_c, precip_in } = res.body.current;
      colback(
        [places, temp_c, precip_in]
        // `City ${places} have a veather today is ${temp_c}c and rain is ${precip_in}%`
      );
    }
  });
};

module.exports = {
  forecast,
};
