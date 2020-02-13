

import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _convertToImageTextureIndices(source, index, param) {
  var imageIndices = param[1];
  var imageBasicSourceTextureIndices = param[0];
  if (source !== undefined) {
    return /* tuple */[
            ArrayService$Wonderjs.push(index, imageBasicSourceTextureIndices),
            ArrayService$Wonderjs.push(Caml_option.valFromOption(source), imageIndices)
          ];
  } else {
    return /* tuple */[
            imageBasicSourceTextureIndices,
            imageIndices
          ];
  }
}

function _convertToSamplerTextureIndices(sampler, index, param) {
  var samplerIndices = param[1];
  var samplerTextureIndices = param[0];
  if (sampler !== undefined) {
    return /* tuple */[
            ArrayService$Wonderjs.push(index, samplerTextureIndices),
            ArrayService$Wonderjs.push(Caml_option.valFromOption(sampler), samplerIndices)
          ];
  } else {
    return /* tuple */[
            samplerTextureIndices,
            samplerIndices
          ];
  }
}

function convertToImageAndSamplerTextureIndices(param) {
  var textures = param[/* textures */4];
  if (textures !== undefined) {
    return Contract$WonderLog.ensureCheck((function (param) {
                  var match = param[1];
                  var samplerIndices = match[1];
                  var samplerTextureIndices = match[0];
                  var match$1 = param[0];
                  var imageIndices = match$1[1];
                  var imageBasicSourceTextureIndices = match$1[0];
                  Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("imageBasicSourceTextureIndices\' count == imageIndices\' count", "not"), (function (param) {
                          return Contract$WonderLog.Operators[/* = */0](imageBasicSourceTextureIndices.length, imageIndices.length);
                        }));
                  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("samplerTextureIndices\' count == samplerIndices\' count", "not"), (function (param) {
                                return Contract$WonderLog.Operators[/* = */0](samplerTextureIndices.length, samplerIndices.length);
                              }));
                }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
                      var match = param[1];
                      var match$1 = param[0];
                      return /* tuple */[
                              _convertToImageTextureIndices(param$1[/* source */1], index, /* tuple */[
                                    match$1[0],
                                    match$1[1]
                                  ]),
                              _convertToSamplerTextureIndices(param$1[/* sampler */0], index, /* tuple */[
                                    match[0],
                                    match[1]
                                  ])
                            ];
                    }), /* tuple */[
                    /* tuple */[
                      /* array */[],
                      /* array */[]
                    ],
                    /* tuple */[
                      /* array */[],
                      /* array */[]
                    ]
                  ], textures));
  } else {
    return /* tuple */[
            /* tuple */[
              /* array */[],
              /* array */[]
            ],
            /* tuple */[
              /* array */[],
              /* array */[]
            ]
          ];
  }
}

export {
  _convertToImageTextureIndices ,
  _convertToSamplerTextureIndices ,
  convertToImageAndSamplerTextureIndices ,
  
}
/* Log-WonderLog Not a pure module */
