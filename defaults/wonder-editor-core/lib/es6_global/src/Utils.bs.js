

import * as MiddlewareManager$WonderEditorCore from "./wonder-middlewares/MiddlewareManager.bs.js";

function buildAPI(param) {
  return {
          commonlib: 1,
          most: 1,
          engineCore: 1,
          middlewareManager: MiddlewareManager$WonderEditorCore.buildAPI(undefined)
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
