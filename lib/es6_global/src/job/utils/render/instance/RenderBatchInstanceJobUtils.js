

import * as RenderJobUtils$Wonderjs from "../RenderJobUtils.js";
import * as DrawGLSLService$Wonderjs from "../../../../service/record/render/sender/DrawGLSLService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GLSLLocationService$Wonderjs from "../../../../service/record/all/location/GLSLLocationService.js";
import * as RenderGeometryService$Wonderjs from "../../../../service/record/main/geometry/RenderGeometryService.js";
import * as ObjectInstanceCollectionService$Wonderjs from "../../../../service/primitive/instance/ObjectInstanceCollectionService.js";
import * as CurrentComponentDataMapRenderService$Wonderjs from "../../../../service/state/render/gameObject/CurrentComponentDataMapRenderService.js";
import * as HandleUniformRenderObjectModelService$Wonderjs from "../../../../service/record/render/sender/uniform/HandleUniformRenderObjectModelService.js";
import * as BuildObjectInstanceTransformDataTupleUtils$Wonderjs from "./BuildObjectInstanceTransformDataTupleUtils.js";

function render(gl, indexTuple, renderFunc, state) {
  var geometryType = indexTuple[4];
  var geometryIndex = indexTuple[3];
  var shaderIndex = indexTuple[2];
  var state$1 = renderFunc(gl, /* tuple */[
        indexTuple[0],
        indexTuple[1],
        shaderIndex,
        geometryIndex,
        geometryType
      ], state);
  RenderJobUtils$Wonderjs.draw(gl, geometryIndex, geometryType, state$1);
  var uniformRenderObjectSendModelData = HandleUniformRenderObjectModelService$Wonderjs.unsafeGetUniformSendData(shaderIndex, state$1[/* glslSenderRecord */3]);
  var drawMode = RenderGeometryService$Wonderjs.getDrawMode(gl);
  var indexType = RenderGeometryService$Wonderjs.getIndexType(gl);
  var indexTypeSize = RenderGeometryService$Wonderjs.getIndexTypeSize(gl);
  var getIndicesCountFunc = CurrentComponentDataMapRenderService$Wonderjs.getGetIndicesCountFunc(geometryType);
  var indicesCount = getIndicesCountFunc(geometryIndex, state$1);
  var match = BuildObjectInstanceTransformDataTupleUtils$Wonderjs.build(indexTuple[5], state$1);
  return ObjectInstanceCollectionService$Wonderjs.reduceObjectInstanceTransformCollection(match[1], state$1, (function (state, objectInstanceTransform) {
                var state$1 = ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                        var pos = param[/* pos */0];
                        var match = GLSLLocationService$Wonderjs.isUniformLocationExist(pos);
                        if (match) {
                          param[/* sendDataFunc */2](gl, pos, param[/* getDataFunc */1](objectInstanceTransform, state));
                        }
                        return state;
                      }), state, uniformRenderObjectSendModelData);
                DrawGLSLService$Wonderjs.drawElement(/* tuple */[
                      drawMode,
                      indexType,
                      indexTypeSize,
                      indicesCount
                    ], gl);
                return state$1;
              }));
}

export {
  render ,
  
}
/* RenderJobUtils-Wonderjs Not a pure module */
