

import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function getGLSLLocationRecord(state) {
  return state[/* glslLocationRecord */31];
}

function stubLocation(stub, pos, sandbox, name) {
  Sinon.returns(pos, Sinon.withTwoArgs(Sinon$1.match.any, name, stub));
  return stub;
}

function _getLocation($staropt$star, sandbox, name) {
  var pos = $staropt$star !== undefined ? $staropt$star : 10;
  return stubLocation(Sinon.createEmptyStubWithJsObjSandbox(sandbox), pos, sandbox, name);
}

function getUniformLocationWithNameArr(sandbox, stub, nameArr, posArr) {
  return nameArr.reduce((function (stub, name, index) {
                Sinon.returns(Caml_array.caml_array_get(posArr, index), Sinon.withTwoArgs(Sinon$1.match.any, name, stub));
                return stub;
              }), stub);
}

function getUniformLocationWithPosArr(sandbox, posArr, nameArr) {
  var stub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  posArr.forEach((function (pos, i) {
          Sinon.returns(pos, Sinon.withTwoArgs(Sinon$1.match.any, Caml_array.caml_array_get(nameArr, i), stub));
          return /* () */0;
        }));
  return stub;
}

var getAttribLocation = _getLocation;

var getUniformLocation = _getLocation;

export {
  getGLSLLocationRecord ,
  stubLocation ,
  _getLocation ,
  getAttribLocation ,
  getUniformLocation ,
  getUniformLocationWithNameArr ,
  getUniformLocationWithPosArr ,
  
}
/* Sinon Not a pure module */
