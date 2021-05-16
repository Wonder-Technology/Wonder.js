

import * as Caml_int32 from "../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Vector3Service$Wonderjs from "../../atom/Vector3Service.js";
import * as AbstractIndicesService$Wonderjs from "./AbstractIndicesService.js";

function _getPosition(vertices, vIndex) {
  return /* tuple */[
          vertices[vIndex],
          vertices[vIndex + 1 | 0],
          vertices[vIndex + 2 | 0]
        ];
}

function _setNormal(param, vIndex, normals) {
  normals[vIndex] = normals[vIndex] + param[0];
  normals[vIndex + 1 | 0] = normals[vIndex + 1 | 0] + param[1];
  normals[vIndex + 2 | 0] = normals[vIndex + 2 | 0] + param[2];
  return normals;
}

function _normalizeNormals(normals) {
  var len = normals.length;
  var _index = 0;
  var normals$1 = normals;
  while(true) {
    var index = _index;
    var match = index >= len;
    if (match) {
      return normals$1;
    } else {
      var x = normals$1[index];
      var y = normals$1[index + 1 | 0];
      var z = normals$1[index + 2 | 0];
      var d = Math.sqrt(x * x + y * y + z * z);
      var match$1 = d === 0;
      if (match$1) {
        normals$1[index] = 0;
        normals$1[index + 1 | 0] = 0;
        normals$1[index + 2 | 0] = 0;
      } else {
        normals$1[index] = x / d;
        normals$1[index + 1 | 0] = y / d;
        normals$1[index + 2 | 0] = z / d;
      }
      _index = index + 3 | 0;
      continue ;
    }
  };
}

function _createDefaultNormals(count) {
  return new Float32Array(count);
}

function computeVertexNormals(vertices, indices) {
  var _compute = function (indicesLen, _index, _normals) {
    while(true) {
      var normals = _normals;
      var index = _index;
      var match = index >= indicesLen;
      if (match) {
        return normals;
      } else {
        var va = Caml_int32.imul(AbstractIndicesService$Wonderjs.unsafeGetIndex(index, indices), 3);
        var vb = Caml_int32.imul(AbstractIndicesService$Wonderjs.unsafeGetIndex(index + 1 | 0, indices), 3);
        var vc = Caml_int32.imul(AbstractIndicesService$Wonderjs.unsafeGetIndex(index + 2 | 0, indices), 3);
        var pa = _getPosition(vertices, va);
        var pb = _getPosition(vertices, vb);
        var pc = _getPosition(vertices, vc);
        var v0 = Vector3Service$Wonderjs.sub(/* Float */0, pc, pb);
        var v1 = Vector3Service$Wonderjs.sub(/* Float */0, pa, pb);
        var faceNormalTuple = Vector3Service$Wonderjs.cross(v0, v1);
        _normals = _setNormal(faceNormalTuple, vc, _setNormal(faceNormalTuple, vb, _setNormal(faceNormalTuple, va, normals)));
        _index = index + 3 | 0;
        continue ;
      }
    };
  };
  return _normalizeNormals(_compute(AbstractIndicesService$Wonderjs.getIndicesLength(indices), 0, new Float32Array(vertices.length)));
}

export {
  _getPosition ,
  _setNormal ,
  _normalizeNormals ,
  _createDefaultNormals ,
  computeVertexNormals ,
  
}
/* No side effect */
