

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as OptionService$Wonderjs from "../../../service/atom/OptionService.js";
import * as NameGeometryMainService$Wonderjs from "../../../service/state/main/geometry/NameGeometryMainService.js";
import * as IndicesGeometryMainService$Wonderjs from "../../../service/state/main/geometry/IndicesGeometryMainService.js";
import * as NameBasicMaterialMainService$Wonderjs from "../../../service/state/main/material/basic/NameBasicMaterialMainService.js";
import * as NameLightMaterialMainService$Wonderjs from "../../../service/state/main/material/light/NameLightMaterialMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../service/record/main/gameObject/GetComponentGameObjectService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
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

function _getGeometryData(param, param$1, state) {
  var geometryDataMap = param[3];
  var geometry = param[2];
  var meshIndex = param[1];
  var match = MutableSparseMapService$WonderCommonlib.get(geometry, geometryDataMap);
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
        Caml_option.some(param$1[4](geometry, state))
      ] : /* tuple */[
        Caml_option.some(param$1[3](geometry, state)),
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
            MutableSparseMapService$WonderCommonlib.set(geometry, /* tuple */[
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
                meshIndex,
                match,
                geometryDataMap
              ], getPointsDataFuncTuple, state);
  } else {
    return /* tuple */[
            undefined,
            undefined,
            meshIndex,
            geometryDataMap
          ];
  }
}

function _getMaterialData(param, getNameFunc, state) {
  var materialDataMap = param[3];
  var materialCompoent = param[2];
  var materialIndex = param[1];
  if (materialCompoent !== undefined) {
    var material = materialCompoent;
    var match = MutableSparseMapService$WonderCommonlib.get(material, materialDataMap);
    if (match !== undefined) {
      var match$1 = match;
      return /* tuple */[
              match$1[0],
              match$1[1],
              materialIndex,
              materialDataMap
            ];
    } else {
      var materialData = /* tuple */[
        material,
        Curry._2(getNameFunc, material, state)
      ];
      return /* tuple */[
              materialIndex,
              materialData,
              materialIndex + 1 | 0,
              MutableSparseMapService$WonderCommonlib.set(material, /* tuple */[
                    materialIndex,
                    materialData
                  ], materialDataMap)
            ];
    }
  } else {
    return /* tuple */[
            undefined,
            undefined,
            materialIndex,
            materialDataMap
          ];
  }
}

function _getBasicMaterialData(param, basicMaterialDataMap, state) {
  var gameObject = param[0];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return _getMaterialData(/* tuple */[
              gameObject,
              param[1],
              GetComponentGameObjectService$Wonderjs.getBasicMaterialComponent(gameObject, gameObjectRecord),
              basicMaterialDataMap
            ], NameBasicMaterialMainService$Wonderjs.getName, state);
}

function _getLightMaterialData(param, lightMaterialDataMap, state) {
  var gameObject = param[0];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return _getMaterialData(/* tuple */[
              gameObject,
              param[1],
              GetComponentGameObjectService$Wonderjs.getLightMaterialComponent(gameObject, gameObjectRecord),
              lightMaterialDataMap
            ], NameLightMaterialMainService$Wonderjs.getName, state);
}

function _getComponentData(param, getComponentFunc, state) {
  var componentIndex = param[1];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = getComponentFunc(param[0], gameObjectRecord);
  if (match !== undefined) {
    return /* tuple */[
            componentIndex,
            Caml_option.some(Caml_option.valFromOption(match)),
            componentIndex + 1 | 0
          ];
  } else {
    return /* tuple */[
            undefined,
            undefined,
            componentIndex
          ];
  }
}

function _getMeshRendererData(param, state) {
  return _getComponentData(/* tuple */[
              param[0],
              param[1]
            ], GetComponentGameObjectService$Wonderjs.getMeshRendererComponent, state);
}

function _getBasicCameraViewData(param, state) {
  return _getComponentData(/* tuple */[
              param[0],
              param[1]
            ], GetComponentGameObjectService$Wonderjs.getBasicCameraViewComponent, state);
}

function _getCameraProjectionData(param, state) {
  return _getComponentData(/* tuple */[
              param[0],
              param[1]
            ], GetComponentGameObjectService$Wonderjs.getPerspectiveCameraProjectionComponent, state);
}

function _getFlyCameraControllerData(param, state) {
  return _getComponentData(/* tuple */[
              param[0],
              param[1]
            ], GetComponentGameObjectService$Wonderjs.getFlyCameraControllerComponent, state);
}

