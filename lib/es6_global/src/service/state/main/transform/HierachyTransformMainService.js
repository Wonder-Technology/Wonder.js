

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HierachyTransformService$Wonderjs from "../../../record/main/transform/HierachyTransformService.js";
import * as RecordTransformMainService$Wonderjs from "./RecordTransformMainService.js";

function _changeChildOrder(sourceTransfrom, targetTransform, children, action) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (newChildren, child) {
                if (child === targetTransform) {
                  if (action) {
                    return ArrayService$Wonderjs.push(sourceTransfrom, ArrayService$Wonderjs.push(targetTransform, newChildren));
                  } else {
                    return ArrayService$Wonderjs.push(targetTransform, ArrayService$Wonderjs.push(sourceTransfrom, newChildren));
                  }
                } else if (child === sourceTransfrom) {
                  return newChildren;
                } else {
                  return ArrayService$Wonderjs.push(child, newChildren);
                }
              }), /* array */[], children);
}

function changeChildOrder(sourceTransfrom, targetTransform, targetParentTransform, action, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("parent should be the parent of source and target", "not"), (function (param) {
                        var record = RecordTransformMainService$Wonderjs.getRecord(state);
                        var match = HierachyTransformService$Wonderjs.getParent(sourceTransfrom, record);
                        var match$1 = HierachyTransformService$Wonderjs.getParent(targetTransform, record);
                        if (match !== undefined && match$1 !== undefined) {
                          var targetParent = match$1;
                          Contract$WonderLog.Operators[/* = */0](match, targetParent);
                          return Contract$WonderLog.Operators[/* = */0](targetParentTransform, targetParent);
                        } else {
                          return Contract$WonderLog.assertFail(/* () */0);
                        }
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var record = RecordTransformMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* transformRecord */11] = HierachyTransformService$Wonderjs.setChildren(record, targetParentTransform, _changeChildOrder(sourceTransfrom, targetTransform, HierachyTransformService$Wonderjs.unsafeGetChildren(targetParentTransform, record), action));
  return newrecord;
}

export {
  _changeChildOrder ,
  changeChildOrder ,
  
}
/* Log-WonderLog Not a pure module */
