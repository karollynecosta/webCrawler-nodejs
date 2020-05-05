const axios = require('axios');
const cheerio = require('cheerio');

const processResponse = (html) => {
  let $ = cheerio.load(html);
  return $('.thumbnail')
    .map((index, element) => ({
      title: $(element).find('.product-description ng-binding').text(),
      price: $(element).find('normal-price ng-binding ng-scope').text(),
    }))
    .get();
};

const buscaPrecos = async (processResponse) => {
  try {
    const response = await axios({
      url: 'https://www.paodeacucar.com/',
      method: 'get',
    });
    const objReturn = await processResponse(response.data);
    return Promise.resolve(objReturn);
  } catch (error) {
    return Promise.reject(error);
  }
};

buscaPrecos(processResponse)
  .then((response) => console.log('response', response))
  .catch((error) => console.log('error', error));
