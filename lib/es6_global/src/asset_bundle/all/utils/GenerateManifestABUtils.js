

import * as BufferUtils$Wonderjs from "../../../asset/utils/BufferUtils.js";
import * as DataViewCommon$Wonderjs from "../../../asset/generate/DataViewCommon.js";
import * as GenerateABUtils$Wonderjs from "../../utils/GenerateABUtils.js";

function readHeader(dataView) {
  var match = DataViewCommon$Wonderjs.getUint32_1(0, dataView);
  var match$1 = DataViewCommon$Wonderjs.getUint32_1(match[1], dataView);
  return /* tuple */[
          match$1[1],
          match[0],
          match$1[0]
        ];
}

function getContentBuffer(manifestJsonByteLength, ab) {
  return ab.slice(BufferUtils$Wonderjs.alignedLength(GenerateABUtils$Wonderjs.getHeaderTotalByteLength(/* () */0) + manifestJsonByteLength | 0));
}

function getManifest(manifestJsonByteLength, ab) {
  var decoder = new TextDecoder("utf-8");
  return decoder.decode(new Uint8Array(ab, GenerateABUtils$Wonderjs.getHeaderTotalByteLength(/* () */0), manifestJsonByteLength));
}

var RABAndSAB = /* module */[
  /* readHeader */readHeader,
  /* getContentBuffer */getContentBuffer,
  /* getManifest */getManifest
];

export {
  RABAndSAB ,
  
}
/* BufferUtils-Wonderjs Not a pure module */
