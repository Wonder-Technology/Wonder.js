

import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as OperateRenderMainService$Wonderjs from "./OperateRenderMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as HasComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/HasComponentGameObjectService.js";
import * as RenderObjectBufferTypeArrayService$Wonderjs from "../../../record/main/render/RenderObjectBufferTypeArrayService.js";

function _setSourceInstance(index, uid, sourceInstanceIndices, gameObjectRecord) {
  var match = GetComponentGameObjectService$Wonderjs.getSourceInstanceComponent(uid, gameObjectRecord);
  if (match !== undefined) {
    return RenderObjectBufferTypeArrayService$Wonderjs.setComponent(index, match, sourceInstanceIndices);
  } else {
    return sourceInstanceIndices;
  }
}

function setData(renderGameObjectArray, unsafeGetMaterialComponentFunc, renderObjectRecord, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = OperateRenderMainService$Wonderjs.hasCameraRecord(state);
  var renderGameObjectArray$1 = match ? renderGameObjectArray : /* array */[];
  var match$1 = ArrayService$WonderCommonlib.reduceOneParami((function (dataTuple, uid, index) {
          var geometryIndex = GetComponentGameObjectService$Wonderjs.unsafeGetGeometryComponent(uid, gameObjectRecord);
          var materialIndex = unsafeGetMaterialComponentFunc(uid, gameObjectRecord);
          return /* tuple */[
                  RenderObjectBufferTypeArrayService$Wonderjs.setComponent(index, GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(uid, gameObjectRecord), dataTuple[0]),
                  RenderObjectBufferTypeArrayService$Wonderjs.setComponent(index, materialIndex, dataTuple[1]),
                  RenderObjectBufferTypeArrayService$Wonderjs.setComponent(index, GetComponentGameObjectService$Wonderjs.unsafeGetMeshRendererComponent(uid, gameObjectRecord), dataTuple[2]),
                  RenderObjectBufferTypeArrayService$Wonderjs.setComponent(index, geometryIndex, dataTuple[3]),
                  _setSourceInstance(index, uid, dataTuple[4], gameObjectRecord),
                  ArrayService$Wonderjs.push(index, dataTuple[5])
                ];
        }), /* tuple */[
        renderObjectRecord[/* transformIndices */2],
        renderObjectRecord[/* materialIndices */3],
        renderObjectRecord[/* meshRendererIndices */4],
        renderObjectRecord[/* geometryIndices */5],
        renderObjectRecord[/* sourceInstanceIndices */6],
        /* array */[]
      ], renderGameObjectArray$1.filter((function (uid) {
              return HasComponentGameObjectService$Wonderjs.hasGeometryComponent(uid, gameObjectRecord);
            })));
  return /* record */[
          /* buffer */renderObjectRecord[/* buffer */0],
          /* renderIndexArray */match$1[5],
          /* transformIndices */match$1[0],
          /* materialIndices */match$1[1],
          /* meshRendererIndices */match$1[2],
          /* geometryIndices */match$1[3],
          /* sourceInstanceIndices */match$1[4]
        ];
}

export {
  _setSourceInstance ,
  setData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
