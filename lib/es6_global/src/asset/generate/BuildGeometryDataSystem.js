

import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_int32 from "./../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Caml_option from "./../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as GenerateCommon$Wonderjs from "./GenerateCommon.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as BuildGeometryDataUtils$Wonderjs from "./utils/BuildGeometryDataUtils.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function getComponentType(pointType) {
  if (pointType !== 3) {
    if (pointType >= 4) {
      return 5125;
    } else {
      return 5126;
    }
  } else {
    return 5123;
  }
}

function getType(pointType) {
  if (pointType !== 2) {
    if (pointType >= 3) {
      return "SCALAR";
    } else {
      return "VEC3";
    }
  } else {
    return "VEC2";
  }
}

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
                  /* componentType */getComponentType(pointType),
                  /* count */param[1],
                  /* type_ */getType(pointType)
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
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("bufferViewOffset aligned with multiple of 4", "not"), (function (param) {
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

function _addIndexDataToArr(param, indexDataArr) {
  var bufferViewOffset = param[0];
  _checkBufferViewOffsetAligned(bufferViewOffset);
  return ArrayService$Wonderjs.push(/* tuple */[
              bufferViewOffset,
              param[1]
            ], indexDataArr);
}

function _addPointData(param, param$1, vertexDataArr) {
  var bufferViewOffset = param[0];
  var vertexDataArr$1 = _addVertexData(/* tuple */[
        bufferViewOffset,
        param$1[0]
      ], vertexDataArr);
  return /* tuple */[
          vertexDataArr$1,
          _addBufferViewData(/* tuple */[
                param$1[1],
                param$1[2],
                Float32Array.BYTES_PER_ELEMENT,
                param$1[3]
              ], /* tuple */[
                bufferViewOffset,
                param[1],
                param[2]
              ], param[3])
        ];
}

function _addIndexData(param, param$1, param$2, getLengthFunc) {
  var bufferViewOffset = param$2[0];
  var indices = param[0];
  var indicesLength = Curry._1(getLengthFunc, indices);
  var indicesCount = Caml_int32.div(indicesLength, param[1]);
  return /* tuple */[
          _addIndexDataToArr(/* tuple */[
                bufferViewOffset,
                indices
              ], param$1[0]),
          param$1[1],
          _addBufferViewData(/* tuple */[
                indicesLength,
                indicesCount,
                Uint16Array.BYTES_PER_ELEMENT,
                /* Index */3
              ], /* tuple */[
                bufferViewOffset,
                param$2[1],
                param$2[2]
              ], param$2[3])
        ];
}

function _addIndex16Data(param, param$1, param$2) {
  var indices = param$1[0];
  var bufferViewOffset = param[0];
  var indicesLength = indices.length;
  var indicesCount = Caml_int32.div(indicesLength, param$1[1]);
  return /* tuple */[
          _addIndexDataToArr(/* tuple */[
                bufferViewOffset,
                indices
              ], param$2[0]),
          param$2[1],
          _addBufferViewData(/* tuple */[
                indicesLength,
                indicesCount,
                Uint16Array.BYTES_PER_ELEMENT,
                /* Index */3
              ], /* tuple */[
                bufferViewOffset,
                param[1],
                param[2]
              ], param[3])
        ];
}

function _addIndex32Data(param, param$1, param$2) {
  var indices32 = param$1[0];
  var bufferViewOffset = param[0];
  if (indices32 !== undefined) {
    var indices32$1 = Caml_option.valFromOption(indices32);
    var indices32Length = indices32$1.length;
    var indices32Count = Caml_int32.div(indices32Length, param$1[1]);
    return /* tuple */[
            param$2[0],
            _addIndexDataToArr(/* tuple */[
                  bufferViewOffset,
                  indices32$1
                ], param$2[1]),
            _addBufferViewData(/* tuple */[
                  indices32Length,
                  indices32Count,
                  Uint32Array.BYTES_PER_ELEMENT,
                  /* Index32 */4
                ], /* tuple */[
                  bufferViewOffset,
                  param[1],
                  param[2]
                ], param[3])
          ];
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_addAllPointData", "should has indices data", "", "", ""));
  }
}

function _addIndex16And32Data(param, param$1, param$2) {
  var index32DataArr = param$2[1];
  var indexDataArr = param$2[0];
  var indicesSize = param$1[2];
  var indices = param$1[0];
  var totalByteLength = param[3];
  var accessorDataArr = param[2];
  var bufferViewDataArr = param[1];
  var bufferViewOffset = param[0];
  if (indices !== undefined) {
    return _addIndex16Data(/* tuple */[
                bufferViewOffset,
                bufferViewDataArr,
                accessorDataArr,
                totalByteLength
              ], /* tuple */[
                Caml_option.valFromOption(indices),
                indicesSize
              ], /* tuple */[
                indexDataArr,
                index32DataArr
              ]);
  } else {
    return _addIndex32Data(/* tuple */[
                bufferViewOffset,
                bufferViewDataArr,
                accessorDataArr,
                totalByteLength
              ], /* tuple */[
                param$1[1],
                indicesSize
              ], /* tuple */[
                indexDataArr,
                index32DataArr
              ]);
  }
}

function _addAllPointData(param, param$1, param$2) {
  var match = param$2[1];
  var match$1 = param$1[1];
  var match$2 = param[2];
  var texCoordsLength = match$2[2];
  var normalsLength = match$2[1];
  var verticesLength = match$2[0];
  var match$3 = param[1];
  var match$4 = param[0];
  var verticesCount = Caml_int32.div(verticesLength, match$3[0]);
  var normalsCount = Caml_int32.div(normalsLength, match$3[1]);
  var texCoordsCount = Caml_int32.div(texCoordsLength, match$3[2]);
  var match$5 = _addPointData(/* tuple */[
        param$1[0],
        match$1[0],
        match$1[1],
        param$2[0]
      ], /* tuple */[
        match$4[0],
        verticesLength,
        verticesCount,
        /* Vertex */0
      ], match[0]);
  var match$6 = match$5[1];
  var match$7 = _addPointData(/* tuple */[
        match$6[3],
        match$6[2],
        match$6[1],
        match$6[4]
      ], /* tuple */[
        match$4[1],
        normalsLength,
        normalsCount,
        /* Normal */1
      ], match$5[0]);
  var match$8 = match$7[1];
  var match$9 = _addPointData(/* tuple */[
        match$8[3],
        match$8[2],
        match$8[1],
        match$8[4]
      ], /* tuple */[
        match$4[2],
        texCoordsLength,
        texCoordsCount,
        /* TexCoord */2
      ], match$7[0]);
  var match$10 = match$9[1];
  var match$11 = _addIndex16And32Data(/* tuple */[
        match$10[3],
        match$10[2],
        match$10[1],
        match$10[4]
      ], /* tuple */[
        match$4[3],
        match$4[4],
        match$3[3]
      ], /* tuple */[
        match[1],
        match[2]
      ]);
  var match$12 = match$11[2];
  return /* tuple */[
          /* tuple */[
            match$6[0],
            match$8[0],
            match$10[0],
            match$12[0]
          ],
          match$12[1],
          match$12[2],
          match$12[3],
          /* tuple */[
            match$12[4],
            /* tuple */[
              match$9[0],
              match$11[0],
              match$11[1]
            ]
          ]
        ];
}

function _addMeshData(param, texCoords, name, meshDataArr) {
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
  Contract$WonderLog.requireCheck((function (param) {
          return GenerateCommon$Wonderjs.checkShouldHasNoSlot(meshPointAndNameDataMap);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = BuildGeometryDataUtils$Wonderjs.getPointSize(/* () */0);
  var indicesSize = match[3];
  var texCoordsSize = match[2];
  var normalsSize = match[1];
  var verticesSize = match[0];
  var match$1 = MutableSparseMapService$WonderCommonlib.reduceiValid((function (param, param$1, meshIndex) {
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
                  verticesSize,
                  normalsSize,
                  texCoordsSize,
                  indicesSize
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
  var match$2 = match$1[2];
  var match$3 = match$1[1];
  return /* tuple */[
          match$1[0][0],
          /* tuple */[
            match$3[0],
            match$3[1],
            match$3[2]
          ],
          /* tuple */[
            match$2[0],
            match$2[1],
            match$2[2]
          ]
        ];
}

export {
  getComponentType ,
  getType ,
  _addBufferViewData ,
  _checkBufferViewOffsetAligned ,
  _addVertexData ,
  _addIndexDataToArr ,
  _addPointData ,
  _addIndexData ,
  _addIndex16Data ,
  _addIndex32Data ,
  _addIndex16And32Data ,
  _addAllPointData ,
  _addMeshData ,
  build ,
  
}
/* Log-WonderLog Not a pure module */
