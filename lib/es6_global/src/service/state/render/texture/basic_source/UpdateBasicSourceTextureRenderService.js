

import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as TextureSizeService$Wonderjs from "../../../../primitive/texture/TextureSizeService.js";
import * as TextureTypeService$Wonderjs from "../../../../primitive/texture/TextureTypeService.js";
import * as TextureWrapService$Wonderjs from "../../../../primitive/texture/TextureWrapService.js";
import * as TextureFormatService$Wonderjs from "../../../../primitive/texture/TextureFormatService.js";
import * as TextureSourceMapService$Wonderjs from "../../../../primitive/texture/TextureSourceMapService.js";
import * as BufferBasicSourceTextureService$Wonderjs from "../../../../record/main/texture/BufferBasicSourceTextureService.js";
import * as UpdateSourceTextureRenderService$Wonderjs from "../UpdateSourceTextureRenderService.js";
import * as OperateTypeArrayBasicSourceTextureService$Wonderjs from "../../../../record/all/texture/basic_source/OperateTypeArrayBasicSourceTextureService.js";

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

function update(gl, textureInTypeArray, param) {
  var basicSourceTextureRecord = param[0];
  var browserDetectRecord = param[1];
  var match = TextureSourceMapService$Wonderjs.getSource(textureInTypeArray, basicSourceTextureRecord[/* sourceMap */8]);
  if (match !== undefined) {
    var source = Caml_option.valFromOption(match);
    var width = TextureSizeService$Wonderjs.getWidth(source);
    var height = TextureSizeService$Wonderjs.getHeight(source);
    var glWrapS = TextureWrapService$Wonderjs.getGlWrap(gl, OperateTypeArrayBasicSourceTextureService$Wonderjs.getWrapS(textureInTypeArray, basicSourceTextureRecord[/* wrapSs */0]));
    var glWrapT = TextureWrapService$Wonderjs.getGlWrap(gl, OperateTypeArrayBasicSourceTextureService$Wonderjs.getWrapT(textureInTypeArray, basicSourceTextureRecord[/* wrapTs */1]));
    var magFilter = OperateTypeArrayBasicSourceTextureService$Wonderjs.getMagFilter(textureInTypeArray, basicSourceTextureRecord[/* magFilters */2]);
    var minFilter = OperateTypeArrayBasicSourceTextureService$Wonderjs.getMinFilter(textureInTypeArray, basicSourceTextureRecord[/* minFilters */3]);
    var glFormat = TextureFormatService$Wonderjs.getGlFormat(gl, OperateTypeArrayBasicSourceTextureService$Wonderjs.getFormat(textureInTypeArray, basicSourceTextureRecord[/* formats */4]));
    var glType = TextureTypeService$Wonderjs.getGlType(gl, OperateTypeArrayBasicSourceTextureService$Wonderjs.getType(textureInTypeArray, basicSourceTextureRecord[/* types */5]));
    var flipY = OperateTypeArrayBasicSourceTextureService$Wonderjs.isFlipY(textureInTypeArray, basicSourceTextureRecord[/* flipYs */7]);
    var target = gl.TEXTURE_2D;
    UpdateSourceTextureRenderService$Wonderjs.update(/* tuple */[
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
          target
        ], /* tuple */[
          basicSourceTextureRecord[/* isNeedUpdates */6],
          browserDetectRecord
        ], /* tuple */[
          _allocateSourceToTexture,
          basicSourceTextureRecord[/* setFlipYFunc */11]
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
  return UpdateSourceTextureRenderService$Wonderjs.isNeedUpdate(textureInTypeArray, BufferBasicSourceTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0), basicSourceTextureRecord[/* isNeedUpdates */6], OperateTypeArrayBasicSourceTextureService$Wonderjs.getIsNeedUpdate);
}

export {
  _drawTexture ,
  _drawTwoDTexture ,
  _allocateSourceToTexture ,
  update ,
  isNeedUpdate ,
  
}
/* TextureFormatService-Wonderjs Not a pure module */
