

import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as GLTFUtils$Wonderjs from "../utils/GLTFUtils.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as TypeArrayService$Wonderjs from "../../service/primitive/buffer/TypeArrayService.js";
import * as ConvertSceneSystem$Wonderjs from "./ConvertSceneSystem.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ConvertImagesSystem$Wonderjs from "./ConvertImagesSystem.js";
import * as ConvertLightsSystem$Wonderjs from "./ConvertLightsSystem.js";
import * as ConvertStreamSystem$Wonderjs from "./ConvertStreamSystem.js";
import * as ConvertBuffersSystem$Wonderjs from "./ConvertBuffersSystem.js";
import * as ConvertCamerasSystem$Wonderjs from "./ConvertCamerasSystem.js";
import * as ConvertIndicesSystem$Wonderjs from "./indices/ConvertIndicesSystem.js";
import * as ConvertScriptsSystem$Wonderjs from "./ConvertScriptsSystem.js";
import * as ConvertTexturesSystem$Wonderjs from "./ConvertTexturesSystem.js";
import * as ConvertGeometrysSystem$Wonderjs from "./ConvertGeometrysSystem.js";
import * as ConvertMaterialsSystem$Wonderjs from "./ConvertMaterialsSystem.js";
import * as BuildGLTFJsonDataSystem$Wonderjs from "./BuildGLTFJsonDataSystem.js";
import * as ConvertTransformsSystem$Wonderjs from "./ConvertTransformsSystem.js";
import * as ConvertGameObjectsSystem$Wonderjs from "./ConvertGameObjectsSystem.js";
import * as ConvertMeshRenderersSystem$Wonderjs from "./ConvertMeshRenderersSystem.js";
import * as ConvertMultiPrimitivesSystem$Wonderjs from "./ConvertMultiPrimitivesSystem.js";
import * as ConvertGLTFJsonToRecordSystem$Wonderjs from "./ConvertGLTFJsonToRecordSystem.js";

function _checkAndWarn(gltf) {
  var hasTexCoord_1 = /* record */[/* contents */false];
  ArrayService$WonderCommonlib.forEach((function (param) {
          var match = param[/* primitives */0][0];
          var match$1 = Js_option.isSome(match[/* attributes */0][/* texCoord_1 */3]);
          if (match$1) {
            hasTexCoord_1[0] = true;
            return /* () */0;
          } else {
            return /* () */0;
          }
        }), gltf[/* meshes */11]);
  var match = hasTexCoord_1[0];
  if (match) {
    Log$WonderLog.warn("not support texCoord_1");
  }
  return gltf;
}

