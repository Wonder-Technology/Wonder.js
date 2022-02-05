

import * as ArraySt$WonderCommonlib from "../../structure/ArraySt.bs.js";
import * as OptionSt$WonderCommonlib from "../../structure/OptionSt.bs.js";
import * as ArgumentsTool$WonderCommonlib from "./ArgumentsTool.bs.js";

function getExnAndConvertArgumentsToNumber($$arguments) {
  return ArraySt$WonderCommonlib.map(ArgumentsTool$WonderCommonlib.getArgumentsArr(OptionSt$WonderCommonlib.getExn($$arguments)), (function (prim) {
                return Number(prim);
              }));
}

export {
  getExnAndConvertArgumentsToNumber ,
  
}
/* No side effect */
