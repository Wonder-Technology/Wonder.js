'use strict';

var Vector3$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Vector3.bs.js");

function computeTangents(vertices, texCoords, normals, indices) {
  var triangleCount = indices.length / 3 | 0;
  var vertexCount = vertices.length / 3 | 0;
  var tan1 = new Float32Array(Math.imul(vertexCount, 3));
  var tan2 = new Float32Array(Math.imul(vertexCount, 3));
  var i = 0;
  var tangents = new Float32Array(Math.imul(vertexCount, 3));
  while(i < triangleCount) {
    var i1 = indices[Math.imul(i, 3)];
    var i2 = indices[Math.imul(i, 3) + 1 | 0];
    var i3 = indices[Math.imul(i, 3) + 2 | 0];
    var v1x = vertices[Math.imul(i1, 3)];
    var v1y = vertices[Math.imul(i1, 3) + 1 | 0];
    var v1z = vertices[Math.imul(i1, 3) + 2 | 0];
    var v2x = vertices[Math.imul(i2, 3)];
    var v2y = vertices[Math.imul(i2, 3) + 1 | 0];
    var v2z = vertices[Math.imul(i2, 3) + 2 | 0];
    var v3x = vertices[Math.imul(i3, 3)];
    var v3y = vertices[Math.imul(i3, 3) + 1 | 0];
    var v3z = vertices[Math.imul(i3, 3) + 2 | 0];
    var w1x = texCoords[(i1 << 1)];
    var w1y = texCoords[(i1 << 1) + 1 | 0];
    var w2x = texCoords[(i2 << 1)];
    var w2y = texCoords[(i2 << 1) + 1 | 0];
    var w3x = texCoords[(i3 << 1)];
    var w3y = texCoords[(i3 << 1) + 1 | 0];
    var x1 = v2x - v1x;
    var x2 = v3x - v1x;
    var y1 = v2y - v1y;
    var y2 = v3y - v1y;
    var z1 = v2z - v1z;
    var z2 = v3z - v1z;
    var s1 = w2x - w1x;
    var s2 = w3x - w1x;
    var t1 = w2y - w1y;
    var t2 = w3y - w1y;
    var area = s1 * t2 - s2 * t1;
    var match;
    if (area === 0.0) {
      match = [
        [
          0,
          1,
          0
        ],
        [
          1,
          0,
          0
        ]
      ];
    } else {
      var r = 1 / area;
      match = [
        [
          (t2 * x1 - t1 * x2) * r,
          (t2 * y1 - t1 * y2) * r,
          (t2 * z1 - t1 * z2) * r
        ],
        [
          (s1 * x2 - s2 * x1) * r,
          (s1 * y2 - s2 * y1) * r,
          (s1 * z2 - s2 * z1) * r
        ]
      ];
    }
    var match$1 = match[1];
    var tz = match$1[2];
    var ty = match$1[1];
    var tx = match$1[0];
    var match$2 = match[0];
    var sz = match$2[2];
    var sy = match$2[1];
    var sx = match$2[0];
    tan1[Math.imul(i1, 3) + 0 | 0] = tan1[Math.imul(i1, 3) + 0 | 0] + sx;
    tan1[Math.imul(i1, 3) + 1 | 0] = tan1[Math.imul(i1, 3) + 1 | 0] + sy;
    tan1[Math.imul(i1, 3) + 2 | 0] = tan1[Math.imul(i1, 3) + 2 | 0] + sz;
    tan1[Math.imul(i2, 3) + 0 | 0] = tan1[Math.imul(i2, 3) + 0 | 0] + sx;
    tan1[Math.imul(i2, 3) + 1 | 0] = tan1[Math.imul(i2, 3) + 1 | 0] + sy;
    tan1[Math.imul(i2, 3) + 2 | 0] = tan1[Math.imul(i2, 3) + 2 | 0] + sz;
    tan1[Math.imul(i3, 3) + 0 | 0] = tan1[Math.imul(i3, 3) + 0 | 0] + sx;
    tan1[Math.imul(i3, 3) + 1 | 0] = tan1[Math.imul(i3, 3) + 1 | 0] + sy;
    tan1[Math.imul(i3, 3) + 2 | 0] = tan1[Math.imul(i3, 3) + 2 | 0] + sz;
    tan2[Math.imul(i1, 3) + 0 | 0] = tan2[Math.imul(i1, 3) + 0 | 0] + tx;
    tan2[Math.imul(i1, 3) + 1 | 0] = tan2[Math.imul(i1, 3) + 1 | 0] + ty;
    tan2[Math.imul(i1, 3) + 2 | 0] = tan2[Math.imul(i1, 3) + 2 | 0] + tz;
    tan2[Math.imul(i2, 3) + 0 | 0] = tan2[Math.imul(i2, 3) + 0 | 0] + tx;
    tan2[Math.imul(i2, 3) + 1 | 0] = tan2[Math.imul(i2, 3) + 1 | 0] + ty;
    tan2[Math.imul(i2, 3) + 2 | 0] = tan2[Math.imul(i2, 3) + 2 | 0] + tz;
    tan2[Math.imul(i3, 3) + 0 | 0] = tan2[Math.imul(i3, 3) + 0 | 0] + tx;
    tan2[Math.imul(i3, 3) + 1 | 0] = tan2[Math.imul(i3, 3) + 1 | 0] + ty;
    tan2[Math.imul(i3, 3) + 2 | 0] = tan2[Math.imul(i3, 3) + 2 | 0] + tz;
    i = i + 1 | 0;
  };
  i = 0;
  while(i < vertexCount) {
    var n_0 = normals[Math.imul(i, 3)];
    var n_1 = normals[Math.imul(i, 3) + 1 | 0];
    var n_2 = normals[Math.imul(i, 3) + 2 | 0];
    var n = [
      n_0,
      n_1,
      n_2
    ];
    var t1_0 = tan1[Math.imul(i, 3)];
    var t1_1 = tan1[Math.imul(i, 3) + 1 | 0];
    var t1_2 = tan1[Math.imul(i, 3) + 2 | 0];
    var t1$1 = [
      t1_0,
      t1_1,
      t1_2
    ];
    tan2[Math.imul(i, 3)];
    tan2[Math.imul(i, 3) + 1 | 0];
    tan2[Math.imul(i, 3) + 2 | 0];
    var ndott = Vector3$WonderCommonlib.dot(n, t1$1);
    var temp = Vector3$WonderCommonlib.scale(/* Float */0, n, ndott);
    var match$3 = Vector3$WonderCommonlib.normalize(Vector3$WonderCommonlib.sub(/* Float */0, t1$1, temp));
    tangents[Math.imul(i, 3)] = match$3[0];
    tangents[Math.imul(i, 3) + 1 | 0] = match$3[1];
    tangents[Math.imul(i, 3) + 2 | 0] = match$3[2];
    i = i + 1 | 0;
  };
  return tangents;
}

exports.computeTangents = computeTangents;
/* No side effect */
