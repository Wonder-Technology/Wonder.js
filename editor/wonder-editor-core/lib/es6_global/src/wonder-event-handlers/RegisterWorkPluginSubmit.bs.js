

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";

function handler(api, e) {
  var match = api.registerManager;
  Curry._3(match.setRegisteredWorkPlugin, e.fileStr, e.libraryName, e.funcName);
  return Curry._1(match.saveAllRegisteredWorkPugins, undefined);
}

export {
  handler ,
  
}
/* No side effect */
