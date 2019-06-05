

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as TextureFormatService$Wonderjs from "../../service/primitive/texture/TextureFormatService.js";

var _buildDefaultName = ConvertCommon$Wonderjs.buildDefaultTextureName;

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
                      var image = OptionService$Wonderjs.unsafeGet(images)[source$1];
                      arr[index] = /* record */[
                        /* name */name !== undefined ? name : ConvertCommon$Wonderjs.buildDefaultTextureName(index),
                        /* format */TextureFormatService$Wonderjs.getFormatByMimeType(OptionService$Wonderjs.unsafeGet(image[/* mimeType */3])),
                        /* flipY */extras !== undefined ? extras[/* flipY */0] : false
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
  _buildDefaultName ,
  convertToBasicSourceTextures ,
  _convertMagFilter ,
  _convertMinFilter ,
  _convertWrap ,
  convertToSamplers ,
  
}
/* Log-WonderLog Not a pure module */
