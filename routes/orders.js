var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config');

var apiConfig = config.get("Api");

/* GET Order Summaries. */
router.get('/', function(req, res, next) {
  console.log('Calling '+apiConfig.baseUrl+'products/orders/summaries');
  request(apiConfig.baseUrl+'/products/orders/summaries', function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = body;

    res.render('orders', {
      items: JSON.parse(data),
      user: req.user,
      title: 'Order Summaries'
    });
  } else {
    var statusCode = response.statusCode || 500;
    res.status(statusCode);
    res.end('Error: ' + error);
  }
  });
});

router.get('/z/summary', function(req, res, next) {
  var prodId = req.params.productId;
  console.log('Calling '+apiConfig.baseUrl+'products/orders/summary?id='+prodId);
  request(apiConfig.baseUrl+'/products/orders/summary?id='+prodId, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = body;
    res.render('product_summary', {
      item: JSON.parse(data),
      user: req.user,
    });
  } else {
    var statusCode = response.statusCode || 500;
    res.status(statusCode);
    res.end('Error: ' + error);
  }
  });
});

module.exports = router;
