

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as TextureFormatService$Wonderjs from "../../service/primitive/texture/TextureFormatService.js";
import * as BufferBasicSourceTextureService$Wonderjs from "../../service/record/main/texture/source/basic_source/BufferBasicSourceTextureService.js";

var _buildBasicSourceTextureDefaultName = ConvertCommon$Wonderjs.buildDefaultBasicSourceTextureName;

var _buildCubemapTextureDefaultName = ConvertCommon$Wonderjs.buildDefaultCubemapTextureName;

function convertToBasicSourceTextures(gltf) {
  var textures = gltf[/* textures */4];
  if (textures !== undefined) {
    var images = gltf[/* images */3];
    return ArrayService$WonderCommonlib.reduceOneParami((function (arr, texture, index) {
                  var source = texture[/* source */1];
                  if (source !== undefined) {
                    var source$1 = source;
                    var extras = texture[/* extras */3];
                    var name = texture[/* name */2];
                    var match = ArrayService$Wonderjs.getNth(source$1, OptionService$Wonderjs.unsafeGet(images));
                    if (match !== undefined) {
                      var tmp;
                      if (extras !== undefined) {
                        tmp = extras[/* format */0];
                      } else {
                        var image = OptionService$Wonderjs.unsafeGet(images)[source$1];
                        tmp = TextureFormatService$Wonderjs.getFormatByMimeType(OptionService$Wonderjs.unsafeGet(image[/* mimeType */3]));
                      }
                      arr[index] = /* record */[
                        /* name */name !== undefined ? name : ConvertCommon$Wonderjs.buildDefaultBasicSourceTextureName(index),
                        /* format */tmp,
                        /* type_ */extras !== undefined ? extras[/* type_ */1] : BufferBasicSourceTextureService$Wonderjs.getDefaultType(/* () */0),
                        /* flipY */extras !== undefined ? extras[/* flipY */2] : false
                      ];
                      return arr;
                    } else {
                      return arr;
                    }
                  } else {
                    return arr;
                  }
                }), /* array */[], textures);
  } else {
    return /* array */[];
  }
}

function convertToCubemapTextures(gltf) {
  var extras = gltf[/* extras */15];
  if (extras !== undefined) {
    var cubemapTextures = extras[/* cubemapTextures */6];
    if (cubemapTextures !== undefined) {
      return ArrayService$WonderCommonlib.reduceOneParami((function (arr, texture, index) {
                    var name = texture[/* name */0];
                    return ArrayService$Wonderjs.push(/* record */[
                                /* name */name !== undefined ? name : ConvertCommon$Wonderjs.buildDefaultCubemapTextureName(index),
                                /* flipY */texture[/* flipY */2],
                                /* pxFormat */texture[/* pxFormat */9],
                                /* nxFormat */texture[/* nxFormat */10],
                                /* pyFormat */texture[/* pyFormat */11],
                                /* nyFormat */texture[/* nyFormat */12],
                                /* pzFormat */texture[/* pzFormat */13],
                                /* nzFormat */texture[/* nzFormat */14],
                                /* pxType */texture[/* pxType */15],
                                /* nxType */texture[/* nxType */16],
                                /* pyType */texture[/* pyType */17],
                                /* nyType */texture[/* nyType */18],
                                /* pzType */texture[/* pzType */19],
                                /* nzType */texture[/* nzType */20]
                              ], arr);
                  }), /* array */[], cubemapTextures);
    } else {
      return /* array */[];
    }
  } else {
    return /* array */[];
  }
}

function _convertMagFilter(magFilter) {
  if (magFilter !== undefined) {
    var magFilter$1 = magFilter;
    if (magFilter$1 !== 9728) {
      if (magFilter$1 !== 9729) {
        return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_convertMagFilter", "unknown magFilter: " + (String(magFilter$1) + ""), "", "", ""));
      } else {
        return /* Linear */1;
      }
    } else {
      return /* Nearest */0;
    }
  } else {
    return /* Linear */1;
  }
}

function _convertMinFilter(minFilter) {
  if (minFilter !== undefined) {
    var minFilter$1 = minFilter;
    var switcher = minFilter$1 - 9728 | 0;
    if (switcher === 0 || switcher === 1) {
      if (switcher !== 0) {
        return /* Linear */1;
      } else {
        return /* Nearest */0;
      }
    } else {
      var switcher$1 = switcher - 256 | 0;
      if (switcher$1 > 3 || switcher$1 < 0) {
        return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_convertMinFilter", "unknown minFilter: " + (String(minFilter$1) + ""), "", "", ""));
      } else {
        return switcher$1 + 2 | 0;
      }
    }
  } else {
    return /* Nearest */0;
  }
}

function _convertWrap(wrap) {
  if (wrap !== undefined) {
    var wrap$1 = wrap;
    if (wrap$1 !== 10497) {
      if (wrap$1 !== 33071) {
        if (wrap$1 !== 33648) {
          return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_convertWrap", "unknown wrap: " + (String(wrap$1) + ""), "", "", ""));
        } else {
          return /* Mirrored_repeat */1;
        }
      } else {
        return /* Clamp_to_edge */0;
      }
    } else {
      return /* Repeat */2;
    }
  } else {
    return /* Clamp_to_edge */0;
  }
}

function convertToSamplers(param) {
  var samplers = param[/* samplers */5];
  if (samplers !== undefined) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (arr, param) {
                  return ArrayService$Wonderjs.push(/* record */[
                              /* magFilter */_convertMagFilter(param[/* magFilter */0]),
                              /* minFilter */_convertMinFilter(param[/* minFilter */1]),
                              /* wrapS */_convertWrap(param[/* wrapS */2]),
                              /* wrapT */_convertWrap(param[/* wrapT */3])
                            ], arr);
                }), /* array */[], samplers);
  } else {
    return /* array */[];
  }
}

export {
  _buildBasicSourceTextureDefaultName ,
  _buildCubemapTextureDefaultName ,
  convertToBasicSourceTextures ,
  convertToCubemapTextures ,
  _convertMagFilter ,
  _convertMinFilter ,
  _convertWrap ,
  convertToSamplers ,
  
}
/* Log-WonderLog Not a pure module */
