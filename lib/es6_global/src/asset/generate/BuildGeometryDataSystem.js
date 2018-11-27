

import * as Caml_int32 from "../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as GenerateCommon$Wonderjs from "./GenerateCommon.js";
import * as SparseMapService$Wonderjs from "../../service/atom/SparseMapService.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";

function _addBufferViewData(param, param$1, totalByteLength) {
  var accessorDataArr = param$1[2];
  var bufferViewDataArr = param$1[1];
  var bufferViewOffset = param$1[0];
  var pointType = param[3];
  var pointsLength = param[0];
  if (pointsLength !== 0) {
    var bufferViewByteLength = Caml_int32.imul(pointsLength, param[2]);
    var bufferViewAlignedByteLength = BufferUtils$Wonderjs.alignedLength(bufferViewByteLength);
    return /* tuple */[
            accessorDataArr.length,
            ArrayService$Wonderjs.push(/* record */[
                  /* bufferView */bufferViewDataArr.length,
                  /* componentType */pointType !== 3 ? (
                      pointType >= 4 ? 5125 : 5126
                    ) : 5123,
                  /* count */param[1],
                  /* type_ */pointType !== 2 ? (
                      pointType >= 3 ? "SCALAR" : "VEC3"
                    ) : "VEC2"
                ], accessorDataArr),
            ArrayService$Wonderjs.push(/* record */[
                  /* buffer */0,
                  /* byteOffset */bufferViewOffset,
                  /* byteLength */bufferViewByteLength
                ], bufferViewDataArr),
            bufferViewOffset + bufferViewAlignedByteLength | 0,
            totalByteLength + bufferViewAlignedByteLength | 0
          ];
  } else {
    return /* tuple */[
            undefined,
            accessorDataArr,
            bufferViewDataArr,
            bufferViewOffset,
            totalByteLength
          ];
  }
}

