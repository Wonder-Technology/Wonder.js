'use strict';

var Curry = require("rescript/lib/js/curry.js");
var MiddlewareManager$WonderEditorCore = require("../wonder-middlewares/MiddlewareManager.bs.js");

function handler(api, e) {
  var middlewareName = e.middlewareName;
  MiddlewareManager$WonderEditorCore.register(middlewareName, Curry._1(e.getData, undefined));
  var middlewareTest1 = MiddlewareManager$WonderEditorCore.unsafeGet(middlewareName);
  return Curry._1(middlewareTest1.func1, "middlewareTest1");
}

exports.handler = handler;
/* No side effect */
