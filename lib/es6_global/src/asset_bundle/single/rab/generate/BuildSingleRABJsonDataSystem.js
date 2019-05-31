

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as RABUtils$Wonderjs from "../utils/RABUtils.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as BufferUtils$Wonderjs from "../../../../asset/utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../../../service/atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../../../service/state/main/data/StateDataMain.js";
import * as TypeArrayUtils$Wonderjs from "../../../utils/TypeArrayUtils.js";
import * as GenerateABUtils$Wonderjs from "../../../utils/GenerateABUtils.js";
import * as SerializeService$Wonderjs from "../../../../service/atom/SerializeService.js";
import * as ABBufferViewUtils$Wonderjs from "../../../all/utils/ABBufferViewUtils.js";
import * as IsDebugMainService$Wonderjs from "../../../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as NameGeometryMainService$Wonderjs from "../../../../service/state/main/geometry/NameGeometryMainService.js";
import * as IndicesGeometryMainService$Wonderjs from "../../../../service/state/main/geometry/IndicesGeometryMainService.js";
import * as NormalsGeometryMainService$Wonderjs from "../../../../service/state/main/geometry/NormalsGeometryMainService.js";
import * as VerticesGeometryMainService$Wonderjs from "../../../../service/state/main/geometry/VerticesGeometryMainService.js";
import * as NameBasicMaterialMainService$Wonderjs from "../../../../service/state/main/material/basic/NameBasicMaterialMainService.js";
import * as NameLightMaterialMainService$Wonderjs from "../../../../service/state/main/material/light/NameLightMaterialMainService.js";
import * as TexCoordsGeometryMainService$Wonderjs from "../../../../service/state/main/geometry/TexCoordsGeometryMainService.js";
import * as OperateBasicMaterialMainService$Wonderjs from "../../../../service/state/main/material/basic/OperateBasicMaterialMainService.js";
import * as OperateLightMaterialMainService$Wonderjs from "../../../../service/state/main/material/light/OperateLightMaterialMainService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as NameBasicSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/basic_source/NameBasicSourceTextureMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";

function _getUint8Array(uint8Array, base64, editorState) {
  return OptionService$Wonderjs.unsafeGet(uint8Array);
}

function _setImageIndexMap(imageDataIndex, imageArr, imageIndexMap) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("imageIndexMap not has imageDataIndex", "has"), (function (param) {
                        return Contract$WonderLog.assertFalse(ImmutableSparseMapService$WonderCommonlib.has(imageDataIndex, imageIndexMap));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ImmutableSparseMapService$WonderCommonlib.set(imageDataIndex, imageArr.length, imageIndexMap);
}

function _buildImageData(param) {
  var imageDataMap = param[/* imageDataMap */6];
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, imageDataIndex) {
          var byteOffset = param[4];
          var bufferViewArr = param[2];
          var imageArr = param[1];
          var match = ImmutableSparseMapService$WonderCommonlib.unsafeGet(imageDataIndex, imageDataMap);
          var uint8Array = match[/* uint8Array */0];
          var byteLength = uint8Array.length;
          var alignedByteLength = BufferUtils$Wonderjs.alignedLength(byteLength);
          return /* tuple */[
                  _setImageIndexMap(imageDataIndex, imageArr, param[0]),
                  ArrayService$Wonderjs.push(/* record */[
                        /* name */match[/* name */1],
                        /* bufferView */bufferViewArr.length,
                        /* mimeType */match[/* mimeType */2]
                      ], imageArr),
                  ArrayService$Wonderjs.push(/* record */[
                        /* byteOffset */byteOffset,
                        /* byteLength */byteLength
                      ], bufferViewArr),
                  ArrayService$Wonderjs.push(uint8Array, param[3]),
                  byteOffset + alignedByteLength | 0
                ];
        }), /* tuple */[
        ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        /* array */[],
        /* array */[],
        /* array */[],
        0
      ], ArrayService$WonderCommonlib.removeDuplicateItems(param[/* textures */2].map((function (param) {
                  return param[/* imageDataIndex */1];
                }))));
  var bufferViewArr = match[2];
  return /* tuple */[
          match[0],
          match[1],
          bufferViewArr,
          match[3],
          RABUtils$Wonderjs.computeBufferViewDataByteLength(bufferViewArr)
        ];
}

