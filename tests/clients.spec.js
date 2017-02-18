//var endpoints = require('./endpoints');

var Browser = require("zombie");
Browser.localhost('localhost', 9080);

var url = "/clients";
var browser = new Browser();

describe("Testing /clients", function() {

    it("should see the login form", function(next) {
        browser.visit(url, function(err) {
            expect(browser.success).toBe(true);
            expect(browser.query("input[value='Login']")).toBeDefined();
            next();
        })
    });

    it("should be able to login", function(next) {
        browser
        .fill('input[name="username"]', "admin")
        .fill('input[name="passcode"]', "1234")
        .pressButton('input[value="Login"]', function(res) {
            expect(browser.success).toBe(true);
            expect(browser.query("input[value='Login']")).toBeNull();
            next();
        });
    });

});
