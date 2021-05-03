

import * as Caml_option from "./../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as TextureSizeService$Wonderjs from "../../../../../primitive/texture/TextureSizeService.js";
import * as TextureTypeService$Wonderjs from "../../../../../primitive/texture/TextureTypeService.js";
import * as TextureWrapService$Wonderjs from "../../../../../primitive/texture/TextureWrapService.js";
import * as BufferTextureService$Wonderjs from "../../../../../record/main/texture/BufferTextureService.js";
import * as TextureFormatService$Wonderjs from "../../../../../primitive/texture/TextureFormatService.js";
import * as TextureSourceMapService$Wonderjs from "../../../../../primitive/texture/TextureSourceMapService.js";
import * as UpdateTextureRenderService$Wonderjs from "../../UpdateTextureRenderService.js";
import * as UpdateGLTextureRenderService$Wonderjs from "../../UpdateGLTextureRenderService.js";
import * as OperateTypeArrayAllBasicSourceTextureService$Wonderjs from "../../../../../record/all/texture/source/basic_source/OperateTypeArrayAllBasicSourceTextureService.js";

function _drawTexture(gl, param) {
  var glFormat = param[3];
  gl.texImage2D(param[0], param[1], glFormat, glFormat, param[4], param[2]);
  return /* () */0;
}

function _drawTwoDTexture(gl, param, source) {
  return _drawTexture(gl, /* tuple */[
              param[0],
              0,
              source,
              param[1],
              param[2]
            ]);
}

var _allocateSourceToTexture = _drawTwoDTexture;

function update(gl, param, param$1) {
  var basicSourceTextureRecord = param$1[0];
  var browserDetectRecord = param$1[1];
  var textureInTypeArray = param[1];
  var match = TextureSourceMapService$Wonderjs.getSource(param[0], basicSourceTextureRecord[/* sourceMap */8]);
  if (match !== undefined) {
    var source = Caml_option.valFromOption(match);
    var width = TextureSizeService$Wonderjs.getWidth(source);
    var height = TextureSizeService$Wonderjs.getHeight(source);
    var glWrapS = TextureWrapService$Wonderjs.getGlWrap(gl, OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getWrapS(textureInTypeArray, basicSourceTextureRecord[/* wrapSs */0]));
    var glWrapT = TextureWrapService$Wonderjs.getGlWrap(gl, OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getWrapT(textureInTypeArray, basicSourceTextureRecord[/* wrapTs */1]));
    var magFilter = OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getMagFilter(textureInTypeArray, basicSourceTextureRecord[/* magFilters */2]);
    var minFilter = OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getMinFilter(textureInTypeArray, basicSourceTextureRecord[/* minFilters */3]);
    var glFormat = TextureFormatService$Wonderjs.getGlFormat(gl, OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getFormat(textureInTypeArray, basicSourceTextureRecord[/* formats */4]));
    var glType = TextureTypeService$Wonderjs.getGlType(gl, OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getType(textureInTypeArray, basicSourceTextureRecord[/* types */5]));
    var flipY = OperateTypeArrayAllBasicSourceTextureService$Wonderjs.isFlipY(textureInTypeArray, basicSourceTextureRecord[/* flipYs */7]);
    var target = gl.TEXTURE_2D;
    UpdateGLTextureRenderService$Wonderjs.update(/* tuple */[
          gl,
          textureInTypeArray,
          source
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
          basicSourceTextureRecord[/* isNeedUpdates */6],
          browserDetectRecord
        ], /* tuple */[
          _allocateSourceToTexture,
          basicSourceTextureRecord[/* setFlipYFunc */10]
        ]);
    return /* tuple */[
            basicSourceTextureRecord,
            browserDetectRecord
          ];
  } else {
    return /* tuple */[
            basicSourceTextureRecord,
            browserDetectRecord
          ];
  }
}

function isNeedUpdate(textureInTypeArray, basicSourceTextureRecord) {
  return UpdateTextureRenderService$Wonderjs.isNeedUpdate(textureInTypeArray, BufferTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0), basicSourceTextureRecord[/* isNeedUpdates */6], OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getIsNeedUpdate);
}

export {
  _drawTexture ,
  _drawTwoDTexture ,
  _allocateSourceToTexture ,
  update ,
  isNeedUpdate ,
  
}
/* TextureFormatService-Wonderjs Not a pure module */
