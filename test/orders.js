var assert = require('assert');
var MWS = require('../');
var env = process.env;

describe('Orders', function() {
  var MarketPlaceId = 'ATVPDKIKX0DER';
	var date = new Date();
	date.setDate(date.getDate() - 1);
	var order;
  var client;
  it('should set up client', function() {
    client = new MWS.Client(env.accessKeyId, env.secretAccessKey, env.merchantId, {});
		console.log(env.accessKeyId + ' ' + env.secretAccessKey + ' ' + env.merchantId);
  });

  
  it('list orders command', function (done) {
    var listOrders = MWS.Orders.requests.ListOrders({ "marketplaceId": MarketPlaceId });
    listOrders.params.MarketplaceId.value = MarketPlaceId;
    listOrders.params.CreatedAfter.value = date.toISOString();
    client.invoke(listOrders, function (resp) {
      var orders = resp.ListOrdersResponse.ListOrdersResult[0].Orders[0].Order
      console.log(orders.length);
			order = orders[0].AmazonOrderId[0];
      done();
    });
  });
  
  it('get single order', function(done){
    var getOrder = MWS.Orders.requests.GetOrder();
    console.log(order);
    // 000-0000000-0000000
    getOrder.params.AmazonOrderId.value = order;
    client.invoke(getOrder, function (resp) {
      var order = resp.GetOrderResponse.GetOrderResult[0].Orders[0].Order;
      console.log(JSON.stringify(order));
      done();
    });
  });

});
