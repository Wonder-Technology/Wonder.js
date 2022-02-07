'use strict';

var Curry = require("rescript/lib/js/curry.js");
var MiddlewareManager$WonderEditorCore = require("./MiddlewareManager.bs.js");

function buildAPI(param) {
  var eventManager = MiddlewareManager$WonderEditorCore.unsafeGet("EventManager");
  var ui = MiddlewareManager$WonderEditorCore.unsafeGet("UI");
  return {
          ui: Curry._1(ui.buildAPI, undefined),
          eventManager: Curry._1(eventManager.buildAPI, undefined)
        };
}

var serializeLib = (function(fileStr, libraryName) {
eval('(' + "(function(){" + fileStr + "}())" + ')')

return window[libraryName]
});

var serialize = (function(fileStr, libraryName, funcName) {
eval('(' + "(function(){" + fileStr + "}())" + ')')

return window[libraryName][funcName]
});

var getDataFromLib = (function(lib, dataName) {
return lib[dataName]
});

exports.buildAPI = buildAPI;
exports.serializeLib = serializeLib;
exports.serialize = serialize;
exports.getDataFromLib = getDataFromLib;
/* No side effect */
