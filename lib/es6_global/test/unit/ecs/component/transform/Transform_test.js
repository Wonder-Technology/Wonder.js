

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as Vector3Tool$Wonderjs from "../../../../tool/service/atom/Vector3Tool.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TransformTool$Wonderjs from "../../../../tool/service/transform/TransformTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as QuaternionTool$Wonderjs from "../../../tool/service/atom/QuaternionTool.js";
import * as Vector3Service$Wonderjs from "../../../../../src/service/atom/Vector3Service.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

Wonder_jest.describe("Transform", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _judgeOneToOne = function (param, param$1, param$2, state) {
          var child = param[1];
          var parent = param[0];
          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                          TransformAPI$Wonderjs.getTransformLocalPosition(parent, state),
                          TransformAPI$Wonderjs.getTransformPosition(parent, state),
                          TransformAPI$Wonderjs.getTransformLocalPosition(child, state),
                          TransformAPI$Wonderjs.getTransformPosition(child, state)
                        ]), /* tuple */[
                      param$1[0],
                      param$1[1],
                      param$2[0],
                      param$2[1]
                    ]);
        };
        var _judgeRotationOneToOne = function (param, param$1, param$2, state) {
          var child = param[1];
          var parent = param[0];
          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                          TransformAPI$Wonderjs.getTransformLocalRotation(parent, state),
                          TransformAPI$Wonderjs.getTransformRotation(parent, state),
                          TransformAPI$Wonderjs.getTransformLocalRotation(child, state),
                          TransformAPI$Wonderjs.getTransformRotation(child, state)
                        ]), /* tuple */[
                      param$1[0],
                      param$1[1],
                      param$2[0],
                      param$2[1]
                    ]);
        };
        var _judgeScaleOneToOne = function (param, param$1, param$2, state) {
          var child = param[1];
          var parent = param[0];
          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                          TransformAPI$Wonderjs.getTransformLocalScale(parent, state),
                          TransformAPI$Wonderjs.getTransformScale(parent, state),
                          TransformAPI$Wonderjs.getTransformLocalScale(child, state),
                          TransformAPI$Wonderjs.getTransformScale(child, state)
                        ]), /* tuple */[
                      param$1[0],
                      param$1[1],
                      param$2[0],
                      param$2[1]
                    ]);
        };
        var _judgeOneToTwo = function (param, param$1, param$2, param$3, state) {
          var child2 = param[2];
          var child1 = param[1];
          var parent = param[0];
          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                          TransformAPI$Wonderjs.getTransformLocalPosition(parent, state),
                          TransformAPI$Wonderjs.getTransformPosition(parent, state),
                          TransformAPI$Wonderjs.getTransformLocalPosition(child1, state),
                          TransformAPI$Wonderjs.getTransformPosition(child1, state),
                          TransformAPI$Wonderjs.getTransformLocalPosition(child2, state),
                          TransformAPI$Wonderjs.getTransformPosition(child2, state)
                        ]), /* tuple */[
                      param$1[0],
                      param$1[1],
                      param$2[0],
                      param$2[1],
                      param$3[0],
                      param$3[1]
                    ]);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("createTransform", (function (param) {
                Wonder_jest.test("create a new transform which is just index(int)", (function (param) {
                        var match = TransformAPI$Wonderjs.createTransform(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        TransformTool$Wonderjs.getRecord(match[0])[/* index */0],
                                        match[1]
                                      ]), /* tuple */[
                                    2,
                                    1
                                  ]);
                      }));
                Wonder_jest.describe("change state", (function (param) {
                        return Wonder_jest.test("state->index + 1", (function (param) {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var record = TransformTool$Wonderjs.getRecord(match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](record[/* index */0]), 2);
                                    }));
                      }));
                return Wonder_jest.test("mark new transform dirty", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformTool$Wonderjs.isDirty(match[1], match[0])), true);
                            }));
              }));
        Wonder_jest.describe("unsafeGetTransformParent", (function (param) {
                return Wonder_jest.test("if has no parent, error", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var transform = match[1];
                              var state$1 = match[0];
                              return Wonder_jest.Expect[/* toThrow */18](Wonder_jest.Expect[/* expect */0]((function (param) {
                                                return TransformAPI$Wonderjs.unsafeGetTransformParent(transform, state$1);
                                              })));
                            }));
              }));
        Wonder_jest.describe("setTransformParent", (function (param) {
                Wonder_jest.describe("the change of parent before setted as parent will affect child", (function (param) {
                        Wonder_jest.test("test one(parent)-one(child)", (function (param) {
                                var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                var parent = match[1];
                                var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                var child = match$1[1];
                                var pos = /* tuple */[
                                  1,
                                  2,
                                  3
                                ];
                                var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, TransformAPI$Wonderjs.setTransformLocalPosition(parent, pos, match$1[0]));
                                return _judgeOneToOne(/* tuple */[
                                            parent,
                                            child
                                          ], /* tuple */[
                                            pos,
                                            pos
                                          ], /* tuple */[
                                            TransformTool$Wonderjs.getDefaultPosition(/* () */0),
                                            pos
                                          ], state$1);
                              }));
                        return Wonder_jest.test("test one(parent)-two(child)", (function (param) {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var parent = match[1];
                                      var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                      var child1 = match$1[1];
                                      var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                                      var child2 = match$2[1];
                                      var pos1 = /* tuple */[
                                        1,
                                        2,
                                        3
                                      ];
                                      var pos2 = /* tuple */[
                                        10,
                                        20,
                                        30
                                      ];
                                      var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child1, TransformAPI$Wonderjs.setTransformLocalPosition(parent, pos1, match$2[0]));
                                      var state$2 = TransformAPI$Wonderjs.setTransformParent(parent, child2, TransformAPI$Wonderjs.setTransformLocalPosition(child2, pos2, state$1));
                                      return _judgeOneToTwo(/* tuple */[
                                                  parent,
                                                  child1,
                                                  child2
                                                ], /* tuple */[
                                                  pos1,
                                                  pos1
                                                ], /* tuple */[
                                                  TransformTool$Wonderjs.getDefaultPosition(/* () */0),
                                                  pos1
                                                ], /* tuple */[
                                                  pos2,
                                                  Vector3Service$Wonderjs.add(/* Float */0, pos1, pos2)
                                                ], state$2);
                                    }));
                      }));
                Wonder_jest.describe("if set parent to be null, remove its current parent", (function (param) {
                        Wonder_jest.describe("test one(parent)-one(child)", (function (param) {
                                var exec = function (param) {
                                  var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                  var parent = match[1];
                                  var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                  var child = match$1[1];
                                  var pos = /* tuple */[
                                    1,
                                    2,
                                    3
                                  ];
                                  var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, TransformAPI$Wonderjs.setTransformLocalPosition(parent, pos, match$1[0]));
                                  var state$2 = TransformAPI$Wonderjs.setTransformParent(null, child, state$1);
                                  return /* tuple */[
                                          state$2,
                                          parent,
                                          child,
                                          pos
                                        ];
                                };
                                Wonder_jest.test("test remove its current parent", (function (param) {
                                        var match = exec(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformTool$Wonderjs.getTransformParent(match[2], match[0])), undefined);
                                      }));
                                return Wonder_jest.test("test position and local position", (function (param) {
                                              var match = exec(/* () */0);
                                              var pos = match[3];
                                              return _judgeOneToOne(/* tuple */[
                                                          match[1],
                                                          match[2]
                                                        ], /* tuple */[
                                                          pos,
                                                          pos
                                                        ], /* tuple */[
                                                          TransformTool$Wonderjs.getDefaultPosition(/* () */0),
                                                          TransformTool$Wonderjs.getDefaultPosition(/* () */0)
                                                        ], match[0]);
                                            }));
                              }));
                        return Wonder_jest.test("test one(parent)-two(child)", (function (param) {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var parent = match[1];
                                      var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                      var child1 = match$1[1];
                                      var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                                      var child2 = match$2[1];
                                      var pos1 = /* tuple */[
                                        1,
                                        2,
                                        3
                                      ];
                                      var pos2 = /* tuple */[
                                        10,
                                        20,
                                        30
                                      ];
                                      var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child1, TransformAPI$Wonderjs.setTransformLocalPosition(parent, pos1, match$2[0]));
                                      var state$2 = TransformAPI$Wonderjs.setTransformParent(parent, child2, TransformAPI$Wonderjs.setTransformLocalPosition(child2, pos2, state$1));
                                      var state$3 = TransformAPI$Wonderjs.setTransformParent(null, child2, state$2);
                                      return _judgeOneToTwo(/* tuple */[
                                                  parent,
                                                  child1,
                                                  child2
                                                ], /* tuple */[
                                                  pos1,
                                                  pos1
                                                ], /* tuple */[
                                                  TransformTool$Wonderjs.getDefaultPosition(/* () */0),
                                                  pos1
                                                ], /* tuple */[
                                                  pos2,
                                                  pos2
                                                ], state$3);
                                    }));
                      }));
                Wonder_jest.describe("if child already has parent", (function (param) {
                        Wonder_jest.test("can set the same parent", (function (param) {
                                var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                var parent = match[1];
                                var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                var child = match$1[1];
                                var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, TransformAPI$Wonderjs.setTransformLocalPosition(parent, /* tuple */[
                                          1,
                                          2,
                                          3
                                        ], match$1[0]));
                                var state$2 = TransformAPI$Wonderjs.setTransformParent(parent, child, state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformParent(child, state$2)), parent);
                              }));
                        Wonder_jest.test("can set different parent", (function (param) {
                                var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                var parent1 = match[1];
                                var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                var parent2 = match$1[1];
                                var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                                var child = match$2[1];
                                var state$1 = TransformAPI$Wonderjs.setTransformParent(parent1, child, TransformAPI$Wonderjs.setTransformLocalPosition(parent1, /* tuple */[
                                          1,
                                          2,
                                          3
                                        ], match$2[0]));
                                var state$2 = TransformAPI$Wonderjs.setTransformParent(parent2, child, TransformAPI$Wonderjs.setTransformLocalPosition(parent2, /* tuple */[
                                          300,
                                          20,
                                          30
                                        ], state$1));
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformParent(child, state$2)), parent2);
                              }));
                        return Wonder_jest.test("change its current parent's children order", (function (param) {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var parent = match[1];
                                      var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                      var child1 = match$1[1];
                                      var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                                      var match$3 = TransformAPI$Wonderjs.createTransform(match$2[0]);
                                      var child3 = match$3[1];
                                      var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child3, TransformAPI$Wonderjs.setTransformParent(parent, match$2[1], TransformAPI$Wonderjs.setTransformParent(parent, child1, match$3[0])));
                                      var state$2 = TransformAPI$Wonderjs.setTransformParent(child3, child1, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(parent, state$2)), /* array */[
                                                  4,
                                                  3
                                                ]);
                                    }));
                      }));
                return Wonder_jest.describe("fix bug", (function (param) {
                              return Wonder_jest.test("test two(parent)-two(child)", (function (param) {
                                            var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                            var transform1 = match[2];
                                            var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                            var transform2 = match$1[2];
                                            var match$2 = GameObjectTool$Wonderjs.createGameObject(match$1[0]);
                                            var transform3 = match$2[2];
                                            var match$3 = GameObjectTool$Wonderjs.createGameObject(match$2[0]);
                                            var transform4 = match$3[2];
                                            var state$1 = TransformAPI$Wonderjs.setTransformParent(transform2, transform4, TransformAPI$Wonderjs.setTransformParent(transform1, transform3, match$3[0]));
                                            var pos1 = /* tuple */[
                                              1,
                                              2,
                                              3
                                            ];
                                            var pos2 = /* tuple */[
                                              2,
                                              3,
                                              4
                                            ];
                                            var pos3 = /* tuple */[
                                              4,
                                              3,
                                              4
                                            ];
                                            var pos4 = /* tuple */[
                                              7,
                                              3,
                                              4
                                            ];
                                            TransformTool$Wonderjs.getRecord(state$1);
                                            var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(transform4, pos4, TransformAPI$Wonderjs.setTransformLocalPosition(transform3, pos3, TransformAPI$Wonderjs.setTransformLocalPosition(transform2, pos2, TransformAPI$Wonderjs.setTransformLocalPosition(transform1, pos1, state$1))));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            TransformAPI$Wonderjs.getTransformPosition(transform1, state$2),
                                                            TransformAPI$Wonderjs.getTransformPosition(transform2, state$2),
                                                            TransformAPI$Wonderjs.getTransformPosition(transform3, state$2),
                                                            TransformAPI$Wonderjs.getTransformPosition(transform4, state$2)
                                                          ]), /* tuple */[
                                                        pos1,
                                                        pos2,
                                                        Vector3Service$Wonderjs.add(/* Float */0, pos3, pos1),
                                                        Vector3Service$Wonderjs.add(/* Float */0, pos4, pos2)
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("hasTransformParent", (function (param) {
                Wonder_jest.test("if has no parent, return false", (function (param) {
                        var match = TransformAPI$Wonderjs.createTransform(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.hasTransformParent(match[1], match[0])), false);
                      }));
                return Wonder_jest.test("else, return true", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var child1 = match$1[1];
                              var state$1 = TransformAPI$Wonderjs.setTransformParent(match[1], child1, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.hasTransformParent(child1, state$1)), true);
                            }));
              }));
        Wonder_jest.describe("setTransformParentKeepOrder", (function (param) {
                return Wonder_jest.test("not change its current parent's children order", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var parent = match[1];
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var child1 = match$1[1];
                              var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                              var match$3 = TransformAPI$Wonderjs.createTransform(match$2[0]);
                              var child3 = match$3[1];
                              var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child3, TransformAPI$Wonderjs.setTransformParent(parent, match$2[1], TransformAPI$Wonderjs.setTransformParent(parent, child1, match$3[0])));
                              var state$2 = TransformAPI$Wonderjs.setTransformParentKeepOrder(child3, child1, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(parent, state$2)), /* array */[
                                          3,
                                          4
                                        ]);
                            }));
              }));
        Wonder_jest.describe("unsafeGetTransformChildren", (function (param) {
                return Wonder_jest.test("get parent's all children", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var parent = match[1];
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var child1 = match$1[1];
                              var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                              var child2 = match$2[1];
                              var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child1, match$2[0]);
                              var state$2 = TransformAPI$Wonderjs.setTransformParent(parent, child2, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(parent, state$2)), /* array */[
                                          child1,
                                          child2
                                        ]);
                            }));
              }));
        Wonder_jest.describe("setTransformLocalPosition", (function (param) {
                var _prepare = function (param) {
                  var match = TransformAPI$Wonderjs.createTransform(state[0]);
                  var parent = match[1];
                  var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                  var child = match$1[1];
                  var pos1 = /* tuple */[
                    1,
                    2,
                    3
                  ];
                  var pos2 = /* tuple */[
                    5,
                    10,
                    30
                  ];
                  var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, match$1[0]);
                  var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(child, pos2, TransformAPI$Wonderjs.setTransformLocalPosition(parent, pos1, state$1));
                  return /* tuple */[
                          state$2,
                          parent,
                          child,
                          pos1,
                          pos2
                        ];
                };
                Wonder_jest.test("change parent's localPosition should affect children", (function (param) {
                        var match = _prepare(/* () */0);
                        var pos2 = match[4];
                        var parent = match[1];
                        var state = TransformAPI$Wonderjs.setTransformLocalPosition(parent, pos2, match[0]);
                        return _judgeOneToOne(/* tuple */[
                                    parent,
                                    match[2]
                                  ], /* tuple */[
                                    pos2,
                                    pos2
                                  ], /* tuple */[
                                    pos2,
                                    Vector3Service$Wonderjs.add(/* Float */0, pos2, pos2)
                                  ], state);
                      }));
                return Wonder_jest.test("change child's localPosition shouldn't affect parent", (function (param) {
                              var match = _prepare(/* () */0);
                              var pos1 = match[3];
                              var child = match[2];
                              var state = TransformAPI$Wonderjs.setTransformLocalPosition(child, pos1, match[0]);
                              return _judgeOneToOne(/* tuple */[
                                          match[1],
                                          child
                                        ], /* tuple */[
                                          pos1,
                                          pos1
                                        ], /* tuple */[
                                          pos1,
                                          Vector3Service$Wonderjs.add(/* Float */0, pos1, pos1)
                                        ], state);
                            }));
              }));
        Wonder_jest.describe("getTransformPosition", (function (param) {
                Wonder_jest.test("default value should be (0.,0.,0.)", (function (param) {
                        var match = TransformAPI$Wonderjs.createTransform(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformPosition(match[1], match[0])), TransformTool$Wonderjs.getDefaultPosition(/* () */0));
                      }));
                return Wonder_jest.test("get the position in world coordinate system", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var parent = match[1];
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var child = match$1[1];
                              var pos = /* tuple */[
                                1,
                                2,
                                3
                              ];
                              var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, TransformAPI$Wonderjs.setTransformLocalPosition(parent, pos, match$1[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformPosition(child, state$1)), pos);
                            }));
              }));
        Wonder_jest.describe("setTransformPosition", (function (param) {
                return Wonder_jest.describe("set position in world coordinate system", (function (param) {
                              Wonder_jest.test("change parent's position should affect children", (function (param) {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var parent = match[1];
                                      var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                      var child = match$1[1];
                                      var pos2 = /* tuple */[
                                        5,
                                        10,
                                        30
                                      ];
                                      var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, match$1[0]);
                                      var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(parent, /* tuple */[
                                            1,
                                            2,
                                            3
                                          ], state$1);
                                      var state$3 = TransformAPI$Wonderjs.setTransformLocalPosition(child, pos2, state$2);
                                      var state$4 = TransformAPI$Wonderjs.setTransformPosition(parent, pos2, state$3);
                                      return _judgeOneToOne(/* tuple */[
                                                  parent,
                                                  child
                                                ], /* tuple */[
                                                  pos2,
                                                  pos2
                                                ], /* tuple */[
                                                  pos2,
                                                  Vector3Service$Wonderjs.add(/* Float */0, pos2, pos2)
                                                ], state$4);
                                    }));
                              return Wonder_jest.test("change child's position shouldn't affect parent", (function (param) {
                                            var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                            var parent = match[1];
                                            var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                            var child = match$1[1];
                                            var pos1 = /* tuple */[
                                              1,
                                              2,
                                              3
                                            ];
                                            var pos3 = /* tuple */[
                                              2,
                                              3,
                                              4
                                            ];
                                            var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, match$1[0]);
                                            var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(parent, pos1, state$1);
                                            var state$3 = TransformAPI$Wonderjs.setTransformLocalPosition(child, /* tuple */[
                                                  5,
                                                  10,
                                                  30
                                                ], state$2);
                                            var state$4 = TransformAPI$Wonderjs.setTransformPosition(child, pos3, state$3);
                                            return _judgeOneToOne(/* tuple */[
                                                        parent,
                                                        child
                                                      ], /* tuple */[
                                                        pos1,
                                                        pos1
                                                      ], /* tuple */[
                                                        /* tuple */[
                                                          1,
                                                          1,
                                                          1
                                                        ],
                                                        pos3
                                                      ], state$4);
                                          }));
                            }));
              }));
        Wonder_jest.describe("getTransformRotation", (function (param) {
                Wonder_jest.test("default value should be (0.,0.,0.,1.)", (function (param) {
                        var match = TransformAPI$Wonderjs.createTransform(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformRotation(match[1], match[0])), TransformTool$Wonderjs.getDefaultRotation(/* () */0));
                      }));
                return Wonder_jest.test("get the rotation in world coordinate system", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var parent = match[1];
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var child = match$1[1];
                              var rotation = /* tuple */[
                                1,
                                2,
                                3,
                                2.5
                              ];
                              var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, TransformAPI$Wonderjs.setTransformLocalRotation(parent, rotation, match$1[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformRotation(child, state$1)), rotation);
                            }));
              }));
        Wonder_jest.describe("setTransformRotation", (function (param) {
                return Wonder_jest.describe("set rotation in world coordinate system", (function (param) {
                              Wonder_jest.test("change parent's rotation should affect children", (function (param) {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var parent = match[1];
                                      var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                      var child = match$1[1];
                                      var rotation2 = /* tuple */[
                                        5,
                                        10.5,
                                        30,
                                        1
                                      ];
                                      var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, match$1[0]);
                                      var state$2 = TransformAPI$Wonderjs.setTransformLocalRotation(parent, /* tuple */[
                                            1,
                                            2,
                                            3.5,
                                            2
                                          ], state$1);
                                      var state$3 = TransformAPI$Wonderjs.setTransformLocalRotation(child, rotation2, state$2);
                                      var state$4 = TransformAPI$Wonderjs.setTransformRotation(parent, rotation2, state$3);
                                      return _judgeRotationOneToOne(/* tuple */[
                                                  parent,
                                                  child
                                                ], /* tuple */[
                                                  rotation2,
                                                  rotation2
                                                ], /* tuple */[
                                                  rotation2,
                                                  /* tuple */[
                                                    -14.148975834432052,
                                                    -29.71284925230731,
                                                    -84.89385500659232,
                                                    1462.650035039141
                                                  ]
                                                ], state$4);
                                    }));
                              return Wonder_jest.test("change child's rotation shouldn't affect parent", (function (param) {
                                            var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                            var parent = match[1];
                                            var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                            var child = match$1[1];
                                            var rotation1 = /* tuple */[
                                              1,
                                              2,
                                              3,
                                              1
                                            ];
                                            var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, match$1[0]);
                                            var state$2 = TransformAPI$Wonderjs.setTransformLocalRotation(parent, rotation1, state$1);
                                            var state$3 = TransformAPI$Wonderjs.setTransformLocalRotation(child, /* tuple */[
                                                  5.5,
                                                  10,
                                                  30,
                                                  2
                                                ], state$2);
                                            var state$4 = TransformAPI$Wonderjs.setTransformRotation(child, /* tuple */[
                                                  2.5,
                                                  3.5,
                                                  4.5,
                                                  1
                                                ], state$3);
                                            return _judgeRotationOneToOne(/* tuple */[
                                                        parent,
                                                        child
                                                      ], /* tuple */[
                                                        rotation1,
                                                        rotation1
                                                      ], /* tuple */[
                                                        /* tuple */[
                                                          0.7745966911315918,
                                                          -0.3872983455657959,
                                                          0.7745966911315918,
                                                          6.196773529052734
                                                        ],
                                                        /* tuple */[
                                                          6.826419538772125,
                                                          8.489076950779234,
                                                          6.460195134263704,
                                                          -10.027219687210458
                                                        ]
                                                      ], state$4);
                                          }));
                            }));
              }));
        Wonder_jest.describe("getTransformEulerAngles", (function (param) {
                Wonder_jest.test("default value should be (0.,0.,0.)", (function (param) {
                        var match = TransformAPI$Wonderjs.createTransform(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformEulerAngles(match[1], match[0])), /* tuple */[
                                    0,
                                    -0,
                                    0
                                  ]);
                      }));
                return Wonder_jest.test("get the eulerAngles in world coordinate system", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var parent = match[1];
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var child = match$1[1];
                              var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, TransformAPI$Wonderjs.setTransformLocalEulerAngles(parent, /* tuple */[
                                        45,
                                        45,
                                        90
                                      ], match$1[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformEulerAngles(child, state$1)), /* tuple */[
                                          45,
                                          44.99999999999999,
                                          90
                                        ]);
                            }));
              }));
        Wonder_jest.describe("setTransformEulerAngles", (function (param) {
                return Wonder_jest.describe("set eulerAngles in world coordinate system", (function (param) {
                              var _judgeEulerAnglesOneToOne = function (param, param$1, param$2, state) {
                                var child = param[1];
                                var parent = param[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                TransformAPI$Wonderjs.getTransformLocalEulerAngles(parent, state),
                                                TransformAPI$Wonderjs.getTransformEulerAngles(parent, state),
                                                TransformAPI$Wonderjs.getTransformLocalEulerAngles(child, state),
                                                TransformAPI$Wonderjs.getTransformEulerAngles(child, state)
                                              ]), /* tuple */[
                                            param$1[0],
                                            param$1[1],
                                            param$2[0],
                                            param$2[1]
                                          ]);
                              };
                              Wonder_jest.test("change parent's eulerAngles should affect children", (function (param) {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var parent = match[1];
                                      var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                      var child = match$1[1];
                                      var eulerAngles2 = /* tuple */[
                                        5,
                                        10.5,
                                        30
                                      ];
                                      var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, match$1[0]);
                                      var state$2 = TransformAPI$Wonderjs.setTransformLocalEulerAngles(parent, /* tuple */[
                                            1,
                                            2,
                                            3.5
                                          ], state$1);
                                      var state$3 = TransformAPI$Wonderjs.setTransformLocalEulerAngles(child, eulerAngles2, state$2);
                                      var state$4 = TransformAPI$Wonderjs.setTransformEulerAngles(parent, eulerAngles2, state$3);
                                      return _judgeEulerAnglesOneToOne(/* tuple */[
                                                  parent,
                                                  child
                                                ], /* tuple */[
                                                  /* tuple */[
                                                    4.999999720522246,
                                                    10.499999504808965,
                                                    29.99999866105677
                                                  ],
                                                  /* tuple */[
                                                    4.9999999860374675,
                                                    10.499999810789854,
                                                    29.99999771097897
                                                  ]
                                                ], /* tuple */[
                                                  /* tuple */[
                                                    4.999999720522246,
                                                    10.499999504808965,
                                                    29.99999866105677
                                                  ],
                                                  /* tuple */[
                                                    14.953095317535913,
                                                    16.95073623912726,
                                                    61.91119956447435
                                                  ]
                                                ], state$4);
                                    }));
                              return Wonder_jest.test("change child's eulerAngles shouldn't affect parent", (function (param) {
                                            var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                            var parent = match[1];
                                            var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                            var child = match$1[1];
                                            var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, match$1[0]);
                                            var state$2 = TransformAPI$Wonderjs.setTransformLocalEulerAngles(parent, /* tuple */[
                                                  1,
                                                  2,
                                                  3
                                                ], state$1);
                                            var state$3 = TransformAPI$Wonderjs.setTransformLocalEulerAngles(child, /* tuple */[
                                                  5.5,
                                                  10,
                                                  30
                                                ], state$2);
                                            var state$4 = TransformAPI$Wonderjs.setTransformEulerAngles(child, /* tuple */[
                                                  2.5,
                                                  3.5,
                                                  4.5
                                                ], state$3);
                                            return _judgeEulerAnglesOneToOne(/* tuple */[
                                                        parent,
                                                        child
                                                      ], /* tuple */[
                                                        /* tuple */[
                                                          1.0000000541275584,
                                                          2.0000000390849397,
                                                          3.000000082590928
                                                        ],
                                                        /* tuple */[
                                                          1.000000070447814,
                                                          1.9999999556226822,
                                                          3.0000002226737443
                                                        ]
                                                      ], /* tuple */[
                                                        /* tuple */[
                                                          1.447625368958481,
                                                          1.5265914288412556,
                                                          1.471299291762878
                                                        ],
                                                        /* tuple */[
                                                          2.4999999977068192,
                                                          3.4999998866913646,
                                                          4.500000058177029
                                                        ]
                                                      ], state$4);
                                          }));
                            }));
              }));
        Wonder_jest.describe("getTransformScale", (function (param) {
                Wonder_jest.test("default value should be (1.,1.,1.)", (function (param) {
                        var match = TransformAPI$Wonderjs.createTransform(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformScale(match[1], match[0])), TransformTool$Wonderjs.getDefaultScale(/* () */0));
                      }));
                return Wonder_jest.test("get the scale in world coordinate system", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var parent = match[1];
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var child = match$1[1];
                              var scale = /* tuple */[
                                1,
                                2,
                                3.5
                              ];
                              var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, TransformAPI$Wonderjs.setTransformLocalScale(parent, scale, match$1[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformScale(child, state$1)), scale);
                            }));
              }));
        Wonder_jest.describe("setTransformScale", (function (param) {
                return Wonder_jest.describe("set scale in world coordinate system", (function (param) {
                              Wonder_jest.test("change parent's scale should affect children", (function (param) {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var parent = match[1];
                                      var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                      var child = match$1[1];
                                      var scale2 = /* tuple */[
                                        5,
                                        10,
                                        30
                                      ];
                                      var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, match$1[0]);
                                      var state$2 = TransformAPI$Wonderjs.setTransformLocalScale(parent, /* tuple */[
                                            1,
                                            2,
                                            3
                                          ], state$1);
                                      var state$3 = TransformAPI$Wonderjs.setTransformLocalScale(child, scale2, state$2);
                                      var state$4 = TransformAPI$Wonderjs.setTransformScale(parent, scale2, state$3);
                                      return _judgeScaleOneToOne(/* tuple */[
                                                  parent,
                                                  child
                                                ], /* tuple */[
                                                  scale2,
                                                  scale2
                                                ], /* tuple */[
                                                  scale2,
                                                  Vector3Service$Wonderjs.multiply(/* Float */0, scale2, scale2)
                                                ], state$4);
                                    }));
                              return Wonder_jest.test("change child's scale shouldn't affect parent", (function (param) {
                                            var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                            var parent = match[1];
                                            var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                            var child = match$1[1];
                                            var scale1 = /* tuple */[
                                              1,
                                              2,
                                              3
                                            ];
                                            var scale3 = /* tuple */[
                                              2,
                                              3,
                                              4
                                            ];
                                            var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, match$1[0]);
                                            var state$2 = TransformAPI$Wonderjs.setTransformLocalScale(parent, scale1, state$1);
                                            var state$3 = TransformAPI$Wonderjs.setTransformLocalScale(child, /* tuple */[
                                                  5,
                                                  10,
                                                  30
                                                ], state$2);
                                            var state$4 = TransformAPI$Wonderjs.setTransformScale(child, scale3, state$3);
                                            return _judgeScaleOneToOne(/* tuple */[
                                                        parent,
                                                        child
                                                      ], /* tuple */[
                                                        scale1,
                                                        scale1
                                                      ], /* tuple */[
                                                        /* tuple */[
                                                          2,
                                                          1.5,
                                                          1.3333333730697632
                                                        ],
                                                        scale3
                                                      ], state$4);
                                          }));
                            }));
              }));
        Wonder_jest.describe("unsafeGetTransformGameObject", (function (param) {
                return Wonder_jest.test("get transform's gameObject", (function (param) {
                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                              var gameObject = match[1];
                              var state$1 = match[0];
                              var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformGameObject(transform, state$1)), gameObject);
                            }));
              }));
        Wonder_jest.describe("getTransformLocalToWorldMatrixTypeArray", (function (param) {
                Wonder_jest.test("get the localToWorldMatrix type array in world coordinate system", (function (param) {
                        var match = TransformAPI$Wonderjs.createTransform(state[0]);
                        var parent = match[1];
                        var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                        var child = match$1[1];
                        var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, match$1[0]);
                        var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(parent, /* tuple */[
                              1,
                              2,
                              3
                            ], state$1);
                        var state$3 = TransformAPI$Wonderjs.setTransformLocalPosition(child, /* tuple */[
                              0,
                              10,
                              3
                            ], state$2);
                        var parentMat1 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(parent, state$3);
                        var childMat1 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(child, state$3);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        parentMat1,
                                        childMat1
                                      ]), /* tuple */[
                                    new Float32Array(/* array */[
                                          1,
                                          0,
                                          0,
                                          0,
                                          0,
                                          1,
                                          0,
                                          0,
                                          0,
                                          0,
                                          1,
                                          0,
                                          1,
                                          2,
                                          3,
                                          1
                                        ]),
                                    new Float32Array(/* array */[
                                          1,
                                          0,
                                          0,
                                          0,
                                          0,
                                          1,
                                          0,
                                          0,
                                          0,
                                          0,
                                          1,
                                          0,
                                          1,
                                          12,
                                          6,
                                          1
                                        ])
                                  ]);
                      }));
                return Wonder_jest.describe("test cache", (function (param) {
                              Wonder_jest.test("cache data after first get", (function (param) {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var transform1 = match[1];
                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                            1,
                                            2,
                                            3
                                          ], match[0]);
                                      var mat1 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(transform1, state$1);
                                      var mat2 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(transform1, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](mat1), mat2);
                                    }));
                              return Wonder_jest.describe("test cache invalid", (function (param) {
                                            var _prepare = function (state) {
                                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                              var transform1 = match[1];
                                              var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                    1,
                                                    2,
                                                    3
                                                  ], match[0]);
                                              var mat1 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(transform1, state$1).slice();
                                              return /* tuple */[
                                                      state$1,
                                                      transform1,
                                                      mat1
                                                    ];
                                            };
                                            Wonder_jest.describe("invalid after change local position", (function (param) {
                                                    Wonder_jest.test("test by updateAndGetLocalToWorldMatrixTypeArray", (function (param) {
                                                            var match = _prepare(state);
                                                            var transform1 = match[1];
                                                            var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                                  2,
                                                                  2,
                                                                  3
                                                                ], match[0]);
                                                            var mat2 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(transform1, state$1);
                                                            return Wonder_jest.Expect[/* toEqual */12](mat2, Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[2])));
                                                          }));
                                                    return Wonder_jest.test("test type array", (function (param) {
                                                                  var match = _prepare(state);
                                                                  var transform1 = match[1];
                                                                  var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                                        2,
                                                                        2,
                                                                        3
                                                                      ], match[0]);
                                                                  var state$2 = TransformTool$Wonderjs.update(transform1, state$1);
                                                                  var mat2 = TransformTool$Wonderjs.getLocalToWorldMatrixTypeArrayByVisitTypeArray(transform1, state$2);
                                                                  return Wonder_jest.Expect[/* toEqual */12](mat2, Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[2])));
                                                                }));
                                                  }));
                                            Wonder_jest.test("invalid after change position", (function (param) {
                                                    var match = _prepare(state);
                                                    var transform1 = match[1];
                                                    var state$1 = TransformAPI$Wonderjs.setTransformPosition(transform1, /* tuple */[
                                                          2,
                                                          2,
                                                          3
                                                        ], match[0]);
                                                    var mat2 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(transform1, state$1);
                                                    return Wonder_jest.Expect[/* toEqual */12](mat2, Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[2])));
                                                  }));
                                            Wonder_jest.test("test get position after change local position", (function (param) {
                                                    var match = _prepare(state);
                                                    var transform1 = match[1];
                                                    var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                          2,
                                                          2,
                                                          3
                                                        ], match[0]);
                                                    TransformAPI$Wonderjs.getTransformPosition(transform1, state$1);
                                                    var mat2 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(transform1, state$1);
                                                    return Wonder_jest.Expect[/* toEqual */12](mat2, Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[2])));
                                                  }));
                                            Wonder_jest.describe("invalid after change local rotation", (function (param) {
                                                    return Wonder_jest.test("test by updateAndGetLocalToWorldMatrixTypeArray", (function (param) {
                                                                  var match = _prepare(state);
                                                                  var transform1 = match[1];
                                                                  var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(transform1, /* tuple */[
                                                                        2,
                                                                        2,
                                                                        3,
                                                                        1
                                                                      ], match[0]);
                                                                  var mat2 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(transform1, state$1);
                                                                  return Wonder_jest.Expect[/* toEqual */12](mat2, Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[2])));
                                                                }));
                                                  }));
                                            Wonder_jest.test("invalid after change rotation", (function (param) {
                                                    var match = _prepare(state);
                                                    var transform1 = match[1];
                                                    var state$1 = TransformAPI$Wonderjs.setTransformRotation(transform1, /* tuple */[
                                                          2,
                                                          2,
                                                          3,
                                                          1
                                                        ], match[0]);
                                                    var mat2 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(transform1, state$1);
                                                    return Wonder_jest.Expect[/* toEqual */12](mat2, Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[2])));
                                                  }));
                                            Wonder_jest.describe("invalid after change local scaleition", (function (param) {
                                                    return Wonder_jest.test("test by updateAndGetLocalToWorldMatrixTypeArray", (function (param) {
                                                                  var match = _prepare(state);
                                                                  var transform1 = match[1];
                                                                  var state$1 = TransformAPI$Wonderjs.setTransformLocalScale(transform1, /* tuple */[
                                                                        2,
                                                                        2,
                                                                        3
                                                                      ], match[0]);
                                                                  var mat2 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(transform1, state$1);
                                                                  return Wonder_jest.Expect[/* toEqual */12](mat2, Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[2])));
                                                                }));
                                                  }));
                                            Wonder_jest.test("invalid after change scale", (function (param) {
                                                    var match = _prepare(state);
                                                    var transform1 = match[1];
                                                    var state$1 = TransformAPI$Wonderjs.setTransformScale(transform1, /* tuple */[
                                                          2,
                                                          2,
                                                          3.5
                                                        ], match[0]);
                                                    var mat2 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(transform1, state$1);
                                                    return Wonder_jest.Expect[/* toEqual */12](mat2, Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[2])));
                                                  }));
                                            return Wonder_jest.describe("test with parent", (function (param) {
                                                          var _prepare = function (state) {
                                                            var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                                            var parent = match[1];
                                                            var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                                            var child = match$1[1];
                                                            var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, match$1[0]);
                                                            var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(parent, /* tuple */[
                                                                  1,
                                                                  2,
                                                                  3
                                                                ], state$1);
                                                            var state$3 = TransformAPI$Wonderjs.setTransformLocalPosition(child, /* tuple */[
                                                                  0,
                                                                  10,
                                                                  3
                                                                ], state$2);
                                                            var parentMat1 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(parent, state$3).slice();
                                                            var childMat1 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(child, state$3).slice();
                                                            return /* tuple */[
                                                                    state$3,
                                                                    /* tuple */[
                                                                      parent,
                                                                      child
                                                                    ],
                                                                    /* tuple */[
                                                                      parentMat1,
                                                                      childMat1
                                                                    ]
                                                                  ];
                                                          };
                                                          Wonder_jest.test("invalid after change local position", (function (param) {
                                                                  var match = _prepare(state);
                                                                  var child = match[1][1];
                                                                  var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(child, /* tuple */[
                                                                        2,
                                                                        2,
                                                                        3
                                                                      ], match[0]);
                                                                  var childMat2 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(child, state$1);
                                                                  return Wonder_jest.Expect[/* toEqual */12](match[2][1], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](childMat2)));
                                                                }));
                                                          Wonder_jest.test("invalid after change local rotation", (function (param) {
                                                                  var match = _prepare(state);
                                                                  var child = match[1][1];
                                                                  var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(child, /* tuple */[
                                                                        2,
                                                                        2,
                                                                        3,
                                                                        1
                                                                      ], match[0]);
                                                                  var childMat2 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(child, state$1);
                                                                  return Wonder_jest.Expect[/* toEqual */12](match[2][1], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](childMat2)));
                                                                }));
                                                          return Wonder_jest.test("invalid after change local scale", (function (param) {
                                                                        var match = _prepare(state);
                                                                        var child = match[1][1];
                                                                        var state$1 = TransformAPI$Wonderjs.setTransformLocalScale(child, /* tuple */[
                                                                              2,
                                                                              2,
                                                                              3
                                                                            ], match[0]);
                                                                        var childMat2 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(child, state$1);
                                                                        return Wonder_jest.Expect[/* toEqual */12](match[2][1], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](childMat2)));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("getNormalMatrixTypeArray", (function (param) {
                return Wonder_jest.describe("test cache", (function (param) {
                              Wonder_jest.test("cache data after first get", (function (param) {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var transform1 = match[1];
                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(transform1, /* tuple */[
                                            1,
                                            2,
                                            3,
                                            1
                                          ], match[0]);
                                      var mat1 = TransformTool$Wonderjs.updateAndGetNormalMatrixTypeArray(transform1, state$1);
                                      var mat2 = TransformTool$Wonderjs.updateAndGetNormalMatrixTypeArray(transform1, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](mat1), mat2);
                                    }));
                              return Wonder_jest.describe("test cache invalid", (function (param) {
                                            var _prepare = function (state) {
                                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                              var transform1 = match[1];
                                              var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(transform1, /* tuple */[
                                                    1,
                                                    2,
                                                    3,
                                                    1
                                                  ], match[0]);
                                              var mat1 = TransformTool$Wonderjs.updateAndGetNormalMatrixTypeArray(transform1, state$1).slice();
                                              return /* tuple */[
                                                      state$1,
                                                      transform1,
                                                      mat1
                                                    ];
                                            };
                                            Wonder_jest.test("invalid after change local rotation", (function (param) {
                                                    var match = _prepare(state);
                                                    var transform1 = match[1];
                                                    var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(transform1, /* tuple */[
                                                          2,
                                                          2,
                                                          3,
                                                          1
                                                        ], match[0]);
                                                    var mat2 = TransformTool$Wonderjs.updateAndGetNormalMatrixTypeArray(transform1, state$1);
                                                    return Wonder_jest.Expect[/* toEqual */12](mat2, Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[2])));
                                                  }));
                                            Wonder_jest.test("invalid after change rotation", (function (param) {
                                                    var match = _prepare(state);
                                                    var transform1 = match[1];
                                                    var state$1 = TransformAPI$Wonderjs.setTransformRotation(transform1, /* tuple */[
                                                          2,
                                                          2,
                                                          3,
                                                          1
                                                        ], match[0]);
                                                    var mat2 = TransformTool$Wonderjs.updateAndGetNormalMatrixTypeArray(transform1, state$1);
                                                    return Wonder_jest.Expect[/* toEqual */12](mat2, Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[2])));
                                                  }));
                                            Wonder_jest.test("test get rotation after change local rotation", (function (param) {
                                                    var match = _prepare(state);
                                                    var transform1 = match[1];
                                                    var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(transform1, /* tuple */[
                                                          2,
                                                          2,
                                                          3,
                                                          1
                                                        ], match[0]);
                                                    TransformAPI$Wonderjs.getTransformRotation(transform1, state$1);
                                                    var mat2 = TransformTool$Wonderjs.updateAndGetNormalMatrixTypeArray(transform1, state$1);
                                                    return Wonder_jest.Expect[/* toEqual */12](mat2, Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[2])));
                                                  }));
                                            return Wonder_jest.describe("test with parent", (function (param) {
                                                          var _prepare = function (state) {
                                                            var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                                            var parent = match[1];
                                                            var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                                            var child = match$1[1];
                                                            var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, match$1[0]);
                                                            var state$2 = TransformAPI$Wonderjs.setTransformLocalRotation(parent, /* tuple */[
                                                                  1,
                                                                  2,
                                                                  3,
                                                                  1
                                                                ], state$1);
                                                            var state$3 = TransformAPI$Wonderjs.setTransformLocalRotation(child, /* tuple */[
                                                                  0,
                                                                  10,
                                                                  3,
                                                                  1
                                                                ], state$2);
                                                            var parentMat1 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(parent, state$3).slice();
                                                            var childMat1 = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray(child, state$3).slice();
                                                            return /* tuple */[
                                                                    state$3,
                                                                    /* tuple */[
                                                                      parent,
                                                                      child
                                                                    ],
                                                                    /* tuple */[
                                                                      parentMat1,
                                                                      childMat1
                                                                    ]
                                                                  ];
                                                          };
                                                          return Wonder_jest.test("invalid after change local rotation", (function (param) {
                                                                        var match = _prepare(state);
                                                                        var child = match[1][1];
                                                                        var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(child, /* tuple */[
                                                                              2,
                                                                              2,
                                                                              3,
                                                                              1
                                                                            ], match[0]);
                                                                        var childMat2 = TransformTool$Wonderjs.updateAndGetNormalMatrixTypeArray(child, state$1);
                                                                        return Wonder_jest.Expect[/* toEqual */12](match[2][1], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](childMat2)));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("dispose component", (function (param) {
                var _prepare = function (param) {
                  var match = TransformAPI$Wonderjs.createTransform(state[0]);
                  var transform1 = match[1];
                  var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                  var transform2 = match$1[1];
                  var state$1 = TransformAPI$Wonderjs.setTransformParent(transform1, transform2, match$1[0]);
                  return /* tuple */[
                          state$1,
                          transform1,
                          transform2
                        ];
                };
                Wonder_jest.describe("test if dirty", (function (param) {
                        return Wonder_jest.test("the disposed transform shouldn't affect other alive ones' record", (function (param) {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var transform1 = match[1];
                                      var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                      var transform2 = match$1[1];
                                      var pos2 = /* tuple */[
                                        5,
                                        10,
                                        30
                                      ];
                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform2, pos2, TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                1,
                                                2,
                                                3
                                              ], match$1[0]));
                                      var state$2 = TransformTool$Wonderjs.dispose(transform1, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformLocalPosition(transform2, state$2)), pos2);
                                    }));
                      }));
                Wonder_jest.describe("test if not dirty", (function (param) {
                        return Wonder_jest.test("the disposed transform shouldn't affect other alive ones' record", (function (param) {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var transform1 = match[1];
                                      var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                      var transform2 = match$1[1];
                                      var pos2 = /* tuple */[
                                        5,
                                        10,
                                        30
                                      ];
                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform2, pos2, TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                1,
                                                2,
                                                3
                                              ], match$1[0]));
                                      var state$2 = TransformTool$Wonderjs.dispose(transform1, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformLocalPosition(transform2, state$2)), pos2);
                                    }));
                      }));
                Wonder_jest.describe("if child is disposed", (function (param) {
                        Wonder_jest.test("should remove it from childMap", (function (param) {
                                var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                var transform1 = match[1];
                                var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                var transform2 = match$1[1];
                                var state$1 = TransformAPI$Wonderjs.setTransformParent(transform1, transform2, match$1[0]);
                                var state$2 = TransformTool$Wonderjs.dispose(transform2, state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(transform1, state$2)), /* array */[]);
                              }));
                        return Wonder_jest.describe("shouldn't affect parent", (function (param) {
                                      Wonder_jest.test("test disposed one has no parent", (function (param) {
                                              var match = _prepare(/* () */0);
                                              var transform2 = match[2];
                                              var transform1 = match[1];
                                              var pos2 = /* tuple */[
                                                5,
                                                10,
                                                30
                                              ];
                                              var state = TransformAPI$Wonderjs.setTransformLocalPosition(transform2, pos2, TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                        1,
                                                        2,
                                                        3
                                                      ], match[0]));
                                              var state$1 = TransformTool$Wonderjs.dispose(transform1, state);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformPosition(transform2, state$1)), pos2);
                                            }));
                                      return Wonder_jest.test("test disposed one has parent", (function (param) {
                                                    var match = _prepare(/* () */0);
                                                    var transform2 = match[2];
                                                    var transform1 = match[1];
                                                    var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                                    var transform0 = match$1[1];
                                                    var state = TransformAPI$Wonderjs.setTransformParent(transform0, transform1, match$1[0]);
                                                    var pos0 = /* tuple */[
                                                      2,
                                                      4,
                                                      6
                                                    ];
                                                    var pos1 = /* tuple */[
                                                      1,
                                                      2,
                                                      3
                                                    ];
                                                    var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform2, /* tuple */[
                                                          5,
                                                          10,
                                                          30
                                                        ], TransformAPI$Wonderjs.setTransformLocalPosition(transform1, pos1, TransformAPI$Wonderjs.setTransformLocalPosition(transform0, pos0, state)));
                                                    var state$2 = TransformTool$Wonderjs.dispose(transform2, state$1);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    TransformAPI$Wonderjs.getTransformPosition(transform0, state$2),
                                                                    TransformAPI$Wonderjs.getTransformPosition(transform1, state$2)
                                                                  ]), /* tuple */[
                                                                pos0,
                                                                Vector3Service$Wonderjs.add(/* Float */0, pos0, pos1)
                                                              ]);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("if parent is disposed", (function (param) {
                        Wonder_jest.test("should remove it from parentMap", (function (param) {
                                var match = _prepare(/* () */0);
                                var state = TransformTool$Wonderjs.dispose(match[1], match[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformTool$Wonderjs.getTransformParent(match[2], state)), undefined);
                              }));
                        return Wonder_jest.test("should affect children", (function (param) {
                                      var match = _prepare(/* () */0);
                                      var transform2 = match[2];
                                      var transform1 = match[1];
                                      var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                      var transform0 = match$1[1];
                                      var state = TransformAPI$Wonderjs.setTransformParent(transform0, transform1, match$1[0]);
                                      var pos1 = /* tuple */[
                                        1,
                                        2,
                                        3
                                      ];
                                      var pos2 = /* tuple */[
                                        5,
                                        10,
                                        30
                                      ];
                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform2, pos2, TransformAPI$Wonderjs.setTransformLocalPosition(transform1, pos1, TransformAPI$Wonderjs.setTransformLocalPosition(transform0, /* tuple */[
                                                    2,
                                                    4,
                                                    6
                                                  ], state)));
                                      var state$2 = TransformTool$Wonderjs.dispose(transform0, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      TransformAPI$Wonderjs.getTransformPosition(transform1, state$2),
                                                      TransformAPI$Wonderjs.getTransformPosition(transform2, state$2)
                                                    ]), /* tuple */[
                                                  pos1,
                                                  Vector3Service$Wonderjs.add(/* Float */0, pos1, pos2)
                                                ]);
                                    }));
                      }));
                Wonder_jest.describe("dispose map record", (function (param) {
                        Wonder_jest.test("remove from parentMap, childMap,  dirtyMap, gameObjectMap", (function (param) {
                                var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                var transform1 = match[2];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectTransformComponent(match[1], transform1, false, match[0]);
                                var match$1 = TransformTool$Wonderjs.getRecord(state$1);
                                var parentMap = match$1[/* parentMap */15];
                                var childMap = match$1[/* childMap */16];
                                var gameObjectMap = match$1[/* gameObjectMap */17];
                                var dirtyMap = match$1[/* dirtyMap */18];
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                MutableSparseMapService$WonderCommonlib.has(transform1, parentMap),
                                                MutableSparseMapService$WonderCommonlib.has(transform1, childMap),
                                                MutableSparseMapService$WonderCommonlib.has(transform1, dirtyMap),
                                                MutableSparseMapService$WonderCommonlib.has(transform1, gameObjectMap)
                                              ]), /* tuple */[
                                            false,
                                            false,
                                            false,
                                            false
                                          ]);
                              }));
                        return Wonder_jest.describe("test remove from type array", (function (param) {
                                      Wonder_jest.describe("remove from localToWorldMatrices", (function (param) {
                                              var _prepare = function (state) {
                                                var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                                var transform1 = match[2];
                                                var gameObject1 = match[1];
                                                var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                                var transform2 = match$1[2];
                                                var mat1 = /* array */[
                                                  2,
                                                  0,
                                                  0,
                                                  0,
                                                  0,
                                                  1,
                                                  0,
                                                  0,
                                                  0,
                                                  0,
                                                  1,
                                                  0,
                                                  0,
                                                  0,
                                                  0,
                                                  1
                                                ];
                                                var mat2 = /* array */[
                                                  20,
                                                  0,
                                                  0,
                                                  0,
                                                  0,
                                                  1,
                                                  0,
                                                  0,
                                                  0,
                                                  0,
                                                  1,
                                                  0,
                                                  0,
                                                  0,
                                                  0,
                                                  1
                                                ];
                                                var state$1 = TransformTool$Wonderjs.setLocalToWorldMatrix(transform1, mat1, match$1[0]);
                                                var state$2 = TransformTool$Wonderjs.setLocalToWorldMatrix(transform2, mat2, state$1);
                                                var state$3 = GameObjectTool$Wonderjs.disposeGameObjectTransformComponent(gameObject1, transform1, false, state$2);
                                                return /* tuple */[
                                                        state$3,
                                                        /* tuple */[
                                                          gameObject1,
                                                          match$1[1]
                                                        ],
                                                        /* tuple */[
                                                          mat1,
                                                          mat2
                                                        ],
                                                        /* tuple */[
                                                          transform1,
                                                          transform2
                                                        ]
                                                      ];
                                              };
                                              return Wonder_jest.test("reset removed one's value", (function (param) {
                                                            var match = _prepare(state);
                                                            var match$1 = match[3];
                                                            var state$1 = match[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            TransformTool$Wonderjs.getLocalToWorldMatrix(match$1[0], state$1),
                                                                            TransformTool$Wonderjs.getLocalToWorldMatrix(match$1[1], state$1)
                                                                          ]), /* tuple */[
                                                                        TransformTool$Wonderjs.getDefaultLocalToWorldMatrix(state$1),
                                                                        match[2][1]
                                                                      ]);
                                                          }));
                                            }));
                                      Wonder_jest.describe("remove from localPositions", (function (param) {
                                              var _prepare = function (state) {
                                                var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                                var transform1 = match[2];
                                                var gameObject1 = match[1];
                                                var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                                var transform2 = match$1[2];
                                                var pos1 = /* tuple */[
                                                  1,
                                                  2,
                                                  3
                                                ];
                                                var pos2 = /* tuple */[
                                                  5,
                                                  10,
                                                  30
                                                ];
                                                var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, pos1, match$1[0]);
                                                var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(transform2, pos2, state$1);
                                                var state$3 = GameObjectTool$Wonderjs.disposeGameObjectTransformComponent(gameObject1, transform1, false, state$2);
                                                return /* tuple */[
                                                        state$3,
                                                        /* tuple */[
                                                          gameObject1,
                                                          match$1[1]
                                                        ],
                                                        /* tuple */[
                                                          pos1,
                                                          pos2
                                                        ],
                                                        /* tuple */[
                                                          transform1,
                                                          transform2
                                                        ]
                                                      ];
                                              };
                                              return Wonder_jest.test("reset removed one's value", (function (param) {
                                                            TestTool$Wonderjs.closeContractCheck(/* () */0);
                                                            var match = _prepare(state);
                                                            var match$1 = match[3];
                                                            var state$1 = match[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            TransformAPI$Wonderjs.getTransformLocalPosition(match$1[0], state$1),
                                                                            TransformAPI$Wonderjs.getTransformLocalPosition(match$1[1], state$1)
                                                                          ]), /* tuple */[
                                                                        TransformTool$Wonderjs.getDefaultLocalPositionTuple(state$1),
                                                                        match[2][1]
                                                                      ]);
                                                          }));
                                            }));
                                      Wonder_jest.describe("remove from localRotations", (function (param) {
                                              var _prepare = function (state) {
                                                var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                                var transform1 = match[2];
                                                var gameObject1 = match[1];
                                                var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                                var transform2 = match$1[2];
                                                var rotation1 = /* tuple */[
                                                  1,
                                                  2,
                                                  3,
                                                  1
                                                ];
                                                var rotation2 = /* tuple */[
                                                  5.5,
                                                  10,
                                                  30,
                                                  2
                                                ];
                                                var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(transform1, rotation1, match$1[0]);
                                                var state$2 = TransformAPI$Wonderjs.setTransformLocalRotation(transform2, rotation2, state$1);
                                                var state$3 = GameObjectTool$Wonderjs.disposeGameObjectTransformComponent(gameObject1, transform1, false, state$2);
                                                return /* tuple */[
                                                        state$3,
                                                        /* tuple */[
                                                          gameObject1,
                                                          match$1[1]
                                                        ],
                                                        /* tuple */[
                                                          rotation1,
                                                          rotation2
                                                        ],
                                                        /* tuple */[
                                                          transform1,
                                                          transform2
                                                        ]
                                                      ];
                                              };
                                              return Wonder_jest.test("reset removed one's value", (function (param) {
                                                            TestTool$Wonderjs.closeContractCheck(/* () */0);
                                                            var match = _prepare(state);
                                                            var match$1 = match[3];
                                                            var state$1 = match[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            TransformAPI$Wonderjs.getTransformLocalRotation(match$1[0], state$1),
                                                                            TransformAPI$Wonderjs.getTransformLocalRotation(match$1[1], state$1)
                                                                          ]), /* tuple */[
                                                                        TransformTool$Wonderjs.getDefaultLocalRotationTuple(state$1),
                                                                        match[2][1]
                                                                      ]);
                                                          }));
                                            }));
                                      return Wonder_jest.describe("remove from localScales", (function (param) {
                                                    var _prepare = function (state) {
                                                      var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                                      var transform1 = match[2];
                                                      var gameObject1 = match[1];
                                                      var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                                      var transform2 = match$1[2];
                                                      var scale1 = /* tuple */[
                                                        1,
                                                        2,
                                                        3
                                                      ];
                                                      var scale2 = /* tuple */[
                                                        5,
                                                        10,
                                                        30
                                                      ];
                                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalScale(transform1, scale1, match$1[0]);
                                                      var state$2 = TransformAPI$Wonderjs.setTransformLocalScale(transform2, scale2, state$1);
                                                      var state$3 = GameObjectTool$Wonderjs.disposeGameObjectTransformComponent(gameObject1, transform1, false, state$2);
                                                      return /* tuple */[
                                                              state$3,
                                                              /* tuple */[
                                                                gameObject1,
                                                                match$1[1]
                                                              ],
                                                              /* tuple */[
                                                                scale1,
                                                                scale2
                                                              ],
                                                              /* tuple */[
                                                                transform1,
                                                                transform2
                                                              ]
                                                            ];
                                                    };
                                                    return Wonder_jest.test("reset removed one's value", (function (param) {
                                                                  TestTool$Wonderjs.closeContractCheck(/* () */0);
                                                                  var match = _prepare(state);
                                                                  var match$1 = match[3];
                                                                  var state$1 = match[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  TransformAPI$Wonderjs.getTransformLocalScale(match$1[0], state$1),
                                                                                  TransformAPI$Wonderjs.getTransformLocalScale(match$1[1], state$1)
                                                                                ]), /* tuple */[
                                                                              TransformTool$Wonderjs.getDefaultLocalScaleTuple(state$1),
                                                                              match[2][1]
                                                                            ]);
                                                                }));
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test add new one after dispose old one", (function (param) {
                        Wonder_jest.describe("if has disposed one", (function (param) {
                                Wonder_jest.test("use disposed index(transform) as new index", (function (param) {
                                        var match = _prepare(/* () */0);
                                        var transform2 = match[2];
                                        var transform1 = match[1];
                                        var state = TransformTool$Wonderjs.dispose(transform1, match[0]);
                                        var state$1 = TransformTool$Wonderjs.dispose(transform2, state);
                                        var match$1 = TransformAPI$Wonderjs.createTransform(state$1);
                                        var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        match$1[1],
                                                        match$2[1]
                                                      ]), /* tuple */[
                                                    transform2,
                                                    transform1
                                                  ]);
                                      }));
                                return Wonder_jest.test("new one can get default localPosition", (function (param) {
                                              var match = _prepare(/* () */0);
                                              var transform1 = match[1];
                                              var state = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                    1,
                                                    2,
                                                    3
                                                  ], match[0]);
                                              var state$1 = TransformTool$Wonderjs.dispose(transform1, state);
                                              var match$1 = TransformAPI$Wonderjs.createTransform(state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformLocalPosition(match$1[1], match$1[0])), TransformTool$Wonderjs.getDefaultPosition(/* () */0));
                                            }));
                              }));
                        Wonder_jest.test("else, increase transformRecord.index", (function (param) {
                                var match = _prepare(/* () */0);
                                var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1]), match[2] + 1 | 0);
                              }));
                        return Wonder_jest.describe("fix bug", (function (param) {
                                      return Wonder_jest.test("new one should has default transform record", (function (param) {
                                                    var match = _prepare(/* () */0);
                                                    var transform1 = match[1];
                                                    var state = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                          0,
                                                          1,
                                                          2
                                                        ], match[0]);
                                                    TransformAPI$Wonderjs.getTransformPosition(transform1, state);
                                                    var state$1 = TransformTool$Wonderjs.dispose(transform1, state);
                                                    var match$1 = TransformAPI$Wonderjs.createTransform(state$1);
                                                    var transform3 = match$1[1];
                                                    var state$2 = match$1[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    TransformAPI$Wonderjs.getTransformLocalPosition(transform3, state$2),
                                                                    TransformAPI$Wonderjs.getTransformPosition(transform3, state$2)
                                                                  ]), /* tuple */[
                                                                TransformTool$Wonderjs.getDefaultPosition(/* () */0),
                                                                TransformTool$Wonderjs.getDefaultPosition(/* () */0)
                                                              ]);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("contract check", (function (param) {
                              return Wonder_jest.test("expect dispose the alive component, but actual not", (function (param) {
                                            var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                            var transform1 = match[2];
                                            var gameObject1 = match[1];
                                            var state$1 = GameObjectTool$Wonderjs.disposeGameObjectTransformComponent(gameObject1, transform1, false, match[0]);
                                            return Wonder_jest.Expect[/* toThrowMessage */21]("expect dispose the alive component, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                              GameObjectTool$Wonderjs.disposeGameObjectTransformComponent(gameObject1, transform1, false, state$1);
                                                              return /* () */0;
                                                            })));
                                          }));
                            }));
              }));
        Wonder_jest.describe("lookAt", (function (param) {
                return Wonder_jest.test("if viewPoint to target is default up axis, should specify the new up direction", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var tra1 = match[1];
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var tra2 = match$1[1];
                              var pos1 = /* tuple */[
                                0,
                                1,
                                0
                              ];
                              var pos2 = /* tuple */[
                                0,
                                2,
                                0
                              ];
                              var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(tra2, pos2, TransformAPI$Wonderjs.setTransformLocalPosition(tra1, pos1, match$1[0]));
                              var state$2 = TransformAPI$Wonderjs.lookAt(tra1, pos2, state$1);
                              var tra1EulerAngles1 = QuaternionTool$Wonderjs.getEulerAngles(TransformAPI$Wonderjs.getTransformLocalRotation(tra1, state$2));
                              var state$3 = TransformAPI$Wonderjs.setTransformLocalPosition(tra2, pos2, TransformAPI$Wonderjs.setTransformLocalPosition(tra1, pos1, state$2));
                              var state$4 = TransformAPI$Wonderjs.lookAtWithUp(tra1, pos2, /* tuple */[
                                    0,
                                    0,
                                    1
                                  ], state$3);
                              var tra1EulerAngles2 = QuaternionTool$Wonderjs.getEulerAngles(TransformAPI$Wonderjs.getTransformLocalRotation(tra1, state$4));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              tra1EulerAngles1,
                                              tra1EulerAngles2
                                            ]), /* tuple */[
                                          /* tuple */[
                                            Number.NaN,
                                            Number.NaN,
                                            Number.NaN
                                          ],
                                          /* tuple */[
                                            89.99999803884896,
                                            0,
                                            0
                                          ]
                                        ]);
                            }));
              }));
        Wonder_jest.describe("lookAtWithUp", (function (param) {
                return Wonder_jest.test("if viewPoint to target is default up axis, should specify the new up direction", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var tra1 = match[1];
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var tra2 = match$1[1];
                              var pos1 = /* tuple */[
                                0,
                                1,
                                0
                              ];
                              var pos2 = /* tuple */[
                                0,
                                2,
                                0
                              ];
                              var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(tra2, pos2, TransformAPI$Wonderjs.setTransformLocalPosition(tra1, pos1, match$1[0]));
                              var state$2 = TransformAPI$Wonderjs.lookAt(tra1, pos2, state$1);
                              var tra1EulerAngles1 = QuaternionTool$Wonderjs.getEulerAngles(TransformAPI$Wonderjs.getTransformLocalRotation(tra1, state$2));
                              var state$3 = TransformAPI$Wonderjs.setTransformLocalPosition(tra2, pos2, TransformAPI$Wonderjs.setTransformLocalPosition(tra1, pos1, state$2));
                              var state$4 = TransformAPI$Wonderjs.lookAtWithUp(tra1, pos2, /* tuple */[
                                    0,
                                    0,
                                    1
                                  ], state$3);
                              var tra1EulerAngles2 = QuaternionTool$Wonderjs.getEulerAngles(TransformAPI$Wonderjs.getTransformLocalRotation(tra1, state$4));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              tra1EulerAngles1,
                                              tra1EulerAngles2
                                            ]), /* tuple */[
                                          /* tuple */[
                                            Number.NaN,
                                            Number.NaN,
                                            Number.NaN
                                          ],
                                          /* tuple */[
                                            89.99999803884896,
                                            0,
                                            0
                                          ]
                                        ]);
                            }));
              }));
        Wonder_jest.describe("rotateLocalOnAxis", (function (param) {
                return Wonder_jest.test("rotate on local axis in the local coordinate system", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var tra1 = match[1];
                              var yAxis = /* tuple */[
                                0,
                                1,
                                0
                              ];
                              var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(tra1, /* tuple */[
                                    0,
                                    1,
                                    0
                                  ], match[0]);
                              var state$2 = TransformAPI$Wonderjs.rotateLocalOnAxis(tra1, /* tuple */[
                                    10,
                                    yAxis
                                  ], TransformAPI$Wonderjs.rotateLocalOnAxis(tra1, /* tuple */[
                                        45,
                                        /* tuple */[
                                          1,
                                          0,
                                          0
                                        ]
                                      ], TransformAPI$Wonderjs.rotateLocalOnAxis(tra1, /* tuple */[
                                            45,
                                            yAxis
                                          ], state$1)));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformLocalEulerAngles(tra1, state$2)), /* tuple */[
                                          53.52699620225938,
                                          51.55342957783367,
                                          11.389428193681704
                                        ]);
                            }));
              }));
        Wonder_jest.describe("rotateWorldOnAxis", (function (param) {
                return Wonder_jest.test("rotate on world axis in the world coordinate system", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var tra1 = match[1];
                              var yAxis = /* tuple */[
                                0,
                                1,
                                0
                              ];
                              var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(tra1, /* tuple */[
                                    0,
                                    1,
                                    0
                                  ], match[0]);
                              var state$2 = TransformAPI$Wonderjs.rotateWorldOnAxis(tra1, /* tuple */[
                                    10,
                                    yAxis
                                  ], TransformAPI$Wonderjs.rotateWorldOnAxis(tra1, /* tuple */[
                                        45,
                                        /* tuple */[
                                          1,
                                          0,
                                          0
                                        ]
                                      ], TransformAPI$Wonderjs.rotateWorldOnAxis(tra1, /* tuple */[
                                            45,
                                            yAxis
                                          ], state$1)));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformLocalEulerAngles(tra1, state$2)), /* tuple */[
                                          62.04153935036139,
                                          37.965850368256476,
                                          39.36170307898388
                                        ]);
                            }));
              }));
        Wonder_jest.describe("changeChildOrder", (function (param) {
                return Wonder_jest.describe("change child order", (function (param) {
                              Wonder_jest.describe("test source and target has the same parent", (function (param) {
                                      var _prepare = function (state) {
                                        var match = TransformAPI$Wonderjs.createTransform(state);
                                        var parent = match[1];
                                        var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                        var child1 = match$1[1];
                                        var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                                        var child2 = match$2[1];
                                        var match$3 = TransformAPI$Wonderjs.createTransform(match$2[0]);
                                        var child3 = match$3[1];
                                        var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child3, TransformAPI$Wonderjs.setTransformParent(parent, child2, TransformAPI$Wonderjs.setTransformParent(parent, child1, match$3[0])));
                                        return /* tuple */[
                                                state$1,
                                                parent,
                                                /* tuple */[
                                                  child1,
                                                  child2,
                                                  child3
                                                ]
                                              ];
                                      };
                                      Wonder_jest.test("test before", (function (param) {
                                              var match = _prepare(state[0]);
                                              var match$1 = match[2];
                                              var child3 = match$1[2];
                                              var child1 = match$1[0];
                                              var parent = match[1];
                                              var state$1 = TransformAPI$Wonderjs.changeChildOrder(child3, child1, parent, /* Before */0, match[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(parent, state$1)), /* array */[
                                                          child3,
                                                          child1,
                                                          match$1[1]
                                                        ]);
                                            }));
                                      return Wonder_jest.test("test after", (function (param) {
                                                    var match = _prepare(state[0]);
                                                    var match$1 = match[2];
                                                    var child3 = match$1[2];
                                                    var child1 = match$1[0];
                                                    var parent = match[1];
                                                    var state$1 = TransformAPI$Wonderjs.changeChildOrder(child3, child1, parent, /* After */1, match[0]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(parent, state$1)), /* array */[
                                                                child1,
                                                                child3,
                                                                match$1[1]
                                                              ]);
                                                  }));
                                    }));
                              Wonder_jest.describe("test source and target has different parents", (function (param) {
                                      var _prepare = function (state) {
                                        var match = TransformAPI$Wonderjs.createTransform(state);
                                        var parent1 = match[1];
                                        var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                        var parent2 = match$1[1];
                                        var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                                        var child1 = match$2[1];
                                        var match$3 = TransformAPI$Wonderjs.createTransform(match$2[0]);
                                        var child2 = match$3[1];
                                        var match$4 = TransformAPI$Wonderjs.createTransform(match$3[0]);
                                        var child3 = match$4[1];
                                        var state$1 = TransformAPI$Wonderjs.setTransformParent(parent2, child3, TransformAPI$Wonderjs.setTransformParent(parent1, child2, TransformAPI$Wonderjs.setTransformParent(parent1, child1, match$4[0])));
                                        return /* tuple */[
                                                state$1,
                                                /* tuple */[
                                                  parent1,
                                                  parent2
                                                ],
                                                /* tuple */[
                                                  child1,
                                                  child2,
                                                  child3
                                                ]
                                              ];
                                      };
                                      return Wonder_jest.test("should contract error", (function (param) {
                                                    var match = _prepare(state[0]);
                                                    var match$1 = match[2];
                                                    var child3 = match$1[2];
                                                    var child1 = match$1[0];
                                                    var parent1 = match[1][0];
                                                    var state$1 = match[0];
                                                    return Wonder_jest.Expect[/* toThrow */18](Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                      TransformAPI$Wonderjs.changeChildOrder(child3, child1, parent1, /* Before */0, state$1);
                                                                      return /* () */0;
                                                                    })));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test source not has a parent", (function (param) {
                                            var _prepare = function (state) {
                                              var match = TransformAPI$Wonderjs.createTransform(state);
                                              var parent1 = match[1];
                                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                              var child1 = match$1[1];
                                              var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                                              var child2 = match$2[1];
                                              var match$3 = TransformAPI$Wonderjs.createTransform(match$2[0]);
                                              var state$1 = TransformAPI$Wonderjs.setTransformParent(parent1, child2, TransformAPI$Wonderjs.setTransformParent(parent1, child1, match$3[0]));
                                              return /* tuple */[
                                                      state$1,
                                                      parent1,
                                                      /* tuple */[
                                                        child1,
                                                        child2,
                                                        match$3[1]
                                                      ]
                                                    ];
                                            };
                                            return Wonder_jest.test("should contract error", (function (param) {
                                                          var match = _prepare(state[0]);
                                                          var match$1 = match[2];
                                                          var child3 = match$1[2];
                                                          var child1 = match$1[0];
                                                          var parent1 = match[1];
                                                          var state$1 = match[0];
                                                          return Wonder_jest.Expect[/* toThrow */18](Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                            TransformAPI$Wonderjs.changeChildOrder(child3, child1, parent1, /* Before */0, state$1);
                                                                            return /* () */0;
                                                                          })));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("contract check: is alive", (function (param) {
                return Wonder_jest.describe("if transform is disposed", (function (param) {
                              var _testGetFunc = function (getFunc) {
                                var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                var transform1 = match[1];
                                var state$1 = TransformTool$Wonderjs.dispose(transform1, match[0]);
                                return Wonder_jest.Expect[/* toThrowMessage */21]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                  return Curry._2(getFunc, transform1, state$1);
                                                })));
                              };
                              var _testSetFunc = function (setFunc) {
                                var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                var transform1 = match[1];
                                var state$1 = TransformTool$Wonderjs.dispose(transform1, match[0]);
                                return Wonder_jest.Expect[/* toThrowMessage */21]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                  return Curry._3(setFunc, transform1, 1, state$1);
                                                })));
                              };
                              Wonder_jest.test("getTransformPosition should error", (function (param) {
                                      return _testGetFunc(TransformAPI$Wonderjs.getTransformPosition);
                                    }));
                              Wonder_jest.test("getTransformLocalPosition should error", (function (param) {
                                      return _testGetFunc(TransformAPI$Wonderjs.getTransformLocalPosition);
                                    }));
                              Wonder_jest.test("getTransformRotation should error", (function (param) {
                                      return _testGetFunc(TransformAPI$Wonderjs.getTransformRotation);
                                    }));
                              Wonder_jest.test("getTransformLocalRotation should error", (function (param) {
                                      return _testGetFunc(TransformAPI$Wonderjs.getTransformLocalRotation);
                                    }));
                              Wonder_jest.test("getTransformScale should error", (function (param) {
                                      return _testGetFunc(TransformAPI$Wonderjs.getTransformScale);
                                    }));
                              Wonder_jest.test("getTransformLocalScale should error", (function (param) {
                                      return _testGetFunc(TransformAPI$Wonderjs.getTransformLocalScale);
                                    }));
                              Wonder_jest.test("unsafeGetTransformParent should error", (function (param) {
                                      return _testGetFunc(TransformAPI$Wonderjs.unsafeGetTransformParent);
                                    }));
                              Wonder_jest.test("unsafeGetTransformChildren should error", (function (param) {
                                      return _testGetFunc(TransformAPI$Wonderjs.unsafeGetTransformChildren);
                                    }));
                              Wonder_jest.test("unsafeGetTransformGameObject should error", (function (param) {
                                      return _testGetFunc(TransformAPI$Wonderjs.unsafeGetTransformGameObject);
                                    }));
                              Wonder_jest.test("setTransformPosition should error", (function (param) {
                                      return _testSetFunc(TransformAPI$Wonderjs.setTransformPosition);
                                    }));
                              Wonder_jest.test("setTransformLocalPosition should error", (function (param) {
                                      return _testSetFunc(TransformAPI$Wonderjs.setTransformLocalPosition);
                                    }));
                              Wonder_jest.test("setTransformRotation should error", (function (param) {
                                      return _testSetFunc(TransformAPI$Wonderjs.setTransformRotation);
                                    }));
                              Wonder_jest.test("setTransformLocalRotation should error", (function (param) {
                                      return _testSetFunc(TransformAPI$Wonderjs.setTransformLocalRotation);
                                    }));
                              Wonder_jest.test("setTransformScale should error", (function (param) {
                                      return _testSetFunc(TransformAPI$Wonderjs.setTransformScale);
                                    }));
                              Wonder_jest.test("setTransformLocalScale should error", (function (param) {
                                      return _testSetFunc(TransformAPI$Wonderjs.setTransformLocalScale);
                                    }));
                              return Wonder_jest.test("setTransformParent should error", (function (param) {
                                            return _testSetFunc(TransformAPI$Wonderjs.setTransformParent);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      Wonder_jest.test("the second transform's default localToWorldMatrix should be identity matrix4 when create two transforms", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var state$1 = match$1[0];
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformTool$Wonderjs.getLocalToWorldMatrixTypeArray(match$1[1], state$1)), TransformTool$Wonderjs.getDefaultLocalToWorldMatrixTypeArray(state$1));
                            }));
                      Wonder_jest.test("get the data from Float32Array may not equal to the value which is setted", (function (param) {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var transform0 = match[1];
                              var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform0, /* tuple */[
                                    0.1,
                                    0,
                                    0
                                  ], match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformLocalPosition(transform0, state$1)), /* tuple */[
                                          0.10000000149011612,
                                          0,
                                          0
                                        ]);
                            }));
                      return Wonder_jest.describe("fix rotate on axis", (function (param) {
                                    var _test = function (expectedLocalEulerAngles, toFixFunc) {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var transform = match[1];
                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(transform, /* tuple */[
                                            -0.02508343756198883,
                                            0,
                                            0,
                                            0.5063101649284363
                                          ], match[0]);
                                      var state$2 = Curry._2(toFixFunc, transform, state$1);
                                      var state$3 = TransformAPI$Wonderjs.rotateWorldOnAxis(transform, /* tuple */[
                                            45,
                                            /* tuple */[
                                              1,
                                              0,
                                              0
                                            ]
                                          ], state$2);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Tool$Wonderjs.truncate(3, TransformAPI$Wonderjs.getTransformLocalEulerAngles(transform, state$3))), expectedLocalEulerAngles);
                                    };
                                    Wonder_jest.test("the euler angle after rotate on axis is wrong", (function (param) {
                                            return _test(/* tuple */[
                                                        9.811,
                                                        0,
                                                        0
                                                      ], (function (param, state) {
                                                          return state;
                                                        }));
                                          }));
                                    return Wonder_jest.test("should set euler angle before rotate on axis", (function (param) {
                                                  return _test(/* tuple */[
                                                              43.543,
                                                              0,
                                                              0
                                                            ], (function (transform, state) {
                                                                return TransformAPI$Wonderjs.setTransformLocalEulerAngles(transform, TransformAPI$Wonderjs.getTransformLocalEulerAngles(transform, state), state);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
