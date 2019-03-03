

import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as CreateMeshRendererMainService$Wonderjs from "./CreateMeshRendererMainService.js";
import * as OperateMeshRendererMainService$Wonderjs from "./OperateMeshRendererMainService.js";

var _getData = OperateMeshRendererMainService$Wonderjs.getDrawMode;

var _setData = OperateMeshRendererMainService$Wonderjs.setDrawMode;

function handleCloneComponent(sourceComponent, countRangeArr, state) {
  var drawMode = _getData(sourceComponent, state);
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var match = CreateMeshRendererMainService$Wonderjs.create(param[0]);
                var index = match[1];
                var state = _setData(index, drawMode, match[0]);
                return /* tuple */[
                        state,
                        ArrayService$Wonderjs.push(index, param[1])
                      ];
              }), /* tuple */[
              state,
              /* array */[]
            ], countRangeArr);
}

export {
  _getData ,
  _setData ,
  handleCloneComponent ,
  
}
/* ArrayService-Wonderjs Not a pure module */
