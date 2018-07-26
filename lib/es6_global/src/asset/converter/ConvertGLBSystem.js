

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as GLTFUtils$Wonderjs from "../utils/GLTFUtils.js";
import * as BinaryUtils$Wonderjs from "../utils/BinaryUtils.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as TypeArrayService$Wonderjs from "../../service/primitive/buffer/TypeArrayService.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ConvertImagesSystem$Wonderjs from "./ConvertImagesSystem.js";
import * as ConvertLightsSystem$Wonderjs from "./ConvertLightsSystem.js";
import * as ConvertBuffersSystem$Wonderjs from "./ConvertBuffersSystem.js";
import * as ConvertCamerasSystem$Wonderjs from "./ConvertCamerasSystem.js";
import * as ConvertIndicesSystem$Wonderjs from "./indices/ConvertIndicesSystem.js";
import * as ConvertTexturesSystem$Wonderjs from "./ConvertTexturesSystem.js";
import * as ConvertGeometrysSystem$Wonderjs from "./ConvertGeometrysSystem.js";
import * as ConvertMaterialsSystem$Wonderjs from "./ConvertMaterialsSystem.js";
import * as ConvertTransformsSystem$Wonderjs from "./ConvertTransformsSystem.js";
import * as ConvertGameObjectsSystem$Wonderjs from "./ConvertGameObjectsSystem.js";
import * as ConvertDefaultMaterialSystem$Wonderjs from "./ConvertDefaultMaterialSystem.js";
import * as ConvertMultiPrimitivesSystem$Wonderjs from "./ConvertMultiPrimitivesSystem.js";
import * as ConvertGLTFJsonToRecordSystem$Wonderjs from "./ConvertGLTFJsonToRecordSystem.js";

