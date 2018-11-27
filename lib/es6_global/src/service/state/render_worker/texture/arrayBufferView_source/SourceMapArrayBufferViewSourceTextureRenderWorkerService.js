

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as TextureSourceMapService$Wonderjs from "../../../../primitive/texture/TextureSourceMapService.js";
import * as RecordArrayBufferViewSourceTextureRenderWorkerService$Wonderjs from "./RecordArrayBufferViewSourceTextureRenderWorkerService.js";

function setSourceMap(sourceMap, state) {
  var record = RecordArrayBufferViewSourceTextureRenderWorkerService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arrayBufferViewSourceTextureRecord */16] = /* record */[
    /* wrapSs */record[/* wrapSs */0],
    /* wrapTs */record[/* wrapTs */1],
    /* magFilters */record[/* magFilters */2],
    /* minFilters */record[/* minFilters */3],
    /* formats */record[/* formats */4],
    /* types */record[/* types */5],
    /* isNeedUpdates */record[/* isNeedUpdates */6],
    /* flipYs */record[/* flipYs */7],
    /* widths */record[/* widths */8],
    /* heights */record[/* heights */9],
    /* sourceMap */sourceMap,
    /* glTextureMap */record[/* glTextureMap */11],
    /* bindTextureUnitCacheMap */record[/* bindTextureUnitCacheMap */12]
  ];
  return newrecord;
}

function addSourceArray(sourceArray, state) {
  var record = RecordArrayBufferViewSourceTextureRenderWorkerService$Wonderjs.getRecord(state);
  var sourceMap = OptionService$Wonderjs.unsafeGet(record[/* sourceMap */10]);
  ArrayService$WonderCommonlib.reduceOneParam((function (sourceMap, param) {
          return TextureSourceMapService$Wonderjs.addSource(param[0], param[1], sourceMap);
        }), sourceMap, sourceArray);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arrayBufferViewSourceTextureRecord */16] = /* record */[
    /* wrapSs */record[/* wrapSs */0],
    /* wrapTs */record[/* wrapTs */1],
    /* magFilters */record[/* magFilters */2],
    /* minFilters */record[/* minFilters */3],
    /* formats */record[/* formats */4],
    /* types */record[/* types */5],
    /* isNeedUpdates */record[/* isNeedUpdates */6],
    /* flipYs */record[/* flipYs */7],
    /* widths */record[/* widths */8],
    /* heights */record[/* heights */9],
    /* sourceMap */sourceMap,
    /* glTextureMap */record[/* glTextureMap */11],
    /* bindTextureUnitCacheMap */record[/* bindTextureUnitCacheMap */12]
  ];
  return newrecord;
}

export {
  setSourceMap ,
  addSourceArray ,
  
}
/* OptionService-Wonderjs Not a pure module */
