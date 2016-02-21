var assert = require('assert');
var MWS = require('../');
var env = process.env;

describe('Finances', function() {
  var MarketPlaceId = 'ATVPDKIKX0DER';
	var date = new Date();
	date.setDate(date.getDate() - 1);
	var order;
  var client;
  it('should set up client', function() {
    client = new MWS.Client(env.accessKeyId, env.secretAccessKey, env.merchantId, {});
		console.log('accessKey: ' + env.accessKeyId + 'secretKey: ' + env.secretAccessKey + 'merchantId: ' + env.merchantId);
  });

  
  it('list financial events command', function (done) {
    var listFinances = MWS.Finances.requests.ListFinancialEvents();
    listFinances.params.PostedAfter.value = date.toISOString();
    client.invoke(listFinances, function (resp) {
			console.log('Raw response: ' + JSON.stringify(resp, null, 2));
      var finances = resp.ListFinancialEventsResponse.ListFinancialEventsResult.FinancialEvents;
      console.log(JSON.stringify(finances, null, 2));
      done();
    });
  });
 /* 
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
	*/
});
