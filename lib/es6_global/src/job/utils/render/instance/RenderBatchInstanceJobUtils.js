

import * as RenderJobUtils$Wonderjs from "../RenderJobUtils.js";
import * as DrawGLSLService$Wonderjs from "../../../../service/record/all/sender/DrawGLSLService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GeometryRenderService$Wonderjs from "../../../../service/state/render/geometry/GeometryRenderService.js";
import * as AllGLSLLocationService$Wonderjs from "../../../../service/record/all/location/AllGLSLLocationService.js";
import * as DrawModeMeshRendererService$Wonderjs from "../../../../service/state/render/meshRenderer/DrawModeMeshRendererService.js";
import * as GetGeometryIndicesRenderService$Wonderjs from "../../../../service/state/render/geometry/GetGeometryIndicesRenderService.js";
import * as ObjectInstanceCollectionService$Wonderjs from "../../../../service/primitive/instance/ObjectInstanceCollectionService.js";
import * as HandleUniformRenderObjectModelService$Wonderjs from "../../../../service/record/all/sender/uniform/HandleUniformRenderObjectModelService.js";
import * as CreateGetRenederDataSubStateRenderService$Wonderjs from "../../../../service/state/render/sub/get_render_data/CreateGetRenederDataSubStateRenderService.js";
import * as BuildObjectInstanceTransformDataTupleUtils$Wonderjs from "./BuildObjectInstanceTransformDataTupleUtils.js";

function render(gl, indexTuple, renderFunc, state) {
  var geometryIndex = indexTuple[4];
  var meshRendererIndex = indexTuple[3];
  var shaderIndex = indexTuple[2];
  var state$1 = renderFunc(gl, /* tuple */[
        indexTuple[0],
        indexTuple[1],
        shaderIndex,
        meshRendererIndex,
        geometryIndex
      ], state);
  RenderJobUtils$Wonderjs.draw(gl, DrawModeMeshRendererService$Wonderjs.getGlDrawMode(gl, meshRendererIndex, state$1), geometryIndex, state$1);
  var uniformRenderObjectSendModelData = HandleUniformRenderObjectModelService$Wonderjs.unsafeGetUniformSendData(shaderIndex, state$1[/* glslSenderRecord */3]);
  var drawMode = DrawModeMeshRendererService$Wonderjs.getGlDrawMode(gl, meshRendererIndex, state$1);
  var indexType = GeometryRenderService$Wonderjs.getIndexType(gl, geometryIndex, state$1);
  var indexTypeSize = GeometryRenderService$Wonderjs.getIndexTypeSize(gl, geometryIndex, state$1);
  var indicesCount = GetGeometryIndicesRenderService$Wonderjs.getIndicesCount(geometryIndex, state$1);
  var match = BuildObjectInstanceTransformDataTupleUtils$Wonderjs.build(indexTuple[5], state$1);
  var getRenderDataSubState = CreateGetRenederDataSubStateRenderService$Wonderjs.createState(state$1);
  ObjectInstanceCollectionService$Wonderjs.forEachObjectInstanceTransformCollection(match[1], (function (objectInstanceTransform) {
          ArrayService$WonderCommonlib.forEach((function (param) {
                  var pos = param[/* pos */0];
                  var match = AllGLSLLocationService$Wonderjs.isUniformLocationExist(pos);
                  if (match) {
                    return param[/* sendDataFunc */2](gl, pos, param[/* getDataFunc */1](objectInstanceTransform, getRenderDataSubState));
                  } else {
                    return /* () */0;
                  }
                }), uniformRenderObjectSendModelData);
          DrawGLSLService$Wonderjs.drawElement(/* tuple */[
                drawMode,
                indexType,
                indexTypeSize,
                indicesCount
              ], gl);
          return /* () */0;
        }));
  return state$1;
}

export {
  render ,
  
}
/* RenderJobUtils-Wonderjs Not a pure module */
