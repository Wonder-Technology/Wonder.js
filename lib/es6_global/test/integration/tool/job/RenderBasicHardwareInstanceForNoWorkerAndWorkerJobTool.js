

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "./../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ArrayService$Wonderjs from "../../../../src/service/atom/ArrayService.js";
import * as TransformAPI$Wonderjs from "../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as TransformTool$Wonderjs from "../../../tool/service/transform/TransformTool.js";
import * as GLSLLocationTool$Wonderjs from "../../../tool/service/location/GLSLLocationTool.js";
import * as TypeArrayService$Wonderjs from "../../../../src/service/primitive/buffer/TypeArrayService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

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

export {
  prepareForBufferSubDataCase ,
  testForBufferSubDataCase ,
  prepareGetAttribLocationForHandleInstanceData ,
  
}
/* Sinon Not a pure module */