function _setTextureIndexMap(textureComponent, textureArr, textureIndexMap) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("textureIndexMap not has textureComponent", "has"), (function (param) {
                        return Contract$WonderLog.assertFalse(ImmutableSparseMapService$WonderCommonlib.has(textureComponent, textureIndexMap));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ImmutableSparseMapService$WonderCommonlib.set(textureComponent, textureArr.length, textureIndexMap);
}

function _buildTextureData(imageIndexMap, param, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var textureComponent = param$1[/* textureComponent */0];
                var textureArr = param[1];
                return /* tuple */[
                        _setTextureIndexMap(textureComponent, textureArr, param[0]),
                        ArrayService$Wonderjs.push(/* record */[
                              /* name */NameBasicSourceTextureMainService$Wonderjs.unsafeGetName(textureComponent, state),
                              /* source */ImmutableSparseMapService$WonderCommonlib.unsafeGet(param$1[/* imageDataIndex */1], imageIndexMap),
                              /* magFilter */OperateBasicSourceTextureMainService$Wonderjs.getMagFilter(textureComponent, state),
                              /* minFilter */OperateBasicSourceTextureMainService$Wonderjs.getMinFilter(textureComponent, state),
                              /* wrapS */OperateBasicSourceTextureMainService$Wonderjs.getWrapS(textureComponent, state),
                              /* wrapT */OperateBasicSourceTextureMainService$Wonderjs.getWrapT(textureComponent, state),
                              /* format */OperateBasicSourceTextureMainService$Wonderjs.getFormat(textureComponent, state),
                              /* type_ */OperateBasicSourceTextureMainService$Wonderjs.getType(textureComponent, state),
                              /* flipY */OperateBasicSourceTextureMainService$Wonderjs.getFlipY(textureComponent, state)
                            ], textureArr)
                      ];
              }), /* tuple */[
              ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              /* array */[]
            ], param[/* textures */2]);
}

function _getLightMaterialMapTextureIndexFromMap(textureComponent, textureIndexMap) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("lightMaterial->maps contain in resourceData->textures", "not"), (function (param) {
                        return Contract$WonderLog.assertTrue(ImmutableSparseMapService$WonderCommonlib.has(textureComponent, textureIndexMap));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ImmutableSparseMapService$WonderCommonlib.unsafeGet(textureComponent, textureIndexMap);
}

function _getLightMaterialMapTextureIndex(textureComponent, textureIndexMap) {
  if (textureComponent !== undefined) {
    return Caml_option.some(_getLightMaterialMapTextureIndexFromMap(textureComponent, textureIndexMap));
  }
  
}

function _buildMaterialData(textureIndexMap, param, state) {
  var basicMaterialArr = ArrayService$WonderCommonlib.reduceOneParam((function (basicMaterialArr, materialComponent) {
          var name = NameBasicMaterialMainService$Wonderjs.unsafeGetName(materialComponent, state);
          return ArrayService$Wonderjs.push(/* record */[
                      /* name */name,
                      /* color */OperateBasicMaterialMainService$Wonderjs.getColor(materialComponent, state)
                    ], basicMaterialArr);
        }), /* array */[], param[/* basicMaterials */0]);
  var lightMaterialArr = ArrayService$WonderCommonlib.reduceOneParam((function (lightMaterialArr, materialComponent) {
          var name = NameLightMaterialMainService$Wonderjs.unsafeGetName(materialComponent, state);
          return ArrayService$Wonderjs.push(/* record */[
                      /* name */name,
                      /* diffuseColor */OperateLightMaterialMainService$Wonderjs.getDiffuseColor(materialComponent, state),
                      /* diffuseMap */_getLightMaterialMapTextureIndex(OperateLightMaterialMainService$Wonderjs.getDiffuseMap(materialComponent, state), textureIndexMap),
                      /* shininess */OperateLightMaterialMainService$Wonderjs.getShininess(materialComponent, state)
                    ], lightMaterialArr);
        }), /* array */[], param[/* lightMaterials */1]);
  return /* tuple */[
          basicMaterialArr,
          lightMaterialArr
        ];
}

function _buildGeometryBufferData(geometryComponent, param, param$1, state) {
  var uint8ArrayArr = param[2];
  var byteOffset = param[1];
  var bufferViewArr = param[0];
  var match = Curry._2(param$1[0], geometryComponent, state);
  if (match) {
    var uint8Array = Curry._2(param$1[1], geometryComponent, state);
    var byteLength = uint8Array.byteLength;
    var alignedByteLength = BufferUtils$Wonderjs.alignedLength(byteLength);
    return /* tuple */[
            bufferViewArr.length,
            ArrayService$Wonderjs.push(/* record */[
                  /* byteOffset */byteOffset,
                  /* byteLength */byteLength
                ], bufferViewArr),
            byteOffset + alignedByteLength | 0,
            ArrayService$Wonderjs.push(uint8Array, uint8ArrayArr)
          ];
  } else {
    return /* tuple */[
            ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0),
            bufferViewArr,
            byteOffset,
            uint8ArrayArr
          ];
  }
}

