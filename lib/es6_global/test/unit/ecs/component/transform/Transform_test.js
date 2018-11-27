

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TransformTool$Wonderjs from "../../../../tool/service/transform/TransformTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as QuaternionTool$Wonderjs from "../../../tool/service/atom/QuaternionTool.js";
import * as Vector3Service$Wonderjs from "../../../../../src/service/atom/Vector3Service.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

describe("Transform", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _judgeOneToOne = function (param, param$1, param$2, state) {
          var child = param[1];
          var parent = param[0];
          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
        describe("createTransform", (function () {
                Wonder_jest.test("create a new transform which is just index(int)", (function () {
                        var match = TransformAPI$Wonderjs.createTransform(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        TransformTool$Wonderjs.getRecord(match[0])[/* index */0],
                                        match[1]
                                      ]), /* tuple */[
                                    2,
                                    1
                                  ]);
                      }));
                describe("change state", (function () {
                        return Wonder_jest.test("state->index + 1", (function () {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var record = TransformTool$Wonderjs.getRecord(match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](record[/* index */0]), 2);
                                    }));
                      }));
                return Wonder_jest.test("mark new transform dirty", (function () {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformTool$Wonderjs.isDirty(match[1], match[0])), true);
                            }));
              }));
        describe("unsafeGetTransformParent", (function () {
                return Wonder_jest.test("default value should be Js.Undefined.empty", (function () {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformParent(match[1], match[0])), undefined);
                            }));
              }));
        describe("setTransformParent", (function () {
                describe("the change of parent before setted as parent will affect child", (function () {
                        Wonder_jest.test("test one(parent)-one(child)", (function () {
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
                        return Wonder_jest.test("test one(parent)-two(child)", (function () {
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
                describe("if set parent to be null, remove its current parent", (function () {
                        describe("test one(parent)-one(child)", (function () {
                                var exec = function () {
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
                                Wonder_jest.test("test remove its current parent", (function () {
                                        var match = exec(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformParent(match[2], match[0])), undefined);
                                      }));
                                return Wonder_jest.test("test position and local position", (function () {
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
                        return Wonder_jest.test("test one(parent)-two(child)", (function () {
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
                describe("if child already has parent", (function () {
                        Wonder_jest.test("can set the same parent", (function () {
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
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformParent(child, state$2)), parent);
                              }));
                        Wonder_jest.test("can set different parent", (function () {
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
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformParent(child, state$2)), parent2);
                              }));
                        return Wonder_jest.test("change its current parent's children order", (function () {
                                      var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                      var parent = match[1];
                                      var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                      var child1 = match$1[1];
                                      var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                                      var match$3 = TransformAPI$Wonderjs.createTransform(match$2[0]);
                                      var child3 = match$3[1];
                                      var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child3, TransformAPI$Wonderjs.setTransformParent(parent, match$2[1], TransformAPI$Wonderjs.setTransformParent(parent, child1, match$3[0])));
                                      var state$2 = TransformAPI$Wonderjs.setTransformParent(child3, child1, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(parent, state$2)), /* array */[
                                                  4,
                                                  3
                                                ]);
                                    }));
                      }));
                describe("fix bug", (function () {
                        return Wonder_jest.test("test two(parent)-two(child)", (function () {
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
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                return /* () */0;
              }));
        describe("setTransformParentKeepOrder", (function () {
                return Wonder_jest.test("not change its current parent's children order", (function () {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var parent = match[1];
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var child1 = match$1[1];
                              var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                              var match$3 = TransformAPI$Wonderjs.createTransform(match$2[0]);
                              var child3 = match$3[1];
                              var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child3, TransformAPI$Wonderjs.setTransformParent(parent, match$2[1], TransformAPI$Wonderjs.setTransformParent(parent, child1, match$3[0])));
                              var state$2 = TransformAPI$Wonderjs.setTransformParentKeepOrder(child3, child1, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(parent, state$2)), /* array */[
                                          3,
                                          4
                                        ]);
                            }));
              }));
        describe("unsafeGetTransformChildren", (function () {
                return Wonder_jest.test("get parent's all children", (function () {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var parent = match[1];
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var child1 = match$1[1];
                              var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                              var child2 = match$2[1];
                              var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child1, match$2[0]);
                              var state$2 = TransformAPI$Wonderjs.setTransformParent(parent, child2, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(parent, state$2)), /* array */[
                                          child1,
                                          child2
                                        ]);
                            }));
              }));
        describe("setTransformLocalPosition", (function () {
                var _prepare = function () {
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
                Wonder_jest.test("change parent's localPosition should affect children", (function () {
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
                return Wonder_jest.test("change child's localPosition shouldn't affect parent", (function () {
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
        describe("getTransformPosition", (function () {
                Wonder_jest.test("default value should be (0.,0.,0.)", (function () {
                        var match = TransformAPI$Wonderjs.createTransform(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformPosition(match[1], match[0])), TransformTool$Wonderjs.getDefaultPosition(/* () */0));
                      }));
                return Wonder_jest.test("can get the newest position", (function () {
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
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformPosition(child, state$1)), pos);
                            }));
              }));
        describe("setTransformPosition", (function () {
                describe("set position in world coordinate system", (function () {
                        Wonder_jest.test("change parent's position should affect children", (function () {
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
                        return Wonder_jest.test("change child's position shouldn't affect parent", (function () {
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
                return /* () */0;
              }));
        describe("getTransformRotation", (function () {
                Wonder_jest.test("default value should be (0.,0.,0.,1.)", (function () {
                        var match = TransformAPI$Wonderjs.createTransform(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformRotation(match[1], match[0])), TransformTool$Wonderjs.getDefaultRotation(/* () */0));
                      }));
                return Wonder_jest.test("can get the newest rotation", (function () {
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
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformRotation(child, state$1)), rotation);
                            }));
              }));
        describe("setTransformRotation", (function () {
                describe("set rotation in world coordinate system", (function () {
                        Wonder_jest.test("change parent's rotation should affect children", (function () {
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
                        return Wonder_jest.test("change child's rotation shouldn't affect parent", (function () {
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
                return /* () */0;
              }));
        describe("getTransformEulerAngles", (function () {
                Wonder_jest.test("default value should be (0.,0.,0.)", (function () {
                        var match = TransformAPI$Wonderjs.createTransform(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformEulerAngles(match[1], match[0])), /* tuple */[
                                    0,
                                    -0,
                                    0
                                  ]);
                      }));
                return Wonder_jest.test("can get the newest eulerAngles", (function () {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var parent = match[1];
                              var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                              var child = match$1[1];
                              var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, child, TransformAPI$Wonderjs.setTransformLocalEulerAngles(parent, /* tuple */[
                                        45,
                                        45,
                                        90
                                      ], match$1[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformEulerAngles(child, state$1)), /* tuple */[
                                          45,
                                          44.99999999999999,
                                          90
                                        ]);
                            }));
              }));
        describe("setTransformEulerAngles", (function () {
                describe("set eulerAngles in world coordinate system", (function () {
                        var _judgeEulerAnglesOneToOne = function (param, param$1, param$2, state) {
                          var child = param[1];
                          var parent = param[0];
                          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                        Wonder_jest.test("change parent's eulerAngles should affect children", (function () {
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
                        return Wonder_jest.test("change child's eulerAngles shouldn't affect parent", (function () {
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
                return /* () */0;
              }));
        describe("getTransformScale", (function () {
                Wonder_jest.test("default value should be (1.,1.,1.)", (function () {
                        var match = TransformAPI$Wonderjs.createTransform(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformScale(match[1], match[0])), TransformTool$Wonderjs.getDefaultScale(/* () */0));
                      }));
                return Wonder_jest.test("can get the newest rotation", (function () {
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
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformScale(child, state$1)), scale);
                            }));
              }));
        describe("setTransformScale", (function () {
                describe("set scale in world coordinate system", (function () {
                        Wonder_jest.test("change parent's scale should affect children", (function () {
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
                        return Wonder_jest.test("change child's scale shouldn't affect parent", (function () {
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
                return /* () */0;
              }));
        describe("unsafeGetTransformGameObject", (function () {
                return Wonder_jest.test("get transform's gameObject", (function () {
                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                              var gameObject = match[1];
                              var state$1 = match[0];
                              var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformGameObject(transform, state$1)), gameObject);
                            }));
              }));
        describe("getLocalToWorldMatrixTypeArray", (function () {
                describe("test cache", (function () {
                        Wonder_jest.test("cache data after first get", (function () {
                                var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                var transform1 = match[1];
                                var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                      1,
                                      2,
                                      3
                                    ], match[0]);
                                var mat1 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(transform1, state$1);
                                var mat2 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(transform1, state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](mat1), mat2);
                              }));
                        describe("test cache invalid", (function () {
                                var _prepare = function (state) {
                                  var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                  var transform1 = match[1];
                                  var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                        1,
                                        2,
                                        3
                                      ], match[0]);
                                  var mat1 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(transform1, state$1).slice();
                                  return /* tuple */[
                                          state$1,
                                          transform1,
                                          mat1
                                        ];
                                };
                                describe("invalid after change local position", (function () {
                                        Wonder_jest.test("test by updateAndGetLocalToWorldMatrixTypeArray", (function () {
                                                var match = _prepare(state);
                                                var transform1 = match[1];
                                                var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                      2,
                                                      2,
                                                      3
                                                    ], match[0]);
                                                var mat2 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(transform1, state$1);
                                                return Wonder_jest.Expect[/* toEqual */12](mat2)(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[2])));
                                              }));
                                        return Wonder_jest.test("test type array", (function () {
                                                      var match = _prepare(state);
                                                      var transform1 = match[1];
                                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                            2,
                                                            2,
                                                            3
                                                          ], match[0]);
                                                      var state$2 = TransformTool$Wonderjs.update(transform1, state$1);
                                                      var mat2 = TransformTool$Wonderjs.getLocalToWorldMatrixTypeArrayByVisitTypeArray(transform1, state$2);
                                                      return Wonder_jest.Expect[/* toEqual */12](mat2)(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[2])));
                                                    }));
                                      }));
                                Wonder_jest.test("invalid after change position", (function () {
                                        var match = _prepare(state);
                                        var transform1 = match[1];
                                        var state$1 = TransformAPI$Wonderjs.setTransformPosition(transform1, /* tuple */[
                                              2,
                                              2,
                                              3
                                            ], match[0]);
                                        var mat2 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(transform1, state$1);
                                        return Wonder_jest.Expect[/* toEqual */12](mat2)(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[2])));
                                      }));
                                Wonder_jest.test("test get position after change local position", (function () {
                                        var match = _prepare(state);
                                        var transform1 = match[1];
                                        var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                              2,
                                              2,
                                              3
                                            ], match[0]);
                                        TransformAPI$Wonderjs.getTransformPosition(transform1, state$1);
                                        var mat2 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(transform1, state$1);
                                        return Wonder_jest.Expect[/* toEqual */12](mat2)(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[2])));
                                      }));
                                describe("invalid after change local rotation", (function () {
                                        return Wonder_jest.test("test by updateAndGetLocalToWorldMatrixTypeArray", (function () {
                                                      var match = _prepare(state);
                                                      var transform1 = match[1];
                                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(transform1, /* tuple */[
                                                            2,
                                                            2,
                                                            3,
                                                            1
                                                          ], match[0]);
                                                      var mat2 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(transform1, state$1);
                                                      return Wonder_jest.Expect[/* toEqual */12](mat2)(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[2])));
                                                    }));
                                      }));
                                Wonder_jest.test("invalid after change rotation", (function () {
                                        var match = _prepare(state);
                                        var transform1 = match[1];
                                        var state$1 = TransformAPI$Wonderjs.setTransformRotation(transform1, /* tuple */[
                                              2,
                                              2,
                                              3,
                                              1
                                            ], match[0]);
                                        var mat2 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(transform1, state$1);
                                        return Wonder_jest.Expect[/* toEqual */12](mat2)(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[2])));
                                      }));
                                describe("invalid after change local scaleition", (function () {
                                        return Wonder_jest.test("test by updateAndGetLocalToWorldMatrixTypeArray", (function () {
                                                      var match = _prepare(state);
                                                      var transform1 = match[1];
                                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalScale(transform1, /* tuple */[
                                                            2,
                                                            2,
                                                            3
                                                          ], match[0]);
                                                      var mat2 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(transform1, state$1);
                                                      return Wonder_jest.Expect[/* toEqual */12](mat2)(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[2])));
                                                    }));
                                      }));
                                Wonder_jest.test("invalid after change scale", (function () {
                                        var match = _prepare(state);
                                        var transform1 = match[1];
                                        var state$1 = TransformAPI$Wonderjs.setTransformScale(transform1, /* tuple */[
                                              2,
                                              2,
                                              3.5
                                            ], match[0]);
                                        var mat2 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(transform1, state$1);
                                        return Wonder_jest.Expect[/* toEqual */12](mat2)(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[2])));
                                      }));
                                describe("test with parent", (function () {
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
                                          var parentMat1 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(parent, state$3).slice();
                                          var childMat1 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(child, state$3).slice();
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
                                        Wonder_jest.test("invalid after change local position", (function () {
                                                var match = _prepare(state);
                                                var child = match[1][1];
                                                var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(child, /* tuple */[
                                                      2,
                                                      2,
                                                      3
                                                    ], match[0]);
                                                var childMat2 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(child, state$1);
                                                return Wonder_jest.Expect[/* toEqual */12](match[2][1])(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](childMat2)));
                                              }));
                                        Wonder_jest.test("invalid after change local rotation", (function () {
                                                var match = _prepare(state);
                                                var child = match[1][1];
                                                var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(child, /* tuple */[
                                                      2,
                                                      2,
                                                      3,
                                                      1
                                                    ], match[0]);
                                                var childMat2 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(child, state$1);
                                                return Wonder_jest.Expect[/* toEqual */12](match[2][1])(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](childMat2)));
                                              }));
                                        return Wonder_jest.test("invalid after change local scale", (function () {
                                                      var match = _prepare(state);
                                                      var child = match[1][1];
                                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalScale(child, /* tuple */[
                                                            2,
                                                            2,
                                                            3
                                                          ], match[0]);
                                                      var childMat2 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(child, state$1);
                                                      return Wonder_jest.Expect[/* toEqual */12](match[2][1])(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](childMat2)));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("getNormalMatrixTypeArray", (function () {
                describe("test cache", (function () {
                        Wonder_jest.test("cache data after first get", (function () {
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
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](mat1), mat2);
                              }));
                        describe("test cache invalid", (function () {
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
                                Wonder_jest.test("invalid after change local rotation", (function () {
                                        var match = _prepare(state);
                                        var transform1 = match[1];
                                        var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(transform1, /* tuple */[
                                              2,
                                              2,
                                              3,
                                              1
                                            ], match[0]);
                                        var mat2 = TransformTool$Wonderjs.updateAndGetNormalMatrixTypeArray(transform1, state$1);
                                        return Wonder_jest.Expect[/* toEqual */12](mat2)(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[2])));
                                      }));
                                Wonder_jest.test("invalid after change rotation", (function () {
                                        var match = _prepare(state);
                                        var transform1 = match[1];
                                        var state$1 = TransformAPI$Wonderjs.setTransformRotation(transform1, /* tuple */[
                                              2,
                                              2,
                                              3,
                                              1
                                            ], match[0]);
                                        var mat2 = TransformTool$Wonderjs.updateAndGetNormalMatrixTypeArray(transform1, state$1);
                                        return Wonder_jest.Expect[/* toEqual */12](mat2)(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[2])));
                                      }));
                                Wonder_jest.test("test get rotation after change local rotation", (function () {
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
                                        return Wonder_jest.Expect[/* toEqual */12](mat2)(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[2])));
                                      }));
                                describe("test with parent", (function () {
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
                                          var parentMat1 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(parent, state$3).slice();
                                          var childMat1 = TransformTool$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(child, state$3).slice();
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
                                        return Wonder_jest.test("invalid after change local rotation", (function () {
                                                      var match = _prepare(state);
                                                      var child = match[1][1];
                                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(child, /* tuple */[
                                                            2,
                                                            2,
                                                            3,
                                                            1
                                                          ], match[0]);
                                                      var childMat2 = TransformTool$Wonderjs.updateAndGetNormalMatrixTypeArray(child, state$1);
                                                      return Wonder_jest.Expect[/* toEqual */12](match[2][1])(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](childMat2)));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("dispose component", (function () {
                var _prepare = function () {
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
                describe("test if dirty", (function () {
                        return Wonder_jest.test("the disposed transform shouldn't affect other alive ones' record", (function () {
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
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformLocalPosition(transform2, state$2)), pos2);
                                    }));
                      }));
                describe("test if not dirty", (function () {
                        return Wonder_jest.test("the disposed transform shouldn't affect other alive ones' record", (function () {
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
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformLocalPosition(transform2, state$2)), pos2);
                                    }));
                      }));
                describe("if child is disposed", (function () {
                        Wonder_jest.test("should remove it from childMap", (function () {
                                var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                var transform1 = match[1];
                                var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                var transform2 = match$1[1];
                                var state$1 = TransformAPI$Wonderjs.setTransformParent(transform1, transform2, match$1[0]);
                                var state$2 = TransformTool$Wonderjs.dispose(transform2, state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(transform1, state$2)), /* array */[]);
                              }));
                        describe("shouldn't affect parent", (function () {
                                Wonder_jest.test("test disposed one has no parent", (function () {
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
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformPosition(transform2, state$1)), pos2);
                                      }));
                                return Wonder_jest.test("test disposed one has parent", (function () {
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
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              TransformAPI$Wonderjs.getTransformPosition(transform0, state$2),
                                                              TransformAPI$Wonderjs.getTransformPosition(transform1, state$2)
                                                            ]), /* tuple */[
                                                          pos0,
                                                          Vector3Service$Wonderjs.add(/* Float */0, pos0, pos1)
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("if parent is disposed", (function () {
                        Wonder_jest.test("should remove it from parentMap", (function () {
                                var match = _prepare(/* () */0);
                                var state = TransformTool$Wonderjs.dispose(match[1], match[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformParent(match[2], state)), undefined);
                              }));
                        return Wonder_jest.test("should affect children", (function () {
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
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      TransformAPI$Wonderjs.getTransformPosition(transform1, state$2),
                                                      TransformAPI$Wonderjs.getTransformPosition(transform2, state$2)
                                                    ]), /* tuple */[
                                                  pos1,
                                                  Vector3Service$Wonderjs.add(/* Float */0, pos1, pos2)
                                                ]);
                                    }));
                      }));
                describe("dispose map record", (function () {
                        Wonder_jest.test("remove from parentMap, childMap,  dirtyMap, gameObjectMap", (function () {
                                var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                var transform1 = match[2];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectTransformComponent(match[1], transform1, false, match[0]);
                                var match$1 = TransformTool$Wonderjs.getRecord(state$1);
                                var parentMap = match$1[/* parentMap */15];
                                var childMap = match$1[/* childMap */16];
                                var gameObjectMap = match$1[/* gameObjectMap */17];
                                var dirtyMap = match$1[/* dirtyMap */18];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                SparseMapService$WonderCommonlib.has(transform1, parentMap),
                                                SparseMapService$WonderCommonlib.has(transform1, childMap),
                                                SparseMapService$WonderCommonlib.has(transform1, dirtyMap),
                                                SparseMapService$WonderCommonlib.has(transform1, gameObjectMap)
                                              ]), /* tuple */[
                                            false,
                                            false,
                                            false,
                                            false
                                          ]);
                              }));
                        describe("test remove from type array", (function () {
                                describe("remove from localToWorldMatrices", (function () {
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
                                        return Wonder_jest.test("reset removed one's value", (function () {
                                                      var match = _prepare(state);
                                                      var match$1 = match[3];
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      TransformTool$Wonderjs.getLocalToWorldMatrix(match$1[0], state$1),
                                                                      TransformTool$Wonderjs.getLocalToWorldMatrix(match$1[1], state$1)
                                                                    ]), /* tuple */[
                                                                  TransformTool$Wonderjs.getDefaultLocalToWorldMatrix(state$1),
                                                                  match[2][1]
                                                                ]);
                                                    }));
                                      }));
                                describe("remove from localPositions", (function () {
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
                                        return Wonder_jest.test("reset removed one's value", (function () {
                                                      TestTool$Wonderjs.closeContractCheck(/* () */0);
                                                      var match = _prepare(state);
                                                      var match$1 = match[3];
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      TransformAPI$Wonderjs.getTransformLocalPosition(match$1[0], state$1),
                                                                      TransformAPI$Wonderjs.getTransformLocalPosition(match$1[1], state$1)
                                                                    ]), /* tuple */[
                                                                  TransformTool$Wonderjs.getDefaultLocalPositionTuple(state$1),
                                                                  match[2][1]
                                                                ]);
                                                    }));
                                      }));
                                describe("remove from localRotations", (function () {
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
                                        return Wonder_jest.test("reset removed one's value", (function () {
                                                      TestTool$Wonderjs.closeContractCheck(/* () */0);
                                                      var match = _prepare(state);
                                                      var match$1 = match[3];
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      TransformAPI$Wonderjs.getTransformLocalRotation(match$1[0], state$1),
                                                                      TransformAPI$Wonderjs.getTransformLocalRotation(match$1[1], state$1)
                                                                    ]), /* tuple */[
                                                                  TransformTool$Wonderjs.getDefaultLocalRotationTuple(state$1),
                                                                  match[2][1]
                                                                ]);
                                                    }));
                                      }));
                                describe("remove from localScales", (function () {
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
                                        return Wonder_jest.test("reset removed one's value", (function () {
                                                      TestTool$Wonderjs.closeContractCheck(/* () */0);
                                                      var match = _prepare(state);
                                                      var match$1 = match[3];
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      TransformAPI$Wonderjs.getTransformLocalScale(match$1[0], state$1),
                                                                      TransformAPI$Wonderjs.getTransformLocalScale(match$1[1], state$1)
                                                                    ]), /* tuple */[
                                                                  TransformTool$Wonderjs.getDefaultLocalScaleTuple(state$1),
                                                                  match[2][1]
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test add new one after dispose old one", (function () {
                        describe("if has disposed one", (function () {
                                Wonder_jest.test("use disposed index(transform) as new index", (function () {
                                        var match = _prepare(/* () */0);
                                        var transform2 = match[2];
                                        var transform1 = match[1];
                                        var state = TransformTool$Wonderjs.dispose(transform1, match[0]);
                                        var state$1 = TransformTool$Wonderjs.dispose(transform2, state);
                                        var match$1 = TransformAPI$Wonderjs.createTransform(state$1);
                                        var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        match$1[1],
                                                        match$2[1]
                                                      ]), /* tuple */[
                                                    transform2,
                                                    transform1
                                                  ]);
                                      }));
                                return Wonder_jest.test("new one can get default localPosition", (function () {
                                              var match = _prepare(/* () */0);
                                              var transform1 = match[1];
                                              var state = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                    1,
                                                    2,
                                                    3
                                                  ], match[0]);
                                              var state$1 = TransformTool$Wonderjs.dispose(transform1, state);
                                              var match$1 = TransformAPI$Wonderjs.createTransform(state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformLocalPosition(match$1[1], match$1[0])), TransformTool$Wonderjs.getDefaultPosition(/* () */0));
                                            }));
                              }));
                        Wonder_jest.test("else, increase transformRecord.index", (function () {
                                var match = _prepare(/* () */0);
                                var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1]), match[2] + 1 | 0);
                              }));
                        describe("fix bug", (function () {
                                return Wonder_jest.test("new one should has default transform record", (function () {
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
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              TransformAPI$Wonderjs.getTransformLocalPosition(transform3, state$2),
                                                              TransformAPI$Wonderjs.getTransformPosition(transform3, state$2)
                                                            ]), /* tuple */[
                                                          TransformTool$Wonderjs.getDefaultPosition(/* () */0),
                                                          TransformTool$Wonderjs.getDefaultPosition(/* () */0)
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("contract check", (function () {
                        return Wonder_jest.test("expect dispose the alive component, but actual not", (function () {
                                      var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                      var transform1 = match[2];
                                      var gameObject1 = match[1];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectTransformComponent(gameObject1, transform1, false, match[0]);
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect dispose the alive component, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                        GameObjectTool$Wonderjs.disposeGameObjectTransformComponent(gameObject1, transform1, false, state$1);
                                                        return /* () */0;
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("lookAt", (function () {
                return Wonder_jest.test("if viewPoint to target is default up axis, should specify the new up direction", (function () {
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
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
        describe("lookAtWithUp", (function () {
                return Wonder_jest.test("if viewPoint to target is default up axis, should specify the new up direction", (function () {
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
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
        describe("contract check: is alive", (function () {
                describe("if transform is disposed", (function () {
                        var _testGetFunc = function (getFunc) {
                          var match = TransformAPI$Wonderjs.createTransform(state[0]);
                          var transform1 = match[1];
                          var state$1 = TransformTool$Wonderjs.dispose(transform1, match[0]);
                          return Wonder_jest.Expect[/* toThrowMessage */20]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                            return Curry._2(getFunc, transform1, state$1);
                                          })));
                        };
                        var _testSetFunc = function (setFunc) {
                          var match = TransformAPI$Wonderjs.createTransform(state[0]);
                          var transform1 = match[1];
                          var state$1 = TransformTool$Wonderjs.dispose(transform1, match[0]);
                          return Wonder_jest.Expect[/* toThrowMessage */20]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                            return Curry._3(setFunc, transform1, 1, state$1);
                                          })));
                        };
                        Wonder_jest.test("getTransformPosition should error", (function () {
                                return _testGetFunc(TransformAPI$Wonderjs.getTransformPosition);
                              }));
                        Wonder_jest.test("getTransformLocalPosition should error", (function () {
                                return _testGetFunc(TransformAPI$Wonderjs.getTransformLocalPosition);
                              }));
                        Wonder_jest.test("getTransformRotation should error", (function () {
                                return _testGetFunc(TransformAPI$Wonderjs.getTransformRotation);
                              }));
                        Wonder_jest.test("getTransformLocalRotation should error", (function () {
                                return _testGetFunc(TransformAPI$Wonderjs.getTransformLocalRotation);
                              }));
                        Wonder_jest.test("getTransformScale should error", (function () {
                                return _testGetFunc(TransformAPI$Wonderjs.getTransformScale);
                              }));
                        Wonder_jest.test("getTransformLocalScale should error", (function () {
                                return _testGetFunc(TransformAPI$Wonderjs.getTransformLocalScale);
                              }));
                        Wonder_jest.test("unsafeGetTransformParent should error", (function () {
                                return _testGetFunc(TransformAPI$Wonderjs.unsafeGetTransformParent);
                              }));
                        Wonder_jest.test("unsafeGetTransformChildren should error", (function () {
                                return _testGetFunc(TransformAPI$Wonderjs.unsafeGetTransformChildren);
                              }));
                        Wonder_jest.test("unsafeGetTransformGameObject should error", (function () {
                                return _testGetFunc(TransformAPI$Wonderjs.unsafeGetTransformGameObject);
                              }));
                        Wonder_jest.test("setTransformPosition should error", (function () {
                                return _testSetFunc(TransformAPI$Wonderjs.setTransformPosition);
                              }));
                        Wonder_jest.test("setTransformLocalPosition should error", (function () {
                                return _testSetFunc(TransformAPI$Wonderjs.setTransformLocalPosition);
                              }));
                        Wonder_jest.test("setTransformRotation should error", (function () {
                                return _testSetFunc(TransformAPI$Wonderjs.setTransformRotation);
                              }));
                        Wonder_jest.test("setTransformLocalRotation should error", (function () {
                                return _testSetFunc(TransformAPI$Wonderjs.setTransformLocalRotation);
                              }));
                        Wonder_jest.test("setTransformScale should error", (function () {
                                return _testSetFunc(TransformAPI$Wonderjs.setTransformScale);
                              }));
                        Wonder_jest.test("setTransformLocalScale should error", (function () {
                                return _testSetFunc(TransformAPI$Wonderjs.setTransformLocalScale);
                              }));
                        return Wonder_jest.test("setTransformParent should error", (function () {
                                      return _testSetFunc(TransformAPI$Wonderjs.setTransformParent);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("fix bug", (function () {
                Wonder_jest.test("the second transform's default localToWorldMatrix should be identity matrix4 when create two transforms", (function () {
                        var match = TransformAPI$Wonderjs.createTransform(state[0]);
                        var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                        var state$1 = match$1[0];
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformTool$Wonderjs.getLocalToWorldMatrixTypeArray(match$1[1], state$1)), TransformTool$Wonderjs.getDefaultLocalToWorldMatrixTypeArray(state$1));
                      }));
                return Wonder_jest.test("get the data from Float32Array may not equal to the value which is setted", (function () {
                              var match = TransformAPI$Wonderjs.createTransform(state[0]);
                              var transform0 = match[1];
                              var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform0, /* tuple */[
                                    0.1,
                                    0,
                                    0
                                  ], match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformLocalPosition(transform0, state$1)), /* tuple */[
                                          0.10000000149011612,
                                          0,
                                          0
                                        ]);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
