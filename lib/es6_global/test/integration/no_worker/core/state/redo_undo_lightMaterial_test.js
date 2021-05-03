

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as AllMaterialTool$Wonderjs from "../../../../tool/service/material/AllMaterialTool.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as LightMaterialTool$Wonderjs from "../../../../tool/service/material/LightMaterialTool.js";
import * as LoopRenderJobTool$Wonderjs from "../../../../tool/job/no_worker/loop/LoopRenderJobTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

Wonder_jest.describe("test redo,undo lightMaterial", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        var _prepareLightMaterialData = function (state) {
          var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
          var match$1 = LightMaterialTool$Wonderjs.createGameObject(match[0]);
          var material2 = match$1[2];
          var match$2 = LightMaterialTool$Wonderjs.createGameObject(match$1[0]);
          var state$1 = AllMaterialTool$Wonderjs.prepareForInit(match$2[0]);
          var diffuseColor2 = /* array */[
            1,
            0.5,
            0.0
          ];
          var specularColor2 = /* array */[
            0,
            1.0,
            0.5
          ];
          var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material2, diffuseColor2, state$1);
          var state$3 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularColor(material2, specularColor2, state$2);
          return /* tuple */[
                  state$3,
                  match[1],
                  match$1[1],
                  match$2[1],
                  match[2],
                  material2,
                  match$2[2]
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("deep copy light material record", (function (param) {
                Wonder_jest.test("shadow copy nameMap, materialArrayForWorkerInit", (function (param) {
                        return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                      var match = LightMaterialTool$Wonderjs.getRecord(state);
                                      var materialArrayForWorkerInit = match[/* materialArrayForWorkerInit */14];
                                      return /* array */[
                                              match[/* nameMap */13],
                                              materialArrayForWorkerInit
                                            ];
                                    }), state[0]);
                      }));
                return Wonder_jest.test("deep copy gameObjectsMap", (function (param) {
                              var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                              var basicMaterial1 = match[2];
                              var state$1 = match[0];
                              var match$1 = LightMaterialTool$Wonderjs.getRecord(state$1);
                              var originGameObjectsArr = /* array */[1];
                              var originEmptyMapUnitArrayMap = /* array */[
                                2,
                                1,
                                0
                              ];
                              var copiedOriginGameObjectsArr = originGameObjectsArr.slice();
                              originEmptyMapUnitArrayMap.slice();
                              MutableSparseMapService$WonderCommonlib.set(basicMaterial1, originGameObjectsArr, match$1[/* gameObjectsMap */11]);
                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                              var match$2 = LightMaterialTool$Wonderjs.getRecord(copiedState);
                              var arr = MutableSparseMapService$WonderCommonlib.unsafeGet(basicMaterial1, match$2[/* gameObjectsMap */11]);
                              arr[0] = 2;
                              var match$3 = LightMaterialTool$Wonderjs.getRecord(state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.unsafeGet(basicMaterial1, match$3[/* gameObjectsMap */11])), copiedOriginGameObjectsArr);
                            }));
              }));
        return Wonder_jest.describe("restore light material record to target state", (function (param) {
                      return Wonder_jest.test("test restore typeArrays", (function (param) {
                                    state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                                    var match = _prepareLightMaterialData(state);
                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                    var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                    var match$1 = LightMaterialTool$Wonderjs.createGameObject(state$1);
                                    var material4 = match$1[2];
                                    var currentState = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material4, /* array */[
                                          1,
                                          0.1,
                                          1
                                        ], match$1[0]);
                                    var currentState$1 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularColor(material4, /* array */[
                                          0.5,
                                          0.2,
                                          0
                                        ], currentState);
                                    LightMaterialTool$Wonderjs.createAndSetMaps(material4, state$1);
                                    var currentState$2 = AllMaterialTool$Wonderjs.pregetGLSLData(currentState$1);
                                    MainStateTool$Wonderjs.restore(currentState$2, copiedState);
                                    var match$2 = LightMaterialTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                    var defaultTextureIndex = LightMaterialTool$Wonderjs.getDefaultTextureIndex(/* () */0);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    match$2[/* diffuseColors */3],
                                                    match$2[/* specularColors */4],
                                                    match$2[/* diffuseTextureIndices */6],
                                                    match$2[/* specularTextureIndices */7]
                                                  ]), /* tuple */[
                                                new Float32Array(/* array */[
                                                      1,
                                                      1,
                                                      1,
                                                      1,
                                                      0.5,
                                                      0,
                                                      1,
                                                      1,
                                                      1,
                                                      1,
                                                      1,
                                                      1
                                                    ]),
                                                new Float32Array(/* array */[
                                                      1,
                                                      1,
                                                      1,
                                                      0,
                                                      1,
                                                      0.5,
                                                      1,
                                                      1,
                                                      1,
                                                      1,
                                                      1,
                                                      1
                                                    ]),
                                                new Uint32Array(/* array */[
                                                      defaultTextureIndex,
                                                      defaultTextureIndex,
                                                      defaultTextureIndex,
                                                      defaultTextureIndex
                                                    ]),
                                                new Uint32Array(/* array */[
                                                      defaultTextureIndex,
                                                      defaultTextureIndex,
                                                      defaultTextureIndex,
                                                      defaultTextureIndex
                                                    ])
                                              ]);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
