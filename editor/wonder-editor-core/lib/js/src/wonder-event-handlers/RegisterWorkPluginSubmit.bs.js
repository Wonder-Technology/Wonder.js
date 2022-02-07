'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Main$WonderEngineCore = require("wonder-engine-core/lib/js/src/Main.bs.js");

function handler(api, e) {
  return Main$WonderEngineCore.registerWorkPlugin(Curry._1(e.getData, undefined), undefined, undefined);
}

exports.handler = handler;
/* Main-WonderEngineCore Not a pure module */
