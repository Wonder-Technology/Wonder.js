

import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "./../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ExecIMGUIMainService$Wonderjs from "../../service/state/main/imgui/ExecIMGUIMainService.js";
import * as ExtendIMGUIMainService$Wonderjs from "../../service/state/main/imgui/extend/ExtendIMGUIMainService.js";
import * as SerializeAllIMGUIService$Wonderjs from "../../service/record/all/imgui/SerializeAllIMGUIService.js";
import * as SetAssetIMGUIMainService$Wonderjs from "../../service/state/main/imgui/SetAssetIMGUIMainService.js";

function _buildCustomControlData(state) {
  return /* record */[/* funcMap */SerializeAllIMGUIService$Wonderjs.CustomControl[/* serializeFuncMap */0](Curry._1(ExtendIMGUIMainService$Wonderjs.ExtendData[/* CustomControl */1][/* getFuncMap */0], state))];
}

function _buildSkinData(state) {
  return /* record */[/* allSkinDataMap */SerializeAllIMGUIService$Wonderjs.Skin[/* serializeAllSkinDataMap */0](Curry._1(ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* getAllSkinDataMap */0], state))];
}

function buildExtendData(state) {
  return /* record */[
          /* customControlData */_buildCustomControlData(state),
          /* skinData */_buildSkinData(state)
        ];
}

var ExtendData = /* module */[
  /* _buildCustomControlData */_buildCustomControlData,
  /* _buildSkinData */_buildSkinData,
  /* buildExtendData */buildExtendData
];

function _addBufferData(param, data, param$1) {
  var match = param$1[0];
  var byteOffset = match[1];
  var alignedByteLength = param[0];
  return /* tuple */[
          /* tuple */[
            match[0] + alignedByteLength | 0,
            byteOffset + alignedByteLength | 0,
            ArrayService$Wonderjs.push(/* record */[
                  /* buffer */0,
                  /* byteOffset */byteOffset,
                  /* byteLength */param[1]
                ], match[2])
          ],
          ArrayService$Wonderjs.push(/* record */[
                /* arrayBuffer */data,
                /* byteOffset */byteOffset
              ], param$1[1])
        ];
}

function _buildBitmapData(state, param) {
  var match = param[0];
  var bufferViewDataArr = match[2];
  var name = SetAssetIMGUIMainService$Wonderjs.unsafeGetSettedAssetBitmapName(state);
  var arrayBuffer = SetAssetIMGUIMainService$Wonderjs.unsafeGetSettedAssetBitmapArrayBuffer(state);
  var byteLength = arrayBuffer.byteLength;
  var alignedByteLength = BufferUtils$Wonderjs.alignedLength(byteLength);
  return /* tuple */[
          /* record */[
            /* name */name,
            /* bufferView */bufferViewDataArr.length
          ],
          _addBufferData(/* tuple */[
                alignedByteLength,
                byteLength
              ], arrayBuffer, /* tuple */[
                /* tuple */[
                  match[0],
                  match[1],
                  bufferViewDataArr
                ],
                param[1]
              ])
        ];
}

function _buildCustomImagesData(state, param) {
  var match = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var arrayBuffer = param$1[0];
                var match = param[1];
                var match$1 = match[0];
                var bufferViewDataArr = match$1[2];
                var byteLength = arrayBuffer.byteLength;
                var alignedByteLength = BufferUtils$Wonderjs.alignedLength(byteLength);
                return /* tuple */[
                        ArrayService$Wonderjs.push(/* record */[
                              /* id */param$1[1],
                              /* bufferView */bufferViewDataArr.length,
                              /* mimeType */param$1[2]
                            ], param[0]),
                        _addBufferData(/* tuple */[
                              alignedByteLength,
                              byteLength
                            ], arrayBuffer, /* tuple */[
                              /* tuple */[
                                match$1[0],
                                match$1[1],
                                bufferViewDataArr
                              ],
                              match[1]
                            ])
                      ];
              }), /* tuple */[
              ArrayService$WonderCommonlib.createEmpty(/* () */0),
              /* tuple */[
                /* tuple */[
                  match[0],
                  match[1],
                  match[2]
                ],
                param[1]
              ]
            ], SetAssetIMGUIMainService$Wonderjs.getSettedAssetCustomImageDataArr(state));
}

function _hasFontData(state) {
  return Js_option.isSome(SetAssetIMGUIMainService$Wonderjs.getSettedAssetFntContent(state));
}

function _hasCustomImagesData(state) {
  return SetAssetIMGUIMainService$Wonderjs.getSettedAssetCustomImageDataArr(state).length > 0;
}

