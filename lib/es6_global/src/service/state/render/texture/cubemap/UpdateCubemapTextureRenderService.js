

import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../main/state/IsDebugMainService.js";
import * as TextureSizeService$Wonderjs from "../../../../primitive/texture/TextureSizeService.js";
import * as TextureTypeService$Wonderjs from "../../../../primitive/texture/TextureTypeService.js";
import * as TextureWrapService$Wonderjs from "../../../../primitive/texture/TextureWrapService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as TextureFormatService$Wonderjs from "../../../../primitive/texture/TextureFormatService.js";
import * as TextureSourceMapService$Wonderjs from "../../../../primitive/texture/TextureSourceMapService.js";
import * as UpdateTextureRenderService$Wonderjs from "../UpdateTextureRenderService.js";
import * as BufferCubemapTextureService$Wonderjs from "../../../../record/main/texture/cubemap/BufferCubemapTextureService.js";
import * as UpdateGLTextureRenderService$Wonderjs from "../UpdateGLTextureRenderService.js";
import * as OperateTypeArrayAllCubemapTextureService$Wonderjs from "../../../../record/all/texture/cubemap/OperateTypeArrayAllCubemapTextureService.js";

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

function _allocateSourceToTexture(gl, param, sourceArr) {
  var glTypeArr = param[2];
  var glFormatArr = param[1];
  var targetArr = param[0];
  return ArrayService$WonderCommonlib.forEachi((function (source, index) {
                return _drawTwoDTexture(gl, /* tuple */[
                            targetArr[index],
                            glFormatArr[index],
                            glTypeArr[index]
                          ], source);
              }), sourceArr);
}

function _getAllSources(texture, param) {
  var match = TextureSourceMapService$Wonderjs.getSource(texture, param[0]);
  var match$1 = TextureSourceMapService$Wonderjs.getSource(texture, param[1]);
  var match$2 = TextureSourceMapService$Wonderjs.getSource(texture, param[2]);
  var match$3 = TextureSourceMapService$Wonderjs.getSource(texture, param[3]);
  var match$4 = TextureSourceMapService$Wonderjs.getSource(texture, param[4]);
  var match$5 = TextureSourceMapService$Wonderjs.getSource(texture, param[5]);
  if (match !== undefined && match$1 !== undefined && match$2 !== undefined && match$3 !== undefined && match$4 !== undefined && match$5 !== undefined) {
    return /* tuple */[
            Caml_option.valFromOption(match),
            Caml_option.valFromOption(match$1),
            Caml_option.valFromOption(match$2),
            Caml_option.valFromOption(match$3),
            Caml_option.valFromOption(match$4),
            Caml_option.valFromOption(match$5)
          ];
  }
  
}

