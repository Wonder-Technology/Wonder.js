

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ImageUtils$Wonderjs from "../utils/ImageUtils.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as BuildTextureDataUtils$Wonderjs from "./utils/BuildTextureDataUtils.js";
import * as SkyboxSceneMainService$Wonderjs from "../../service/state/main/scene/SkyboxSceneMainService.js";
import * as NameCubemapTextureMainService$Wonderjs from "../../service/state/main/texture/cubemap/NameCubemapTextureMainService.js";
import * as OperateCubemapTextureMainService$Wonderjs from "../../service/state/main/texture/cubemap/OperateCubemapTextureMainService.js";

function _addSamplerData(texture, state, samplerDataArr) {
  var wrapS = OperateCubemapTextureMainService$Wonderjs.getWrapS(texture, state);
  var wrapT = OperateCubemapTextureMainService$Wonderjs.getWrapT(texture, state);
  var magFilter = OperateCubemapTextureMainService$Wonderjs.getMagFilter(texture, state);
  var minFilter = OperateCubemapTextureMainService$Wonderjs.getMinFilter(texture, state);
  return /* tuple */[
          samplerDataArr.length,
          ArrayService$Wonderjs.push(/* record */[
                /* wrapS */BuildTextureDataUtils$Wonderjs.getWrapData(wrapS),
                /* wrapT */BuildTextureDataUtils$Wonderjs.getWrapData(wrapT),
                /* magFilter */BuildTextureDataUtils$Wonderjs.getFilterData(magFilter),
                /* minFilter */BuildTextureDataUtils$Wonderjs.getFilterData(minFilter)
              ], samplerDataArr)
        ];
}

function _getImageUint8ArrayData(texture, source, getResultUint8ArrayDataFunc) {
  var imageBase64 = BuildTextureDataUtils$Wonderjs.getImageBase64(source);
  var mimeType = BufferUtils$Wonderjs.getBase64MimeType(imageBase64);
  var imageUint8Array = BufferUtils$Wonderjs.convertBase64ToBinary(imageBase64);
  var imageResultUint8Array = Curry._1(getResultUint8ArrayDataFunc, imageUint8Array);
  var imageResultUint8ArrayByteLength = imageResultUint8Array.byteLength;
  var imageResultUint8ArrayAlignedByteLength = BufferUtils$Wonderjs.alignedLength(imageResultUint8ArrayByteLength);
  return /* tuple */[
          mimeType,
          imageUint8Array,
          /* tuple */[
            imageResultUint8Array,
            imageResultUint8ArrayByteLength,
            imageResultUint8ArrayAlignedByteLength
          ]
        ];
}

