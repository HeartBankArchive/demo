"use strict";

require('dotenv').config();
const Browser = require("zombie");
Browser.localhost(process.env.ADDRESS, process.env.PORT);
const browser = new Browser();

describe("Testing /kiitos", () => {

  it("should see the kiitos page", next => {
    browser.visit("/kiitos", err => {
      browser.assert.success();
      browser.assert.text('title', "Kiitos");
      next();
    });
  });

});
