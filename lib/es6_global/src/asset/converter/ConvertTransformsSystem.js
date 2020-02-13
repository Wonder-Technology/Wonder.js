

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as ConvertSceneSystem$Wonderjs from "./ConvertSceneSystem.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as CreateStateMainService$Wonderjs from "../../service/state/main/state/CreateStateMainService.js";
import * as HierachyTransformService$Wonderjs from "../../service/record/main/transform/HierachyTransformService.js";
import * as CreateTransformMainService$Wonderjs from "../../service/state/main/transform/CreateTransformMainService.js";
import * as RecordTransformMainService$Wonderjs from "../../service/state/main/transform/RecordTransformMainService.js";
import * as UpdateTransformMainService$Wonderjs from "../../service/state/main/transform/UpdateTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../service/record/main/transform/ModelMatrixTransformService.js";

function _getTranslationTuple(mat) {
  return /* tuple */[
          Caml_array.caml_array_get(mat, 12),
          Caml_array.caml_array_get(mat, 13),
          Caml_array.caml_array_get(mat, 14)
        ];
}

function _getScaleTuple(mat) {
  var m11 = Caml_array.caml_array_get(mat, 0);
  var m12 = Caml_array.caml_array_get(mat, 1);
  var m13 = Caml_array.caml_array_get(mat, 2);
  var m21 = Caml_array.caml_array_get(mat, 4);
  var m22 = Caml_array.caml_array_get(mat, 5);
  var m23 = Caml_array.caml_array_get(mat, 6);
  var m31 = Caml_array.caml_array_get(mat, 8);
  var m32 = Caml_array.caml_array_get(mat, 9);
  var m33 = Caml_array.caml_array_get(mat, 10);
  return /* tuple */[
          Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13),
          Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23),
          Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33)
        ];
}

function _getRotationTuple(mat) {
  var trace = Caml_array.caml_array_get(mat, 0) + Caml_array.caml_array_get(mat, 5) + Caml_array.caml_array_get(mat, 10);
  if (trace > 0) {
    var s = Math.sqrt(trace + 1.0) * 2;
    return /* tuple */[
            (Caml_array.caml_array_get(mat, 6) - Caml_array.caml_array_get(mat, 9)) / s,
            (Caml_array.caml_array_get(mat, 8) - Caml_array.caml_array_get(mat, 2)) / s,
            (Caml_array.caml_array_get(mat, 1) - Caml_array.caml_array_get(mat, 4)) / s,
            0.25 * s
          ];
  } else if (Caml_array.caml_array_get(mat, 0) > Caml_array.caml_array_get(mat, 5) && Caml_array.caml_array_get(mat, 0) > Caml_array.caml_array_get(mat, 10)) {
    var s$1 = Math.sqrt(1.0 + Caml_array.caml_array_get(mat, 0) - Caml_array.caml_array_get(mat, 5) - Caml_array.caml_array_get(mat, 10)) * 2;
    return /* tuple */[
            0.25 * s$1,
            (Caml_array.caml_array_get(mat, 1) + Caml_array.caml_array_get(mat, 4)) / s$1,
            (Caml_array.caml_array_get(mat, 8) + Caml_array.caml_array_get(mat, 2)) / s$1,
            (Caml_array.caml_array_get(mat, 6) - Caml_array.caml_array_get(mat, 9)) / s$1
          ];
  } else if (Caml_array.caml_array_get(mat, 5) > Caml_array.caml_array_get(mat, 10)) {
    var s$2 = Math.sqrt(1.0 + Caml_array.caml_array_get(mat, 5) - Caml_array.caml_array_get(mat, 0) - Caml_array.caml_array_get(mat, 10)) * 2;
    return /* tuple */[
            (Caml_array.caml_array_get(mat, 1) + Caml_array.caml_array_get(mat, 4)) / s$2,
            0.25 * s$2,
            (Caml_array.caml_array_get(mat, 6) + Caml_array.caml_array_get(mat, 9)) / s$2,
            (Caml_array.caml_array_get(mat, 8) - Caml_array.caml_array_get(mat, 2)) / s$2
          ];
  } else {
    var s$3 = Math.sqrt(1.0 + Caml_array.caml_array_get(mat, 10) - Caml_array.caml_array_get(mat, 0) - Caml_array.caml_array_get(mat, 5)) * 2;
    return /* tuple */[
            (Caml_array.caml_array_get(mat, 8) + Caml_array.caml_array_get(mat, 2)) / s$3,
            (Caml_array.caml_array_get(mat, 6) + Caml_array.caml_array_get(mat, 9)) / s$3,
            0.25 * s$3,
            (Caml_array.caml_array_get(mat, 1) - Caml_array.caml_array_get(mat, 4)) / s$3
          ];
  }
}