function _addOneFaceImageData(oneFaceSource, param, imageUint8DataArr, param$1, getResultUint8ArrayDataFunc) {
  var bufferViewDataArr = param$1[2];
  var byteOffset = param$1[1];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("byteOffset aligned with multiple of 4", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](byteOffset % 4, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var imageIndex = imageUint8DataArr.length;
  var match = _getImageUint8ArrayData(param[0], oneFaceSource, getResultUint8ArrayDataFunc);
  var match$1 = match[2];
  var imageResultUint8ArrayAlignedByteLength = match$1[2];
  return /* tuple */[
          imageIndex,
          ArrayService$Wonderjs.push(/* record */[
                /* name */Caml_option.nullable_to_opt(ImageUtils$Wonderjs.getImageName(oneFaceSource)),
                /* bufferView */bufferViewDataArr.length,
                /* mimeType */BuildTextureDataUtils$Wonderjs.convertBase64MimeTypeToWDBMimeType(match[0]),
                /* uint8Array */match$1[0],
                /* byteOffset */byteOffset
              ], imageUint8DataArr),
          /* tuple */[
            param$1[0] + imageResultUint8ArrayAlignedByteLength | 0,
            byteOffset + imageResultUint8ArrayAlignedByteLength | 0,
            ArrayService$Wonderjs.push(/* record */[
                  /* buffer */0,
                  /* byteOffset */byteOffset,
                  /* byteLength */match$1[1]
                ], bufferViewDataArr)
          ]
        ];
}

function _addImageData(param, imageUint8DataArr, param$1, getResultUint8ArrayDataFunc) {
  var state = param[1];
  var texture = param[0];
  var match = _addOneFaceImageData(OperateCubemapTextureMainService$Wonderjs.unsafeGetPXSource(texture, state), /* tuple */[
        texture,
        state
      ], imageUint8DataArr, /* tuple */[
        param$1[0],
        param$1[1],
        param$1[2]
      ], getResultUint8ArrayDataFunc);
  var match$1 = match[2];
  var match$2 = _addOneFaceImageData(OperateCubemapTextureMainService$Wonderjs.unsafeGetNXSource(texture, state), /* tuple */[
        texture,
        state
      ], match[1], /* tuple */[
        match$1[0],
        match$1[1],
        match$1[2]
      ], getResultUint8ArrayDataFunc);
  var match$3 = match$2[2];
  var match$4 = _addOneFaceImageData(OperateCubemapTextureMainService$Wonderjs.unsafeGetPYSource(texture, state), /* tuple */[
        texture,
        state
      ], match$2[1], /* tuple */[
        match$3[0],
        match$3[1],
        match$3[2]
      ], getResultUint8ArrayDataFunc);
  var match$5 = match$4[2];
  var match$6 = _addOneFaceImageData(OperateCubemapTextureMainService$Wonderjs.unsafeGetNYSource(texture, state), /* tuple */[
        texture,
        state
      ], match$4[1], /* tuple */[
        match$5[0],
        match$5[1],
        match$5[2]
      ], getResultUint8ArrayDataFunc);
  var match$7 = match$6[2];
  var match$8 = _addOneFaceImageData(OperateCubemapTextureMainService$Wonderjs.unsafeGetPZSource(texture, state), /* tuple */[
        texture,
        state
      ], match$6[1], /* tuple */[
        match$7[0],
        match$7[1],
        match$7[2]
      ], getResultUint8ArrayDataFunc);
  var match$9 = match$8[2];
  var match$10 = _addOneFaceImageData(OperateCubemapTextureMainService$Wonderjs.unsafeGetNZSource(texture, state), /* tuple */[
        texture,
        state
      ], match$8[1], /* tuple */[
        match$9[0],
        match$9[1],
        match$9[2]
      ], getResultUint8ArrayDataFunc);
  var match$11 = match$10[2];
  return /* tuple */[
          /* tuple */[
            match[0],
            match$2[0],
            match$4[0],
            match$6[0],
            match$8[0],
            match$10[0]
          ],
          match$10[1],
          /* tuple */[
            match$11[0],
            match$11[1],
            match$11[2]
          ]
        ];
}

function _addTextureData(texture, param, state, textureDataArr) {
  var match = param[1];
  return ArrayService$Wonderjs.push(/* record */[
              /* name */NameCubemapTextureMainService$Wonderjs.getName(texture, state),
              /* sampler */param[0],
              /* pxSource */match[0],
              /* nxSource */match[1],
              /* pySource */match[2],
              /* nySource */match[3],
              /* pzSource */match[4],
              /* nzSource */match[5],
              /* pxFormat */OperateCubemapTextureMainService$Wonderjs.getPXFormat(texture, state),
              /* nxFormat */OperateCubemapTextureMainService$Wonderjs.getNXFormat(texture, state),
              /* pyFormat */OperateCubemapTextureMainService$Wonderjs.getPYFormat(texture, state),
              /* nyFormat */OperateCubemapTextureMainService$Wonderjs.getNYFormat(texture, state),
              /* pzFormat */OperateCubemapTextureMainService$Wonderjs.getPZFormat(texture, state),
              /* nzFormat */OperateCubemapTextureMainService$Wonderjs.getNZFormat(texture, state),
              /* pxType */OperateCubemapTextureMainService$Wonderjs.getPXType(texture, state),
              /* nxType */OperateCubemapTextureMainService$Wonderjs.getNXType(texture, state),
              /* pyType */OperateCubemapTextureMainService$Wonderjs.getPYType(texture, state),
              /* nyType */OperateCubemapTextureMainService$Wonderjs.getNYType(texture, state),
              /* pzType */OperateCubemapTextureMainService$Wonderjs.getPZType(texture, state),
              /* nzType */OperateCubemapTextureMainService$Wonderjs.getNZType(texture, state),
              /* flipY */OperateCubemapTextureMainService$Wonderjs.getFlipY(texture, state)
            ], textureDataArr);
}

function build(isBuildCubemapFromSceneSkybox, cubemapTextureDataArr, samplerDataArr, imageUint8DataArr, param, getResultUint8ArrayDataFunc, state) {
  var bufferViewDataArr = param[2];
  var byteOffset = param[1];
  var totalByteLength = param[0];
  var match = !isBuildCubemapFromSceneSkybox;
  if (match) {
    return /* tuple */[
            undefined,
            /* tuple */[
              cubemapTextureDataArr,
              samplerDataArr,
              imageUint8DataArr
            ],
            /* tuple */[
              totalByteLength,
              byteOffset,
              bufferViewDataArr
            ]
          ];
  } else {
    var match$1 = SkyboxSceneMainService$Wonderjs.getCubemapTexture(state);
    if (match$1 !== undefined) {
      var cubemapTexture = match$1;
      var match$2 = _addSamplerData(cubemapTexture, state, samplerDataArr);
      var match$3 = _addImageData(/* tuple */[
            cubemapTexture,
            state
          ], imageUint8DataArr, /* tuple */[
            totalByteLength,
            byteOffset,
            bufferViewDataArr
          ], getResultUint8ArrayDataFunc);
      var match$4 = match$3[2];
      var match$5 = match$3[0];
      var skyboxCubemapTextureIndex = cubemapTextureDataArr.length;
      var cubemapTextureDataArr$1 = _addTextureData(cubemapTexture, /* tuple */[
            match$2[0],
            /* tuple */[
              match$5[0],
              match$5[1],
              match$5[2],
              match$5[3],
              match$5[4],
              match$5[5]
            ]
          ], state, cubemapTextureDataArr);
      return /* tuple */[
              skyboxCubemapTextureIndex,
              /* tuple */[
                cubemapTextureDataArr$1,
                match$2[1],
                match$3[1]
              ],
              /* tuple */[
                match$4[0],
                match$4[1],
                match$4[2]
              ]
            ];
    } else {
      return /* tuple */[
              undefined,
              /* tuple */[
                cubemapTextureDataArr,
                samplerDataArr,
                imageUint8DataArr
              ],
              /* tuple */[
                totalByteLength,
                byteOffset,
                bufferViewDataArr
              ]
            ];
    }
  }
}

export {
  _addSamplerData ,
  _getImageUint8ArrayData ,
  _addOneFaceImageData ,
  _addImageData ,
  _addTextureData ,
  build ,
  
}
/* Log-WonderLog Not a pure module */
