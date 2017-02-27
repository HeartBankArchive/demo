"use strict";

require('dotenv').config();
const Browser = require("zombie");
Browser.localhost('localhost', 9080);
const browser = new Browser();

describe("Testing /clients", () => {

    it("should see the login form", next => {
      browser.visit("/clients", err => {
        browser.assert.success();
        browser.assert.text('title', "Clients");
        next();
      });
    });

    it("should be able to login", next => {
      browser
      .fill('input[name="username"]', process.env.USERNAME)
      .fill('input[name="passcode"]', process.env.PASSCODE)
      .pressButton('input[value="Login"]', res => {
        browser.assert.success();
        browser.assert.text('title', "HeartBank®");
        next();
      });
    });

});