function _buildWDBJsonUint8Array(gltf) {
  var gltf$1 = _checkAndWarn(gltf);
  var gltf$2 = ConvertMultiPrimitivesSystem$Wonderjs.convertMultiPrimitivesToNodes(gltf$1);
  var transforms = ConvertTransformsSystem$Wonderjs.convertToTransforms(gltf$2);
  var match = BuildGLTFJsonDataSystem$Wonderjs.buildJsonData(transforms, gltf$2);
  var gltf$3 = match[2];
  var match$1 = ConvertLightsSystem$Wonderjs.convertToLights(gltf$3);
  var indices = ConvertIndicesSystem$Wonderjs.convertToIndices(gltf$3);
  var encoder = new TextEncoder();
  return /* tuple */[
          match[0],
          match[1],
          encoder.encode(JSON.stringify(/* record */[
                    /* asset : record */[
                      /* version */gltf$2[/* asset */0][/* version */0],
                      /* generator */GLTFUtils$Wonderjs.getGenerator(/* () */0)
                    ],
                    /* scene */ConvertSceneSystem$Wonderjs.convertToScene(match$1[0], gltf$3),
                    /* indices */indices,
                    /* gameObjects */ConvertGameObjectsSystem$Wonderjs.convert(gltf$3),
                    /* images */ConvertImagesSystem$Wonderjs.convertToImages(gltf$3),
                    /* basicSourceTextures */ConvertTexturesSystem$Wonderjs.convertToBasicSourceTextures(gltf$3),
                    /* cubemapTextures */ConvertTexturesSystem$Wonderjs.convertToCubemapTextures(gltf$3),
                    /* samplers */ConvertTexturesSystem$Wonderjs.convertToSamplers(gltf$3),
                    /* buffers */ConvertBuffersSystem$Wonderjs.convertToBuffers(gltf$3),
                    /* bufferViews */ConvertBuffersSystem$Wonderjs.convertToBufferViews(gltf$3),
                    /* accessors */ConvertBuffersSystem$Wonderjs.convertToAccessors(gltf$3),
                    /* directionLights */match$1[1],
                    /* pointLights */match$1[2],
                    /* basicCameraViews */ConvertCamerasSystem$Wonderjs.convertToBasicCameraViews(gltf$3),
                    /* perspectiveCameraProjections */ConvertCamerasSystem$Wonderjs.convertToPerspectiveCameraProjections(gltf$3),
                    /* flyCameraControllers */ConvertCamerasSystem$Wonderjs.convertToFlyCameraControllers(gltf$3),
                    /* arcballCameraControllers */ConvertCamerasSystem$Wonderjs.convertToArcballCameraControllers(gltf$3),
                    /* transforms */transforms,
                    /* geometrys */ConvertGeometrysSystem$Wonderjs.convertToGeometrys(gltf$3),
                    /* meshRenderers */ConvertMeshRenderersSystem$Wonderjs.convertToMeshRenderers(indices[/* gameObjectIndices */0][/* geometryGameObjectIndexData */10], gltf$3),
                    /* basicMaterials */ConvertMaterialsSystem$Wonderjs.convertToBasicMaterials(gltf$3),
                    /* lightMaterials */ConvertMaterialsSystem$Wonderjs.convertToLightMaterials(gltf$3),
                    /* scripts */ConvertScriptsSystem$Wonderjs.convertToScripts(gltf$3)
                  ]))
        ];
}

function _writeHeader(param, dataView) {
  var __x = DataViewCommon$Wonderjs.writeUint32_1(1179937896, 0, dataView);
  var __x$1 = DataViewCommon$Wonderjs.writeUint32_1(1, __x, dataView);
  var __x$2 = DataViewCommon$Wonderjs.writeUint32_1(param[0], __x$1, dataView);
  var __x$3 = DataViewCommon$Wonderjs.writeUint32_1(param[1], __x$2, dataView);
  var __x$4 = DataViewCommon$Wonderjs.writeUint32_1(param[2], __x$3, dataView);
  return DataViewCommon$Wonderjs.writeUint32_1(param[3], __x$4, dataView);
}

function _writeJson(byteOffset, param, dataView) {
  return BufferUtils$Wonderjs.copyUint8ArrayToArrayBuffer(byteOffset, /* tuple */[
              param[0],
              param[1],
              param[2]
            ], dataView);
}

function _getEmptyEncodedUint8Data(param) {
  var encoder = new TextEncoder();
  var emptyUint8DataArr = encoder.encode(" ");
  return TypeArrayService$Wonderjs.getUint8_1(0, emptyUint8DataArr);
}

