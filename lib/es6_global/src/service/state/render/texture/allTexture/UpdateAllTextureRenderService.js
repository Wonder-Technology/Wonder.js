

import * as IndexAllSourceTextureService$Wonderjs from "../../../../record/all/texture/source/IndexAllSourceTextureService.js";
import * as IndexSourceTextureRenderService$Wonderjs from "../source/IndexSourceTextureRenderService.js";
import * as UpdateCubemapTextureRenderService$Wonderjs from "../cubemap/UpdateCubemapTextureRenderService.js";
import * as UpdateBasicSourceTextureRenderService$Wonderjs from "../source/basic_source/UpdateBasicSourceTextureRenderService.js";
import * as UpdateArrayBufferViewSourceTextureRenderService$Wonderjs from "../source/arrayBufferView_source/UpdateArrayBufferViewSourceTextureRenderService.js";

function _handleUpdateBasicSourceTexture(basicSourceTexture, param) {
  var state = param[1];
  var browserDetectRecord = state[/* browserDetectRecord */23];
  var basicSourceTextureRecord = state[/* basicSourceTextureRecord */10];
  var match = UpdateBasicSourceTextureRenderService$Wonderjs.isNeedUpdate(basicSourceTexture, basicSourceTextureRecord);
  if (match) {
    UpdateBasicSourceTextureRenderService$Wonderjs.update(param[0], /* tuple */[
          basicSourceTexture,
          basicSourceTexture
        ], /* tuple */[
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
  var browserDetectRecord = state[/* browserDetectRecord */23];
  var arrayBufferViewSourceTextureRecord = state[/* arrayBufferViewSourceTextureRecord */11];
  var arrayBufferViewTextureInTypeArray = IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(arrayBufferViewTexture, IndexSourceTextureRenderService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state));
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

function _handleUpdateCubemapTexture(cubemapTexture, param) {
  var state = param[1];
  var browserDetectRecord = state[/* browserDetectRecord */23];
  var cubemapTextureRecord = state[/* cubemapTextureRecord */12];
  var match = UpdateCubemapTextureRenderService$Wonderjs.isNeedUpdate(cubemapTexture, cubemapTextureRecord);
  if (match) {
    UpdateCubemapTextureRenderService$Wonderjs.update(param[0], cubemapTexture, /* tuple */[
          cubemapTextureRecord,
          browserDetectRecord
        ]);
  } else {
    /* tuple */[
      cubemapTextureRecord,
      browserDetectRecord
    ];
  }
  return state;
}

function handleUpdate(gl, param, state) {
  var texture = param[0];
  switch (param[1]) {
    case 0 : 
        return _handleUpdateBasicSourceTexture(texture, /* tuple */[
                    gl,
                    state
                  ]);
    case 1 : 
        return _handleUpdateArrayBufferViewSourceTexture(texture, /* tuple */[
                    gl,
                    state
                  ]);
    case 2 : 
        return _handleUpdateCubemapTexture(texture, /* tuple */[
                    gl,
                    state
                  ]);
    
  }
}

export {
  _handleUpdateBasicSourceTexture ,
  _handleUpdateArrayBufferViewSourceTexture ,
  _handleUpdateCubemapTexture ,
  handleUpdate ,
  
}
/* IndexAllSourceTextureService-Wonderjs Not a pure module */
