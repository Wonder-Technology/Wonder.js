

import * as NullService$Wonderjs from "../../../atom/NullService.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";

function getFloat32Array1(record) {
  return record[/* float16Array1 */0];
}

function addUnUsedFloat9(float9Array1, record) {
  record[/* unusedFloat9ArrayArr */2] = ArrayService$Wonderjs.push(float9Array1, record[/* unusedFloat9ArrayArr */2]);
  return record;
}

function popUnUsedFloat9Array(record) {
  var value = record[/* unusedFloat9ArrayArr */2].pop();
  return /* tuple */[
          record,
          NullService$Wonderjs.isInArray(value),
          value
        ];
}

export {
  getFloat32Array1 ,
  addUnUsedFloat9 ,
  popUnUsedFloat9Array ,
  
}
/* ArrayService-Wonderjs Not a pure module */
