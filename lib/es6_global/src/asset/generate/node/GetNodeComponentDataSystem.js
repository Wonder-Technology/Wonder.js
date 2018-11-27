

import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as OptionService$Wonderjs from "../../../service/atom/OptionService.js";
import * as NameGeometryMainService$Wonderjs from "../../../service/state/main/geometry/NameGeometryMainService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as IndicesGeometryMainService$Wonderjs from "../../../service/state/main/geometry/IndicesGeometryMainService.js";
import * as NameBasicMaterialMainService$Wonderjs from "../../../service/state/main/material/basic/NameBasicMaterialMainService.js";
import * as NameLightMaterialMainService$Wonderjs from "../../../service/state/main/material/light/NameLightMaterialMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../service/record/main/gameObject/GetComponentGameObjectService.js";
import * as OperateLightMaterialMainService$Wonderjs from "../../../service/state/main/material/light/OperateLightMaterialMainService.js";

function _hasMap(gameObject, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = GetComponentGameObjectService$Wonderjs.getLightMaterialComponent(gameObject, gameObjectRecord);
  if (match !== undefined) {
    var lightMaterial = match;
    if (OperateLightMaterialMainService$Wonderjs.hasDiffuseMap(lightMaterial, state)) {
      return true;
    } else {
      return OperateLightMaterialMainService$Wonderjs.hasSpecularMap(lightMaterial, state);
    }
  } else {
    return false;
  }
}

function _getGeometryData(param, geometry, geometryDataMap, param$1, state) {
  var meshIndex = param[1];
  var match = SparseMapService$WonderCommonlib.get(geometry, geometryDataMap);
  if (match !== undefined) {
    var match$1 = match;
    return /* tuple */[
            match$1[0],
            match$1[1],
            meshIndex,
            geometryDataMap
          ];
  } else {
    var match$2 = IndicesGeometryMainService$Wonderjs.unsafeGetIndicesType(geometry, state);
    var match$3 = match$2 ? /* tuple */[
        undefined,
        Js_primitive.some(param$1[4](geometry, state))
      ] : /* tuple */[
        Js_primitive.some(param$1[3](geometry, state)),
        undefined
      ];
    var pointAndNameData = /* tuple */[
      /* tuple */[
        param$1[0](geometry, state),
        param$1[1](geometry, state),
        param$1[2](geometry, state),
        match$3[0],
        match$3[1]
      ],
      NameGeometryMainService$Wonderjs.getName(geometry, state)
    ];
    return /* tuple */[
            meshIndex,
            pointAndNameData,
            meshIndex + 1 | 0,
            SparseMapService$WonderCommonlib.set(geometry, /* tuple */[
                  meshIndex,
                  pointAndNameData
                ], geometryDataMap)
          ];
  }
}

function _getMeshData(param, geometryDataMap, getPointsDataFuncTuple, state) {
  var meshIndex = param[1];
  var gameObject = param[0];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = GetComponentGameObjectService$Wonderjs.getGeometryComponent(gameObject, gameObjectRecord);
  if (match !== undefined) {
    return _getGeometryData(/* tuple */[
                gameObject,
                meshIndex
              ], match, geometryDataMap, getPointsDataFuncTuple, state);
  } else {
    return /* tuple */[
            undefined,
            undefined,
            meshIndex,
            geometryDataMap
          ];
  }
}

function _getBasicMaterialData(param, basicMaterialDataMap, state) {
  var materialIndex = param[1];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = GetComponentGameObjectService$Wonderjs.getBasicMaterialComponent(param[0], gameObjectRecord);
  if (match !== undefined) {
    var basicMaterial = match;
    var match$1 = SparseMapService$WonderCommonlib.get(basicMaterial, basicMaterialDataMap);
    if (match$1 !== undefined) {
      var match$2 = match$1;
      return /* tuple */[
              match$2[0],
              match$2[1],
              materialIndex,
              basicMaterialDataMap
            ];
    } else {
      var materialData = /* tuple */[
        basicMaterial,
        NameBasicMaterialMainService$Wonderjs.getName(basicMaterial, state)
      ];
      return /* tuple */[
              materialIndex,
              materialData,
              materialIndex + 1 | 0,
              SparseMapService$WonderCommonlib.set(basicMaterial, /* tuple */[
                    materialIndex,
                    materialData
                  ], basicMaterialDataMap)
            ];
    }
  } else {
    return /* tuple */[
            undefined,
            undefined,
            materialIndex,
            basicMaterialDataMap
          ];
  }
}

