mws-sdk
======

Forked from [ticadia/mws-sdk](https://github.com/ticadia/mws-sdk) who originally forked from [dfsklar/mws-js](https://github.com/dfsklar/mws-js). This is another continuation of mws-js with a more standarized node module setup. I added the Finances api calls and a report parser.


Examples
--------------------


Initiation

```javascript
var MWS = require('mws-sdk'),
    client = new MWS.Client('accessKeyId', 'secretAccessKey', 'merchantId', {}),
    marketPlaceId = "ATVPDKIKX0DER";
```


```javascript
var sf = new MWS.Orders.requests.ListOrders({"marketPlaceId": marketPlaceId});
sf.set("MarketplaceId", marketPlaceId);
sf.set("CreatedAfter", "2014-07-13"); //Can also be a date object
client.invoke(sf, function(RESULT){
  console.log("--------");
  console.log(JSON.stringify(RESULT));
  console.log("--------");
});
```

```javascript
var sf = new MWS.Orders.requests.ListOrderItems();
sf.set("AmazonOrderId", "111-1715221-5800265");
client.invoke(sf, function(RESULT){
  console.log("--------");
  console.log(JSON.stringify(RESULT));
  console.log("--------");
});
```

```javascript
var sf = new MWS.Reports.requests.GetReport();
sf.set("ReportId", "1234567890");
client.invoke(sf, function(reportString){
  var reportObject = MWS.ReportParser(reportString);
  console.log("--------");
  console.log(JSON.stringify(reportObject));
  console.log("--------");
});
```
