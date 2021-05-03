

import * as Sinon from "./../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as RandomTool$Wonderjs from "./RandomTool.js";

function buildStubWhichReturnDifferentValue(sandbox) {
  var stub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  for(var i = 0; i <= 100; ++i){
    Sinon.returns(RandomTool$Wonderjs.getRandomFloat(1000), Sinon.onCall(i, stub));
  }
  return stub;
}

export {
  buildStubWhichReturnDifferentValue ,
  
}
/* Sinon Not a pure module */
