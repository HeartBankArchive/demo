"use strict";

require('dotenv').config();
const Browser = require("zombie");
Browser.localhost(process.env.ADDRESS, process.env.PORT);
const browser = new Browser();

describe("Testing /clients", () => {

  it("should see the clients page", next => {
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
      browser.assert.text('title', "Clients");
      next();
    });
  });

  it("should be able to refresh token", next => {
    browser.visit("/clients/refresh", err => {
      browser.assert.success();
      browser.assert.text('title', "Clients");
      next();
    });
  });

  it("should be able to switch client", next => {
    browser.visit("/clients/switch?" + `client=${process.env.CLIENT_ID}&token=${process.env.AUTH_TOKEN}&branch=${process.env.BRANCH_ID}&customer=${process.env.CUSTOMER_ID}&user=${process.env.USER_ID}`, err => {
      browser.assert.success();
      browser.assert.text('title', "Clients");
      next();
    });
  });

});