function _getSourceSize(sourceArr) {
  Contract$WonderLog.requireCheck((function (param) {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("all sources\' size equal", "not"), (function (param) {
                  Contract$WonderLog.Operators[/* = */0](ArrayService$WonderCommonlib.removeDuplicateItems(sourceArr.map(TextureSizeService$Wonderjs.getWidth)).length, 1);
                  return Contract$WonderLog.Operators[/* = */0](ArrayService$WonderCommonlib.removeDuplicateItems(sourceArr.map(TextureSizeService$Wonderjs.getHeight)).length, 1);
                }));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("source\' width and height equal", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](ArrayService$Wonderjs.unsafeGetFirst(ArrayService$WonderCommonlib.removeDuplicateItems(sourceArr.map(TextureSizeService$Wonderjs.getWidth))), ArrayService$Wonderjs.unsafeGetFirst(ArrayService$WonderCommonlib.removeDuplicateItems(sourceArr.map(TextureSizeService$Wonderjs.getHeight))));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var pxSource = ArrayService$Wonderjs.unsafeGetFirst(sourceArr);
  return /* tuple */[
          TextureSizeService$Wonderjs.getWidth(pxSource),
          TextureSizeService$Wonderjs.getHeight(pxSource)
        ];
}

function _getFormat(gl, texture, formats) {
  return TextureFormatService$Wonderjs.getGlFormat(gl, OperateTypeArrayAllCubemapTextureService$Wonderjs.getFormat(texture, formats));
}

function _getType(gl, texture, types) {
  return TextureTypeService$Wonderjs.getGlType(gl, OperateTypeArrayAllCubemapTextureService$Wonderjs.getType(texture, types));
}

function update(gl, texture, param) {
  var browserDetectRecord = param[1];
  var cubemapTextureRecord = param[0];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("has all sources", "not"), (function (param) {
                        return Contract$WonderLog.assertTrue(Js_option.isSome(_getAllSources(texture, /* tuple */[
                                            cubemapTextureRecord[/* pxSourceMap */18],
                                            cubemapTextureRecord[/* nxSourceMap */19],
                                            cubemapTextureRecord[/* pySourceMap */20],
                                            cubemapTextureRecord[/* nySourceMap */21],
                                            cubemapTextureRecord[/* pzSourceMap */22],
                                            cubemapTextureRecord[/* nzSourceMap */23]
                                          ])));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = _getAllSources(texture, /* tuple */[
        cubemapTextureRecord[/* pxSourceMap */18],
        cubemapTextureRecord[/* nxSourceMap */19],
        cubemapTextureRecord[/* pySourceMap */20],
        cubemapTextureRecord[/* nySourceMap */21],
        cubemapTextureRecord[/* pzSourceMap */22],
        cubemapTextureRecord[/* nzSourceMap */23]
      ]);
  if (match !== undefined) {
    var match$1 = match;
    var nzSource = match$1[5];
    var pzSource = match$1[4];
    var nySource = match$1[3];
    var pySource = match$1[2];
    var nxSource = match$1[1];
    var pxSource = match$1[0];
    var match$2 = _getSourceSize(/* array */[
          pxSource,
          nxSource,
          pySource,
          nySource,
          pzSource,
          nzSource
        ]);
    var glWrapS = TextureWrapService$Wonderjs.getGlWrap(gl, OperateTypeArrayAllCubemapTextureService$Wonderjs.getWrapS(texture, cubemapTextureRecord[/* wrapSs */0]));
    var glWrapT = TextureWrapService$Wonderjs.getGlWrap(gl, OperateTypeArrayAllCubemapTextureService$Wonderjs.getWrapT(texture, cubemapTextureRecord[/* wrapTs */1]));
    var magFilter = OperateTypeArrayAllCubemapTextureService$Wonderjs.getMagFilter(texture, cubemapTextureRecord[/* magFilters */2]);
    var minFilter = OperateTypeArrayAllCubemapTextureService$Wonderjs.getMinFilter(texture, cubemapTextureRecord[/* minFilters */3]);
    var flipY = OperateTypeArrayAllCubemapTextureService$Wonderjs.isFlipY(texture, cubemapTextureRecord[/* flipYs */17]);
    UpdateGLTextureRenderService$Wonderjs.update(/* tuple */[
          gl,
          texture,
          /* array */[
            pxSource,
            nxSource,
            pySource,
            nySource,
            pzSource,
            nzSource
          ]
        ], /* tuple */[
          match$2[0],
          match$2[1],
          glWrapS,
          glWrapT,
          magFilter,
          minFilter,
          /* array */[
            _getFormat(gl, texture, cubemapTextureRecord[/* pxFormats */4]),
            _getFormat(gl, texture, cubemapTextureRecord[/* nxFormats */5]),
            _getFormat(gl, texture, cubemapTextureRecord[/* pyFormats */6]),
            _getFormat(gl, texture, cubemapTextureRecord[/* nyFormats */7]),
            _getFormat(gl, texture, cubemapTextureRecord[/* pzFormats */8]),
            _getFormat(gl, texture, cubemapTextureRecord[/* nzFormats */9])
          ],
          /* array */[
            _getType(gl, texture, cubemapTextureRecord[/* pxTypes */10]),
            _getType(gl, texture, cubemapTextureRecord[/* nxTypes */11]),
            _getType(gl, texture, cubemapTextureRecord[/* pyTypes */12]),
            _getType(gl, texture, cubemapTextureRecord[/* nyTypes */13]),
            _getType(gl, texture, cubemapTextureRecord[/* pzTypes */14]),
            _getType(gl, texture, cubemapTextureRecord[/* nzTypes */15])
          ],
          flipY,
          gl.TEXTURE_CUBE_MAP,
          /* array */[
            gl.TEXTURE_CUBE_MAP_POSITIVE_X,
            gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
            gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
          ]
        ], /* tuple */[
          cubemapTextureRecord[/* isNeedUpdates */16],
          browserDetectRecord
        ], /* tuple */[
          _allocateSourceToTexture,
          cubemapTextureRecord[/* setFlipYFunc */25]
        ]);
    return /* tuple */[
            cubemapTextureRecord,
            browserDetectRecord
          ];
  } else {
    return /* tuple */[
            cubemapTextureRecord,
            browserDetectRecord
          ];
  }
}

function isNeedUpdate(texture, cubemapTextureRecord) {
  return UpdateTextureRenderService$Wonderjs.isNeedUpdate(texture, BufferCubemapTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0), cubemapTextureRecord[/* isNeedUpdates */16], OperateTypeArrayAllCubemapTextureService$Wonderjs.getIsNeedUpdate);
}

export {
  _drawTexture ,
  _drawTwoDTexture ,
  _allocateSourceToTexture ,
  _getAllSources ,
  _getSourceSize ,
  _getFormat ,
  _getType ,
  update ,
  isNeedUpdate ,
  
}
/* Log-WonderLog Not a pure module */
