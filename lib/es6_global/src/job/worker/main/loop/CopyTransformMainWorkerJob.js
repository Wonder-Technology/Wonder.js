

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as CopyTransformService$Wonderjs from "../../../../service/record/main/transform/CopyTransformService.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as BufferTransformService$Wonderjs from "../../../../service/record/main/transform/BufferTransformService.js";
import * as CopyArrayBufferService$Wonderjs from "../../../../service/primitive/copy/CopyArrayBufferService.js";
import * as RecordTransformMainService$Wonderjs from "../../../../service/state/main/transform/RecordTransformMainService.js";

function execJob(_, stateData) {
  return MostUtils$Wonderjs.callFunc((function () {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
                var index = transformRecord[/* index */0];
                var newrecord = Caml_array.caml_array_dup(transformRecord);
                state[/* transformRecord */11] = (newrecord[/* copiedBuffer */6] = Js_primitive.some(CopyArrayBufferService$Wonderjs.copyArrayBufferSpecificData(transformRecord[/* buffer */1], CopyTransformService$Wonderjs.unsafeGetCopiedBuffer(transformRecord), BufferTransformService$Wonderjs.getTotalByteLength(index))), newrecord);
                StateDataMainService$Wonderjs.setState(stateData, state);
                return undefined;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