function _buildGeometryData(imageAlignedByteLength, imageBufferViewArr, param, state) {
  var imageBufferViewIndex = imageBufferViewArr.length;
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, geometryComponent) {
          var match = _buildGeometryBufferData(geometryComponent, /* tuple */[
                param[2],
                param[3],
                param[1]
              ], /* tuple */[
                VerticesGeometryMainService$Wonderjs.hasVertices,
                (function (geometryComponent, state) {
                    return TypeArrayUtils$Wonderjs.convertFloat32ToUint8(VerticesGeometryMainService$Wonderjs.getVertices(geometryComponent, state));
                  })
              ], state);
          var match$1 = _buildGeometryBufferData(geometryComponent, /* tuple */[
                match[1],
                match[2],
                match[3]
              ], /* tuple */[
                NormalsGeometryMainService$Wonderjs.hasNormals,
                (function (geometryComponent, state) {
                    return TypeArrayUtils$Wonderjs.convertFloat32ToUint8(NormalsGeometryMainService$Wonderjs.getNormals(geometryComponent, state));
                  })
              ], state);
          var match$2 = _buildGeometryBufferData(geometryComponent, /* tuple */[
                match$1[1],
                match$1[2],
                match$1[3]
              ], /* tuple */[
                TexCoordsGeometryMainService$Wonderjs.hasTexCoords,
                (function (geometryComponent, state) {
                    return TypeArrayUtils$Wonderjs.convertFloat32ToUint8(TexCoordsGeometryMainService$Wonderjs.getTexCoords(geometryComponent, state));
                  })
              ], state);
          var match$3 = _buildGeometryBufferData(geometryComponent, /* tuple */[
                match$2[1],
                match$2[2],
                match$2[3]
              ], /* tuple */[
                IndicesGeometryMainService$Wonderjs.hasIndices,
                (function (geometryComponent, state) {
                    var match = IndicesGeometryMainService$Wonderjs.hasIndices16(geometryComponent, state);
                    if (match) {
                      return TypeArrayUtils$Wonderjs.convertUint16ToUint8(IndicesGeometryMainService$Wonderjs.getIndices16(geometryComponent, state));
                    } else {
                      return TypeArrayUtils$Wonderjs.convertUint32ToUint8(IndicesGeometryMainService$Wonderjs.getIndices32(geometryComponent, state));
                    }
                  })
              ], state);
          var match$4 = IndicesGeometryMainService$Wonderjs.hasIndices16(geometryComponent, state);
          return /* tuple */[
                  ArrayService$Wonderjs.push(/* record */[
                        /* name */NameGeometryMainService$Wonderjs.unsafeGetName(geometryComponent, state),
                        /* indexDataType */match$4 ? /* Index16 */0 : /* Index32 */1,
                        /* vertexBufferView */imageBufferViewIndex + match[0] | 0,
                        /* normalBufferView */imageBufferViewIndex + match$1[0] | 0,
                        /* texCoordBufferView */imageBufferViewIndex + match$2[0] | 0,
                        /* indexBufferView */imageBufferViewIndex + match$3[0] | 0
                      ], param[0]),
                  match$3[3],
                  match$3[1],
                  match$3[2]
                ];
        }), /* tuple */[
        /* array */[],
        /* array */[],
        /* array */[],
        imageAlignedByteLength
      ], param[/* geometrys */3]);
  var bufferViewArr = match[2];
  var match$1 = bufferViewArr.length === 0;
  return /* tuple */[
          match[0],
          match[1],
          bufferViewArr,
          match$1 ? imageAlignedByteLength : RABUtils$Wonderjs.computeBufferViewDataByteLength(bufferViewArr)
        ];
}

