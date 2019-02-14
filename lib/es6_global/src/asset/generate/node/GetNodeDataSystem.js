

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as GameObjectAPI$Wonderjs from "../../../api/GameObjectAPI.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HierachyTransformService$Wonderjs from "../../../service/record/main/transform/HierachyTransformService.js";
import * as GameObjectTransformService$Wonderjs from "../../../service/record/main/transform/GameObjectTransformService.js";
import * as GetNodeComponentDataSystem$Wonderjs from "./GetNodeComponentDataSystem.js";
import * as RecordTransformMainService$Wonderjs from "../../../service/state/main/transform/RecordTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../service/record/main/transform/ModelMatrixTransformService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var _getChildren = HierachyTransformService$Wonderjs.unsafeGetChildren;

function _setChildren(gameObjectChildrenMap, gameObjectNodeIndexMap, nodeDataArr) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (newNodeDataArr, nodeData) {
                var match = MutableSparseMapService$WonderCommonlib.get(nodeData[/* gameObject */0], gameObjectChildrenMap);
                return ArrayService$Wonderjs.push(/* record */[
                            /* gameObject */nodeData[/* gameObject */0],
                            /* children */match !== undefined ? match.map((function (childGameObject) {
                                      return MutableSparseMapService$WonderCommonlib.unsafeGet(childGameObject, gameObjectNodeIndexMap);
                                    })) : undefined,
                            /* translation */nodeData[/* translation */2],
                            /* rotation */nodeData[/* rotation */3],
                            /* scale */nodeData[/* scale */4],
                            /* mesh */nodeData[/* mesh */5],
                            /* camera */nodeData[/* camera */6],
                            /* extras */nodeData[/* extras */7],
                            /* extensions */nodeData[/* extensions */8]
                          ], newNodeDataArr);
              }), /* array */[], nodeDataArr);
}

function _addNodeData(gameObject, param, param$1, nodeDataArr) {
  var lightIndex = param$1[7];
  var lightMaterialIndex = param$1[6];
  var basicMaterialIndex = param$1[5];
  var arcballCameraControllerIndex = param$1[4];
  var basicCameraViewIndex = param$1[2];
  var meshRendererIndex = param$1[1];
  var defaultLocalScale = param[6];
  var defaultLocalRotation = param[5];
  var defaultLocalPosition = param[4];
  var transform = param[0];
  var localPosition = ModelMatrixTransformService$Wonderjs.getLocalPositionTuple(transform, param[1]);
  var localRotation = ModelMatrixTransformService$Wonderjs.getLocalRotationTuple(transform, param[2]);
  var localScale = ModelMatrixTransformService$Wonderjs.getLocalScaleTuple(transform, param[3]);
  var tmp;
  var exit = 0;
  if (basicCameraViewIndex !== undefined || meshRendererIndex !== undefined || basicMaterialIndex !== undefined || lightMaterialIndex !== undefined || arcballCameraControllerIndex !== undefined) {
    exit = 1;
  } else {
    tmp = undefined;
  }
  if (exit === 1) {
    tmp = /* record */[
      /* basicCameraView */basicCameraViewIndex,
      /* meshRenderer */meshRendererIndex,
      /* basicMaterial */basicMaterialIndex,
      /* lightMaterial */lightMaterialIndex,
      /* cameraController */arcballCameraControllerIndex
    ];
  }
  return ArrayService$Wonderjs.push(/* record */[
              /* gameObject */gameObject,
              /* children */undefined,
              /* translation */localPosition[0] === Caml_array.caml_array_get(defaultLocalPosition, 0) && localPosition[1] === Caml_array.caml_array_get(defaultLocalPosition, 1) && localPosition[2] === Caml_array.caml_array_get(defaultLocalPosition, 2) ? undefined : localPosition,
              /* rotation */localRotation[0] === Caml_array.caml_array_get(defaultLocalRotation, 0) && localRotation[1] === Caml_array.caml_array_get(defaultLocalRotation, 1) && localRotation[2] === Caml_array.caml_array_get(defaultLocalRotation, 2) && localRotation[3] === Caml_array.caml_array_get(defaultLocalRotation, 3) ? undefined : localRotation,
              /* scale */localScale[0] === Caml_array.caml_array_get(defaultLocalScale, 0) && localScale[1] === Caml_array.caml_array_get(defaultLocalScale, 1) && localScale[2] === Caml_array.caml_array_get(defaultLocalScale, 2) ? undefined : localScale,
              /* mesh */param$1[0],
              /* camera */param$1[3],
              /* extras */tmp,
              /* extensions */lightIndex !== undefined ? /* record */[/* khr_lights *//* record */[/* light */lightIndex]] : undefined
            ], nodeDataArr);
}

