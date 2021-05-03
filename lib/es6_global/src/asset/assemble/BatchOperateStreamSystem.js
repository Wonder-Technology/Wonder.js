

import * as BatchOperateSystem$Wonderjs from "./BatchOperateSystem.js";
import * as BatchSetCubemapTextureAllDataSystem$Wonderjs from "./BatchSetCubemapTextureAllDataSystem.js";
import * as BatchSetBasicSourceTextureAllDataSystem$Wonderjs from "./BatchSetBasicSourceTextureAllDataSystem.js";
import * as BatchSetStreamCubemapTextureAllDataSystem$Wonderjs from "./BatchSetStreamCubemapTextureAllDataSystem.js";
import * as BatchSetStreamBasicSourceTextureAllDataSystem$Wonderjs from "./BatchSetStreamBasicSourceTextureAllDataSystem.js";

function _getBatchAllTypeBasicSourceTextureData(lightMaterialArr, textureArr, default11Image, param) {
  var indices = param[/* indices */2];
  return /* tuple */[
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(lightMaterialArr, indices[/* materialIndices */1][/* diffuseMapMaterialIndices */0][/* materialIndices */0]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* materialIndices */1][/* diffuseMapMaterialIndices */0][/* mapIndices */1])
          ],
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* samplerTextureIndices */4][/* textureIndices */0]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(param[/* samplers */7], indices[/* samplerTextureIndices */4][/* samplerIndices */1])
          ],
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* imageBasicSourceTextureIndices */2][/* textureIndices */0]),
            default11Image
          ]
        ];
}

function _getBatchAllTypeCubemapTextureData(textureArr, default11Image, param) {
  var indices = param[/* indices */2];
  return /* tuple */[
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* samplerCubemapTextureIndices */5][/* cubemapTextureIndices */0]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(param[/* samplers */7], indices[/* samplerCubemapTextureIndices */5][/* samplerIndices */1])
          ],
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* imageCubemapTextureIndices */3][/* cubemapTextureIndices */0]),
            default11Image
          ]
        ];
}

function batchOperate(wd, default11Image, param) {
  var match = param[3];
  var cubemapTextureArr = match[1];
  var basicSourceTextureArr = match[0];
  var match$1 = param[2];
  var scriptArr = match$1[11];
  var pointLightArr = match$1[10];
  var directionLightArr = match$1[9];
  var lightMaterialArr = match$1[8];
  var basicMaterialArr = match$1[7];
  var arcballCameraControllerArr = match$1[6];
  var flyCameraControllerArr = match$1[5];
  var perspectiveCameraProjectionArr = match$1[4];
  var basicCameraViewArr = match$1[3];
  var meshRendererArr = match$1[2];
  var geometryArr = match$1[1];
  var transformArr = match$1[0];
  var gameObjectArr = param[1];
  var indices = wd[/* indices */2];
  var state = BatchOperateSystem$Wonderjs.batchSetNamesAndGameObjectIsActiveAndIsRoot(wd, /* tuple */[
        param[0],
        gameObjectArr,
        /* tuple */[
          transformArr,
          geometryArr
        ],
        /* tuple */[
          basicSourceTextureArr,
          cubemapTextureArr
        ]
      ]);
  var match$2 = BatchOperateSystem$Wonderjs.getBatchComponentGameObjectData(/* tuple */[
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
  var match$3 = match$2[0];
  var gameObjectGeometrys = match$3[5];
  var geometryGameObjects = match$3[4];
  var gameObjectTransforms = match$3[3];
  var state$1 = BatchSetCubemapTextureAllDataSystem$Wonderjs.batchSetFormatAndTypeAndFlipY(cubemapTextureArr, wd[/* cubemapTextures */6], BatchSetBasicSourceTextureAllDataSystem$Wonderjs.batchSetFormatAndTypeAndFlipY(basicSourceTextureArr, wd[/* basicSourceTextures */5], match$2[1]));
  var basicSourceTextureData = _getBatchAllTypeBasicSourceTextureData(lightMaterialArr, basicSourceTextureArr, default11Image, wd);
  var cubemapTextureData = _getBatchAllTypeCubemapTextureData(cubemapTextureArr, default11Image, wd);
  return /* tuple */[
          BatchSetStreamCubemapTextureAllDataSystem$Wonderjs.batchSet(cubemapTextureData, BatchSetStreamBasicSourceTextureAllDataSystem$Wonderjs.batchSet(basicSourceTextureData, BatchOperateSystem$Wonderjs.batchAddComponent(wd, /* tuple */[
                        match$3[2],
                        gameObjectTransforms,
                        geometryGameObjects,
                        gameObjectGeometrys,
                        match$3[6],
                        match$3[7],
                        match$3[8],
                        match$3[9],
                        match$3[10],
                        match$3[11],
                        match$3[12],
                        match$3[13],
                        match$3[14],
                        match$3[15],
                        match$3[16],
                        match$3[17],
                        match$3[18],
                        match$3[19],
                        match$3[20],
                        match$3[21],
                        match$3[22],
                        match$3[23],
                        match$3[24],
                        match$3[25]
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
                            match$3[0],
                            match$3[1],
                            gameObjectTransforms
                          ], state$1)))),
          gameObjectArr,
          /* tuple */[
            geometryArr,
            geometryGameObjects,
            gameObjectGeometrys
          ],
          /* tuple */[
            wd[/* images */4],
            /* tuple */[
              basicSourceTextureArr,
              indices[/* imageBasicSourceTextureIndices */2]
            ],
            /* tuple */[
              cubemapTextureArr,
              indices[/* imageCubemapTextureIndices */3]
            ]
          ]
        ];
}

export {
  _getBatchAllTypeBasicSourceTextureData ,
  _getBatchAllTypeCubemapTextureData ,
  batchOperate ,
  
}
/* BatchOperateSystem-Wonderjs Not a pure module */