function buildAssetData(state, param) {
  var bufferViewDataArr = param[2];
  var byteOffset = param[1];
  var totalByteLength = param[0];
  var assetArrayBufferDataArr = ArrayService$WonderCommonlib.createEmpty(/* () */0);
  var match = Js_option.isSome(SetAssetIMGUIMainService$Wonderjs.getSettedAssetFntContent(state));
  var match$1;
  if (match) {
    var match$2 = _buildBitmapData(state, /* tuple */[
          /* tuple */[
            totalByteLength,
            byteOffset,
            bufferViewDataArr
          ],
          assetArrayBufferDataArr
        ]);
    var match$3 = match$2[1];
    var match$4 = match$3[0];
    match$1 = /* tuple */[
      /* record */[
        /* fntData : record */[
          /* name */SetAssetIMGUIMainService$Wonderjs.unsafeGetSettedAssetFntName(state),
          /* content */SetAssetIMGUIMainService$Wonderjs.unsafeGetSettedAssetFntContent(state)
        ],
        /* bitmapData */match$2[0]
      ],
      /* tuple */[
        /* tuple */[
          match$4[0],
          match$4[1],
          match$4[2]
        ],
        match$3[1]
      ]
    ];
  } else {
    match$1 = /* tuple */[
      undefined,
      /* tuple */[
        /* tuple */[
          totalByteLength,
          byteOffset,
          bufferViewDataArr
        ],
        assetArrayBufferDataArr
      ]
    ];
  }
  var match$5 = match$1[1];
  var assetArrayBufferDataArr$1 = match$5[1];
  var match$6 = match$5[0];
  var bufferViewDataArr$1 = match$6[2];
  var byteOffset$1 = match$6[1];
  var totalByteLength$1 = match$6[0];
  var match$7 = _hasCustomImagesData(state);
  var match$8;
  if (match$7) {
    var match$9 = _buildCustomImagesData(state, /* tuple */[
          /* tuple */[
            totalByteLength$1,
            byteOffset$1,
            bufferViewDataArr$1
          ],
          assetArrayBufferDataArr$1
        ]);
    var match$10 = match$9[1];
    var match$11 = match$10[0];
    match$8 = /* tuple */[
      /* record */[/* customImages */match$9[0]],
      /* tuple */[
        /* tuple */[
          match$11[0],
          match$11[1],
          match$11[2]
        ],
        match$10[1]
      ]
    ];
  } else {
    match$8 = /* tuple */[
      undefined,
      /* tuple */[
        /* tuple */[
          totalByteLength$1,
          byteOffset$1,
          bufferViewDataArr$1
        ],
        assetArrayBufferDataArr$1
      ]
    ];
  }
  var match$12 = match$8[1];
  var match$13 = match$12[0];
  return /* tuple */[
          /* record */[
            /* fontData */match$1[0],
            /* customImagesData */match$8[0]
          ],
          /* tuple */[
            /* tuple */[
              match$13[0],
              match$13[1],
              match$13[2]
            ],
            match$12[1]
          ]
        ];
}

var AssetData = /* module */[
  /* _addBufferData */_addBufferData,
  /* _buildBitmapData */_buildBitmapData,
  /* _buildCustomImagesData */_buildCustomImagesData,
  /* _hasFontData */_hasFontData,
  /* _hasCustomImagesData */_hasCustomImagesData,
  /* buildAssetData */buildAssetData
];

function _buildExecFuncDataArr(state) {
  return SerializeAllIMGUIService$Wonderjs.Exec[/* serializeWonderExecFuncDataArr */4](ExecIMGUIMainService$Wonderjs.getExecFuncDataArr(state));
}

function buildExecDataToOneExecFuncData(state) {
  return /* record */[/* execFuncDataArr */SerializeAllIMGUIService$Wonderjs.Exec[/* serializeWonderExecFuncDataArr */4](ExecIMGUIMainService$Wonderjs.getExecFuncDataArr(state))];
}

var ExecData = /* module */[
  /* _buildExecFuncDataArr */_buildExecFuncDataArr,
  /* buildExecDataToOneExecFuncData */buildExecDataToOneExecFuncData
];

function build(state, param) {
  return /* tuple */[
          /* record */[/* execFuncDataArr */SerializeAllIMGUIService$Wonderjs.Exec[/* serializeWonderExecFuncDataArr */4](ExecIMGUIMainService$Wonderjs.getExecFuncDataArr(state))],
          buildExtendData(state),
          buildAssetData(state, /* tuple */[
                param[0],
                param[1],
                param[2]
              ])
        ];
}

export {
  ExtendData ,
  AssetData ,
  ExecData ,
  build ,
  
}
/* BufferUtils-Wonderjs Not a pure module */
