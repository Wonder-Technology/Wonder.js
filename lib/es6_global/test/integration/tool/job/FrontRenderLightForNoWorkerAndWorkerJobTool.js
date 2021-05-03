

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "./../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as CameraTool$Wonderjs from "../../../tool/service/camera/CameraTool.js";
import * as TransformAPI$Wonderjs from "../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as PointLightTool$Wonderjs from "../../../tool/service/light/PointLightTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../worker/tool/FakeGlWorkerTool.js";
import * as GLSLLocationTool$Wonderjs from "../../../tool/service/location/GLSLLocationTool.js";
import * as DirectionLightTool$Wonderjs from "../../../tool/service/light/DirectionLightTool.js";
import * as FrontRenderLightJobTool$Wonderjs from "../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js";

function prepareForUseProgramCase(sandbox, state) {
  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
}

function setFakeGlForLight(sandbox, nameArr, state) {
  var uniform1f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var posArr = nameArr.map((function (param, index) {
          return index;
        }));
  var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocationWithNameArr(sandbox, Sinon.createEmptyStubWithJsObjSandbox(sandbox), nameArr, posArr);
  var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform1f), Caml_option.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
  return /* tuple */[
          state$1,
          posArr,
          /* tuple */[
            uniform1f,
            uniform3f
          ]
        ];
}

function prepareOneForDirectionLight(sandbox, state) {
  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
  var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
  var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
  return /* tuple */[
          match$2[0],
          match$1[1],
          match[3],
          match$1[2],
          match$2[2]
        ];
}

function prepareOneForPointLight(sandbox, state) {
  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
  var match$1 = PointLightTool$Wonderjs.createGameObject(match[0]);
  var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
  return /* tuple */[
          match$2[0],
          match$1[1],
          match[3],
          match$1[2],
          match$2[2]
        ];
}

function prepareFourForPointLight(sandbox, state) {
  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
  var match$1 = PointLightTool$Wonderjs.createGameObject(match[0]);
  var match$2 = PointLightTool$Wonderjs.createGameObject(match$1[0]);
  var match$3 = PointLightTool$Wonderjs.createGameObject(match$2[0]);
  var match$4 = PointLightTool$Wonderjs.createGameObject(match$3[0]);
  var match$5 = CameraTool$Wonderjs.createCameraGameObject(match$4[0]);
  return /* tuple */[
          match$5[0],
          /* tuple */[
            match$1[1],
            match$2[1],
            match$3[1],
            match$4[1]
          ],
          match[3],
          /* tuple */[
            match$1[2],
            match$2[2],
            match$3[2],
            match$4[2]
          ],
          match$5[2]
        ];
}

function testOneLight(sandbox, state, prepareOneFunc, execAndJudgeFunc) {
  var match = Curry._2(prepareOneFunc, sandbox, state[0]);
  var state$1 = match[0];
  var state$2 = TransformAPI$Wonderjs.setTransformLocalRotation(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match[1], state$1), /* tuple */[
        0.1,
        10.5,
        1.5,
        1
      ], state$1);
  var match$1 = setFakeGlForLight(sandbox, /* array */["u_directionLights[0].direction"], state$2);
  return Curry._4(execAndJudgeFunc, sandbox, /* array */[
              Caml_array.caml_array_get(match$1[1], 0),
              0.0809289658069698,
              0.7083167921793907,
              -0.7012402045020751
            ], match$1[2][1], match$1[0]);
}

var TestSendDirection = /* module */[/* testOneLight */testOneLight];

export {
  prepareForUseProgramCase ,
  setFakeGlForLight ,
  prepareOneForDirectionLight ,
  prepareOneForPointLight ,
  prepareFourForPointLight ,
  TestSendDirection ,
  
}
/* Sinon Not a pure module */
