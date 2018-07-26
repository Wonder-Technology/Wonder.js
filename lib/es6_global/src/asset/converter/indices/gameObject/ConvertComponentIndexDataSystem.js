

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "../../ConvertCommon.js";
import * as StateDataMain$Wonderjs from "../../../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function _checkGameObjectAndComponentIndicesCountShouldEqual(componentGameObjectIndexData) {
  var componentIndices = componentGameObjectIndexData[/* componentIndices */1];
  var gameObjectIndices = componentGameObjectIndexData[/* gameObjectIndices */0];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("gameObjectIndices\' count === componentIndices\' count", "not"), (function () {
                        return Contract$WonderLog.Operators[/* = */0](gameObjectIndices.length, componentIndices.length);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return componentGameObjectIndexData;
}

function convertToTransformGameObjectIndexData(nodes) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, _, index) {
          return /* tuple */[
                  ArrayService$Wonderjs.push(index, param[0]),
                  ArrayService$Wonderjs.push(index, param[1])
                ];
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], nodes);
  return Contract$WonderLog.ensureCheck((function (param) {
                var gameObjectIndices = param[/* gameObjectIndices */0];
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("every node should has one transform component", "not"), (function () {
                              return Contract$WonderLog.Operators[/* = */0](gameObjectIndices.length, nodes.length);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), _checkGameObjectAndComponentIndicesCountShouldEqual(/* record */[
                  /* gameObjectIndices */match[0],
                  /* componentIndices */match[1]
                ]));
}

function _checkEveryComponentShouldHasGameObject(nodes, componentGameObjectIndexData) {
  return Contract$WonderLog.ensureCheck((function (componentGameObjectIndexData) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("every component should has gameObject", "not"), (function () {
                              return ArrayService$WonderCommonlib.forEach((function (index) {
                                            Contract$WonderLog.Operators[/* >= */7](index, 0);
                                            return Contract$WonderLog.Operators[/* <= */11](index, ConvertCommon$Wonderjs.getCount(nodes));
                                          }), componentGameObjectIndexData);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), componentGameObjectIndexData);
}

function convertToBasicCameraViewGameObjectIndexData(nodes) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var camera = param$1[/* camera */1];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          if (camera !== undefined) {
            return /* tuple */[
                    ArrayService$Wonderjs.push(index, gameObjectIndices),
                    ArrayService$Wonderjs.push(camera, componentIndices)
                  ];
          } else {
            return /* tuple */[
                    gameObjectIndices,
                    componentIndices
                  ];
          }
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], nodes);
  return _checkGameObjectAndComponentIndicesCountShouldEqual(/* record */[
              /* gameObjectIndices */match[0],
              /* componentIndices */match[1]
            ]);
}

function _buildPerspectiveCameraActualIndexMap(cameras) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, perspectiveCameraIndex) {
                var perspectiveCameraActualIndex = param[1];
                var perspectiveCameraActualIndexMap = param[0];
                if (param$1[/* type_ */0] === "perspective") {
                  return /* tuple */[
                          SparseMapService$WonderCommonlib.set(perspectiveCameraIndex, perspectiveCameraActualIndex, perspectiveCameraActualIndexMap),
                          perspectiveCameraActualIndex + 1 | 0
                        ];
                } else {
                  return /* tuple */[
                          perspectiveCameraActualIndexMap,
                          perspectiveCameraActualIndex
                        ];
                }
              }), /* tuple */[
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              0
            ], cameras);
}

function _buildPerspectiveCameraProjectionGameObjectIndexData(nodes, cameras, perspectiveCameraActualIndexMap) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
                var camera = param$1[/* camera */1];
                var componentIndices = param[1];
                var gameObjectIndices = param[0];
                if (camera !== undefined) {
                  var camera$1 = camera;
                  var match = cameras[camera$1];
                  if (match[/* type_ */0] === "perspective") {
                    return /* tuple */[
                            ArrayService$Wonderjs.push(index, gameObjectIndices),
                            ArrayService$Wonderjs.push(SparseMapService$WonderCommonlib.unsafeGet(camera$1, perspectiveCameraActualIndexMap), componentIndices)
                          ];
                  } else {
                    return /* tuple */[
                            gameObjectIndices,
                            componentIndices
                          ];
                  }
                } else {
                  return /* tuple */[
                          gameObjectIndices,
                          componentIndices
                        ];
                }
              }), /* tuple */[
              /* array */[],
              /* array */[]
            ], nodes);
}

