

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
import * as NameCubemapTextureMainService$Wonderjs from "../../../../service/state/main/texture/cubemap/NameCubemapTextureMainService.js";
import * as OperateBasicMaterialMainService$Wonderjs from "../../../../service/state/main/material/basic/OperateBasicMaterialMainService.js";
import * as OperateLightMaterialMainService$Wonderjs from "../../../../service/state/main/material/light/OperateLightMaterialMainService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as OperateCubemapTextureMainService$Wonderjs from "../../../../service/state/main/texture/cubemap/OperateCubemapTextureMainService.js";
import * as NameBasicSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/source/basic_source/NameBasicSourceTextureMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/source/basic_source/OperateBasicSourceTextureMainService.js";

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

function _addImageData(imageDataIndex, param, param$1) {
  var byteOffset = param$1[4];
  var bufferViewArr = param$1[2];
  var imageArr = param$1[1];
  var uint8Array = param[/* uint8Array */0];
  var byteLength = uint8Array.length;
  var alignedByteLength = BufferUtils$Wonderjs.alignedLength(byteLength);
  return /* tuple */[
          _setImageIndexMap(imageDataIndex, imageArr, param$1[0]),
          ArrayService$Wonderjs.push(/* record */[
                /* name */param[/* name */1],
                /* bufferView */bufferViewArr.length,
                /* mimeType */param[/* mimeType */2]
              ], imageArr),
          ArrayService$Wonderjs.push(/* record */[
                /* byteOffset */byteOffset,
                /* byteLength */byteLength
              ], bufferViewArr),
          ArrayService$Wonderjs.push(uint8Array, param$1[3]),
          byteOffset + alignedByteLength | 0
        ];
}

function _addCubemapFaceImageData(imageDataIndex, faceImageData, param) {
  var byteOffset = param[4];
  var uint8ArrayArr = param[3];
  var bufferViewArr = param[2];
  var imageArr = param[1];
  var imageIndexMap = param[0];
  if (faceImageData !== undefined) {
    var match = faceImageData;
    var uint8Array = match[/* uint8Array */0];
    var byteLength = uint8Array.length;
    var alignedByteLength = BufferUtils$Wonderjs.alignedLength(byteLength);
    return /* tuple */[
            _setImageIndexMap(imageDataIndex, imageArr, imageIndexMap),
            ArrayService$Wonderjs.push(/* record */[
                  /* name */match[/* name */1],
                  /* bufferView */bufferViewArr.length,
                  /* mimeType */match[/* mimeType */2]
                ], imageArr),
            ArrayService$Wonderjs.push(/* record */[
                  /* byteOffset */byteOffset,
                  /* byteLength */byteLength
                ], bufferViewArr),
            ArrayService$Wonderjs.push(uint8Array, uint8ArrayArr),
            byteOffset + alignedByteLength | 0
          ];
  } else {
    return /* tuple */[
            imageIndexMap,
            imageArr,
            bufferViewArr,
            uint8ArrayArr,
            byteOffset
          ];
  }
}

function _buildImageData(param) {
  var cubemapTextureImageDataMap = param[/* cubemapTextureImageDataMap */8];
  var basicSourceTextureImageDataMap = param[/* basicSourceTextureImageDataMap */7];
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, imageDataIndex) {
          return _addImageData(imageDataIndex, ImmutableSparseMapService$WonderCommonlib.unsafeGet(imageDataIndex, basicSourceTextureImageDataMap), /* tuple */[
                      param[0],
                      param[1],
                      param[2],
                      param[3],
                      param[4]
                    ]);
        }), /* tuple */[
        ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        /* array */[],
        /* array */[],
        /* array */[],
        0
      ], ArrayService$WonderCommonlib.removeDuplicateItems(param[/* basicSourceTextures */2].map((function (param) {
                  return param[/* imageDataIndex */1];
                }))));
  var match$1 = ArrayService$WonderCommonlib.reduceOneParam((function (param, imageDataIndex) {
          var match = param[0];
          var match$1 = ImmutableSparseMapService$WonderCommonlib.unsafeGet(imageDataIndex, cubemapTextureImageDataMap);
          var match$2 = _addCubemapFaceImageData(imageDataIndex, match$1[/* pxImageData */0], /* tuple */[
                match[0],
                param[1],
                param[2],
                param[3],
                param[4]
              ]);
          var match$3 = _addCubemapFaceImageData(imageDataIndex, match$1[/* nxImageData */1], /* tuple */[
                match[1],
                match$2[1],
                match$2[2],
                match$2[3],
                match$2[4]
              ]);
          var match$4 = _addCubemapFaceImageData(imageDataIndex, match$1[/* pyImageData */2], /* tuple */[
                match[2],
                match$3[1],
                match$3[2],
                match$3[3],
                match$3[4]
              ]);
          var match$5 = _addCubemapFaceImageData(imageDataIndex, match$1[/* nyImageData */3], /* tuple */[
                match[3],
                match$4[1],
                match$4[2],
                match$4[3],
                match$4[4]
              ]);
          var match$6 = _addCubemapFaceImageData(imageDataIndex, match$1[/* pzImageData */4], /* tuple */[
                match[4],
                match$5[1],
                match$5[2],
                match$5[3],
                match$5[4]
              ]);
          var match$7 = _addCubemapFaceImageData(imageDataIndex, match$1[/* nzImageData */5], /* tuple */[
                match[5],
                match$6[1],
                match$6[2],
                match$6[3],
                match$6[4]
              ]);
          return /* tuple */[
                  /* tuple */[
                    match$2[0],
                    match$3[0],
                    match$4[0],
                    match$5[0],
                    match$6[0],
                    match$7[0]
                  ],
                  match$7[1],
                  match$7[2],
                  match$7[3],
                  match$7[4]
                ];
        }), /* tuple */[
        /* tuple */[
          ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ],
        match[1],
        match[2],
        match[3],
        match[4]
      ], ArrayService$WonderCommonlib.removeDuplicateItems(param[/* cubemapTextures */3].map((function (param) {
                  return param[/* imageDataIndex */1];
                }))));
  var bufferViewArr = match$1[2];
  var match$2 = match$1[0];
  return /* tuple */[
          /* tuple */[
            match[0],
            /* tuple */[
              match$2[0],
              match$2[1],
              match$2[2],
              match$2[3],
              match$2[4],
              match$2[5]
            ]
          ],
          match$1[1],
          bufferViewArr,
          match$1[3],
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

function _buildBasicSourceTextureData(imageIndexMap, param, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var textureComponent = param$1[/* textureComponent */0];
                var basicSourceTextureArr = param[1];
                return /* tuple */[
                        _setTextureIndexMap(textureComponent, basicSourceTextureArr, param[0]),
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
                            ], basicSourceTextureArr)
                      ];
              }), /* tuple */[
              ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              /* array */[]
            ], param[/* basicSourceTextures */2]);
}

