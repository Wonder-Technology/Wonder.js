

import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as RenderObjectBufferTypeArrayService$Wonderjs from "../../main/render/RenderObjectBufferTypeArrayService.js";

function createTypeArrays(buffer, count) {
  return /* tuple */[
          new Uint32Array(buffer, RenderObjectBufferTypeArrayService$Wonderjs.getTransformIndicesOffset(count), RenderObjectBufferTypeArrayService$Wonderjs.getTransformIndicesLength(count)),
          new Uint32Array(buffer, RenderObjectBufferTypeArrayService$Wonderjs.getMaterialIndicesOffset(count), RenderObjectBufferTypeArrayService$Wonderjs.getMaterialIndicesLength(count)),
          new Uint32Array(buffer, RenderObjectBufferTypeArrayService$Wonderjs.getMeshRendererIndicesOffset(count), RenderObjectBufferTypeArrayService$Wonderjs.getMeshRendererIndicesLength(count)),
          new Uint32Array(buffer, RenderObjectBufferTypeArrayService$Wonderjs.getGeometryIndicesOffset(count), RenderObjectBufferTypeArrayService$Wonderjs.getGeometryIndicesLength(count)),
          new Uint32Array(buffer, RenderObjectBufferTypeArrayService$Wonderjs.getSourceInstanceIndicesOffset(count), RenderObjectBufferTypeArrayService$Wonderjs.getSourceInstanceIndicesLength(count))
        ];
}

function setAllTypeArrDataToDefault(count, typeArrTuple) {
  var defaultSourceInstance = DefaultTypeArrayValueService$Wonderjs.getDefaultSourceInstance(/* () */0);
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, index) {
                return /* tuple */[
                        param[0],
                        param[1],
                        param[2],
                        param[3],
                        RenderObjectBufferTypeArrayService$Wonderjs.setComponent(index, defaultSourceInstance, param[4])
                      ];
              }), typeArrTuple, ArrayService$WonderCommonlib.range(0, count - 1 | 0));
}

export {
  createTypeArrays ,
  setAllTypeArrDataToDefault ,
  
}
/* RenderObjectBufferTypeArrayService-Wonderjs Not a pure module */
