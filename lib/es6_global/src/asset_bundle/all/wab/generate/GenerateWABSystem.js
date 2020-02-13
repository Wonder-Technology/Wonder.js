

import * as BufferUtils$Wonderjs from "../../../../asset/utils/BufferUtils.js";
import * as DataViewCommon$Wonderjs from "../../../../asset/generate/DataViewCommon.js";
import * as GenerateABUtils$Wonderjs from "../../../utils/GenerateABUtils.js";
import * as GenerateWABUtils$Wonderjs from "../utils/GenerateWABUtils.js";

function _computeByteLength(jsonUint8Array) {
  var jsonByteLength = jsonUint8Array.byteLength;
  var jsonAlignedByteLength = BufferUtils$Wonderjs.alignedLength(jsonByteLength);
  var totalByteLength = GenerateWABUtils$Wonderjs.getHeaderTotalByteLength(/* () */0) + jsonAlignedByteLength | 0;
  return /* tuple */[
          jsonByteLength,
          jsonAlignedByteLength,
          totalByteLength
        ];
}

function _writeHeader(jsonByteLength, dataView) {
  return DataViewCommon$Wonderjs.writeUint32_1(jsonByteLength, 0, dataView);
}

function generate(wholeDependencyRelation, wholeHashIdMap) {
  var jsonUint8Array = GenerateABUtils$Wonderjs.buildJsonUint8Array(/* record */[
        /* wholeHashIdMap */wholeHashIdMap,
        /* wholeDependencyRelationMap */wholeDependencyRelation
      ]);
  var match = _computeByteLength(jsonUint8Array);
  var dataView = DataViewCommon$Wonderjs.create(new ArrayBuffer(match[2]));
  var byteOffset = DataViewCommon$Wonderjs.writeUint32_1(match[0], 0, dataView);
  var emptyEncodedUint8Data = GenerateABUtils$Wonderjs.getEmptyEncodedUint8Data(/* () */0);
  var match$1 = GenerateABUtils$Wonderjs.writeJson(byteOffset, /* tuple */[
        emptyEncodedUint8Data,
        match[1],
        jsonUint8Array
      ], dataView);
  return match$1[2].buffer;
}

export {
  _computeByteLength ,
  _writeHeader ,
  generate ,
  
}
/* BufferUtils-Wonderjs Not a pure module */
