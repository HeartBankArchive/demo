"use strict";
require('dotenv').config();

const Browser = require("zombie");
Browser.localhost(process.env.ADDRESS, process.env.PORT);

const browser = new Browser();
browser.setCookie({name:"client_id", value:process.env.CLIENT_ID});
browser.setCookie({name:"auth_token", value:process.env.AUTH_TOKEN});
browser.setCookie({name:"branch_id", value:process.env.BRANCH_ID});
browser.setCookie({name:"customer_id", value:process.env.CUSTOMER_ID});
browser.setCookie({name:"user_id", value:process.env.USER_ID});

describe("Testing /branches", () => {

    it("should see the branches page", next => {
      browser.visit("/branches", err => {
        browser.assert.success();
        browser.assert.text('title', "Branches");
        next();
      });
    });

});