function _convertToScene(ambientLightArr, param) {
  var scene = param[/* scene */2];
  var scenes = param[/* scenes */1];
  Contract$WonderLog.requireCheck((function () {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("only has one scene", "not"), (function () {
                  return Contract$WonderLog.Operators[/* = */0](scenes.length, 1);
                }));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("has one ambientLight at most", "not"), (function () {
                        return Contract$WonderLog.Operators[/* <= */11](ambientLightArr.length, 1);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var scene$1 = scene !== undefined ? scene : 0;
  var match = ConvertCommon$Wonderjs.getScene(scenes, scene$1);
  var extras = match[/* extras */2];
  var match$1 = ambientLightArr.length === 1;
  var tmp;
  if (extras !== undefined) {
    var imgui = extras[/* imgui */0];
    if (imgui !== undefined) {
      var match$2 = imgui;
      tmp = /* record */[
        /* imguiFunc */match$2[/* imguiFunc */0],
        /* customData */match$2[/* customData */1]
      ];
    } else {
      tmp = undefined;
    }
  } else {
    tmp = undefined;
  }
  return /* record */[
          /* gameObjects */OptionService$Wonderjs.unsafeGet(match[/* nodes */0]),
          /* ambientLight */match$1 ? /* record */[/* color */Caml_array.caml_array_get(ambientLightArr, 0)[/* color */0]] : undefined,
          /* imgui */tmp
        ];
}

function _getBinBufferByteLength(binBuffer) {
  return Contract$WonderLog.ensureCheck((function (byteLength) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("binBuffer aligned with multiple of 4", "not"), (function () {
                              return Contract$WonderLog.Operators[/* = */0](byteLength % 4, 0);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), binBuffer.byteLength);
}

function _copyUint8ArrayToArrayBuffer(byteOffset, param, dataView) {
  var uint8Array = param[2];
  var uint8ArrayAlignedByteLength = param[1];
  var emptyUint8Data = param[0];
  var resultByteOffset = byteOffset + uint8ArrayAlignedByteLength | 0;
  var byteOffset$1 = byteOffset;
  var uint8ArrayByteLength = uint8Array.length;
  for(var i = 0 ,i_finish = uint8ArrayAlignedByteLength - 1 | 0; i <= i_finish; ++i){
    var value = i >= uint8ArrayByteLength ? emptyUint8Data : TypeArrayService$Wonderjs.getUint8_1(i, uint8Array);
    byteOffset$1 = DataViewCommon$Wonderjs.writeUint8_1(value, byteOffset$1, dataView);
  }
  return /* tuple */[
          resultByteOffset,
          uint8Array,
          dataView
        ];
}

function _buildWDBJsonUint8Array(gltf) {
  var gltf$1 = ConvertDefaultMaterialSystem$Wonderjs.convert(ConvertMultiPrimitivesSystem$Wonderjs.convertMultiPrimitivesToNodes(gltf));
  var match = ConvertLightsSystem$Wonderjs.convertToLights(gltf$1);
  var encoder = new TextEncoder();
  return encoder.encode(JSON.stringify(/* record */[
                  /* asset : record */[
                    /* version */gltf$1[/* asset */0][/* version */0],
                    /* generator */GLTFUtils$Wonderjs.getGenerator(/* () */0)
                  ],
                  /* scene */_convertToScene(match[0], gltf$1),
                  /* indices */ConvertIndicesSystem$Wonderjs.convertToIndices(gltf$1),
                  /* gameObjects */ConvertGameObjectsSystem$Wonderjs.convert(gltf$1),
                  /* images */ConvertImagesSystem$Wonderjs.convertToImages(gltf$1),
                  /* basicSourceTextures */ConvertTexturesSystem$Wonderjs.convertToBasicSourceTextures(gltf$1),
                  /* samplers */ConvertTexturesSystem$Wonderjs.convertToSamplers(gltf$1),
                  /* buffers */ConvertBuffersSystem$Wonderjs.convertToBuffers(gltf$1),
                  /* bufferViews */ConvertBuffersSystem$Wonderjs.convertToBufferViews(gltf$1),
                  /* accessors */ConvertBuffersSystem$Wonderjs.convertToAccessors(gltf$1),
                  /* directionLights */match[1],
                  /* pointLights */match[2],
                  /* basicCameraViews */ConvertCamerasSystem$Wonderjs.convertToBasicCameraViews(gltf$1),
                  /* perspectiveCameraProjections */ConvertCamerasSystem$Wonderjs.convertToPerspectiveCameraProjections(gltf$1),
                  /* arcballCameraControllers */ConvertCamerasSystem$Wonderjs.convertToArcballCameraControllers(gltf$1),
                  /* transforms */ConvertTransformsSystem$Wonderjs.convertToTransforms(gltf$1),
                  /* customGeometrys */ConvertGeometrysSystem$Wonderjs.convertToGeometrys(gltf$1),
                  /* lightMaterials */ConvertMaterialsSystem$Wonderjs.convertToLightMaterials(gltf$1)
                ]));
}

function _writeHeader(totalByteLength, dataView) {
  var __x = DataViewCommon$Wonderjs.writeUint32_1(1179937896, 0, dataView);
  var __x$1 = DataViewCommon$Wonderjs.writeUint32_1(1, __x, dataView);
  return DataViewCommon$Wonderjs.writeUint32_1(totalByteLength, __x$1, dataView);
}

function _writeJson(byteOffset, param, dataView) {
  var jsonByteLength = param[1];
  var __x = DataViewCommon$Wonderjs.writeUint32_1(jsonByteLength, byteOffset, dataView);
  var byteOffset$1 = DataViewCommon$Wonderjs.writeUint32_1(1313821514, __x, dataView);
  return _copyUint8ArrayToArrayBuffer(byteOffset$1, /* tuple */[
              param[0],
              jsonByteLength,
              param[2]
            ], dataView);
}

function _writeBinaryBuffer(byteOffset, param, dataView) {
  var binBuffer = param[1];
  var binBufferByteLength = param[0];
  Contract$WonderLog.requireCheck((function () {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("binBufferByteLength === binBuffer.byteLength", "not"), (function () {
                  return Contract$WonderLog.Operators[/* = */0](binBufferByteLength, binBuffer.byteLength);
                }));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("binBuffer aligned with multiple of 4", "not"), (function () {
                        return Contract$WonderLog.Operators[/* = */0](binBufferByteLength % 4, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var __x = DataViewCommon$Wonderjs.writeUint32_1(binBufferByteLength, byteOffset, dataView);
  var byteOffset$1 = DataViewCommon$Wonderjs.writeUint32_1(5130562, __x, dataView);
  var binBufferUint8Arr = new Uint8Array(binBuffer);
  TypeArrayService$Wonderjs.setUint8Array(binBufferUint8Arr, new Uint8Array(dataView.buffer, byteOffset$1, binBufferByteLength / 1 | 0));
  return /* tuple */[
          byteOffset$1 + binBufferByteLength | 0,
          binBufferUint8Arr,
          dataView
        ];
}

function _getEmptyEncodedUint8Data() {
  var encoder = new TextEncoder();
  var emptyUint8DataArr = encoder.encode(" ");
  return TypeArrayService$Wonderjs.getUint8_1(0, emptyUint8DataArr);
}

function _convertGLBToWDB(gltf, binBuffer) {
  var jsonUint8Array = _buildWDBJsonUint8Array(gltf);
  var jsonByteLength = BinaryUtils$Wonderjs.alignedLength(jsonUint8Array.byteLength);
  var binBufferByteLength = _getBinBufferByteLength(binBuffer);
  var totalByteLength = ((20 + jsonByteLength | 0) + 8 | 0) + binBufferByteLength | 0;
  var wdb = new ArrayBuffer(totalByteLength);
  var dataView = DataViewCommon$Wonderjs.create(wdb);
  var byteOffset = _writeHeader(totalByteLength, dataView);
  var emptyEncodedUint8Data = _getEmptyEncodedUint8Data(/* () */0);
  var match = _writeJson(byteOffset, /* tuple */[
        emptyEncodedUint8Data,
        jsonByteLength,
        jsonUint8Array
      ], dataView);
  _writeBinaryBuffer(match[0], /* tuple */[
        binBufferByteLength,
        binBuffer
      ], match[2]);
  return wdb;
}

function _checkGLB(dataView) {
  Contract$WonderLog.requireCheck((function () {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("Source file to be a GLB (glTF Binary) model", "not"), (function () {
                  var match = DataViewCommon$Wonderjs.getUint32_1(0, dataView);
                  return Contract$WonderLog.Operators[/* = */0](match[0], 1179937895);
                }));
          var match = DataViewCommon$Wonderjs.getUint32_1(4, dataView);
          var readVersion = match[0];
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("Only GLB version 2 is supported", "Detected version: " + (String(readVersion) + "")), (function () {
                        return Contract$WonderLog.Operators[/* = */0](readVersion, 2);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return dataView;
}

function convertGLBData(param) {
  return _convertGLBToWDB(ConvertGLTFJsonToRecordSystem$Wonderjs.convert(param[0]), param[1]);
}

function convertGLB(glb) {
  var match = BinaryUtils$Wonderjs.decode(glb, _checkGLB);
  return convertGLBData(/* tuple */[
              JSON.parse(match[0]),
              match[1]
            ]);
}

export {
  _convertToScene ,
  _getBinBufferByteLength ,
  _copyUint8ArrayToArrayBuffer ,
  _buildWDBJsonUint8Array ,
  _writeHeader ,
  _writeJson ,
  _writeBinaryBuffer ,
  _getEmptyEncodedUint8Data ,
  _convertGLBToWDB ,
  _checkGLB ,
  convertGLBData ,
  convertGLB ,
  
}
/* Log-WonderLog Not a pure module */
