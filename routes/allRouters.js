const express = require("express");
const Router = express.Router();

const login = require("./login.route");
const register = require("./register.route");
const home = require("./home.route");
const blog = require("./blog.route");
const profile = require("./profile.route");


Router.use(login);
Router.use(register);
Router.use(home);
Router.use(blog);
Router.use(profile);

module.exports = Router;