function _convertGLBToWDB(gltf, binBuffer) {
  var match = _buildWDBJsonUint8Array(gltf);
  var jsonUint8Array = match[2];
  var streamChunkArr = match[1];
  var bufferViewDataArr = match[0];
  var jsonChunkByteLength = jsonUint8Array.byteLength;
  var jsonChunkAlignedByteLength = BufferUtils$Wonderjs.alignedLength(jsonChunkByteLength);
  var totalByteLength = ((BufferUtils$Wonderjs.getWDBHeaderTotalByteLength(/* () */0) + jsonChunkAlignedByteLength | 0) + BufferUtils$Wonderjs.alignedLength(ConvertStreamSystem$Wonderjs.getStreamChunkTotalByteLength(streamChunkArr)) | 0) + ConvertStreamSystem$Wonderjs.getBinBufferChunkTotalAlignedByteLength(bufferViewDataArr) | 0;
  var wdb = new ArrayBuffer(totalByteLength);
  var dataView = DataViewCommon$Wonderjs.create(wdb);
  var byteOffset = _writeHeader(/* tuple */[
        totalByteLength,
        jsonChunkByteLength,
        ConvertStreamSystem$Wonderjs.getStreamChunkTotalByteLength(streamChunkArr),
        ConvertStreamSystem$Wonderjs.getBinBufferChunkTotalAlignedByteLength(bufferViewDataArr)
      ], dataView);
  var emptyEncodedUint8Data = _getEmptyEncodedUint8Data(/* () */0);
  var match$1 = _writeJson(byteOffset, /* tuple */[
        emptyEncodedUint8Data,
        jsonChunkAlignedByteLength,
        jsonUint8Array
      ], dataView);
  var match$2 = ConvertStreamSystem$Wonderjs.buildStreamChunk(match$1[0], streamChunkArr, match$1[2]);
  ConvertStreamSystem$Wonderjs.buildBinBufferChunk(match$2[0], bufferViewDataArr, binBuffer, match$2[1]);
  return wdb;
}

function _checkGLB(dataView) {
  Contract$WonderLog.requireCheck((function (param) {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("Source file to be a GLB (glTF Binary) model", "not"), (function (param) {
                  var match = DataViewCommon$Wonderjs.getUint32_1(0, dataView);
                  return Contract$WonderLog.Operators[/* = */0](match[0], 1179937895);
                }));
          var match = DataViewCommon$Wonderjs.getUint32_1(4, dataView);
          var readVersion = match[0];
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("Only GLB version 2 is supported", "Detected version: " + (String(readVersion) + "")), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](readVersion, 2);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return dataView;
}

function _fixGLTF(gltf) {
  var nodeMaxIndex = gltf[/* nodes */10].length - 1 | 0;
  return /* record */[
          /* asset */gltf[/* asset */0],
          /* scenes */gltf[/* scenes */1].map((function (scene) {
                  return /* record */[
                          /* nodes */Js_option.map((function (nodes) {
                                  return nodes.filter((function (nodeIndex) {
                                                return nodeIndex <= nodeMaxIndex;
                                              }));
                                }), scene[/* nodes */0]),
                          /* extensions */scene[/* extensions */1],
                          /* extras */scene[/* extras */2]
                        ];
                })),
          /* scene */gltf[/* scene */2],
          /* images */gltf[/* images */3],
          /* textures */gltf[/* textures */4],
          /* samplers */gltf[/* samplers */5],
          /* buffers */gltf[/* buffers */6],
          /* bufferViews */gltf[/* bufferViews */7],
          /* accessors */gltf[/* accessors */8],
          /* cameras */gltf[/* cameras */9],
          /* nodes */gltf[/* nodes */10],
          /* meshes */gltf[/* meshes */11],
          /* materials */gltf[/* materials */12],
          /* extensionsUsed */gltf[/* extensionsUsed */13],
          /* extensions */gltf[/* extensions */14],
          /* extras */gltf[/* extras */15]
        ];
}

function convertGLBData(gltf, binBuffer) {
  return _convertGLBToWDB(_fixGLTF(ConvertGLTFJsonToRecordSystem$Wonderjs.convert(gltf)), binBuffer);
}

function convertGLB(glb) {
  var match = BufferUtils$Wonderjs.decodeGLB(glb, _checkGLB);
  return convertGLBData(JSON.parse(match[0]), match[1]);
}

export {
  _checkAndWarn ,
  _buildWDBJsonUint8Array ,
  _writeHeader ,
  _writeJson ,
  _getEmptyEncodedUint8Data ,
  _convertGLBToWDB ,
  _checkGLB ,
  _fixGLTF ,
  convertGLBData ,
  convertGLB ,
  
}
/* Log-WonderLog Not a pure module */