function _getArcballCameraControllerData(param, state) {
  return _getComponentData(/* tuple */[
              param[0],
              param[1]
            ], GetComponentGameObjectService$Wonderjs.getArcballCameraControllerComponent, state);
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

function _getScriptData(param, state) {
  return _getComponentData(/* tuple */[
              param[0],
              param[1]
            ], GetComponentGameObjectService$Wonderjs.getScriptComponent, state);
}

function getAllComponentData(param, getPointsDataFuncTuple) {
  var match = param[4];
  var scriptDataMap = match[9];
  var lightDataMap = match[8];
  var arcballCameraControllerDataMap = match[7];
  var flyCameraControllerDataMap = match[6];
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
  var meshPointAndNameDataMap$1 = meshIndex !== undefined ? MutableSparseMapService$WonderCommonlib.set(meshIndex, OptionService$Wonderjs.unsafeGet(match$3[1]), meshPointAndNameDataMap) : meshPointAndNameDataMap;
  var match$4 = _getMeshRendererData(/* tuple */[
        gameObject,
        match$2[1]
      ], state);
  var meshRendererIndex = match$4[0];
  var meshRendererDataMap$1 = meshRendererIndex !== undefined ? MutableSparseMapService$WonderCommonlib.set(meshRendererIndex, OptionService$Wonderjs.unsafeGet(match$4[1]), meshRendererDataMap) : meshRendererDataMap;
  var match$5 = _getBasicMaterialData(/* tuple */[
        gameObject,
        match$2[2]
      ], match$1[1], state);
  var basicMaterialIndex = match$5[0];
  var resultBasicMaterialDataMap$1 = basicMaterialIndex !== undefined ? MutableSparseMapService$WonderCommonlib.set(basicMaterialIndex, OptionService$Wonderjs.unsafeGet(match$5[1]), resultBasicMaterialDataMap) : resultBasicMaterialDataMap;
  var match$6 = _getLightMaterialData(/* tuple */[
        gameObject,
        match$2[3]
      ], match$1[2], state);
  var lightMaterialIndex = match$6[0];
  var resultLightMaterialDataMap$1 = lightMaterialIndex !== undefined ? MutableSparseMapService$WonderCommonlib.set(lightMaterialIndex, OptionService$Wonderjs.unsafeGet(match$6[1]), resultLightMaterialDataMap) : resultLightMaterialDataMap;
  var match$7 = _getBasicCameraViewData(/* tuple */[
        gameObject,
        match$2[4]
      ], state);
  var basicCameraViewIndex = match$7[0];
  var basicCameraViewDataMap$1 = basicCameraViewIndex !== undefined ? MutableSparseMapService$WonderCommonlib.set(basicCameraViewIndex, OptionService$Wonderjs.unsafeGet(match$7[1]), basicCameraViewDataMap) : basicCameraViewDataMap;
  var match$8 = _getCameraProjectionData(/* tuple */[
        gameObject,
        match$2[5]
      ], state);
  var cameraProjectionIndex = match$8[0];
  var cameraProjectionDataMap$1 = cameraProjectionIndex !== undefined ? MutableSparseMapService$WonderCommonlib.set(cameraProjectionIndex, OptionService$Wonderjs.unsafeGet(match$8[1]), cameraProjectionDataMap) : cameraProjectionDataMap;
  var match$9 = _getFlyCameraControllerData(/* tuple */[
        gameObject,
        match$2[6]
      ], state);
  var flyCameraControllerIndex = match$9[0];
  var flyCameraControllerDataMap$1 = flyCameraControllerIndex !== undefined ? MutableSparseMapService$WonderCommonlib.set(flyCameraControllerIndex, OptionService$Wonderjs.unsafeGet(match$9[1]), flyCameraControllerDataMap) : flyCameraControllerDataMap;
  var match$10 = _getArcballCameraControllerData(/* tuple */[
        gameObject,
        match$2[7]
      ], state);
  var arcballCameraControllerIndex = match$10[0];
  var arcballCameraControllerDataMap$1 = arcballCameraControllerIndex !== undefined ? MutableSparseMapService$WonderCommonlib.set(arcballCameraControllerIndex, OptionService$Wonderjs.unsafeGet(match$10[1]), arcballCameraControllerDataMap) : arcballCameraControllerDataMap;
  var match$11 = _getLightData(/* tuple */[
        gameObject,
        match$2[8]
      ], state);
  var lightIndex = match$11[0];
  var lightDataMap$1 = lightIndex !== undefined ? MutableSparseMapService$WonderCommonlib.set(lightIndex, OptionService$Wonderjs.unsafeGet(match$11[1]), lightDataMap) : lightDataMap;
  var match$12 = _getScriptData(/* tuple */[
        gameObject,
        match$2[9]
      ], state);
  var scriptIndex = match$12[0];
  var scriptDataMap$1 = scriptIndex !== undefined ? MutableSparseMapService$WonderCommonlib.set(scriptIndex, OptionService$Wonderjs.unsafeGet(match$12[1]), scriptDataMap) : scriptDataMap;
  return /* tuple */[
          state,
          /* tuple */[
            meshIndex,
            meshRendererIndex,
            basicMaterialIndex,
            lightMaterialIndex,
            basicCameraViewIndex,
            cameraProjectionIndex,
            flyCameraControllerIndex,
            arcballCameraControllerIndex,
            lightIndex,
            scriptIndex
          ],
          /* tuple */[
            match$3[2],
            match$4[2],
            match$5[2],
            match$6[2],
            match$7[2],
            match$8[2],
            match$9[2],
            match$10[2],
            match$11[2],
            match$12[2]
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
            flyCameraControllerDataMap$1,
            arcballCameraControllerDataMap$1,
            lightDataMap$1,
            scriptDataMap$1
          ]
        ];
}

export {
  _hasMap ,
  _getGeometryData ,
  _getMeshData ,
  _getMaterialData ,
  _getBasicMaterialData ,
  _getLightMaterialData ,
  _getComponentData ,
  _getMeshRendererData ,
  _getBasicCameraViewData ,
  _getCameraProjectionData ,
  _getFlyCameraControllerData ,
  _getArcballCameraControllerData ,
  _getLightData ,
  _getScriptData ,
  getAllComponentData ,
  
}
/* OptionService-Wonderjs Not a pure module */
