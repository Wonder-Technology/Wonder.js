

import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function convertToChildrenTransformIndexData(transformGameObjectIndexData, nodes) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("every node should has one transform component", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](transformGameObjectIndexData[/* gameObjectIndices */0].length, nodes.length);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var children = param$1[/* children */3];
          var childrenTransformIndices = param[1];
          var parentTransformIndices = param[0];
          if (children !== undefined) {
            return /* tuple */[
                    ArrayService$Wonderjs.push(index, parentTransformIndices),
                    ArrayService$Wonderjs.push(children, childrenTransformIndices)
                  ];
          } else {
            return /* tuple */[
                    parentTransformIndices,
                    childrenTransformIndices
                  ];
          }
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], nodes);
  return Contract$WonderLog.ensureCheck((function (param) {
                var childrenTransformIndices = param[/* childrenTransformIndices */1];
                var parentTransformIndices = param[/* parentTransformIndices */0];
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("parentTransformIndices\' count === childrenTransformIndices\' count", "not"), (function (param) {
                              return Contract$WonderLog.Operators[/* = */0](parentTransformIndices.length, childrenTransformIndices.length);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), /* record */[
              /* parentTransformIndices */match[0],
              /* childrenTransformIndices */match[1]
            ]);
}

export {
  convertToChildrenTransformIndexData ,
  
}
/* Log-WonderLog Not a pure module */
