

import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../service/state/main/data/StateDataMain.js";
import * as GenerateCommon$Wonderjs from "../GenerateCommon.js";
import * as SparseMapService$Wonderjs from "../../../service/atom/SparseMapService.js";
import * as IsDebugMainService$Wonderjs from "../../../service/state/main/state/IsDebugMainService.js";
import * as BuildDiffuseMapSystem$Wonderjs from "./BuildDiffuseMapSystem.js";
import * as HashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as BuildNoDiffuseMapSystem$Wonderjs from "./BuildNoDiffuseMapSystem.js";
import * as OperateLightMaterialMainService$Wonderjs from "../../../service/state/main/material/light/OperateLightMaterialMainService.js";

function build(materialDataMap, imageBase64Map, param, state) {
  Contract$WonderLog.requireCheck((function () {
          return GenerateCommon$Wonderjs.checkShouldHasNoSlot(materialDataMap);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = SparseMapService$Wonderjs.reduceValid((function (param, param$1) {
          var name = param$1[1];
          var lightMaterial = param$1[0];
          var match = param[2];
          var bufferViewDataArr = match[2];
          var byteOffset = match[1];
          var totalByteLength = match[0];
          var match$1 = param[1];
          var imageMap = match$1[2];
          var samplerIndexMap = match$1[1];
          var textureIndexMap = match$1[0];
          var match$2 = param[0];
          var imageUint8DataArr = match$2[3];
          var samplerDataArr = match$2[2];
          var textureDataArr = match$2[1];
          var materialDataArr = match$2[0];
          var diffuseMap = OperateLightMaterialMainService$Wonderjs.getDiffuseMap(lightMaterial, state);
          if (diffuseMap !== undefined) {
            return BuildDiffuseMapSystem$Wonderjs.build(/* tuple */[
                        diffuseMap,
                        name
                      ], /* tuple */[
                        /* tuple */[
                          materialDataArr,
                          textureDataArr,
                          samplerDataArr,
                          imageUint8DataArr
                        ],
                        /* tuple */[
                          textureIndexMap,
                          samplerIndexMap,
                          imageMap,
                          imageBase64Map
                        ]
                      ], /* tuple */[
                        totalByteLength,
                        byteOffset,
                        bufferViewDataArr
                      ], state);
          } else {
            return BuildNoDiffuseMapSystem$Wonderjs.build(/* tuple */[
                        lightMaterial,
                        name
                      ], /* tuple */[
                        /* tuple */[
                          materialDataArr,
                          textureDataArr,
                          samplerDataArr,
                          imageUint8DataArr
                        ],
                        /* tuple */[
                          textureIndexMap,
                          samplerIndexMap,
                          imageMap
                        ]
                      ], /* tuple */[
                        totalByteLength,
                        byteOffset,
                        bufferViewDataArr
                      ], state);
          }
        }), /* tuple */[
        /* tuple */[
          /* array */[],
          /* array */[],
          /* array */[],
          /* array */[]
        ],
        /* tuple */[
          /* array */[],
          HashMapService$WonderCommonlib.createEmpty(/* () */0),
          /* array */[]
        ],
        /* tuple */[
          param[0],
          param[1],
          param[2]
        ]
      ], materialDataMap);
  var match$1 = match[2];
  var match$2 = match[0];
  return /* tuple */[
          match$2[0],
          match$2[1],
          match$2[2],
          match$2[3],
          /* tuple */[
            match$1[0],
            match$1[2]
          ]
        ];
}

export {
  build ,
  
}
/* Contract-WonderLog Not a pure module */