function _buildCubemapTextureFaceSource(faceSourceImageIndexMap, imageDataIndex) {
  return ImmutableSparseMapService$WonderCommonlib.get(imageDataIndex, faceSourceImageIndexMap);
}

function _buildCubemapTextureData(param, param$1, state) {
  var nzImageIndexMap = param[5];
  var pzImageIndexMap = param[4];
  var nyImageIndexMap = param[3];
  var pyImageIndexMap = param[2];
  var nxImageIndexMap = param[1];
  var pxImageIndexMap = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (cubemapTextureArr, param) {
                var imageDataIndex = param[/* imageDataIndex */1];
                var textureComponent = param[/* textureComponent */0];
                return ArrayService$Wonderjs.push(/* record */[
                            /* name */NameCubemapTextureMainService$Wonderjs.unsafeGetName(textureComponent, state),
                            /* magFilter */OperateCubemapTextureMainService$Wonderjs.getMagFilter(textureComponent, state),
                            /* minFilter */OperateCubemapTextureMainService$Wonderjs.getMinFilter(textureComponent, state),
                            /* wrapS */OperateCubemapTextureMainService$Wonderjs.getWrapS(textureComponent, state),
                            /* wrapT */OperateCubemapTextureMainService$Wonderjs.getWrapT(textureComponent, state),
                            /* flipY */OperateCubemapTextureMainService$Wonderjs.getFlipY(textureComponent, state),
                            /* pxSource */ImmutableSparseMapService$WonderCommonlib.get(imageDataIndex, pxImageIndexMap),
                            /* nxSource */ImmutableSparseMapService$WonderCommonlib.get(imageDataIndex, nxImageIndexMap),
                            /* pySource */ImmutableSparseMapService$WonderCommonlib.get(imageDataIndex, pyImageIndexMap),
                            /* nySource */ImmutableSparseMapService$WonderCommonlib.get(imageDataIndex, nyImageIndexMap),
                            /* pzSource */ImmutableSparseMapService$WonderCommonlib.get(imageDataIndex, pzImageIndexMap),
                            /* nzSource */ImmutableSparseMapService$WonderCommonlib.get(imageDataIndex, nzImageIndexMap),
                            /* pxFormat */OperateCubemapTextureMainService$Wonderjs.getPXFormat(textureComponent, state),
                            /* nxFormat */OperateCubemapTextureMainService$Wonderjs.getNXFormat(textureComponent, state),
                            /* pyFormat */OperateCubemapTextureMainService$Wonderjs.getPYFormat(textureComponent, state),
                            /* nyFormat */OperateCubemapTextureMainService$Wonderjs.getNYFormat(textureComponent, state),
                            /* pzFormat */OperateCubemapTextureMainService$Wonderjs.getPZFormat(textureComponent, state),
                            /* nzFormat */OperateCubemapTextureMainService$Wonderjs.getNZFormat(textureComponent, state),
                            /* pxType */OperateCubemapTextureMainService$Wonderjs.getPXType(textureComponent, state),
                            /* nxType */OperateCubemapTextureMainService$Wonderjs.getNXType(textureComponent, state),
                            /* pyType */OperateCubemapTextureMainService$Wonderjs.getPYType(textureComponent, state),
                            /* nyType */OperateCubemapTextureMainService$Wonderjs.getNYType(textureComponent, state),
                            /* pzType */OperateCubemapTextureMainService$Wonderjs.getPZType(textureComponent, state),
                            /* nzType */OperateCubemapTextureMainService$Wonderjs.getNZType(textureComponent, state)
                          ], cubemapTextureArr);
              }), /* array */[], param$1[/* cubemapTextures */3]);
}

