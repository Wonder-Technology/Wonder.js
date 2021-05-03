

import * as Caml_obj from "./../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Caml_int32 from "./../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Matrix4Service$Wonderjs from "../service/atom/Matrix4Service.js";
import * as Vector3Service$Wonderjs from "../service/atom/Vector3Service.js";

function unproject(vec3, cameraToWorldMatrix, projectionMatrix) {
  return Vector3Service$Wonderjs.transformMat4Tuple(vec3, Matrix4Service$Wonderjs.multiply(cameraToWorldMatrix, Matrix4Service$Wonderjs.invert(projectionMatrix, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0)), Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0)));
}

function multiplyScalar(param, scalar) {
  return /* tuple */[
          param[0] * scalar,
          param[1] * scalar,
          param[2] * scalar
        ];
}

function addScalar(param, scalar) {
  return /* tuple */[
          param[0] + scalar,
          param[1] + scalar,
          param[2] + scalar
        ];
}

function fromBufferAttribute(vertices, index) {
  var vIndex = Caml_int32.imul(index, 3);
  return /* tuple */[
          vertices[vIndex],
          vertices[vIndex + 1 | 0],
          vertices[vIndex + 2 | 0]
        ];
}

function distanceToSquared(param, param$1) {
  var dx = param[0] - param$1[0];
  var dy = param[1] - param$1[1];
  var dz = param[2] - param$1[2];
  return dx * dx + dy * dy + dz * dz;
}

function distanceTo(vec, v) {
  return Math.sqrt(distanceToSquared(vec, v));
}

function dot(param, param$1) {
  return param[0] * param$1[0] + param[1] * param$1[1] + param[2] * param$1[2];
}

function min(param, param$1) {
  var vz = param$1[2];
  var vy = param$1[1];
  var vx = param$1[0];
  var z = param[2];
  var y = param[1];
  var x = param[0];
  var match = Caml_obj.caml_greaterthan(x, vx);
  var match$1 = Caml_obj.caml_greaterthan(y, vy);
  var match$2 = Caml_obj.caml_greaterthan(z, vz);
  return /* tuple */[
          match ? vx : x,
          match$1 ? vy : y,
          match$2 ? vz : z
        ];
}

function max(param, param$1) {
  var vz = param$1[2];
  var vy = param$1[1];
  var vx = param$1[0];
  var z = param[2];
  var y = param[1];
  var x = param[0];
  var match = Caml_obj.caml_lessthan(x, vx);
  var match$1 = Caml_obj.caml_lessthan(y, vy);
  var match$2 = Caml_obj.caml_lessthan(z, vz);
  return /* tuple */[
          match ? vx : x,
          match$1 ? vy : y,
          match$2 ? vz : z
        ];
}

function lengthSq(param) {
  var z = param[2];
  var y = param[1];
  var x = param[0];
  return x * x + y * y + z * z;
}

function length(vec) {
  return Math.sqrt(lengthSq(vec));
}

function projectOnVector(sourceVec, targetVec) {
  var scalar = dot(targetVec, sourceVec) / lengthSq(targetVec);
  return multiplyScalar(targetVec, scalar);
}

function projectOnPlane(planeNormal, vec) {
  return Vector3Service$Wonderjs.sub(/* Float */0, vec, projectOnVector(vec, planeNormal));
}

export {
  unproject ,
  multiplyScalar ,
  addScalar ,
  fromBufferAttribute ,
  distanceToSquared ,
  distanceTo ,
  dot ,
  min ,
  max ,
  lengthSq ,
  length ,
  projectOnVector ,
  projectOnPlane ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
