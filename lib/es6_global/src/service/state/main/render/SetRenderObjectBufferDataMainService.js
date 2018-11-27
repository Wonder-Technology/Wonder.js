

import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as OperateRenderMainService$Wonderjs from "./OperateRenderMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as RenderObjectBufferTypeArrayService$Wonderjs from "../../../record/main/render/RenderObjectBufferTypeArrayService.js";

function setData(renderArray, unsafeGetMaterialComponentFunc, renderObjectRecord, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = OperateRenderMainService$Wonderjs.hasCameraRecord(state);
  var renderArray$1 = match ? renderArray : /* array */[];
  var match$1 = ArrayService$WonderCommonlib.reduceOneParami((function (dataTuple, uid, index) {
          var sourceInstanceIndices = dataTuple[4];
          var match = GetComponentGameObjectService$Wonderjs.getGeometryComponent(uid, gameObjectRecord);
          if (match !== undefined) {
            var materialIndex = unsafeGetMaterialComponentFunc(uid, gameObjectRecord);
            var match$1 = GetComponentGameObjectService$Wonderjs.getSourceInstanceComponent(uid, gameObjectRecord);
            return /* tuple */[
                    RenderObjectBufferTypeArrayService$Wonderjs.setComponent(index, GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(uid, gameObjectRecord), dataTuple[0]),
                    RenderObjectBufferTypeArrayService$Wonderjs.setComponent(index, materialIndex, dataTuple[1]),
                    RenderObjectBufferTypeArrayService$Wonderjs.setComponent(index, GetComponentGameObjectService$Wonderjs.unsafeGetMeshRendererComponent(uid, gameObjectRecord), dataTuple[2]),
                    RenderObjectBufferTypeArrayService$Wonderjs.setComponent(index, match, dataTuple[3]),
                    match$1 !== undefined ? RenderObjectBufferTypeArrayService$Wonderjs.setComponent(index, match$1, sourceInstanceIndices) : sourceInstanceIndices,
                    ArrayService$Wonderjs.push(index, dataTuple[5])
                  ];
          } else {
            return dataTuple;
          }
        }), /* tuple */[
        renderObjectRecord[/* transformIndices */2],
        renderObjectRecord[/* materialIndices */3],
        renderObjectRecord[/* meshRendererIndices */4],
        renderObjectRecord[/* geometryIndices */5],
        renderObjectRecord[/* sourceInstanceIndices */6],
        /* array */[]
      ], renderArray$1);
  return /* record */[
          /* buffer */renderObjectRecord[/* buffer */0],
          /* renderArray */match$1[5],
          /* transformIndices */match$1[0],
          /* materialIndices */match$1[1],
          /* meshRendererIndices */match$1[2],
          /* geometryIndices */match$1[3],
          /* sourceInstanceIndices */match$1[4]
        ];
}

export {
  setData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
