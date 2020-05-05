var Crawler = require('crawler');
var fs = require('fs');

var c = new Crawler({
  maxConnections: 10,
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      console.log($('.thumbnail').text());
      fs.appendFile('paodeacucar.txt', res + '\n', (err) => {
        if (err) console.log('Erro: ' + err);
      });
    }
    done();
  },
});

c.queue('https://www.paodeacucar.com/');