function convertToTransforms(param) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (arr, param) {
                var scale = param[/* scale */7];
                var rotation = param[/* rotation */6];
                var translation = param[/* translation */5];
                var matrix = param[/* matrix */4];
                if (matrix !== undefined) {
                  var matrix$1 = matrix;
                  return ArrayService$Wonderjs.push(/* record */[
                              /* translation */_getTranslationTuple(matrix$1),
                              /* rotation */_getRotationTuple(matrix$1),
                              /* scale */_getScaleTuple(matrix$1)
                            ], arr);
                } else {
                  return ArrayService$Wonderjs.push(/* record */[
                              /* translation */translation !== undefined ? translation : undefined,
                              /* rotation */rotation !== undefined ? rotation : undefined,
                              /* scale */scale !== undefined ? scale : undefined
                            ], arr);
                }
              }), /* array */[], param[/* nodes */10]);
}

function _setParent(parentIndex, transformArr, nodes, state) {
  var match = nodes[parentIndex];
  var children = match[/* children */3];
  if (children !== undefined) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (state, child) {
                  state[/* transformRecord */11] = HierachyTransformService$Wonderjs.setParent(ArrayService$Wonderjs.getNth(parentIndex, transformArr), child, RecordTransformMainService$Wonderjs.getRecord(state));
                  return _setParent(child, transformArr, nodes, state);
                }), state, children);
  } else {
    return state;
  }
}

function _createTransformCount (count){
    if(
typeof window !== "undefined" &&
    typeof window.wonder_transformCount_forTest !== "undefined"
    ){
      return window.wonder_transformCount_forTest
    }
    else{
      return count
    }
  };

function _createState(param) {
  var state = CreateStateMainService$Wonderjs.createState(/* () */0);
  var newrecord = Caml_array.caml_array_dup(state);
  return RecordTransformMainService$Wonderjs.create((newrecord[/* settingRecord */0] = /* record */[
                /* canvasId */undefined,
                /* memory */undefined,
                /* buffer *//* record */[
                  /* geometryPointCount */300,
                  /* geometryCount */30,
                  /* transformCount */_createTransformCount(100000),
                  /* basicMaterialCount */50,
                  /* lightMaterialCount */50,
                  /* directionLightCount */50,
                  /* pointLightCount */50,
                  /* textureCountPerMaterial */50,
                  /* basicSourceTextureCount */50,
                  /* arrayBufferViewSourceTextureCount */50,
                  /* meshRendererCount */50,
                  /* instanceBuffer : record */[
                    /* sourceInstanceCount */50,
                    /* objectInstanceCountPerSourceInstance */50
                  ]
                ],
                /* isDebug */undefined,
                /* context */undefined,
                /* gpu */undefined,
                /* worker *//* record */[/* useWorker */false]
              ], newrecord));
}

function _setTransformData(transforms, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var scale = param$1[/* scale */2];
                var rotation = param$1[/* rotation */1];
                var translation = param$1[/* translation */0];
                var match = CreateTransformMainService$Wonderjs.create(param[1]);
                var transform = match[1];
                var state = match[0];
                var state$1 = translation !== undefined ? (state[/* transformRecord */11] = ModelMatrixTransformService$Wonderjs.setLocalPositionByTuple(transform, translation, RecordTransformMainService$Wonderjs.getRecord(state)), state) : state;
                var state$2 = rotation !== undefined ? (state$1[/* transformRecord */11] = ModelMatrixTransformService$Wonderjs.setLocalRotationByTuple(transform, rotation, RecordTransformMainService$Wonderjs.getRecord(state$1)), state$1) : state$1;
                var state$3 = scale !== undefined ? (state$2[/* transformRecord */11] = ModelMatrixTransformService$Wonderjs.setLocalScaleByTuple(transform, scale, RecordTransformMainService$Wonderjs.getRecord(state$2)), state$2) : state$2;
                return /* tuple */[
                        ArrayService$Wonderjs.push(transform, param[0]),
                        state$3
                      ];
              }), /* tuple */[
              /* array */[],
              state
            ], transforms);
}

function computeWorldPositionTransforms(transforms, param) {
  var nodes = param[/* nodes */10];
  var state = _createState(/* () */0);
  var match = _setTransformData(transforms, state);
  var transformArr = match[0];
  var state$1 = ArrayService$WonderCommonlib.reduceOneParam((function (state, rootNodeIndex) {
          return _setParent(rootNodeIndex, transformArr, nodes, state);
        }), match[1], ConvertSceneSystem$Wonderjs.getRootNodeIndexs(ConvertCommon$Wonderjs.getScene(param[/* scenes */1], param[/* scene */2])));
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, transform) {
                  var state = param[1];
                  return /* tuple */[
                          ArrayService$Wonderjs.push(UpdateTransformMainService$Wonderjs.updateAndGetPositionTuple(transform, state[/* globalTempRecord */35], RecordTransformMainService$Wonderjs.getRecord(state)), param[0]),
                          state
                        ];
                }), /* tuple */[
                /* array */[],
                state$1
              ], transformArr)[0];
}

export {
  _getTranslationTuple ,
  _getScaleTuple ,
  _getRotationTuple ,
  convertToTransforms ,
  _setParent ,
  _createTransformCount ,
  _createState ,
  _setTransformData ,
  computeWorldPositionTransforms ,
  
}
/* ArrayService-Wonderjs Not a pure module */
