

import * as Js_option from "./../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "../../ConvertCommon.js";
import * as OptionService$Wonderjs from "../../../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../../../service/state/main/data/StateDataMain.js";
import * as ConvertMeshUtils$Wonderjs from "../../utils/ConvertMeshUtils.js";
import * as IsDebugMainService$Wonderjs from "../../../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _checkGameObjectAndComponentIndicesCountShouldEqual(componentGameObjectIndexData) {
  var componentIndices = componentGameObjectIndexData[/* componentIndices */1];
  var gameObjectIndices = componentGameObjectIndexData[/* gameObjectIndices */0];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("gameObjectIndices\' count === componentIndices\' count", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](gameObjectIndices.length, componentIndices.length);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return componentGameObjectIndexData;
}

function convertToTransformGameObjectIndexData(nodes) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
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
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("every node should has one transform component", "not"), (function (param) {
                              return Contract$WonderLog.Operators[/* = */0](gameObjectIndices.length, nodes.length);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), _checkGameObjectAndComponentIndicesCountShouldEqual(/* record */[
                  /* gameObjectIndices */match[0],
                  /* componentIndices */match[1]
                ]));
}

function _checkEveryComponentShouldHasGameObject(nodes, componentGameObjectIndexData) {
  return Contract$WonderLog.ensureCheck((function (componentGameObjectIndexData) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("every component should has gameObject", "not"), (function (param) {
                              return ArrayService$WonderCommonlib.forEach((function (index) {
                                            Contract$WonderLog.Operators[/* >= */7](index, 0);
                                            return Contract$WonderLog.Operators[/* <= */11](index, ConvertCommon$Wonderjs.getCount(nodes));
                                          }), componentGameObjectIndexData);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), componentGameObjectIndexData);
}

function _convertToGameObjectIndexDataFromExtras(component, param, index) {
  return /* tuple */[
          ArrayService$Wonderjs.push(index, param[0]),
          ArrayService$Wonderjs.push(component, param[1])
        ];
}

function convertToBasicCameraViewGameObjectIndexData(nodes) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var extras = param$1[/* extras */8];
          var camera = param$1[/* camera */1];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          var exit = 0;
          if (extras !== undefined) {
            var basicCameraView = extras[/* basicCameraView */0];
            if (Js_option.isSome(basicCameraView)) {
              return _convertToGameObjectIndexDataFromExtras(OptionService$Wonderjs.unsafeGet(basicCameraView), /* tuple */[
                          gameObjectIndices,
                          componentIndices
                        ], index);
            } else {
              exit = 1;
            }
          } else {
            exit = 1;
          }
          if (exit === 1) {
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
                          MutableSparseMapService$WonderCommonlib.set(perspectiveCameraIndex, perspectiveCameraActualIndex, perspectiveCameraActualIndexMap),
                          perspectiveCameraActualIndex + 1 | 0
                        ];
                } else {
                  return /* tuple */[
                          perspectiveCameraActualIndexMap,
                          perspectiveCameraActualIndex
                        ];
                }
              }), /* tuple */[
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
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
                            ArrayService$Wonderjs.push(MutableSparseMapService$WonderCommonlib.unsafeGet(camera$1, perspectiveCameraActualIndexMap), componentIndices)
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

function buildEmptyGameObjectIndexData(param) {
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

function convertToFlyCameraControllerGameObjectIndexData(nodes) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var extras = param$1[/* extras */8];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          if (extras !== undefined) {
            var flyCameraController = extras[/* flyCameraController */4];
            if (flyCameraController !== undefined) {
              return /* tuple */[
                      ArrayService$Wonderjs.push(index, gameObjectIndices),
                      ArrayService$Wonderjs.push(flyCameraController, componentIndices)
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

function convertToArcballCameraControllerGameObjectIndexData(nodes) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var extras = param$1[/* extras */8];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          if (extras !== undefined) {
            var arcballCameraController = extras[/* arcballCameraController */5];
            if (arcballCameraController !== undefined) {
              return /* tuple */[
                      ArrayService$Wonderjs.push(index, gameObjectIndices),
                      ArrayService$Wonderjs.push(arcballCameraController, componentIndices)
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

function convertToScriptGameObjectIndexData(nodes) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var extras = param$1[/* extras */8];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          if (extras !== undefined) {
            var script = extras[/* script */6];
            if (script !== undefined) {
              return /* tuple */[
                      ArrayService$Wonderjs.push(index, gameObjectIndices),
                      ArrayService$Wonderjs.push(script, componentIndices)
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

function convertToBasicMaterialGameObjectIndexData(nodes, meshes, materials) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var extras = param$1[/* extras */8];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          if (extras !== undefined) {
            var basicMaterial = extras[/* basicMaterial */2];
            if (Js_option.isSome(basicMaterial)) {
              return _convertToGameObjectIndexDataFromExtras(OptionService$Wonderjs.unsafeGet(basicMaterial), /* tuple */[
                          gameObjectIndices,
                          componentIndices
                        ], index);
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

function convertToLightMaterialGameObjectIndexData(nodes, meshes, materials) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var extras = param$1[/* extras */8];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          var exit = 0;
          if (extras !== undefined) {
            var lightMaterial = extras[/* lightMaterial */3];
            if (Js_option.isSome(lightMaterial)) {
              return _convertToGameObjectIndexDataFromExtras(OptionService$Wonderjs.unsafeGet(lightMaterial), /* tuple */[
                          gameObjectIndices,
                          componentIndices
                        ], index);
            } else {
              exit = 1;
            }
          } else {
            exit = 1;
          }
          if (exit === 1) {
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

function _convertToMeshRendererGameObjectIndexDataFromMesh(meshes, mesh, index, param) {
  var componentIndices = param[1];
  var gameObjectIndices = param[0];
  if (mesh !== undefined) {
    var match = ConvertMeshUtils$Wonderjs.doesMeshHasMaterial(meshes[mesh]);
    if (match) {
      return /* tuple */[
              ArrayService$Wonderjs.push(index, gameObjectIndices),
              ArrayService$Wonderjs.push(gameObjectIndices.length - 1 | 0, componentIndices)
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

function convertToMeshRendererGameObjectIndexData(nodes, meshes) {
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, index) {
          var extras = param$1[/* extras */8];
          var componentIndices = param[1];
          var gameObjectIndices = param[0];
          var exit = 0;
          if (extras !== undefined) {
            var meshRenderer = extras[/* meshRenderer */1];
            if (Js_option.isSome(meshRenderer)) {
              return _convertToGameObjectIndexDataFromExtras(OptionService$Wonderjs.unsafeGet(meshRenderer), /* tuple */[
                          gameObjectIndices,
                          componentIndices
                        ], index);
            } else {
              exit = 1;
            }
          } else {
            exit = 1;
          }
          if (exit === 1) {
            return _convertToMeshRendererGameObjectIndexDataFromMesh(meshes, param$1[/* mesh */2], index, /* tuple */[
                        gameObjectIndices,
                        componentIndices
                      ]);
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
                          MutableSparseMapService$WonderCommonlib.set(lightIndex, lightActualIndex, lightActualIndexMap),
                          lightActualIndex + 1 | 0
                        ];
                } else {
                  return /* tuple */[
                          lightActualIndexMap,
                          lightActualIndex
                        ];
                }
              }), /* tuple */[
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
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
                              ArrayService$Wonderjs.push(MutableSparseMapService$WonderCommonlib.unsafeGet(light, lightActualIndexMap), componentIndices)
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
  _convertToGameObjectIndexDataFromExtras ,
  convertToBasicCameraViewGameObjectIndexData ,
  _buildPerspectiveCameraActualIndexMap ,
  _buildPerspectiveCameraProjectionGameObjectIndexData ,
  buildEmptyGameObjectIndexData ,
  convertToPerspectiveCameraProjectionGameObjectIndexData ,
  convertToFlyCameraControllerGameObjectIndexData ,
  convertToArcballCameraControllerGameObjectIndexData ,
  convertToScriptGameObjectIndexData ,
  convertToBasicMaterialGameObjectIndexData ,
  _convertToLightMaterialGameObjectIndexDataFromMesh ,
  convertToLightMaterialGameObjectIndexData ,
  convertToGeometryGameObjectIndexData ,
  _convertToMeshRendererGameObjectIndexDataFromMesh ,
  convertToMeshRendererGameObjectIndexData ,
  _getLightActualIndexMap ,
  _buildLightGameObjectIndexData ,
  convertToLightGameObjectIndexData ,
  
}
/* Log-WonderLog Not a pure module */