function _getLightMaterialData(param, lightMaterialDataMap, state) {
  var materialIndex = param[1];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = GetComponentGameObjectService$Wonderjs.getLightMaterialComponent(param[0], gameObjectRecord);
  if (match !== undefined) {
    var lightMaterial = match;
    var match$1 = SparseMapService$WonderCommonlib.get(lightMaterial, lightMaterialDataMap);
    if (match$1 !== undefined) {
      var match$2 = match$1;
      return /* tuple */[
              match$2[0],
              match$2[1],
              materialIndex,
              lightMaterialDataMap
            ];
    } else {
      var materialData = /* tuple */[
        lightMaterial,
        NameLightMaterialMainService$Wonderjs.getName(lightMaterial, state)
      ];
      return /* tuple */[
              materialIndex,
              materialData,
              materialIndex + 1 | 0,
              SparseMapService$WonderCommonlib.set(lightMaterial, /* tuple */[
                    materialIndex,
                    materialData
                  ], lightMaterialDataMap)
            ];
    }
  } else {
    return /* tuple */[
            undefined,
            undefined,
            materialIndex,
            lightMaterialDataMap
          ];
  }
}

function _getMeshRendererData(param, state) {
  var meshRendererIndex = param[1];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = GetComponentGameObjectService$Wonderjs.getMeshRendererComponent(param[0], gameObjectRecord);
  if (match !== undefined) {
    var meshRendererData = match;
    return /* tuple */[
            meshRendererIndex,
            meshRendererData,
            meshRendererIndex + 1 | 0
          ];
  } else {
    return /* tuple */[
            undefined,
            undefined,
            meshRendererIndex
          ];
  }
}

function _getBasicCameraViewData(param, state) {
  var basicCameraViewIndex = param[1];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = GetComponentGameObjectService$Wonderjs.getBasicCameraViewComponent(param[0], gameObjectRecord);
  if (match !== undefined) {
    var basicCameraViewData = match;
    return /* tuple */[
            basicCameraViewIndex,
            basicCameraViewData,
            basicCameraViewIndex + 1 | 0
          ];
  } else {
    return /* tuple */[
            undefined,
            undefined,
            basicCameraViewIndex
          ];
  }
}

function _getCameraProjectionData(param, state) {
  var cameraProjectionIndex = param[1];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = GetComponentGameObjectService$Wonderjs.getPerspectiveCameraProjectionComponent(param[0], gameObjectRecord);
  if (match !== undefined) {
    var cameraProjectionData = match;
    return /* tuple */[
            cameraProjectionIndex,
            cameraProjectionData,
            cameraProjectionIndex + 1 | 0
          ];
  } else {
    return /* tuple */[
            undefined,
            undefined,
            cameraProjectionIndex
          ];
  }
}

function _getArcballCameraControllerData(param, state) {
  var arcballCameraControllerIndex = param[1];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = GetComponentGameObjectService$Wonderjs.getArcballCameraControllerComponent(param[0], gameObjectRecord);
  if (match !== undefined) {
    return /* tuple */[
            arcballCameraControllerIndex,
            match,
            arcballCameraControllerIndex + 1 | 0
          ];
  } else {
    return /* tuple */[
            undefined,
            undefined,
            arcballCameraControllerIndex
          ];
  }
}

function _getLightData(param, state) {
  var lightIndex = param[1];
  var gameObject = param[0];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = GetComponentGameObjectService$Wonderjs.getDirectionLightComponent(gameObject, gameObjectRecord);
  if (match !== undefined) {
    var lightData = /* tuple */[
      "directional",
      match
    ];
    return /* tuple */[
            lightIndex,
            lightData,
            lightIndex + 1 | 0
          ];
  } else {
    var match$1 = GetComponentGameObjectService$Wonderjs.getPointLightComponent(gameObject, gameObjectRecord);
    if (match$1 !== undefined) {
      var lightData$1 = /* tuple */[
        "point",
        match$1
      ];
      return /* tuple */[
              lightIndex,
              lightData$1,
              lightIndex + 1 | 0
            ];
    } else {
      return /* tuple */[
              undefined,
              undefined,
              lightIndex
            ];
    }
  }
}

