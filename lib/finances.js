/**
 * Finances API requests and definitions for Amazon's MWS web services.
 * For information on using, please see examples folder.
 * 
 * @author Jazy Llerena
 */
var mws = require('./mws');

/**
 * Construct a Finances API request for using with mws.Client.invoke()
 * 
 * @param {String} action Action parameter of request
 * @param {Object} params Schemas for all supported parameters
 */
function FinancesRequest(action, params) {
    var opts = {
        name: 'Finances',
        group: 'Finances',
        path: '/Finances/2011-10-01',
        version: '2011-10-01',
        legacy: false,
        action: action,
        params: params
    };
    return new mws.Request(opts);
}

/**
 * Ojects to represent enum collections used by some request(s)
 * @type {Object}
 */
var enums = exports.enums = {

/*    ItemConditions:  function() { 
        return new mws.Enum([ 'New', 'Used', 'Collectible', 'Refurbished', 'Club' ]); 
    }
*/
};

/**
 * Contains brief definitions for unique data type values.
 * Can be used to explain input/output to users via tooltips, for example
 * @type {Object}
 */
var types = exports.types = {

    ServiceStatus: {
        'GREEN':'The service is operating normally.',
        'GREEN_I':'The service is operating normally + additional info provided',
        'YELLOW':'The service is experiencing higher than normal error rates or degraded performance.',
        'RED':'The service is unabailable or experiencing extremely high error rates.' },

};

/**
 * A collection of currently supported request constructors. Once created and 
 * configured, the returned requests can be passed to an mws client `invoke` call
 * @type {Object}
 */
var calls = exports.requests = {

    /**
     * Requests the operational status of the Finances API section.
     */
    GetServiceStatus: function() {
        return new FinancesRequest('GetServiceStatus', {});
    },                

    /**
		 * Returns financial event groups for a given date range
     */
    ListFinancialEventGroups: function() {
        return new FinancesRequest('ListFinancialEventGroups', { 
					MaxResultsPerPage: { name: 'MaxResultsPerPage'},
					FinancialEventGroupStartedAfter: { name: 'FinancialEventGroupStartedAfter', required: true},
					FinancialEventGroupStartedBefore: { name: 'FinancialEventGroupStartedBefore'}
        });
    },

    /**
		 * Returns the next page of financial event groups using the NextToken parameter.
     */
    ListFinancialEventGroupsByNextToken: function() {
        return new FinancesRequest('ListFinancialEventGroupsByNextToken', { 
					NextToken: { name: 'NextToken', required: true}
        });
    },

    /**
		 * Returns financial events for a given order, financial 
		 * event group, or date range.
     */
    ListFinancialEvents: function() {
        return new FinancesRequest('ListFinancialEvents', { 
					MaxResultsPerPage: { name: 'MaxResultsPerPage'},
					AmazonOrderId: { name: 'AmazonOrderId'},
					FinancialEventGroupId: { name: 'FinancialEventGroupId'},
					PostedAfter: { name: 'PostedAfter'},
					PostedBefore: { name: 'PostedBefore'}
        });
    },

    /**
		 * Returns the next page of financial events using 
		 * the NextToken parameter.
     */
    ListFinancialEventsByNextToken: function() {
        return new FinancesRequest('ListFinancialEventsByNextToken', { 
					NextToken: { name: 'NextToken', required: true}
        });
    }
};
