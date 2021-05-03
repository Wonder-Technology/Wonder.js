

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Vector3Service$Wonderjs from "../../../atom/Vector3Service.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _buildFaceData(width, height, depth) {
  return /* tuple */[
          /* array */[
            /* array */[
              0,
              1,
              3
            ],
            /* array */[
              4,
              5,
              7
            ],
            /* array */[
              3,
              2,
              6
            ],
            /* array */[
              1,
              0,
              4
            ],
            /* array */[
              1,
              4,
              2
            ],
            /* array */[
              5,
              0,
              6
            ]
          ],
          /* array */[
            /* array */[
              0,
              0,
              1
            ],
            /* array */[
              0,
              0,
              -1
            ],
            /* array */[
              0,
              1,
              0
            ],
            /* array */[
              0,
              -1,
              0
            ],
            /* array */[
              1,
              0,
              0
            ],
            /* array */[
              -1,
              0,
              0
            ]
          ],
          /* array */[
            /* tuple */[
              -width,
              -height,
              depth
            ],
            /* tuple */[
              width,
              -height,
              depth
            ],
            /* tuple */[
              width,
              height,
              depth
            ],
            /* tuple */[
              -width,
              height,
              depth
            ],
            /* tuple */[
              width,
              -height,
              -depth
            ],
            /* tuple */[
              -width,
              -height,
              -depth
            ],
            /* tuple */[
              -width,
              height,
              -depth
            ],
            /* tuple */[
              width,
              height,
              -depth
            ]
          ]
        ];
}

function _getLerpData(param, param$1, param$2) {
  var side = param$1[0];
  var corners = param[1];
  var faceAxes = param[0];
  return Vector3Service$Wonderjs.lerp(Caml_array.caml_array_get(corners, Caml_array.caml_array_get(Caml_array.caml_array_get(faceAxes, side), param$2[0])), Caml_array.caml_array_get(corners, Caml_array.caml_array_get(Caml_array.caml_array_get(faceAxes, side), param$2[1])), param$2[2] / param$1[1]);
}

function _generateVertex(param, param$1, param$2, vertices) {
  var corners = param$1[1];
  var faceAxes = param$1[0];
  var side = param[0];
  var match = Vector3Service$Wonderjs.add(/* Float */0, _getLerpData(/* tuple */[
            faceAxes,
            corners
          ], /* tuple */[
            side,
            param[1]
          ], /* tuple */[
            0,
            1,
            param$2[0]
          ]), Vector3Service$Wonderjs.sub(/* Float */0, _getLerpData(/* tuple */[
                faceAxes,
                corners
              ], /* tuple */[
                side,
                param[2]
              ], /* tuple */[
                0,
                2,
                param$2[1]
              ]), Caml_array.caml_array_get(corners, Caml_array.caml_array_get(Caml_array.caml_array_get(faceAxes, side), 0))));
  vertices.push(match[0], match[1], match[2]);
  return /* () */0;
}

function _generateTexCoord(u, v, texCoords) {
  texCoords.push(u, v);
  return /* () */0;
}

function _generateNormal(side, faceNormals, normals) {
  normals.push(Caml_array.caml_array_get(Caml_array.caml_array_get(faceNormals, side), 0), Caml_array.caml_array_get(Caml_array.caml_array_get(faceNormals, side), 1), Caml_array.caml_array_get(Caml_array.caml_array_get(faceNormals, side), 2));
  return /* () */0;
}

function _generateIndex(param, param$1, indices) {
  var vSegmentIndex = param$1[1];
  var uSegmentIndex = param$1[0];
  var offset = param[2];
  var uSegment = param[0];
  if (uSegmentIndex < uSegment && vSegmentIndex < param[1]) {
    indices.push((offset + vSegmentIndex | 0) + Caml_int32.imul(uSegmentIndex, uSegment + 1 | 0) | 0, (offset + vSegmentIndex | 0) + Caml_int32.imul(uSegmentIndex + 1 | 0, uSegment + 1 | 0) | 0, ((offset + vSegmentIndex | 0) + Caml_int32.imul(uSegmentIndex, uSegment + 1 | 0) | 0) + 1 | 0, (offset + vSegmentIndex | 0) + Caml_int32.imul(uSegmentIndex + 1 | 0, uSegment + 1 | 0) | 0, ((offset + vSegmentIndex | 0) + Caml_int32.imul(uSegmentIndex + 1 | 0, uSegment + 1 | 0) | 0) + 1 | 0, ((offset + vSegmentIndex | 0) + Caml_int32.imul(uSegmentIndex, uSegment + 1 | 0) | 0) + 1 | 0);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function _generateFace(directionDataTuple, param, param$1) {
  var vSegment = directionDataTuple[2];
  var uSegment = directionDataTuple[1];
  var side = directionDataTuple[0];
  var indices = param$1[3];
  var normals = param$1[2];
  var texCoords = param$1[1];
  var vertices = param$1[0];
  var corners = param[2];
  var faceNormals = param[1];
  var faceAxes = param[0];
  var offset = vertices.length / 3 | 0;
  for(var i = 0; i <= uSegment; ++i){
    for(var j = 0; j <= vSegment; ++j){
      var segmentIndexTuple = /* tuple */[
        i,
        j
      ];
      _generateVertex(directionDataTuple, /* tuple */[
            faceAxes,
            corners
          ], segmentIndexTuple, vertices);
      _generateTexCoord(i / uSegment, j / vSegment, texCoords);
      _generateNormal(side, faceNormals, normals);
      _generateIndex(/* tuple */[
            uSegment,
            vSegment,
            offset
          ], segmentIndexTuple, indices);
    }
  }
  return /* tuple */[
          vertices,
          texCoords,
          normals,
          indices
        ];
}

function _buildAllFaceDirectionDataTupleArr(widthSegment, heightSegment, depthSegment) {
  return /* array */[
          /* tuple */[
            0,
            widthSegment,
            heightSegment
          ],
          /* tuple */[
            1,
            widthSegment,
            heightSegment
          ],
          /* tuple */[
            2,
            widthSegment,
            depthSegment
          ],
          /* tuple */[
            3,
            widthSegment,
            depthSegment
          ],
          /* tuple */[
            4,
            depthSegment,
            heightSegment
          ],
          /* tuple */[
            5,
            depthSegment,
            heightSegment
          ]
        ];
}

function generateAllFaces(param) {
  var faceDataTuple = _buildFaceData(param[0], param[1], param[2]);
  return ArrayService$WonderCommonlib.reduceOneParam((function (pointsTuple, directionDataTuple) {
                return _generateFace(directionDataTuple, faceDataTuple, pointsTuple);
              }), /* tuple */[
              ArrayService$WonderCommonlib.createEmpty(/* () */0),
              ArrayService$WonderCommonlib.createEmpty(/* () */0),
              ArrayService$WonderCommonlib.createEmpty(/* () */0),
              ArrayService$WonderCommonlib.createEmpty(/* () */0)
            ], _buildAllFaceDirectionDataTupleArr(param[3], param[4], param[5]));
}

export {
  _buildFaceData ,
  _getLerpData ,
  _generateVertex ,
  _generateTexCoord ,
  _generateNormal ,
  _generateIndex ,
  _generateFace ,
  _buildAllFaceDirectionDataTupleArr ,
  generateAllFaces ,
  
}
/* No side effect */
