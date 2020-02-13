

import * as IndexSourceTextureService$Wonderjs from "../../../record/all/texture/IndexSourceTextureService.js";
import * as UpdateBasicSourceTextureRenderService$Wonderjs from "./basic_source/UpdateBasicSourceTextureRenderService.js";
import * as UpdateArrayBufferViewSourceTextureRenderService$Wonderjs from "./arrayBufferView_source/UpdateArrayBufferViewSourceTextureRenderService.js";

function _handleUpdateBasicSourceTexture(basicSourceTexture, param) {
  var state = param[1];
  var browserDetectRecord = state[/* browserDetectRecord */21];
  var basicSourceTextureRecord = state[/* basicSourceTextureRecord */10];
  var match = UpdateBasicSourceTextureRenderService$Wonderjs.isNeedUpdate(basicSourceTexture, basicSourceTextureRecord);
  if (match) {
    UpdateBasicSourceTextureRenderService$Wonderjs.update(param[0], basicSourceTexture, /* tuple */[
          basicSourceTextureRecord,
          browserDetectRecord
        ]);
  } else {
    /* tuple */[
      basicSourceTextureRecord,
      browserDetectRecord
    ];
  }
  return state;
}

function _handleUpdateArrayBufferViewSourceTexture(arrayBufferViewTexture, param) {
  var state = param[1];
  var browserDetectRecord = state[/* browserDetectRecord */21];
  var arrayBufferViewSourceTextureRecord = state[/* arrayBufferViewSourceTextureRecord */11];
  var arrayBufferViewTextureInTypeArray = IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(arrayBufferViewTexture, arrayBufferViewSourceTextureRecord[/* textureIndexOffset */14]);
  var match = UpdateArrayBufferViewSourceTextureRenderService$Wonderjs.isNeedUpdate(arrayBufferViewTextureInTypeArray, arrayBufferViewSourceTextureRecord);
  if (match) {
    UpdateArrayBufferViewSourceTextureRenderService$Wonderjs.update(param[0], /* tuple */[
          arrayBufferViewTexture,
          arrayBufferViewTextureInTypeArray
        ], /* tuple */[
          arrayBufferViewSourceTextureRecord,
          browserDetectRecord
        ]);
  } else {
    /* tuple */[
      arrayBufferViewSourceTextureRecord,
      browserDetectRecord
    ];
  }
  return state;
}

function handleUpdate(gl, texture, state) {
  return IndexSourceTextureService$Wonderjs.handleByJudgeSourceTextureIndex(texture, state[/* arrayBufferViewSourceTextureRecord */11][/* textureIndexOffset */14], /* tuple */[
              gl,
              state
            ], /* tuple */[
              _handleUpdateBasicSourceTexture,
              _handleUpdateArrayBufferViewSourceTexture
            ]);
}

export {
  _handleUpdateBasicSourceTexture ,
  _handleUpdateArrayBufferViewSourceTexture ,
  handleUpdate ,
  
}
/* IndexSourceTextureService-Wonderjs Not a pure module */