var _convertEventFunctionToStr = SerializeService$Wonderjs.serializeFunction;

function convertEventFunctionDataToStr(param) {
  return JSON.stringify(/* record */[
              /* init */Js_option.andThen(SerializeService$Wonderjs.serializeFunction, param[/* init */0]),
              /* update */Js_option.andThen(SerializeService$Wonderjs.serializeFunction, param[/* update */1]),
              /* dispose */Js_option.andThen(SerializeService$Wonderjs.serializeFunction, param[/* dispose */2])
            ]);
}

function _buildScriptEventFunctionData(param) {
  return param[/* scriptEventFunctionDataArr */4].map((function (param) {
                return /* record */[
                        /* name */param[/* name */0],
                        /* eventFunctionDataStr */convertEventFunctionDataToStr(param[/* eventFunctionData */1])
                      ];
              }));
}

function convertAttributeToStr(attribute) {
  return JSON.stringify(attribute);
}

function _buildScriptAttributeData(param) {
  return param[/* scriptAttributeDataArr */5].map((function (param) {
                return /* record */[
                        /* name */param[/* name */0],
                        /* attributeStr */JSON.stringify(param[/* attribute */1])
                      ];
              }));
}

function buildJsonData(resourceData, state) {
  var match = _buildImageData(resourceData);
  var imageBufferViewArr = match[2];
  var match$1 = _buildTextureData(match[0], resourceData, state);
  var match$2 = _buildMaterialData(match$1[0], resourceData, state);
  var match$3 = _buildGeometryData(match[4], imageBufferViewArr, resourceData, state);
  var scriptEventFunctionArr = _buildScriptEventFunctionData(resourceData);
  var scriptAttributeArr = _buildScriptAttributeData(resourceData);
  return /* tuple */[
          /* tuple */[
            match[1],
            match$1[1],
            match$2[0],
            match$2[1],
            match$3[0],
            scriptEventFunctionArr,
            scriptAttributeArr
          ],
          /* tuple */[
            imageBufferViewArr,
            match$3[2]
          ],
          /* tuple */[
            match[3],
            match$3[1]
          ],
          match$3[3]
        ];
}

var buildJsonUint8Array = GenerateABUtils$Wonderjs.buildJsonUint8Array;

export {
  _getUint8Array ,
  _setImageIndexMap ,
  _buildImageData ,
  _setTextureIndexMap ,
  _buildTextureData ,
  _getLightMaterialMapTextureIndexFromMap ,
  _getLightMaterialMapTextureIndex ,
  _buildMaterialData ,
  _buildGeometryBufferData ,
  _buildGeometryData ,
  _convertEventFunctionToStr ,
  convertEventFunctionDataToStr ,
  _buildScriptEventFunctionData ,
  convertAttributeToStr ,
  _buildScriptAttributeData ,
  buildJsonData ,
  buildJsonUint8Array ,
  
}
/* Log-WonderLog Not a pure module */
