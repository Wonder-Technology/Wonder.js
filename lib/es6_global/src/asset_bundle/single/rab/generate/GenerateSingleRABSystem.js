

import * as GenerateSingleABUtils$Wonderjs from "../../utils/GenerateSingleABUtils.js";
import * as BuildSingleRABJsonDataSystem$Wonderjs from "./BuildSingleRABJsonDataSystem.js";

function generateRAB(param, bufferTotalAlignedByteLength, jsonUint8Array) {
  var match = param[0];
  return GenerateSingleABUtils$Wonderjs.generateAB(/* tuple */[
              /* tuple */[
                match[0].map((function (param) {
                        return /* tuple */[
                                param[/* byteOffset */0],
                                param[/* byteLength */1]
                              ];
                      })),
                match[1].map((function (param) {
                        return /* tuple */[
                                param[/* byteOffset */0],
                                param[/* byteLength */1]
                              ];
                      }))
              ],
              param[1],
              param[2]
            ], bufferTotalAlignedByteLength, jsonUint8Array);
}

function generateSingleRAB(resourceData, state) {
  var match = BuildSingleRABJsonDataSystem$Wonderjs.buildJsonData(resourceData, state);
  var match$1 = match[2];
  var match$2 = match[1];
  var geometryBufferViewArr = match$2[1];
  var imageBufferViewArr = match$2[0];
  var match$3 = match[0];
  var jsonUint8Array = BuildSingleRABJsonDataSystem$Wonderjs.buildJsonUint8Array(/* record */[
        /* textures */match$3[1],
        /* images */match$3[0],
        /* basicMaterials */match$3[2],
        /* lightMaterials */match$3[3],
        /* geometrys */match$3[4],
        /* scriptEventFunctions */match$3[5],
        /* scriptAttributes */match$3[6],
        /* bufferViews */imageBufferViewArr.concat(geometryBufferViewArr)
      ]);
  return generateRAB(/* tuple */[
              /* tuple */[
                imageBufferViewArr,
                geometryBufferViewArr
              ],
              match$1[0],
              match$1[1]
            ], match[3], jsonUint8Array);
}

export {
  generateRAB ,
  generateSingleRAB ,
  
}
/* GenerateSingleABUtils-Wonderjs Not a pure module */
