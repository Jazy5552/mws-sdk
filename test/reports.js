var assert = require('assert');
var MWS = require('../');
var env = process.env;

describe('Reports', function() {
  var MarketPlaceId = 'ATVPDKIKX0DER';
	var date = new Date();
	date.setDate(date.getDate() - 1);
	var REPORT_TYPE = '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_';
	var reportRequestId;
	var reportId;
	var reportString;
	var reportObject;
  var client;

  before('should set up the client', function() {
    client = new MWS.Client(env.accessKeyId, env.secretAccessKey, env.merchantId, {});
  });
  
  it('should request a report', function (done) {
    var requestReport = MWS.Reports.requests.RequestReport();
		requestReport.set('StartDate', date);
		requestReport.set('ReportType', REPORT_TYPE);
    //requestReport.params.StartDate.value = date.toISOString();
		//requestReport.params.ReportType = REPORT_TYPE;
    client.invoke(requestReport, function (resp) {
      var report = resp.RequestReportResponse.RequestReportResult[0].ReportRequestInfo[0];
      console.log(JSON.stringify(report, null, 2));
			reportRequestId = report.ReportRequestId[0];
			console.log('Request Id: ' + reportRequestId);
      done();
    });
  });
  
  it('should get the report id', function(done){
		this.timeout(60000);
    var requestList = MWS.Reports.requests.GetReportRequestList();
		reportRequestId = process.env.reportRequestId || reportRequestId;
		console.log('Request Id: ' + reportRequestId);
		requestList.set('ReportRequestIds', reportRequestId);
    //requestList.params.ReportRequestIds.value = order;
		setTimeout(function() {
    client.invoke(requestList, function (resp) {
			console.log('RAW: ' + JSON.stringify(resp, null, 2));
      report = resp.GetReportRequestListResponse.GetReportRequestListResult[0].ReportRequestInfo[0];
			console.log(JSON.stringify(report, null, 2));
			reportId = report.GeneratedReportId[0];
			console.log('Report Id: ' + reportId);
      done();
    });
		}, 40000);
  });

	it('should get the report string', function(done){
    var getReport = MWS.Reports.requests.GetReport();
		reportId = process.env.reportId || reportId;
		getReport.set('ReportId', reportId);
		console.log('Report Id: ' + reportId);
		client.invoke(getReport, function (resp) {
			reportString = resp;
			console.log('Report String: ' + reportString);
			done();
		});
	});

	it('should parse the report', function(done){
		var rp = MWS.ReportParser;
		//reportString = process.env.reportString || reportString;
		console.log('Report String: ' + JSON.stringify(reportString));
		reportObject = { 'rows' : rp(reportString) };
		console.log(JSON.stringify(reportObject, null, 2));
		done();
	});

});
