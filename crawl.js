var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request('https://www.paodeacucar.com/', function (error, response, body) {
  if (error) console.log('Erro: ' + error);

  var $ = cheerio.load(body);

  $('.thumbnail div').each(function () {
    var title = $(this).find('.product-description.ng-binding p').text().trim();
    var price = $(this)
      .find('.discount-price.ng-binding.ng-scope p')
      .text()
      .trim();
    console.log('Titulo: ' + title);

    fs.appendFile('paodeacucar.txt', title + ' ' + price + '\n');
  });
});