function buildEmptyGameObjectIndexData() {
  return /* record */[
          /* gameObjectIndices : array */[],
          /* componentIndices : array */[]
        ];
}

function convertToPerspectiveCameraProjectionGameObjectIndexData(nodes, cameras) {
  if (cameras !== undefined) {
    var cameras$1 = cameras;
    var match = _buildPerspectiveCameraActualIndexMap(cameras$1);
    var match$1 = _buildPerspectiveCameraProjectionGameObjectIndexData(nodes, cameras$1, match[0]);
    return _checkGameObjectAndComponentIndicesCountShouldEqual(/* record */[
                /* gameObjectIndices */match$1[0],
                /* componentIndices */match$1[1]
              ]);
  } else {
    return /* record */[
            /* gameObjectIndices : array */[],
            /* componentIndices : array */[]
          ];
  }
}

function convertToArcballCameraControllerGameObjectIndexData(nodes) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var extras = param$1[/* extras */8];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          if (extras !== undefined) {
            var cameraController = extras[/* cameraController */1];
            if (cameraController !== undefined) {
              return /* tuple */[
                      ArrayService$Wonderjs.push(index, gameObjectIndices),
                      ArrayService$Wonderjs.push(cameraController, componentIndices)
                    ];
            } else {
              return /* tuple */[
                      gameObjectIndices,
                      componentIndices
                    ];
            }
          } else {
            return /* tuple */[
                    gameObjectIndices,
                    componentIndices
                  ];
          }
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], nodes);
  return _checkGameObjectAndComponentIndicesCountShouldEqual(/* record */[
              /* gameObjectIndices */match[0],
              /* componentIndices */match[1]
            ]);
}

function _convertToLightMaterialGameObjectIndexDataFromExtras(material, param, index) {
  var componentIndices = param[1];
  var gameObjectIndices = param[0];
  if (material !== undefined) {
    return /* tuple */[
            ArrayService$Wonderjs.push(index, gameObjectIndices),
            ArrayService$Wonderjs.push(Js_primitive.valFromOption(material), componentIndices)
          ];
  } else {
    return /* tuple */[
            gameObjectIndices,
            componentIndices
          ];
  }
}

function _convertToLightMaterialGameObjectIndexDataFromMesh(mesh, meshes, param, index) {
  var componentIndices = param[1];
  var gameObjectIndices = param[0];
  if (mesh !== undefined) {
    var match = meshes[mesh];
    var match$1 = ConvertCommon$Wonderjs.getPrimitiveData(match[/* primitives */0]);
    var material = match$1[/* material */2];
    if (material !== undefined) {
      return /* tuple */[
              ArrayService$Wonderjs.push(index, gameObjectIndices),
              ArrayService$Wonderjs.push(material, componentIndices)
            ];
    } else {
      return /* tuple */[
              gameObjectIndices,
              componentIndices
            ];
    }
  } else {
    return /* tuple */[
            gameObjectIndices,
            componentIndices
          ];
  }
}

function convertToLightMaterialGameObjectIndexData(nodes, meshes, _) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var extras = param$1[/* extras */8];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          if (extras !== undefined) {
            return _convertToLightMaterialGameObjectIndexDataFromExtras(extras[/* material */0], /* tuple */[
                        gameObjectIndices,
                        componentIndices
                      ], index);
          } else {
            return _convertToLightMaterialGameObjectIndexDataFromMesh(param$1[/* mesh */2], meshes, /* tuple */[
                        gameObjectIndices,
                        componentIndices
                      ], index);
          }
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], nodes);
  return _checkGameObjectAndComponentIndicesCountShouldEqual(/* record */[
              /* gameObjectIndices */match[0],
              /* componentIndices */match[1]
            ]);
}

