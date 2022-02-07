

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Main$WonderEngineCore from "../../../../../../node_modules/wonder-engine-core/lib/es6_global/src/Main.bs.js";

function handler(api, e) {
  return Main$WonderEngineCore.registerWorkPlugin(Curry._1(e.getData, undefined), undefined, undefined);
}

export {
  handler ,
  
}
/* Main-WonderEngineCore Not a pure module */