function getComponentData(param, getPointsDataFuncTuple) {
  var match = param[4];
  var lightDataMap = match[7];
  var arcballCameraControllerDataMap = match[6];
  var cameraProjectionDataMap = match[5];
  var basicCameraViewDataMap = match[4];
  var resultLightMaterialDataMap = match[3];
  var resultBasicMaterialDataMap = match[2];
  var meshRendererDataMap = match[1];
  var meshPointAndNameDataMap = match[0];
  var match$1 = param[3];
  var match$2 = param[2];
  var state = param[1];
  var gameObject = param[0];
  var match$3 = _getMeshData(/* tuple */[
        gameObject,
        match$2[0]
      ], match$1[0], getPointsDataFuncTuple, state);
  var meshIndex = match$3[0];
  var meshPointAndNameDataMap$1 = meshIndex !== undefined ? SparseMapService$WonderCommonlib.set(meshIndex, OptionService$Wonderjs.unsafeGet(match$3[1]), meshPointAndNameDataMap) : meshPointAndNameDataMap;
  var match$4 = _getMeshRendererData(/* tuple */[
        gameObject,
        match$2[1]
      ], state);
  var meshRendererIndex = match$4[0];
  var meshRendererDataMap$1 = meshRendererIndex !== undefined ? SparseMapService$WonderCommonlib.set(meshRendererIndex, OptionService$Wonderjs.unsafeGet(match$4[1]), meshRendererDataMap) : meshRendererDataMap;
  var match$5 = _getBasicMaterialData(/* tuple */[
        gameObject,
        match$2[2]
      ], match$1[1], state);
  var basicMaterialIndex = match$5[0];
  var resultBasicMaterialDataMap$1 = basicMaterialIndex !== undefined ? SparseMapService$WonderCommonlib.set(basicMaterialIndex, OptionService$Wonderjs.unsafeGet(match$5[1]), resultBasicMaterialDataMap) : resultBasicMaterialDataMap;
  var match$6 = _getLightMaterialData(/* tuple */[
        gameObject,
        match$2[3]
      ], match$1[2], state);
  var lightMaterialIndex = match$6[0];
  var resultLightMaterialDataMap$1 = lightMaterialIndex !== undefined ? SparseMapService$WonderCommonlib.set(lightMaterialIndex, OptionService$Wonderjs.unsafeGet(match$6[1]), resultLightMaterialDataMap) : resultLightMaterialDataMap;
  var match$7 = _getBasicCameraViewData(/* tuple */[
        gameObject,
        match$2[4]
      ], state);
  var basicCameraViewIndex = match$7[0];
  var basicCameraViewDataMap$1 = basicCameraViewIndex !== undefined ? SparseMapService$WonderCommonlib.set(basicCameraViewIndex, OptionService$Wonderjs.unsafeGet(match$7[1]), basicCameraViewDataMap) : basicCameraViewDataMap;
  var match$8 = _getCameraProjectionData(/* tuple */[
        gameObject,
        match$2[5]
      ], state);
  var cameraProjectionIndex = match$8[0];
  var cameraProjectionDataMap$1 = cameraProjectionIndex !== undefined ? SparseMapService$WonderCommonlib.set(cameraProjectionIndex, OptionService$Wonderjs.unsafeGet(match$8[1]), cameraProjectionDataMap) : cameraProjectionDataMap;
  var match$9 = _getArcballCameraControllerData(/* tuple */[
        gameObject,
        match$2[6]
      ], state);
  var arcballCameraControllerIndex = match$9[0];
  var arcballCameraControllerDataMap$1 = arcballCameraControllerIndex !== undefined ? SparseMapService$WonderCommonlib.set(arcballCameraControllerIndex, OptionService$Wonderjs.unsafeGet(match$9[1]), arcballCameraControllerDataMap) : arcballCameraControllerDataMap;
  var match$10 = _getLightData(/* tuple */[
        gameObject,
        match$2[7]
      ], state);
  var lightIndex = match$10[0];
  var lightDataMap$1 = lightIndex !== undefined ? SparseMapService$WonderCommonlib.set(lightIndex, OptionService$Wonderjs.unsafeGet(match$10[1]), lightDataMap) : lightDataMap;
  return /* tuple */[
          state,
          /* tuple */[
            meshIndex,
            meshRendererIndex,
            basicMaterialIndex,
            lightMaterialIndex,
            basicCameraViewIndex,
            cameraProjectionIndex,
            arcballCameraControllerIndex,
            lightIndex
          ],
          /* tuple */[
            match$3[2],
            match$4[2],
            match$5[2],
            match$6[2],
            match$7[2],
            match$8[2],
            match$9[2],
            match$10[2]
          ],
          /* tuple */[
            match$3[3],
            match$5[3],
            match$6[3]
          ],
          /* tuple */[
            meshPointAndNameDataMap$1,
            meshRendererDataMap$1,
            resultBasicMaterialDataMap$1,
            resultLightMaterialDataMap$1,
            basicCameraViewDataMap$1,
            cameraProjectionDataMap$1,
            arcballCameraControllerDataMap$1,
            lightDataMap$1
          ]
        ];
}

export {
  _hasMap ,
  _getGeometryData ,
  _getMeshData ,
  _getBasicMaterialData ,
  _getLightMaterialData ,
  _getMeshRendererData ,
  _getBasicCameraViewData ,
  _getCameraProjectionData ,
  _getArcballCameraControllerData ,
  _getLightData ,
  getComponentData ,
  
}
/* OptionService-Wonderjs Not a pure module */
