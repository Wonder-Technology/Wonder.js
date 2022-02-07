

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as MiddlewareManager$WonderEditorCore from "./wonder-middlewares/MiddlewareManager.bs.js";

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

export {
  buildAPI ,
  serializeLib ,
  serialize ,
  getDataFromLib ,
  
}
/* No side effect */
