'use strict';

var Curry = require("rescript/lib/js/curry.js");
var MiddlewareManager$WonderEditorCore = require("./wonder-middlewares/MiddlewareManager.bs.js");

function buildAPI(param) {
  var eventManager = MiddlewareManager$WonderEditorCore.unsafeGet("EventManager");
  var ui = MiddlewareManager$WonderEditorCore.unsafeGet("UI");
  var registerManager = MiddlewareManager$WonderEditorCore.unsafeGet("RegisterManager");
  return {
          ui: Curry._1(ui.buildAPI, undefined),
          eventManager: Curry._1(eventManager.buildAPI, undefined),
          registerManager: Curry._1(registerManager.buildAPI, undefined)
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
