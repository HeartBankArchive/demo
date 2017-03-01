"use strict";

require('dotenv').config();
const Browser = require("zombie");
Browser.localhost(process.env.ADDRESS, process.env.PORT);
const browser = new Browser();

describe("Testing /", () => {

  it("should see the home page", next => {
    browser.visit("/", err => {
      browser.assert.success();
      browser.assert.text('title', "HeartBank®");
      next();
    });
  });

});
