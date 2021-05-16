

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SettingTool$Wonderjs from "../service/setting/SettingTool.js";
import * as GameObjectAPI$Wonderjs from "../../../src/api/GameObjectAPI.js";
import * as GameObjectTool$Wonderjs from "../service/gameObject/GameObjectTool.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function prepareForOptimize(state) {
  var state$1 = SettingTool$Wonderjs.setMemory(state[0], 1, /* () */0);
  var match = GameObjectAPI$Wonderjs.createGameObject(state$1);
  var gameObject1 = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject2 = match$1[1];
  var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
  var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject1, match$2[0]);
  var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, state$2);
  return /* tuple */[
          state$3,
          gameObject1,
          gameObject2,
          match$2[1]
        ];
}

function judgeForOptimize(state, gameObject1, gameObject2, gameObject3) {
  var match = GameObjectTool$Wonderjs.getGameObjectRecord(state);
  var transformMap = match[/* transformMap */30];
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                  MutableSparseMapService$WonderCommonlib.has(gameObject1, transformMap),
                  MutableSparseMapService$WonderCommonlib.has(gameObject2, transformMap),
                  MutableSparseMapService$WonderCommonlib.has(gameObject3, transformMap)
                ]), /* tuple */[
              false,
              false,
              true
            ]);
}

export {
  prepareForOptimize ,
  judgeForOptimize ,
  
}
/* Wonder_jest Not a pure module */
