

import * as DataViewCommon$Wonderjs from "../../asset/generate/DataViewCommon.js";
import * as GenerateWABUtils$Wonderjs from "../all/wab/utils/GenerateWABUtils.js";
import * as GenerateManifestABUtils$Wonderjs from "../all/utils/GenerateManifestABUtils.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";

function _readHeader(dataView) {
  var match = DataViewCommon$Wonderjs.getUint32_1(0, dataView);
  return /* tuple */[
          match[1],
          match[0]
        ];
}

function _getJsonStr(jsonByteLength, wab) {
  var decoder = new TextDecoder("utf-8");
  return decoder.decode(new Uint8Array(wab, GenerateWABUtils$Wonderjs.getHeaderTotalByteLength(/* () */0), jsonByteLength));
}

function parseManifest(wab) {
  var dataView = DataViewCommon$Wonderjs.create(wab);
  var match = _readHeader(dataView);
  return JSON.parse(_getJsonStr(match[1], wab));
}

function getWholeHashIdMap(param) {
  return param[/* wholeHashIdMap */1];
}

function getWholeDependencyRelationMap(param) {
  return param[/* wholeDependencyRelationMap */2];
}

function unsafeGetHashId(abRelativePath, param) {
  return ImmutableHashMapService$WonderCommonlib.unsafeGet(abRelativePath, param[/* wholeHashIdMap */1]);
}

var WAB = /* module */[
  /* _readHeader */_readHeader,
  /* _getJsonStr */_getJsonStr,
  /* parseManifest */parseManifest,
  /* getWholeHashIdMap */getWholeHashIdMap,
  /* getWholeDependencyRelationMap */getWholeDependencyRelationMap,
  /* unsafeGetHashId */unsafeGetHashId
];

function parseManifest$1(rab) {
  var dataView = DataViewCommon$Wonderjs.create(rab);
  var match = GenerateManifestABUtils$Wonderjs.RABAndSAB[/* readHeader */0](dataView);
  return JSON.parse(GenerateManifestABUtils$Wonderjs.RABAndSAB[/* getManifest */2](match[1], rab));
}

var RAB = /* module */[/* parseManifest */parseManifest$1];

function parseManifest$2(sab) {
  var dataView = DataViewCommon$Wonderjs.create(sab);
  var match = GenerateManifestABUtils$Wonderjs.RABAndSAB[/* readHeader */0](dataView);
  return JSON.parse(GenerateManifestABUtils$Wonderjs.RABAndSAB[/* getManifest */2](match[1], sab));
}

var SAB = /* module */[/* parseManifest */parseManifest$2];

export {
  WAB ,
  RAB ,
  SAB ,
  
}
/* GenerateManifestABUtils-Wonderjs Not a pure module */