function _checkBufferViewOffsetAligned(bufferViewOffset) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("bufferViewOffset aligned with multiple of 4", "not"), (function () {
                        return Contract$WonderLog.Operators[/* = */0](bufferViewOffset % 4, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return bufferViewOffset;
}

function _addVertexData(param, vertexDataArr) {
  var bufferViewOffset = param[0];
  _checkBufferViewOffsetAligned(bufferViewOffset);
  return ArrayService$Wonderjs.push(/* tuple */[
              bufferViewOffset,
              param[1]
            ], vertexDataArr);
}

function _addIndexData(param, indexDataArr) {
  var bufferViewOffset = param[0];
  _checkBufferViewOffsetAligned(bufferViewOffset);
  return ArrayService$Wonderjs.push(/* tuple */[
              bufferViewOffset,
              param[1]
            ], indexDataArr);
}

function _addAllPointData(param, param$1, param$2) {
  var match = param$2[1];
  var index32DataArr = match[2];
  var indexDataArr = match[1];
  var match$1 = param$1[1];
  var bufferViewOffset = param$1[0];
  var match$2 = param[2];
  var texCoordsLength = match$2[2];
  var normalsLength = match$2[1];
  var verticesLength = match$2[0];
  var match$3 = param[1];
  var indicesSize = match$3[3];
  var match$4 = param[0];
  var indices32 = match$4[4];
  var indices = match$4[3];
  var verticesCount = Caml_int32.div(verticesLength, match$3[0]);
  var normalsCount = Caml_int32.div(normalsLength, match$3[1]);
  var texCoordsCount = Caml_int32.div(texCoordsLength, match$3[2]);
  var vertexDataArr = _addVertexData(/* tuple */[
        bufferViewOffset,
        match$4[0]
      ], match[0]);
  var match$5 = _addBufferViewData(/* tuple */[
        verticesLength,
        verticesCount,
        Float32Array.BYTES_PER_ELEMENT,
        /* Vertex */0
      ], /* tuple */[
        bufferViewOffset,
        match$1[0],
        match$1[1]
      ], param$2[0]);
  var bufferViewOffset$1 = match$5[3];
  var vertexDataArr$1 = _addVertexData(/* tuple */[
        bufferViewOffset$1,
        match$4[1]
      ], vertexDataArr);
  var match$6 = _addBufferViewData(/* tuple */[
        normalsLength,
        normalsCount,
        Float32Array.BYTES_PER_ELEMENT,
        /* Normal */1
      ], /* tuple */[
        bufferViewOffset$1,
        match$5[2],
        match$5[1]
      ], match$5[4]);
  var bufferViewOffset$2 = match$6[3];
  var vertexDataArr$2 = _addVertexData(/* tuple */[
        bufferViewOffset$2,
        match$4[2]
      ], vertexDataArr$1);
  var match$7 = _addBufferViewData(/* tuple */[
        texCoordsLength,
        texCoordsCount,
        Float32Array.BYTES_PER_ELEMENT,
        /* TexCoord */2
      ], /* tuple */[
        bufferViewOffset$2,
        match$6[2],
        match$6[1]
      ], match$6[4]);
  var totalByteLength = match$7[4];
  var bufferViewOffset$3 = match$7[3];
  var bufferViewDataArr = match$7[2];
  var accessorDataArr = match$7[1];
  var match$8;
  if (indices !== undefined) {
    var indices$1 = Js_primitive.valFromOption(indices);
    var indicesLength = indices$1.length;
    var indicesCount = Caml_int32.div(indicesLength, indicesSize);
    match$8 = /* tuple */[
      _addIndexData(/* tuple */[
            bufferViewOffset$3,
            indices$1
          ], indexDataArr),
      index32DataArr,
      _addBufferViewData(/* tuple */[
            indicesLength,
            indicesCount,
            Uint16Array.BYTES_PER_ELEMENT,
            /* Index */3
          ], /* tuple */[
            bufferViewOffset$3,
            bufferViewDataArr,
            accessorDataArr
          ], totalByteLength)
    ];
  } else if (indices32 !== undefined) {
    var indices32$1 = Js_primitive.valFromOption(indices32);
    var indices32Length = indices32$1.length;
    var indices32Count = Caml_int32.div(indices32Length, indicesSize);
    match$8 = /* tuple */[
      indexDataArr,
      _addIndexData(/* tuple */[
            bufferViewOffset$3,
            indices32$1
          ], index32DataArr),
      _addBufferViewData(/* tuple */[
            indices32Length,
            indices32Count,
            Uint32Array.BYTES_PER_ELEMENT,
            /* Index32 */4
          ], /* tuple */[
            bufferViewOffset$3,
            bufferViewDataArr,
            accessorDataArr
          ], totalByteLength)
    ];
  } else {
    match$8 = Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_addAllPointData", "should has indices data", "", "", ""));
  }
  var match$9 = match$8[2];
  return /* tuple */[
          /* tuple */[
            match$5[0],
            match$6[0],
            match$7[0],
            match$9[0]
          ],
          match$9[1],
          match$9[2],
          match$9[3],
          /* tuple */[
            match$9[4],
            /* tuple */[
              vertexDataArr$2,
              match$8[0],
              match$8[1]
            ]
          ]
        ];
}

function _addMeshData(param, _, name, meshDataArr) {
  return ArrayService$Wonderjs.push(/* record */[
              /* primitives : record */[
                /* attributes : record */[
                  /* position */OptionService$Wonderjs.unsafeGet(param[0]),
                  /* normal */param[1],
                  /* texCoord_0 */param[2]
                ],
                /* indices */OptionService$Wonderjs.unsafeGet(param[3]),
                /* material */undefined
              ],
              /* name */name
            ], meshDataArr);
}

function build(meshPointAndNameDataMap) {
  Contract$WonderLog.requireCheck((function () {
          return GenerateCommon$Wonderjs.checkShouldHasNoSlot(meshPointAndNameDataMap);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = SparseMapService$Wonderjs.reduceiValid((function (param, param$1, _) {
          var match = param$1[0];
          var texCoords = match[2];
          var normals = match[1];
          var vertices = match[0];
          var match$1 = param[2];
          var match$2 = param[1];
          var match$3 = param[0];
          var verticesLength = vertices.length;
          var normalsLength = normals.length;
          var texCoordsLength = texCoords.length;
          var match$4 = _addAllPointData(/* tuple */[
                /* tuple */[
                  vertices,
                  normals,
                  texCoords,
                  match[3],
                  match[4]
                ],
                /* tuple */[
                  3,
                  3,
                  2,
                  1
                ],
                /* tuple */[
                  verticesLength,
                  normalsLength,
                  texCoordsLength
                ]
              ], /* tuple */[
                match$3[1],
                /* tuple */[
                  match$2[0],
                  match$2[1]
                ]
              ], /* tuple */[
                match$3[0],
                /* tuple */[
                  match$1[0],
                  match$1[1],
                  match$1[2]
                ]
              ]);
          var match$5 = match$4[4];
          var match$6 = match$5[1];
          var match$7 = match$4[0];
          return /* tuple */[
                  /* tuple */[
                    match$5[0],
                    match$4[3]
                  ],
                  /* tuple */[
                    match$4[2],
                    match$4[1],
                    _addMeshData(/* tuple */[
                          match$7[0],
                          match$7[1],
                          match$7[2],
                          match$7[3]
                        ], texCoords, param$1[1], match$2[2])
                  ],
                  /* tuple */[
                    match$6[0],
                    match$6[1],
                    match$6[2]
                  ]
                ];
        }), /* tuple */[
        /* tuple */[
          0,
          0
        ],
        /* tuple */[
          /* array */[],
          /* array */[],
          /* array */[]
        ],
        /* tuple */[
          /* array */[],
          /* array */[],
          /* array */[]
        ]
      ], meshPointAndNameDataMap);
  var match$1 = match[2];
  var match$2 = match[1];
  return /* tuple */[
          match[0][0],
          /* tuple */[
            match$2[0],
            match$2[1],
            match$2[2]
          ],
          /* tuple */[
            match$1[0],
            match$1[1],
            match$1[2]
          ]
        ];
}

export {
  _addBufferViewData ,
  _checkBufferViewOffsetAligned ,
  _addVertexData ,
  _addIndexData ,
  _addAllPointData ,
  _addMeshData ,
  build ,
  
}
/* Log-WonderLog Not a pure module */
