const secrets = require('../secrets');
const request = require('superagent');

var hasIt = function(body, field) {
    return body.hasOwnProperty(field) && !(!body[field]);
};

module.exports.hasIt = hasIt;

module.exports.populateCustomer = function(req, res, callback) {
    var body = req.body;
    if (!hasIt(body, 'customer_id')) {
        res.json({
            error: "cannot search for null/empty customer_id."
        })
    }
    var nessie_url = secrets.nessie_url_prefix + "customers/" + body.customer_id +
        "/?key=" + secrets.nessie_key;
    console.log(nessie_url);
    request.get(nessie_url).end(function(err, res2) {

        var body2 = res2.body;
        if (hasIt(body2, 'code') && body2.code == 404) {
            res.json({
                error: "Customer not found"
            })
        } else {
            var nessie_customer_accounts_url = secrets.nessie_url_prefix + "customers/" +
                body2._id + "/accounts/?key=" + secrets.nessie_key;
            var accounts = [];
            console.log(nessie_customer_accounts_url);
            request.get(nessie_customer_accounts_url).end(function(err, res3) {
                console.log(res3.body);
                res3.body.forEach(function(element) {
                    if (!(element.type === "Credit Card")) {
                        accounts.push(element._id);
                    }
                });
                callback({
                    "first_name": body2.first_name,
                    "last_name": body2.last_name,
                    "customer_id": body2._id,
                    "bank_accounts": accounts,
                    "offers": [],
                    "num_ratings": 0,
                    "rating": 0,
                    "avatar_url": "",
                    "status": "normal"
                });
            });
        }
    });
}
