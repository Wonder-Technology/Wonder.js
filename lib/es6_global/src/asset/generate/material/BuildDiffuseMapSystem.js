

import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as BinaryUtils$Wonderjs from "../../utils/BinaryUtils.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../../service/state/main/data/StateDataMain.js";
import * as SparseMapService$Wonderjs from "../../../service/atom/SparseMapService.js";
import * as IsDebugMainService$Wonderjs from "../../../service/state/main/state/IsDebugMainService.js";
import * as TextureSizeService$Wonderjs from "../../../service/primitive/texture/TextureSizeService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as TypeSourceTextureMainService$Wonderjs from "../../../service/state/main/texture/TypeSourceTextureMainService.js";
import * as NameBasicSourceTextureMainService$Wonderjs from "../../../service/state/main/texture/basic_source/NameBasicSourceTextureMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../../service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";

function _buildSamplerDataMapKey(wrapS, wrapT, magFilter, minFilter) {
  return wrapS.toString() + (wrapT.toString() + (magFilter.toString() + minFilter.toString()));
}

function _getWrapData(wrap) {
  switch (wrap) {
    case 0 : 
        return 33071;
    case 1 : 
        return 33648;
    case 2 : 
        return 10497;
    
  }
}

function _getFilterData(filter) {
  switch (filter) {
    case 0 : 
        return 9728;
    case 1 : 
        return 9729;
    case 2 : 
        return 9984;
    case 3 : 
        return 9985;
    case 4 : 
        return 9986;
    case 5 : 
        return 9987;
    
  }
}

function _addSamplerData(texture, samplerIndexMap, state, samplerDataArr) {
  var wrapS = OperateBasicSourceTextureMainService$Wonderjs.getWrapS(texture, state);
  var wrapT = OperateBasicSourceTextureMainService$Wonderjs.getWrapT(texture, state);
  var magFilter = OperateBasicSourceTextureMainService$Wonderjs.getMagFilter(texture, state);
  var minFilter = OperateBasicSourceTextureMainService$Wonderjs.getMinFilter(texture, state);
  var key = _buildSamplerDataMapKey(wrapS, wrapT, magFilter, minFilter);
  var match = HashMapService$WonderCommonlib.get(key, samplerIndexMap);
  if (match !== undefined) {
    return /* tuple */[
            match,
            samplerIndexMap,
            samplerDataArr
          ];
  } else {
    var samplerIndex = samplerDataArr.length;
    return /* tuple */[
            samplerIndex,
            HashMapService$WonderCommonlib.set(key, samplerIndex, samplerIndexMap),
            ArrayService$Wonderjs.push(/* record */[
                  /* wrapS */_getWrapData(wrapS),
                  /* wrapT */_getWrapData(wrapT),
                  /* magFilter */_getFilterData(magFilter),
                  /* minFilter */_getFilterData(minFilter)
                ], samplerDataArr)
          ];
  }
}

var _convertImageToBase64 = function (width,height,image){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var dataURL = null;
    canvas.height = width;
    canvas.width = height;
    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL();
    };

function _convertBase64MimeTypeToWDBMimeType(mimeType) {
  switch (mimeType) {
    case "image/jpeg" : 
    case "image/png" : 
        return mimeType;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_convertBase64MimeTypeToWDBMimeType", "unknown mimeType: " + (String(mimeType) + ""), "", "", ""));
  }
}

function _getImageBase64(texture, source, imageBase64Map) {
  var match = SparseMapService$WonderCommonlib.get(texture, imageBase64Map);
  if (match !== undefined) {
    return Js_primitive.valFromOption(match);
  } else {
    return _convertImageToBase64(TextureSizeService$Wonderjs.getWidth(source), TextureSizeService$Wonderjs.getHeight(source), source);
  }
}

