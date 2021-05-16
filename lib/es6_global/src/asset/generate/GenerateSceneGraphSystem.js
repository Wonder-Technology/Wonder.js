

import * as GenerateGLBSystem$Wonderjs from "./GenerateGLBSystem.js";
import * as GenerateWDBSystem$Wonderjs from "./GenerateWDBSystem.js";
import * as IndicesGeometryMainService$Wonderjs from "../../service/state/main/geometry/IndicesGeometryMainService.js";
import * as NormalsGeometryMainService$Wonderjs from "../../service/state/main/geometry/NormalsGeometryMainService.js";
import * as VerticesGeometryMainService$Wonderjs from "../../service/state/main/geometry/VerticesGeometryMainService.js";
import * as TexCoordsGeometryMainService$Wonderjs from "../../service/state/main/geometry/TexCoordsGeometryMainService.js";

function _getFuncTuple(param) {
  return /* tuple */[
          /* tuple */[
            VerticesGeometryMainService$Wonderjs.getVertices,
            NormalsGeometryMainService$Wonderjs.getNormals,
            TexCoordsGeometryMainService$Wonderjs.getTexCoords,
            IndicesGeometryMainService$Wonderjs.getIndices16,
            IndicesGeometryMainService$Wonderjs.getIndices32
          ],
          (function (imageUint8Array) {
              return imageUint8Array;
            })
        ];
}

function generateGLBData(rootGameObject, imageUint8ArrayMap, isBuildCubemapFromSceneSkybox, state) {
  return GenerateGLBSystem$Wonderjs.generateGLBData(/* tuple */[
              rootGameObject,
              imageUint8ArrayMap
            ], isBuildCubemapFromSceneSkybox, /* tuple */[
              /* tuple */[
                VerticesGeometryMainService$Wonderjs.getVertices,
                NormalsGeometryMainService$Wonderjs.getNormals,
                TexCoordsGeometryMainService$Wonderjs.getTexCoords,
                IndicesGeometryMainService$Wonderjs.getIndices16,
                IndicesGeometryMainService$Wonderjs.getIndices32
              ],
              (function (imageUint8Array) {
                  return imageUint8Array;
                })
            ], state);
}

function generateWDB(rootGameObject, imageUint8ArrayMap, isBuildCubemapFromSceneSkybox, state) {
  return GenerateWDBSystem$Wonderjs.generateWDB(rootGameObject, imageUint8ArrayMap, isBuildCubemapFromSceneSkybox, /* tuple */[
              /* tuple */[
                VerticesGeometryMainService$Wonderjs.getVertices,
                NormalsGeometryMainService$Wonderjs.getNormals,
                TexCoordsGeometryMainService$Wonderjs.getTexCoords,
                IndicesGeometryMainService$Wonderjs.getIndices16,
                IndicesGeometryMainService$Wonderjs.getIndices32
              ],
              (function (imageUint8Array) {
                  return imageUint8Array;
                })
            ], state);
}

export {
  _getFuncTuple ,
  generateGLBData ,
  generateWDB ,
  
}
/* GenerateGLBSystem-Wonderjs Not a pure module */
