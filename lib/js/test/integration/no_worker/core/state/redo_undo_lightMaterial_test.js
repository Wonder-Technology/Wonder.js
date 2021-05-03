'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var RenderJobsTool$Wonderjs = require("../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var AllMaterialTool$Wonderjs = require("../../../../tool/service/material/AllMaterialTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../src/api/material/LightMaterialAPI.js");
var LightMaterialTool$Wonderjs = require("../../../../tool/service/material/LightMaterialTool.js");
var LoopRenderJobTool$Wonderjs = require("../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");

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

/*  Not a pure module */