function convertToGeometryGameObjectIndexData(nodes) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var mesh = param$1[/* mesh */2];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          if (mesh !== undefined) {
            return /* tuple */[
                    ArrayService$Wonderjs.push(index, gameObjectIndices),
                    ArrayService$Wonderjs.push(mesh, componentIndices)
                  ];
          } else {
            return /* tuple */[
                    gameObjectIndices,
                    componentIndices
                  ];
          }
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], nodes);
  return _checkGameObjectAndComponentIndicesCountShouldEqual(/* record */[
              /* gameObjectIndices */match[0],
              /* componentIndices */match[1]
            ]);
}

function _getLightActualIndexMap(lightType, lights) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, lightIndex) {
                var lightActualIndex = param[1];
                var lightActualIndexMap = param[0];
                if (param$1[/* type_ */0] === lightType) {
                  return /* tuple */[
                          SparseMapService$WonderCommonlib.set(lightIndex, lightActualIndex, lightActualIndexMap),
                          lightActualIndex + 1 | 0
                        ];
                } else {
                  return /* tuple */[
                          lightActualIndexMap,
                          lightActualIndex
                        ];
                }
              }), /* tuple */[
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              0
            ], lights);
}

function _buildLightGameObjectIndexData(nodes, lights, lightType, lightActualIndexMap) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
                var extensions = param$1[/* extensions */9];
                var componentIndices = param[1];
                var gameObjectIndices = param[0];
                if (extensions !== undefined) {
                  var khr_lights = extensions[/* khr_lights */0];
                  if (khr_lights !== undefined) {
                    var light = khr_lights[/* light */0];
                    var match = lights[light];
                    if (match[/* type_ */0] === lightType) {
                      return /* tuple */[
                              ArrayService$Wonderjs.push(index, gameObjectIndices),
                              ArrayService$Wonderjs.push(SparseMapService$WonderCommonlib.unsafeGet(light, lightActualIndexMap), componentIndices)
                            ];
                    } else {
                      return /* tuple */[
                              gameObjectIndices,
                              componentIndices
                            ];
                    }
                  } else {
                    return /* tuple */[
                            gameObjectIndices,
                            componentIndices
                          ];
                  }
                } else {
                  return /* tuple */[
                          gameObjectIndices,
                          componentIndices
                        ];
                }
              }), /* tuple */[
              /* array */[],
              /* array */[]
            ], nodes);
}

function convertToLightGameObjectIndexData(lightType, nodes, extensions) {
  if (extensions !== undefined) {
    var khr_lights = extensions[/* khr_lights */0];
    if (khr_lights !== undefined) {
      var lights = khr_lights[/* lights */0];
      var match = _getLightActualIndexMap(lightType, lights);
      var match$1 = _buildLightGameObjectIndexData(nodes, lights, lightType, match[0]);
      return _checkGameObjectAndComponentIndicesCountShouldEqual(/* record */[
                  /* gameObjectIndices */match$1[0],
                  /* componentIndices */match$1[1]
                ]);
    } else {
      return /* record */[
              /* gameObjectIndices : array */[],
              /* componentIndices : array */[]
            ];
    }
  } else {
    return /* record */[
            /* gameObjectIndices : array */[],
            /* componentIndices : array */[]
          ];
  }
}

export {
  _checkGameObjectAndComponentIndicesCountShouldEqual ,
  convertToTransformGameObjectIndexData ,
  _checkEveryComponentShouldHasGameObject ,
  convertToBasicCameraViewGameObjectIndexData ,
  _buildPerspectiveCameraActualIndexMap ,
  _buildPerspectiveCameraProjectionGameObjectIndexData ,
  buildEmptyGameObjectIndexData ,
  convertToPerspectiveCameraProjectionGameObjectIndexData ,
  convertToArcballCameraControllerGameObjectIndexData ,
  _convertToLightMaterialGameObjectIndexDataFromExtras ,
  _convertToLightMaterialGameObjectIndexDataFromMesh ,
  convertToLightMaterialGameObjectIndexData ,
  convertToGeometryGameObjectIndexData ,
  _getLightActualIndexMap ,
  _buildLightGameObjectIndexData ,
  convertToLightGameObjectIndexData ,
  
}
/* Log-WonderLog Not a pure module */