function _getLightMaterialMapTextureIndexFromMap(textureComponent, basicSourceTextureIndexMap) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("lightMaterial->maps contain in resourceData->basicSourceTextures", "not"), (function (param) {
                        return Contract$WonderLog.assertTrue(ImmutableSparseMapService$WonderCommonlib.has(textureComponent, basicSourceTextureIndexMap));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ImmutableSparseMapService$WonderCommonlib.unsafeGet(textureComponent, basicSourceTextureIndexMap);
}

function _getLightMaterialMapTextureIndex(textureComponent, basicSourceTextureIndexMap) {
  if (textureComponent !== undefined) {
    return Caml_option.some(_getLightMaterialMapTextureIndexFromMap(textureComponent, basicSourceTextureIndexMap));
  }
  
}

function _buildMaterialData(basicSourceTextureIndexMap, param, state) {
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
                      /* diffuseMap */_getLightMaterialMapTextureIndex(OperateLightMaterialMainService$Wonderjs.getDiffuseMap(materialComponent, state), basicSourceTextureIndexMap),
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

function _buildGeometryAllPointData(geometryComponent, param, state) {
  var match = _buildGeometryBufferData(geometryComponent, /* tuple */[
        param[0],
        param[1],
        param[2]
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
  return /* tuple */[
          /* tuple */[
            match[0],
            match$1[0],
            match$2[0],
            match$3[0]
          ],
          match$3[1],
          match$3[2],
          match$3[3]
        ];
}

function _buildGeometryData(imageAlignedByteLength, imageBufferViewArr, param, state) {
  var imageBufferViewIndex = imageBufferViewArr.length;
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, geometryComponent) {
          var match = _buildGeometryAllPointData(geometryComponent, /* tuple */[
                param[2],
                param[3],
                param[1]
              ], state);
          var match$1 = match[0];
          var match$2 = IndicesGeometryMainService$Wonderjs.hasIndices16(geometryComponent, state);
          return /* tuple */[
                  ArrayService$Wonderjs.push(/* record */[
                        /* name */NameGeometryMainService$Wonderjs.unsafeGetName(geometryComponent, state),
                        /* indexDataType */match$2 ? /* Index16 */0 : /* Index32 */1,
                        /* vertexBufferView */imageBufferViewIndex + match$1[0] | 0,
                        /* normalBufferView */imageBufferViewIndex + match$1[1] | 0,
                        /* texCoordBufferView */imageBufferViewIndex + match$1[2] | 0,
                        /* indexBufferView */imageBufferViewIndex + match$1[3] | 0
                      ], param[0]),
                  match[3],
                  match[1],
                  match[2]
                ];
        }), /* tuple */[
        /* array */[],
        /* array */[],
        /* array */[],
        imageAlignedByteLength
      ], param[/* geometrys */4]);
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
  return param[/* scriptEventFunctionDataArr */5].map((function (param) {
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
  return param[/* scriptAttributeDataArr */6].map((function (param) {
                return /* record */[
                        /* name */param[/* name */0],
                        /* attributeStr */JSON.stringify(param[/* attribute */1])
                      ];
              }));
}

function buildJsonData(resourceData, state) {
  var match = _buildImageData(resourceData);
  var imageBufferViewArr = match[2];
  var match$1 = match[0];
  var match$2 = _buildBasicSourceTextureData(match$1[0], resourceData, state);
  var cubemapTextureArr = _buildCubemapTextureData(match$1[1], resourceData, state);
  var match$3 = _buildMaterialData(match$2[0], resourceData, state);
  var match$4 = _buildGeometryData(match[4], imageBufferViewArr, resourceData, state);
  var scriptEventFunctionArr = _buildScriptEventFunctionData(resourceData);
  var scriptAttributeArr = _buildScriptAttributeData(resourceData);
  return /* tuple */[
          /* tuple */[
            match[1],
            match$2[1],
            cubemapTextureArr,
            match$3[0],
            match$3[1],
            match$4[0],
            scriptEventFunctionArr,
            scriptAttributeArr
          ],
          /* tuple */[
            imageBufferViewArr,
            match$4[2]
          ],
          /* tuple */[
            match[3],
            match$4[1]
          ],
          match$4[3]
        ];
}

var buildJsonUint8Array = GenerateABUtils$Wonderjs.buildJsonUint8Array;

export {
  _getUint8Array ,
  _setImageIndexMap ,
  _addImageData ,
  _addCubemapFaceImageData ,
  _buildImageData ,
  _setTextureIndexMap ,
  _buildBasicSourceTextureData ,
  _buildCubemapTextureFaceSource ,
  _buildCubemapTextureData ,
  _getLightMaterialMapTextureIndexFromMap ,
  _getLightMaterialMapTextureIndex ,
  _buildMaterialData ,
  _buildGeometryBufferData ,
  _buildGeometryAllPointData ,
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
