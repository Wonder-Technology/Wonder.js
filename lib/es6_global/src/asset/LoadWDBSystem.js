

import * as Most from "most";
import * as FetchCommon$Wonderjs from "./FetchCommon.js";
import * as AssembleWDBSystem$Wonderjs from "./assemble/AssembleWDBSystem.js";

function load(wdPath, fetchFunc, state) {
  return Most.flatMap((function (wdb) {
                return AssembleWDBSystem$Wonderjs.assemble(wdb, state);
              }), FetchCommon$Wonderjs.createFetchArrayBufferStream(wdPath, fetchFunc));
}

export {
  load ,
  
}
/* most Not a pure module */
