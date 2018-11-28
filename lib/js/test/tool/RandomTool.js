'use strict';

var Random = require("bs-platform/lib/js/random.js");

var getRandomFloat = Random.$$float;

var getRandomInt = Random.$$int;

exports.getRandomFloat = getRandomFloat;
exports.getRandomInt = getRandomInt;
/* No side effect */
