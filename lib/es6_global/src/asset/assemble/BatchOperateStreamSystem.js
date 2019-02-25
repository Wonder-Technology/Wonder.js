

import * as BatchOperateSystem$Wonderjs from "./BatchOperateSystem.js";
import * as BatchOperateLightSystem$Wonderjs from "./BatchOperateLightSystem.js";
import * as BatchSetTextureAllDataSystem$Wonderjs from "./BatchSetTextureAllDataSystem.js";
import * as BatchSetStreamTextureAllDataSystem$Wonderjs from "./BatchSetStreamTextureAllDataSystem.js";
import * as BatchAddGameObjectComponentMainService$Wonderjs from "../../service/state/main/gameObject/BatchAddGameObjectComponentMainService.js";

function _getBatchTextureData(lightMaterialArr, textureArr, default11Image, param) {
  var indices = param[/* indices */2];
  return /* tuple */[
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(lightMaterialArr, indices[/* materialIndices */1][/* diffuseMapMaterialIndices */0][/* materialIndices */0]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* materialIndices */1][/* diffuseMapMaterialIndices */0][/* mapIndices */1])
          ],
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* samplerTextureIndices */3][/* textureIndices */0]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(param[/* samplers */6], indices[/* samplerTextureIndices */3][/* samplerIndices */1])
          ],
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* imageTextureIndices */2][/* textureIndices */0]),
            default11Image
          ]
        ];
}

var _getBatchAllTypeTextureData = _getBatchTextureData;

function batchOperate(wd, default11Image, param) {
  var basicSourceTextureArr = param[3];
  var match = param[2];
  var pointLightArr = match[9];
  var directionLightArr = match[8];
  var lightMaterialArr = match[7];
  var basicMaterialArr = match[6];
  var arcballCameraControllerArr = match[5];
  var perspectiveCameraProjectionArr = match[4];
  var basicCameraViewArr = match[3];
  var meshRendererArr = match[2];
  var geometryArr = match[1];
  var gameObjectArr = param[1];
  var basicSourceTextures = wd[/* basicSourceTextures */5];
  var gameObjects = wd[/* gameObjects */3];
  var indices = wd[/* indices */2];
  var state = BatchOperateSystem$Wonderjs.batchSetIsRoot(gameObjectArr, gameObjects, BatchOperateSystem$Wonderjs.batchSetNames(/* tuple */[
            gameObjectArr,
            basicSourceTextureArr
          ], /* tuple */[
            gameObjects,
            basicSourceTextures
          ], /* tuple */[
            wd[/* geometrys */16],
            geometryArr
          ], param[0]));
  var match$1 = BatchOperateSystem$Wonderjs.getBatchComponentGameObjectData(/* tuple */[
        gameObjectArr,
        match[0],
        geometryArr,
        meshRendererArr,
        basicCameraViewArr,
        perspectiveCameraProjectionArr,
        arcballCameraControllerArr,
        basicMaterialArr,
        lightMaterialArr,
        directionLightArr,
        pointLightArr
      ], indices, wd, state);
  var match$2 = match$1[0];
  var gameObjectTransforms = match$2[3];
  var state$1 = BatchSetTextureAllDataSystem$Wonderjs.batchSetFormat(basicSourceTextureArr, basicSourceTextures, match$1[1]);
  var basicSourceTextureData = _getBatchAllTypeTextureData(lightMaterialArr, basicSourceTextureArr, default11Image, wd);
  return /* tuple */[
          BatchSetStreamTextureAllDataSystem$Wonderjs.batchSet(basicSourceTextureData, BatchAddGameObjectComponentMainService$Wonderjs.batchAddPointLightComponentForCreate(match$2[20], match$2[21], BatchAddGameObjectComponentMainService$Wonderjs.batchAddDirectionLightComponentForCreate(match$2[18], match$2[19], BatchAddGameObjectComponentMainService$Wonderjs.batchAddMeshRendererComponentForCreate(match$2[16], match$2[17], BatchAddGameObjectComponentMainService$Wonderjs.batchAddLightMaterialComponentForCreate(match$2[14], match$2[15], BatchAddGameObjectComponentMainService$Wonderjs.batchAddBasicMaterialComponentForCreate(match$2[12], match$2[13], BatchAddGameObjectComponentMainService$Wonderjs.batchAddArcballCameraControllerComponentForCreate(match$2[10], match$2[11], BatchAddGameObjectComponentMainService$Wonderjs.batchAddPerspectiveCameraProjectionComponentForCreate(match$2[8], match$2[9], BatchAddGameObjectComponentMainService$Wonderjs.batchAddBasicCameraViewComponentForCreate(match$2[6], match$2[7], BatchAddGameObjectComponentMainService$Wonderjs.batchAddTransformComponentForCreate(match$2[2], gameObjectTransforms, BatchOperateLightSystem$Wonderjs.setAmbientLightData(wd, BatchOperateLightSystem$Wonderjs.batchSetPointLightData(wd, pointLightArr, BatchOperateLightSystem$Wonderjs.batchSetDirectionLightData(wd, directionLightArr, BatchOperateSystem$Wonderjs.batchSetLightMaterialData(wd, lightMaterialArr, BatchOperateSystem$Wonderjs.batchSetBasicMaterialData(wd, basicMaterialArr, BatchOperateSystem$Wonderjs.batchSetMeshRendererData(wd, meshRendererArr, BatchOperateSystem$Wonderjs.batchSetArcballCameraControllerData(wd, arcballCameraControllerArr, true, BatchOperateSystem$Wonderjs.batchSetPerspectiveCameraProjectionData(wd, perspectiveCameraProjectionArr, BatchOperateSystem$Wonderjs.batchSetBasicCameraViewData(wd, basicCameraViewArr, true, BatchOperateSystem$Wonderjs.batchSetTransformParent(match$2[0], match$2[1], BatchOperateSystem$Wonderjs.batchSetTransformData(wd, gameObjectTransforms, state$1))))))))))))))))))))),
          gameObjectArr,
          /* tuple */[
            geometryArr,
            match$2[4],
            match$2[5]
          ],
          /* tuple */[
            basicSourceTextureArr,
            indices[/* imageTextureIndices */2],
            wd[/* images */4]
          ]
        ];
}

export {
  _getBatchTextureData ,
  _getBatchAllTypeTextureData ,
  batchOperate ,
  
}
/* BatchOperateSystem-Wonderjs Not a pure module */
