

import * as BatchOperateSystem$Wonderjs from "./BatchOperateSystem.js";
import * as BatchSetTextureAllDataSystem$Wonderjs from "./BatchSetTextureAllDataSystem.js";
import * as BatchSetStreamTextureAllDataSystem$Wonderjs from "./BatchSetStreamTextureAllDataSystem.js";

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
  var scriptArr = match[11];
  var pointLightArr = match[10];
  var directionLightArr = match[9];
  var lightMaterialArr = match[8];
  var basicMaterialArr = match[7];
  var arcballCameraControllerArr = match[6];
  var flyCameraControllerArr = match[5];
  var perspectiveCameraProjectionArr = match[4];
  var basicCameraViewArr = match[3];
  var meshRendererArr = match[2];
  var geometryArr = match[1];
  var transformArr = match[0];
  var gameObjectArr = param[1];
  var indices = wd[/* indices */2];
  var state = BatchOperateSystem$Wonderjs.batchSetNamesAndGameObjectIsActiveAndIsRoot(wd, /* tuple */[
        param[0],
        gameObjectArr,
        /* tuple */[
          transformArr,
          geometryArr
        ],
        basicSourceTextureArr
      ]);
  var match$1 = BatchOperateSystem$Wonderjs.getBatchComponentGameObjectData(/* tuple */[
        gameObjectArr,
        transformArr,
        geometryArr,
        meshRendererArr,
        basicCameraViewArr,
        perspectiveCameraProjectionArr,
        flyCameraControllerArr,
        arcballCameraControllerArr,
        basicMaterialArr,
        lightMaterialArr,
        directionLightArr,
        pointLightArr,
        scriptArr
      ], indices, wd, state);
  var match$2 = match$1[0];
  var gameObjectGeometrys = match$2[5];
  var geometryGameObjects = match$2[4];
  var gameObjectTransforms = match$2[3];
  var state$1 = BatchSetTextureAllDataSystem$Wonderjs.batchSetFormatAndFlipY(basicSourceTextureArr, wd[/* basicSourceTextures */5], match$1[1]);
  var basicSourceTextureData = _getBatchAllTypeTextureData(lightMaterialArr, basicSourceTextureArr, default11Image, wd);
  return /* tuple */[
          BatchSetStreamTextureAllDataSystem$Wonderjs.batchSet(basicSourceTextureData, BatchOperateSystem$Wonderjs.batchAddComponent(wd, /* tuple */[
                    match$2[2],
                    gameObjectTransforms,
                    geometryGameObjects,
                    gameObjectGeometrys,
                    match$2[6],
                    match$2[7],
                    match$2[8],
                    match$2[9],
                    match$2[10],
                    match$2[11],
                    match$2[12],
                    match$2[13],
                    match$2[14],
                    match$2[15],
                    match$2[16],
                    match$2[17],
                    match$2[18],
                    match$2[19],
                    match$2[20],
                    match$2[21],
                    match$2[22],
                    match$2[23],
                    match$2[24],
                    match$2[25]
                  ], BatchOperateSystem$Wonderjs.batchSetComponentData(wd, /* tuple */[
                        true,
                        true
                      ], /* tuple */[
                        transformArr,
                        geometryArr,
                        meshRendererArr,
                        basicCameraViewArr,
                        perspectiveCameraProjectionArr,
                        flyCameraControllerArr,
                        arcballCameraControllerArr,
                        basicMaterialArr,
                        lightMaterialArr,
                        directionLightArr,
                        pointLightArr,
                        scriptArr
                      ], /* tuple */[
                        match$2[0],
                        match$2[1],
                        gameObjectTransforms
                      ], state$1))),
          gameObjectArr,
          /* tuple */[
            geometryArr,
            geometryGameObjects,
            gameObjectGeometrys
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
