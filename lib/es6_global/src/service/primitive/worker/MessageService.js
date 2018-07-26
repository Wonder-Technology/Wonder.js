

import * as OptionService$Wonderjs from "../../atom/OptionService.js";

function getData(e) {
  return e.data;
}

function getRecord(e) {
  return OptionService$Wonderjs.unsafeGet(e).data;
}

export {
  getData ,
  getRecord ,
  
}
/* OptionService-Wonderjs Not a pure module */
