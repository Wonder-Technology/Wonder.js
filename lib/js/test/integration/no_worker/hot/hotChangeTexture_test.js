'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var CameraTool$Wonderjs = require("../../../tool/service/camera/CameraTool.js");
var FakeGlTool$Wonderjs = require("../../../tool/gl/FakeGlTool.js");
var DirectorTool$Wonderjs = require("../../../tool/core/DirectorTool.js");
var RenderJobsTool$Wonderjs = require("../../../tool/job/no_worker/loop/RenderJobsTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../src/api/material/LightMaterialAPI.js");
var LoopRenderJobTool$Wonderjs = require("../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../src/api/texture/BasicSourceTextureAPI.js");
var RenderMaterialMapTool$Wonderjs = require("../job/loop/tool/RenderMaterialMapTool.js");
var CreateStateMainService$Wonderjs = require("../../../../src/service/state/main/state/CreateStateMainService.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");

Wonder_jest.describe("hot change texture", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test change texture", (function (param) {
                      var _prepareForUpdateTexture = function (state) {
                        var match = CameraTool$Wonderjs.createCameraGameObject(state);
                        var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                        return /* tuple */[
                                state$1,
                                /* tuple */[
                                  2,
                                  pixelStorei
                                ]
                              ];
                      };
                      Wonder_jest.describe("test basic material", (function (param) {
                              return Wonder_jest.describe("test map", (function (param) {
                                            Wonder_jest.test("should get the new texture", (function (param) {
                                                    var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                                    var material = match[1];
                                                    var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                                                    var map1 = match$1[1];
                                                    var match$2 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$1[0]);
                                                    var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, match$2[1], match$2[0]);
                                                    var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, map1, state$1);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(material, state$2)), map1);
                                                  }));
                                            Wonder_jest.test("should bind the new texture", (function (param) {
                                                    var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedDiffuseMap(sandbox, state[0]);
                                                    var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                                                    var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                                    var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                                                    var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                    var state$3 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(match[3], match$1[1], state$2);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                    return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](bindTexture));
                                                  }));
                                            return Wonder_jest.describe("test update texture", (function (param) {
                                                          var _prepare = function (map1, map2, state) {
                                                            var state$1 = RenderMaterialMapTool$Wonderjs.setSource(/* :: */[
                                                                  map1,
                                                                  /* :: */[
                                                                    map2,
                                                                    /* [] */0
                                                                  ]
                                                                ], state);
                                                            var match = _prepareForUpdateTexture(state$1);
                                                            var match$1 = match[1];
                                                            return /* tuple */[
                                                                    match[0],
                                                                    /* tuple */[
                                                                      map1,
                                                                      map2
                                                                    ],
                                                                    /* tuple */[
                                                                      match$1[0],
                                                                      match$1[1]
                                                                    ]
                                                                  ];
                                                          };
                                                          Wonder_jest.test("should bind the new texture", (function (param) {
                                                                  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedDiffuseMap(sandbox, state[0]);
                                                                  var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                                                                  var match$2 = _prepare(match[5], match$1[1], match$1[0]);
                                                                  var match$3 = match$2[2];
                                                                  var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$2[0]));
                                                                  var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(match[3], match$2[1][1], state$1);
                                                                  DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                                  return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(match$3[0], match$3[1])));
                                                                }));
                                                          return Wonder_jest.test("if new texture has already updated before, not update", (function (param) {
                                                                        var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedDiffuseMap(sandbox, state[0]);
                                                                        var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedDiffuseMap(sandbox, match[0]);
                                                                        var match$2 = _prepare(match[5], match$1[5], match$1[0]);
                                                                        var match$3 = match$2[2];
                                                                        var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$2[0]));
                                                                        var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(match[3], match$2[1][1], state$1);
                                                                        DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                                        return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(match$3[0], match$3[1])));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test light material", (function (param) {
                                    return Wonder_jest.describe("test diffuseMap+specularMap", (function (param) {
                                                  Wonder_jest.test("should get the new texture", (function (param) {
                                                          var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                                          var material = match[1];
                                                          var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                                                          var match$2 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$1[0]);
                                                          var match$3 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$2[0]);
                                                          var map3 = match$3[1];
                                                          var match$4 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$3[0]);
                                                          var map4 = match$4[1];
                                                          var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, match$2[1], match$4[0]);
                                                          var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material, match$1[1], state$1);
                                                          var state$3 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material, map3, state$2);
                                                          var state$4 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, map4, state$3);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(material, state$4),
                                                                          LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(material, state$4)
                                                                        ]), /* tuple */[
                                                                      map4,
                                                                      map3
                                                                    ]);
                                                        }));
                                                  Wonder_jest.test("should bind the new texture", (function (param) {
                                                          var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                                                          var material1 = match[3];
                                                          var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                                                          var match$2 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$1[0]);
                                                          var match$3 = CameraTool$Wonderjs.createCameraGameObject(match$2[0]);
                                                          var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$3[0]);
                                                          var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                          var state$3 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material1, match$1[1], state$2);
                                                          var state$4 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material1, match$2[1], state$3);
                                                          DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(bindTexture)), 4);
                                                        }));
                                                  return Wonder_jest.describe("test update texture", (function (param) {
                                                                Wonder_jest.test("should bind the new texture", (function (param) {
                                                                        var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                                                                        var match$1 = match[5];
                                                                        var material1 = match[3];
                                                                        var match$2 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                                                                        var map3 = match$2[1];
                                                                        var match$3 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$2[0]);
                                                                        var map4 = match$3[1];
                                                                        var match$4 = _prepareForUpdateTexture(match$3[0]);
                                                                        var match$5 = match$4[1];
                                                                        var state$1 = RenderMaterialMapTool$Wonderjs.setSource(/* :: */[
                                                                              match$1[0],
                                                                              /* :: */[
                                                                                match$1[1],
                                                                                /* :: */[
                                                                                  map3,
                                                                                  /* :: */[
                                                                                    map4,
                                                                                    /* [] */0
                                                                                  ]
                                                                                ]
                                                                              ]
                                                                            ], match$4[0]);
                                                                        var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                                        var state$3 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material1, map3, state$2);
                                                                        var state$4 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material1, map4, state$3);
                                                                        DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(match$5[0], match$5[1]))), 4);
                                                                      }));
                                                                return Wonder_jest.test("if new texture has already updated before, not update", (function (param) {
                                                                              var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                                                                              var match$1 = match[5];
                                                                              var material1 = match[3];
                                                                              var match$2 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, match[0]);
                                                                              var match$3 = match$2[5];
                                                                              var map4 = match$3[1];
                                                                              var map3 = match$3[0];
                                                                              var state$1 = RenderMaterialMapTool$Wonderjs.setSource(/* :: */[
                                                                                    match$1[0],
                                                                                    /* :: */[
                                                                                      match$1[1],
                                                                                      /* :: */[
                                                                                        map3,
                                                                                        /* :: */[
                                                                                          map4,
                                                                                          /* [] */0
                                                                                        ]
                                                                                      ]
                                                                                    ]
                                                                                  ], match$2[0]);
                                                                              var match$4 = _prepareForUpdateTexture(state$1);
                                                                              var match$5 = match$4[1];
                                                                              var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$4[0]));
                                                                              var state$3 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material1, map3, state$2);
                                                                              var state$4 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material1, map4, state$3);
                                                                              DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(match$5[0], match$5[1]))), 4);
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
