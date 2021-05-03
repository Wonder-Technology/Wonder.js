

import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ShaderIndicesService$Wonderjs from "../../../primitive/material/ShaderIndicesService.js";

function _handleShareMaterial(sourceComponent, countRangeArr, param) {
  return /* tuple */[
          param[1],
          countRangeArr.map((function (param) {
                  return sourceComponent;
                }))
        ];
}

function _handleNotShareMaterial(sourceComponent, countRangeArr, param, param$1) {
  var state = param$1[1];
  var setShaderIndexFunc = param[3];
  var setDataFunc = param[2];
  var createFunc = param[0];
  var shaderIndex = ShaderIndicesService$Wonderjs.getShaderIndex(sourceComponent, param$1[0]);
  var dataTuple = param[1](sourceComponent, state);
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var match = createFunc(param[0]);
                var index = match[1];
                var state = setDataFunc(index, dataTuple, match[0]);
                var state$1 = setShaderIndexFunc(index, shaderIndex, state);
                return /* tuple */[
                        state$1,
                        ArrayService$Wonderjs.push(index, param[1])
                      ];
              }), /* tuple */[
              state,
              /* array */[]
            ], countRangeArr);
}

function handleCloneComponent(param, funcTuple, stateTuple) {
  var countRangeArr = param[1];
  var sourceComponent = param[0];
  if (param[2]) {
    return _handleShareMaterial(sourceComponent, countRangeArr, stateTuple);
  } else {
    return _handleNotShareMaterial(sourceComponent, countRangeArr, funcTuple, stateTuple);
  }
}

export {
  _handleShareMaterial ,
  _handleNotShareMaterial ,
  handleCloneComponent ,
  
}
/* ArrayService-Wonderjs Not a pure module */
