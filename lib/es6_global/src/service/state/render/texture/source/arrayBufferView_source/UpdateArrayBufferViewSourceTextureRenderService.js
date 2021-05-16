

import * as Caml_option from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../main/state/IsDebugMainService.js";
import * as TextureTypeService$Wonderjs from "../../../../../primitive/texture/TextureTypeService.js";
import * as TextureWrapService$Wonderjs from "../../../../../primitive/texture/TextureWrapService.js";
import * as TextureFormatService$Wonderjs from "../../../../../primitive/texture/TextureFormatService.js";
import * as TextureSourceMapService$Wonderjs from "../../../../../primitive/texture/TextureSourceMapService.js";
import * as UpdateTextureRenderService$Wonderjs from "../../UpdateTextureRenderService.js";
import * as UpdateGLTextureRenderService$Wonderjs from "../../UpdateGLTextureRenderService.js";
import * as BufferArrayBufferViewSourceTextureService$Wonderjs from "../../../../../record/main/texture/source/arrayBufferView_source/BufferArrayBufferViewSourceTextureService.js";
import * as OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs from "../../../../../record/all/texture/source/arrayBufferView_source/OperateTypeArrayAllArrayBufferViewSourceTextureService.js";

function _drawTexture(gl, param, param$1) {
  var height = param$1[1];
  var width = param$1[0];
  var glFormat = param[3];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("width/height shouldn\'t be 0", "width is " + (String(width) + ("; height is " + (String(height) + "")))), (function (param) {
                        Contract$WonderLog.Operators[/* <>= */3](width, 0);
                        return Contract$WonderLog.Operators[/* <>= */3](height, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  gl.texImage2D(param[0], param[1], glFormat, width, height, 0, glFormat, param[4], param[2]);
  return /* () */0;
}

function _drawTwoDTexture(gl, param, sizeTuple, source) {
  return _drawTexture(gl, /* tuple */[
              param[0],
              0,
              source,
              param[1],
              param[2]
            ], sizeTuple);
}

function _allocateSourceToTexture(sizeTuple, gl, paramTuple, source) {
  return _drawTwoDTexture(gl, paramTuple, sizeTuple, source);
}

function update(gl, param, param$1) {
  var arrayBufferViewSourceTextureRecord = param$1[0];
  var browserDetectRecord = param$1[1];
  var textureInTypeArray = param[1];
  var match = TextureSourceMapService$Wonderjs.getSource(param[0], arrayBufferViewSourceTextureRecord[/* sourceMap */10]);
  if (match !== undefined) {
    var width = OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getWidth(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* widths */8]);
    var height = OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getHeight(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* heights */9]);
    var glWrapS = TextureWrapService$Wonderjs.getGlWrap(gl, OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getWrapS(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* wrapSs */0]));
    var glWrapT = TextureWrapService$Wonderjs.getGlWrap(gl, OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getWrapT(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* wrapTs */1]));
    var magFilter = OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getMagFilter(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* magFilters */2]);
    var minFilter = OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getMinFilter(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* minFilters */3]);
    var glFormat = TextureFormatService$Wonderjs.getGlFormat(gl, OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getFormat(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* formats */4]));
    var glType = TextureTypeService$Wonderjs.getGlType(gl, OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getType(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* types */5]));
    var flipY = OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.isFlipY(textureInTypeArray, arrayBufferViewSourceTextureRecord[/* flipYs */7]);
    var target = gl.TEXTURE_2D;
    var partial_arg = /* tuple */[
      width,
      height
    ];
    UpdateGLTextureRenderService$Wonderjs.update(/* tuple */[
          gl,
          textureInTypeArray,
          Caml_option.valFromOption(match)
        ], /* tuple */[
          width,
          height,
          glWrapS,
          glWrapT,
          magFilter,
          minFilter,
          glFormat,
          glType,
          flipY,
          target,
          target
        ], /* tuple */[
          arrayBufferViewSourceTextureRecord[/* isNeedUpdates */6],
          browserDetectRecord
        ], /* tuple */[
          (function (param, param$1, param$2) {
              return _allocateSourceToTexture(partial_arg, param, param$1, param$2);
            }),
          arrayBufferViewSourceTextureRecord[/* setFlipYFunc */12]
        ]);
    return /* tuple */[
            arrayBufferViewSourceTextureRecord,
            browserDetectRecord
          ];
  } else {
    return /* tuple */[
            arrayBufferViewSourceTextureRecord,
            browserDetectRecord
          ];
  }
}

function isNeedUpdate(textureInTypeArray, arrayBufferViewSourceTextureRecord) {
  return UpdateTextureRenderService$Wonderjs.isNeedUpdate(textureInTypeArray, BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0), arrayBufferViewSourceTextureRecord[/* isNeedUpdates */6], OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getIsNeedUpdate);
}

export {
  _drawTexture ,
  _drawTwoDTexture ,
  _allocateSourceToTexture ,
  update ,
  isNeedUpdate ,
  
}
/* Log-WonderLog Not a pure module */