function _getNodeData(state, param, param$1, param$2, param$3, getPointsDataFuncTuple) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, transform) {
                var state = param[0];
                var match = param[3];
                var match$1 = param[2];
                var gameObjectChildrenMap = match$1[3];
                var match$2 = param[1];
                var nodeIndex = match$2[0];
                var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
                var localPositions = transformRecord[/* localPositions */3];
                var localRotations = transformRecord[/* localRotations */4];
                var localScales = transformRecord[/* localScales */5];
                var gameObject = GameObjectTransformService$Wonderjs.unsafeGetGameObject(transform, transformRecord);
                var childrenTransformArr = HierachyTransformService$Wonderjs.unsafeGetChildren(transform, transformRecord);
                var childrenGameObjectArr = childrenTransformArr.map((function (transform) {
                        return GameObjectTransformService$Wonderjs.unsafeGetGameObject(transform, transformRecord);
                      }));
                var match$3 = childrenGameObjectArr.length;
                var gameObjectChildrenMap$1 = match$3 !== 0 ? MutableSparseMapService$WonderCommonlib.set(gameObject, childrenGameObjectArr, gameObjectChildrenMap) : gameObjectChildrenMap;
                var gameObjectNodeIndexMap = MutableSparseMapService$WonderCommonlib.set(gameObject, nodeIndex, match$1[4]);
                var match$4 = GetNodeComponentDataSystem$Wonderjs.getAllComponentData(/* tuple */[
                      gameObject,
                      state,
                      /* tuple */[
                        match$2[1],
                        match$2[2],
                        match$2[3],
                        match$2[4],
                        match$2[5],
                        match$2[6],
                        match$2[7],
                        match$2[8]
                      ],
                      /* tuple */[
                        match$1[0],
                        match$1[1],
                        match$1[2]
                      ],
                      /* tuple */[
                        match[0],
                        match[1],
                        match[2],
                        match[3],
                        match[4],
                        match[5],
                        match[6],
                        match[7]
                      ]
                    ], getPointsDataFuncTuple);
                var match$5 = match$4[4];
                var match$6 = match$4[3];
                var match$7 = match$4[2];
                var match$8 = match$4[1];
                return _getNodeData(match$4[0], /* tuple */[
                            nodeIndex + 1 | 0,
                            match$7[0],
                            match$7[1],
                            match$7[2],
                            match$7[3],
                            match$7[4],
                            match$7[5],
                            match$7[6],
                            match$7[7]
                          ], /* tuple */[
                            match$6[0],
                            match$6[1],
                            match$6[2],
                            gameObjectChildrenMap$1,
                            gameObjectNodeIndexMap
                          ], /* tuple */[
                            match$5[0],
                            match$5[1],
                            match$5[2],
                            match$5[3],
                            match$5[4],
                            match$5[5],
                            match$5[6],
                            match$5[7]
                          ], /* tuple */[
                            childrenTransformArr,
                            _addNodeData(gameObject, /* tuple */[
                                  transform,
                                  localPositions,
                                  localRotations,
                                  localScales,
                                  transformRecord[/* defaultLocalPosition */12],
                                  transformRecord[/* defaultLocalRotation */13],
                                  transformRecord[/* defaultLocalScale */14]
                                ], /* tuple */[
                                  match$8[0],
                                  match$8[1],
                                  match$8[4],
                                  match$8[5],
                                  match$8[6],
                                  match$8[2],
                                  match$8[3],
                                  match$8[7]
                                ], param[4])
                          ], getPointsDataFuncTuple);
              }), /* tuple */[
              state,
              /* tuple */[
                param[0],
                param[1],
                param[2],
                param[3],
                param[4],
                param[5],
                param[6],
                param[7],
                param[8]
              ],
              /* tuple */[
                param$1[0],
                param$1[1],
                param$1[2],
                param$1[3],
                param$1[4]
              ],
              /* tuple */[
                param$2[0],
                param$2[1],
                param$2[2],
                param$2[3],
                param$2[4],
                param$2[5],
                param$2[6],
                param$2[7]
              ],
              param$3[1]
            ], param$3[0]);
}

function getAllNodeData(rootGameObject, getPointsDataFuncTuple, state) {
  var match = _getNodeData(state, /* tuple */[
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ], /* tuple */[
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
      ], /* tuple */[
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
      ], /* tuple */[
        /* array */[GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state)],
        /* array */[]
      ], getPointsDataFuncTuple);
  var match$1 = match[3];
  var match$2 = match[2];
  var nodeDataArr = _setChildren(match$2[3], match$2[4], match[4]);
  return /* tuple */[
          match[0],
          /* tuple */[
            match$1[0],
            match$1[1],
            match$1[2],
            match$1[3],
            match$1[4],
            match$1[5],
            match$1[6],
            match$1[7]
          ],
          nodeDataArr
        ];
}

export {
  _getChildren ,
  _setChildren ,
  _addNodeData ,
  _getNodeData ,
  getAllNodeData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