function _addImageData(param, imageBase64Map, imageUint8DataArr, param$1) {
  var bufferViewDataArr = param$1[2];
  var byteOffset = param$1[1];
  var totalByteLength = param$1[0];
  var imageMap = param[1];
  var texture = param[0];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("byteOffset aligned with multiple of 4", "not"), (function () {
                        return Contract$WonderLog.Operators[/* = */0](byteOffset % 4, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var source = OperateBasicSourceTextureMainService$Wonderjs.unsafeGetSource(texture, param[2]);
  var imageIndex = SparseMapService$Wonderjs.indexOf(source, imageMap);
  if (imageIndex === -1) {
    var imageIndex$1 = imageUint8DataArr.length;
    var imageBase64 = _getImageBase64(texture, source, imageBase64Map);
    var imageUint8Array = BinaryUtils$Wonderjs.convertBase64ToBinary(imageBase64);
    var imageUint8ArrayByteLength = imageUint8Array.byteLength;
    var imageUint8ArrayAlignedByteLength = BinaryUtils$Wonderjs.alignedLength(imageUint8ArrayByteLength);
    return /* tuple */[
            imageIndex$1,
            SparseMapService$WonderCommonlib.set(imageIndex$1, source, imageMap),
            ArrayService$Wonderjs.push(/* record */[
                  /* bufferView */bufferViewDataArr.length,
                  /* mimeType */_convertBase64MimeTypeToWDBMimeType(BinaryUtils$Wonderjs.getBase64MimeType(imageBase64)),
                  /* uint8Array */imageUint8Array,
                  /* byteOffset */byteOffset
                ], imageUint8DataArr),
            /* tuple */[
              totalByteLength + imageUint8ArrayAlignedByteLength | 0,
              byteOffset + imageUint8ArrayAlignedByteLength | 0,
              ArrayService$Wonderjs.push(/* record */[
                    /* buffer */0,
                    /* byteOffset */byteOffset,
                    /* byteLength */imageUint8ArrayByteLength
                  ], bufferViewDataArr)
            ]
          ];
  } else {
    return /* tuple */[
            imageIndex,
            imageMap,
            imageUint8DataArr,
            /* tuple */[
              totalByteLength,
              byteOffset,
              bufferViewDataArr
            ]
          ];
  }
}

function _addTextureData(texture, param, state, textureDataArr) {
  return ArrayService$Wonderjs.push(/* record */[
              /* name */NameBasicSourceTextureMainService$Wonderjs.getName(texture, state),
              /* sampler */param[0],
              /* source */param[1]
            ], textureDataArr);
}

function build(param, param$1, param$2, state) {
  var bufferViewDataArr = param$2[2];
  var byteOffset = param$2[1];
  var totalByteLength = param$2[0];
  var match = param$1[1];
  var imageMap = match[2];
  var samplerIndexMap = match[1];
  var textureIndexMap = match[0];
  var match$1 = param$1[0];
  var imageUint8DataArr = match$1[3];
  var samplerDataArr = match$1[2];
  var textureDataArr = match$1[1];
  var materialDataArr = match$1[0];
  var name = param[1];
  var diffuseMap = param[0];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("map be basicSourceTexture", "not"), (function () {
                        return Contract$WonderLog.assertTrue(TypeSourceTextureMainService$Wonderjs.isBasicSourceTexture(diffuseMap, state));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match$2 = SparseMapService$WonderCommonlib.get(diffuseMap, textureIndexMap);
  if (match$2 !== undefined) {
    return /* tuple */[
            /* tuple */[
              ArrayService$Wonderjs.push(/* record */[
                    /* baseColorFactor */undefined,
                    /* baseColorTexture */match$2,
                    /* name */name
                  ], materialDataArr),
              textureDataArr,
              samplerDataArr,
              imageUint8DataArr
            ],
            /* tuple */[
              textureIndexMap,
              samplerIndexMap,
              imageMap
            ],
            /* tuple */[
              totalByteLength,
              byteOffset,
              bufferViewDataArr
            ]
          ];
  } else {
    var textureIndex = textureDataArr.length;
    var textureIndexMap$1 = SparseMapService$WonderCommonlib.set(diffuseMap, textureIndex, textureIndexMap);
    var match$3 = _addSamplerData(diffuseMap, samplerIndexMap, state, samplerDataArr);
    var match$4 = _addImageData(/* tuple */[
          diffuseMap,
          imageMap,
          state
        ], match[3], imageUint8DataArr, /* tuple */[
          totalByteLength,
          byteOffset,
          bufferViewDataArr
        ]);
    var match$5 = match$4[3];
    return /* tuple */[
            /* tuple */[
              ArrayService$Wonderjs.push(/* record */[
                    /* baseColorFactor */undefined,
                    /* baseColorTexture */textureIndex,
                    /* name */name
                  ], materialDataArr),
              _addTextureData(diffuseMap, /* tuple */[
                    match$3[0],
                    match$4[0]
                  ], state, textureDataArr),
              match$3[2],
              match$4[2]
            ],
            /* tuple */[
              textureIndexMap$1,
              match$3[1],
              match$4[1]
            ],
            /* tuple */[
              match$5[0],
              match$5[1],
              match$5[2]
            ]
          ];
  }
}

export {
  _buildSamplerDataMapKey ,
  _getWrapData ,
  _getFilterData ,
  _addSamplerData ,
  _convertImageToBase64 ,
  _convertBase64MimeTypeToWDBMimeType ,
  _getImageBase64 ,
  _addImageData ,
  _addTextureData ,
  build ,
  
}
/* Log-WonderLog Not a pure module */
