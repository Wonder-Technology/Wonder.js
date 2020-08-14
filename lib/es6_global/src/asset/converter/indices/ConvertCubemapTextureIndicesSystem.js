

import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _convertToImageTextureIndices(param, index, param$1) {
  return /* tuple */[
          ArrayService$Wonderjs.push(index, param$1[0]),
          ArrayService$Wonderjs.push(param[0], param$1[1]),
          ArrayService$Wonderjs.push(param[1], param$1[2]),
          ArrayService$Wonderjs.push(param[2], param$1[3]),
          ArrayService$Wonderjs.push(param[3], param$1[4]),
          ArrayService$Wonderjs.push(param[4], param$1[5]),
          ArrayService$Wonderjs.push(param[5], param$1[6])
        ];
}

function _convertToSamplerTextureIndices(sampler, index, param) {
  return /* tuple */[
          ArrayService$Wonderjs.push(index, param[0]),
          ArrayService$Wonderjs.push(sampler, param[1])
        ];
}

function convertToImageAndSamplerTextureIndices(param) {
  var extras = param[/* extras */15];
  if (extras !== undefined) {
    var cubemapTextures = extras[/* cubemapTextures */6];
    if (cubemapTextures !== undefined) {
      return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
                    var match = param[1];
                    var match$1 = param[0];
                    return /* tuple */[
                            _convertToImageTextureIndices(/* tuple */[
                                  param$1[/* pxSource */3],
                                  param$1[/* nxSource */4],
                                  param$1[/* pySource */5],
                                  param$1[/* nySource */6],
                                  param$1[/* pzSource */7],
                                  param$1[/* nzSource */8]
                                ], index, /* tuple */[
                                  match$1[0],
                                  match$1[1],
                                  match$1[2],
                                  match$1[3],
                                  match$1[4],
                                  match$1[5],
                                  match$1[6]
                                ]),
                            _convertToSamplerTextureIndices(param$1[/* sampler */1], index, /* tuple */[
                                  match[0],
                                  match[1]
                                ])
                          ];
                  }), /* tuple */[
                  /* tuple */[
                    /* array */[],
                    /* array */[],
                    /* array */[],
                    /* array */[],
                    /* array */[],
                    /* array */[],
                    /* array */[]
                  ],
                  /* tuple */[
                    /* array */[],
                    /* array */[]
                  ]
                ], cubemapTextures);
    } else {
      return /* tuple */[
              /* tuple */[
                /* array */[],
                /* array */[],
                /* array */[],
                /* array */[],
                /* array */[],
                /* array */[],
                /* array */[]
              ],
              /* tuple */[
                /* array */[],
                /* array */[]
              ]
            ];
    }
  } else {
    return /* tuple */[
            /* tuple */[
              /* array */[],
              /* array */[],
              /* array */[],
              /* array */[],
              /* array */[],
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
/* ArrayService-Wonderjs Not a pure module */
