

import * as ConvertGLBSystem$Wonderjs from "../../../../asset/converter/ConvertGLBSystem.js";
import * as GenerateGLBSystem$Wonderjs from "../../../../asset/generate/GenerateGLBSystem.js";
import * as GenerateSingleABUtils$Wonderjs from "../../utils/GenerateSingleABUtils.js";
import * as IndicesGeometryMainService$Wonderjs from "../../../../service/state/main/geometry/IndicesGeometryMainService.js";
import * as NormalsGeometryMainService$Wonderjs from "../../../../service/state/main/geometry/NormalsGeometryMainService.js";
import * as VerticesGeometryMainService$Wonderjs from "../../../../service/state/main/geometry/VerticesGeometryMainService.js";
import * as TexCoordsGeometryMainService$Wonderjs from "../../../../service/state/main/geometry/TexCoordsGeometryMainService.js";

function _writeUint32DataToUint8Array(uint32Data) {
  return new Uint8Array(new Uint32Array(/* array */[uint32Data]).buffer);
}

function generateSAB(param, bufferTotalAlignedByteLength, jsonUint8Array) {
  var match = param[0];
  return GenerateSingleABUtils$Wonderjs.generateAB(/* tuple */[
              /* tuple */[
                match[0].map((function (param) {
                        return /* tuple */[
                                param[/* byteOffset */1],
                                param[/* byteLength */2]
                              ];
                      })),
                match[1].map((function (param) {
                        return /* tuple */[
                                param[/* byteOffset */1],
                                param[/* byteLength */2]
                              ];
                      }))
              ],
              param[1],
              param[2]
            ], bufferTotalAlignedByteLength, jsonUint8Array);
}

function generateSingleSAB(sceneGameObject, basicSourceTextureImageUint8ArrayMap, isBuildCubemapFromSceneSkybox, state) {
  var match = GenerateGLBSystem$Wonderjs.generateGLBData(/* tuple */[
        sceneGameObject,
        basicSourceTextureImageUint8ArrayMap
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
  return ConvertGLBSystem$Wonderjs.convertGLBData(match[0], match[2]);
}

export {
  _writeUint32DataToUint8Array ,
  generateSAB ,
  generateSingleSAB ,
  
}
/* ConvertGLBSystem-Wonderjs Not a pure module */
