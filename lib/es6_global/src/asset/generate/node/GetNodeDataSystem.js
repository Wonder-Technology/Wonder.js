

import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as GameObjectAPI$Wonderjs from "../../../api/GameObjectAPI.js";
import * as AddNodeDataSystem$Wonderjs from "./AddNodeDataSystem.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HierachyTransformService$Wonderjs from "../../../service/record/main/transform/HierachyTransformService.js";
import * as GameObjectTransformService$Wonderjs from "../../../service/record/main/transform/GameObjectTransformService.js";
import * as GetNodeComponentDataSystem$Wonderjs from "./GetNodeComponentDataSystem.js";
import * as RecordTransformMainService$Wonderjs from "../../../service/state/main/transform/RecordTransformMainService.js";
import * as IsRootGameObjectMainService$Wonderjs from "../../../service/state/main/gameObject/IsRootGameObjectMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as GetIsActiveGameObjectMainService$Wonderjs from "../../../service/state/main/gameObject/GetIsActiveGameObjectMainService.js";

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

function _getNodeData(transform, nodeIndex, param, state) {
  var gameObjectChildrenMap = param[0];
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var gameObject = GameObjectTransformService$Wonderjs.unsafeGetGameObject(transform, transformRecord);
  var childrenTransformArr = HierachyTransformService$Wonderjs.unsafeGetChildren(transform, transformRecord);
  var childrenGameObjectArr = childrenTransformArr.map((function (transform) {
          return GameObjectTransformService$Wonderjs.unsafeGetGameObject(transform, transformRecord);
        }));
  var match = childrenGameObjectArr.length;
  var gameObjectChildrenMap$1 = match !== 0 ? MutableSparseMapService$WonderCommonlib.set(gameObject, childrenGameObjectArr, gameObjectChildrenMap) : gameObjectChildrenMap;
  var gameObjectNodeIndexMap = MutableSparseMapService$WonderCommonlib.set(gameObject, nodeIndex, param[1]);
  var isActive = GetIsActiveGameObjectMainService$Wonderjs.getIsActive(gameObject, state);
  var isRoot = IsRootGameObjectMainService$Wonderjs.getIsRoot(gameObject, state);
  return /* tuple */[
          transformRecord,
          gameObject,
          childrenTransformArr,
          childrenGameObjectArr,
          gameObjectChildrenMap$1,
          gameObjectNodeIndexMap,
          isActive,
          isRoot
        ];
}

function _getNodeAndItsComponentsData(state, param, getPointsDataFuncTuple) {
  var match = param[3];
  var match$1 = param[2];
  var match$2 = param[1];
  var match$3 = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, transform) {
                var state = param[0];
                var match = param[3];
                var match$1 = param[2];
                var match$2 = param[1];
                var nodeIndex = match$2[0];
                var match$3 = _getNodeData(transform, nodeIndex, /* tuple */[
                      match$1[3],
                      match$1[4]
                    ], state);
                var match$4 = match$3[0];
                var localPositions = match$4[/* localPositions */3];
                var localRotations = match$4[/* localRotations */4];
                var localScales = match$4[/* localScales */5];
                var gameObject = match$3[1];
                var match$5 = GetNodeComponentDataSystem$Wonderjs.getAllComponentData(/* tuple */[
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
                        match$2[8],
                        match$2[9]
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
                        match[7],
                        match[8]
                      ]
                    ], getPointsDataFuncTuple);
                var match$6 = match$5[4];
                var match$7 = match$5[3];
                var match$8 = match$5[2];
                var match$9 = match$5[1];
                return _getNodeAndItsComponentsData(match$5[0], /* tuple */[
                            /* tuple */[
                              nodeIndex + 1 | 0,
                              match$8[0],
                              match$8[1],
                              match$8[2],
                              match$8[3],
                              match$8[4],
                              match$8[5],
                              match$8[6],
                              match$8[7],
                              match$8[8]
                            ],
                            /* tuple */[
                              match$7[0],
                              match$7[1],
                              match$7[2],
                              match$3[4],
                              match$3[5]
                            ],
                            /* tuple */[
                              match$6[0],
                              match$6[1],
                              match$6[2],
                              match$6[3],
                              match$6[4],
                              match$6[5],
                              match$6[6],
                              match$6[7],
                              match$6[8]
                            ],
                            /* tuple */[
                              match$3[2],
                              AddNodeDataSystem$Wonderjs.addNodeAndItsComponentData(gameObject, /* tuple */[
                                    match$3[6],
                                    match$3[7]
                                  ], /* tuple */[
                                    /* tuple */[
                                      transform,
                                      localPositions,
                                      localRotations,
                                      localScales,
                                      match$4[/* defaultLocalPosition */12],
                                      match$4[/* defaultLocalRotation */13],
                                      match$4[/* defaultLocalScale */14]
                                    ],
                                    match$9[0],
                                    match$9[1],
                                    match$9[4],
                                    match$9[5],
                                    match$9[6],
                                    match$9[2],
                                    match$9[3],
                                    match$9[7],
                                    match$9[8]
                                  ], param[4])
                            ]
                          ], getPointsDataFuncTuple);
              }), /* tuple */[
              state,
              /* tuple */[
                match$3[0],
                match$3[1],
                match$3[2],
                match$3[3],
                match$3[4],
                match$3[5],
                match$3[6],
                match$3[7],
                match$3[8],
                match$3[9]
              ],
              /* tuple */[
                match$2[0],
                match$2[1],
                match$2[2],
                match$2[3],
                match$2[4]
              ],
              /* tuple */[
                match$1[0],
                match$1[1],
                match$1[2],
                match$1[3],
                match$1[4],
                match$1[5],
                match$1[6],
                match$1[7],
                match$1[8]
              ],
              match[1]
            ], match[0]);
}

function getAllNodeData(rootGameObject, getPointsDataFuncTuple, state) {
  var match = _getNodeAndItsComponentsData(state, /* tuple */[
        /* tuple */[
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        /* tuple */[
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ],
        /* tuple */[
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ],
        /* tuple */[
          /* array */[GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state)],
          /* array */[]
        ]
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
            match$1[7],
            match$1[8]
          ],
          nodeDataArr
        ];
}

export {
  _getChildren ,
  _setChildren ,
  _getNodeData ,
  _getNodeAndItsComponentsData ,
  getAllNodeData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
