

import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../service/state/main/data/StateDataMain.js";
import * as GenerateCommon$Wonderjs from "../GenerateCommon.js";
import * as IsDebugMainService$Wonderjs from "../../../service/state/main/state/IsDebugMainService.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as BuildBasicMaterialNoMapSystem$Wonderjs from "./BuildBasicMaterialNoMapSystem.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as OperateLightMaterialMainService$Wonderjs from "../../../service/state/main/material/light/OperateLightMaterialMainService.js";
import * as BuildLightMaterialDiffuseMapSystem$Wonderjs from "./BuildLightMaterialDiffuseMapSystem.js";
import * as BuildLightMaterialNoDiffuseMapSystem$Wonderjs from "./BuildLightMaterialNoDiffuseMapSystem.js";

function _buildLightMaterialData(param, param$1, getResultUint8ArrayDataFunc, state) {
  var basicSourceTextureImageUint8ArrayDataMap = param[1];
  var match = MutableSparseMapService$WonderCommonlib.reduceValid((function (param, param$1) {
          var name = param$1[1];
          var lightMaterial = param$1[0];
          var match = param[2];
          var bufferViewDataArr = match[2];
          var byteOffset = match[1];
          var totalByteLength = match[0];
          var match$1 = param[1];
          var imageResultUint8ArrayMap = match$1[4];
          var imageUint8ArrayMap = match$1[3];
          var imageMap = match$1[2];
          var samplerIndexMap = match$1[1];
          var textureIndexMap = match$1[0];
          var match$2 = param[0];
          var imageUint8DataArr = match$2[3];
          var samplerDataArr = match$2[2];
          var textureDataArr = match$2[1];
          var lightMaterialDataArr = match$2[0];
          var diffuseMap = OperateLightMaterialMainService$Wonderjs.getDiffuseMap(lightMaterial, state);
          if (diffuseMap !== undefined) {
            return BuildLightMaterialDiffuseMapSystem$Wonderjs.build(/* tuple */[
                        lightMaterial,
                        diffuseMap,
                        name
                      ], /* tuple */[
                        /* tuple */[
                          lightMaterialDataArr,
                          textureDataArr,
                          samplerDataArr,
                          imageUint8DataArr
                        ],
                        /* tuple */[
                          textureIndexMap,
                          samplerIndexMap,
                          imageMap,
                          imageUint8ArrayMap,
                          basicSourceTextureImageUint8ArrayDataMap,
                          imageResultUint8ArrayMap
                        ]
                      ], /* tuple */[
                        totalByteLength,
                        byteOffset,
                        bufferViewDataArr
                      ], getResultUint8ArrayDataFunc, state);
          } else {
            var match$3 = BuildLightMaterialNoDiffuseMapSystem$Wonderjs.build(/* tuple */[
                  lightMaterial,
                  name
                ], /* tuple */[
                  /* tuple */[
                    lightMaterialDataArr,
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
            var match$4 = match$3[2];
            var match$5 = match$3[1];
            var match$6 = match$3[0];
            return /* tuple */[
                    /* tuple */[
                      match$6[0],
                      match$6[1],
                      match$6[2],
                      match$6[3]
                    ],
                    /* tuple */[
                      match$5[0],
                      match$5[1],
                      match$5[2],
                      imageUint8ArrayMap,
                      imageResultUint8ArrayMap
                    ],
                    /* tuple */[
                      match$4[0],
                      match$4[1],
                      match$4[2]
                    ]
                  ];
          }
        }), /* tuple */[
        /* tuple */[
          /* array */[],
          /* array */[],
          /* array */[],
          /* array */[]
        ],
        /* tuple */[
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ],
        /* tuple */[
          param$1[0],
          param$1[1],
          param$1[2]
        ]
      ], param[0]);
  var match$1 = match[2];
  var match$2 = match[1];
  var match$3 = match[0];
  return /* tuple */[
          /* tuple */[
            match$3[0],
            match$3[1],
            match$3[2],
            match$3[3]
          ],
          /* tuple */[
            match$2[0],
            match$2[1],
            match$2[2],
            match$2[4]
          ],
          /* tuple */[
            match$1[0],
            match$1[1],
            match$1[2]
          ]
        ];
}

function build(param, param$1, getResultUint8ArrayDataFunc, state) {
  var lightMaterialDataMap = param[1];
  var basicMaterialDataMap = param[0];
  Contract$WonderLog.requireCheck((function (param) {
          GenerateCommon$Wonderjs.checkShouldHasNoSlot(basicMaterialDataMap);
          return GenerateCommon$Wonderjs.checkShouldHasNoSlot(lightMaterialDataMap);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = _buildLightMaterialData(/* tuple */[
        lightMaterialDataMap,
        param[2]
      ], /* tuple */[
        param$1[0],
        param$1[1],
        param$1[2]
      ], getResultUint8ArrayDataFunc, state);
  var match$1 = match[2];
  var match$2 = match[0];
  var basicMaterialDataArr = MutableSparseMapService$WonderCommonlib.reduceValid((function (basicMaterialDataArr, param) {
          return BuildBasicMaterialNoMapSystem$Wonderjs.build(/* tuple */[
                      param[0],
                      param[1]
                    ], basicMaterialDataArr, state);
        }), /* array */[], basicMaterialDataMap);
  return /* tuple */[
          basicMaterialDataArr,
          match$2[0],
          match$2[1],
          match$2[2],
          match$2[3],
          match[1][3],
          /* tuple */[
            match$1[0],
            match$1[1],
            match$1[2]
          ]
        ];
}

export {
  _buildLightMaterialData ,
  build ,
  
}
/* Contract-WonderLog Not a pure module */
