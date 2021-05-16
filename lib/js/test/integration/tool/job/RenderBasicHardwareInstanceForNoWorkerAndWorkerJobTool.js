'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ArrayService$Wonderjs = require("../../../../src/service/atom/ArrayService.js");
var TransformAPI$Wonderjs = require("../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var TransformTool$Wonderjs = require("../../../tool/service/transform/TransformTool.js");
var GLSLLocationTool$Wonderjs = require("../../../tool/service/location/GLSLLocationTool.js");
var TypeArrayService$Wonderjs = require("../../../../src/service/primitive/buffer/TypeArrayService.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");

function prepareForBufferSubDataCase(sandbox, prepareFunc, state) {
  var match = Curry._2(prepareFunc, sandbox, state[0]);
  var objectInstanceGameObject = match[3];
  var state$1 = match[0];
  var sourceTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match[1], state$1);
  var objectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(objectInstanceGameObject, state$1);
  var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(objectInstanceGameObject, /* tuple */[
        2,
        4,
        5
      ], TransformAPI$Wonderjs.setTransformLocalPosition(sourceTransform, /* tuple */[
            1,
            2,
            3
          ], state$1));
  var bufferSubData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  return /* tuple */[
          state$2,
          /* tuple */[
            sourceTransform,
            objectTransform
          ],
          1,
          bufferSubData
        ];
}

function testForBufferSubDataCase(sandbox, param, array_buffer, bufferSubDataFunc, state) {
  var data = new Float32Array(1024);
  var transformArr = /* array */[
    param[0],
    param[1]
  ];
  ArrayService$WonderCommonlib.reduceOneParam((function (offset, index) {
          var transform = Caml_array.caml_array_get(transformArr, index);
          TypeArrayService$Wonderjs.fillFloat32ArrayWithOffset(data, TransformTool$Wonderjs.getLocalToWorldMatrixTypeArray(transform, state), offset);
          return offset + 16 | 0;
        }), 0, ArrayService$Wonderjs.range(0, 1));
  ArrayService$WonderCommonlib.reduceOneParam((function (offset, index) {
          TypeArrayService$Wonderjs.fillFloat32ArrayWithOffset(data, new Float32Array(/* array */[
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                  ]), offset);
          return offset + 16 | 0;
        }), 32, ArrayService$Wonderjs.range(2, 63));
  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(array_buffer, 0, data, bufferSubDataFunc)));
}

function prepareGetAttribLocationForHandleInstanceData(sandbox, state) {
  var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(1, sandbox, "a_mVec4_0");
  Sinon.returns(2, Sinon.withTwoArgs(Sinon$1.match.any, "a_mVec4_1", getAttribLocation));
  Sinon.returns(3, Sinon.withTwoArgs(Sinon$1.match.any, "a_mVec4_2", getAttribLocation));
  Sinon.returns(4, Sinon.withTwoArgs(Sinon$1.match.any, "a_mVec4_3", getAttribLocation));
  return /* tuple */[
          state,
          1,
          2,
          3,
          4,
          getAttribLocation
        ];
}

exports.prepareForBufferSubDataCase = prepareForBufferSubDataCase;
exports.testForBufferSubDataCase = testForBufferSubDataCase;
exports.prepareGetAttribLocationForHandleInstanceData = prepareGetAttribLocationForHandleInstanceData;
/* Sinon Not a pure module */
