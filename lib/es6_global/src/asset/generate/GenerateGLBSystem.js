

import * as BuildBufferSystem$Wonderjs from "./BuildBufferSystem.js";
import * as GetNodeDataSystem$Wonderjs from "./node/GetNodeDataSystem.js";
import * as EncodeGLBJsonSystem$Wonderjs from "./EncodeGLBJsonSystem.js";
import * as BuildIMGUIDataSystem$Wonderjs from "./BuildIMGUIDataSystem.js";
import * as BuildLightDataSystem$Wonderjs from "./BuildLightDataSystem.js";
import * as BuildCameraDataSystem$Wonderjs from "./BuildCameraDataSystem.js";
import * as BuildScriptDataSystem$Wonderjs from "./BuildScriptDataSystem.js";
import * as BuildSkyboxDataSystem$Wonderjs from "./BuildSkyboxDataSystem.js";
import * as BuildGeometryDataSystem$Wonderjs from "./BuildGeometryDataSystem.js";
import * as BuildMaterialDataSystem$Wonderjs from "./material/BuildMaterialDataSystem.js";
import * as BuildExtensionDataSystem$Wonderjs from "./BuildExtensionDataSystem.js";
import * as BuildMeshRendererDataSystem$Wonderjs from "./BuildMeshRendererDataSystem.js";
import * as BuildFlyCameraControllerDataSystem$Wonderjs from "./BuildFlyCameraControllerDataSystem.js";
import * as BuildArcballCameraControllerDataSystem$Wonderjs from "./BuildArcballCameraControllerDataSystem.js";

function generateGLBData(param, isBuildCubemapFromSceneSkybox, param$1, state) {
  var getResultUint8ArrayDataFunc = param$1[1];
  var match = GetNodeDataSystem$Wonderjs.getAllNodeData(param[0], param$1[0], state);
  var match$1 = match[1];
  var state$1 = match[0];
  var match$2 = BuildGeometryDataSystem$Wonderjs.build(match$1[0]);
  var totalByteLength = match$2[0];
  var match$3 = match$2[2];
  var match$4 = match$2[1];
  var meshRendererDataArr = BuildMeshRendererDataSystem$Wonderjs.build(match$1[1], state$1);
  var match$5 = BuildMaterialDataSystem$Wonderjs.build(/* tuple */[
        match$1[2],
        match$1[3],
        param[1]
      ], /* tuple */[
        totalByteLength,
        totalByteLength,
        match$4[0]
      ], getResultUint8ArrayDataFunc, state$1);
  var match$6 = match$5[6];
  var cubemapTextureDataArr = /* array */[];
  var match$7 = BuildSkyboxDataSystem$Wonderjs.build(isBuildCubemapFromSceneSkybox, cubemapTextureDataArr, match$5[3], match$5[4], /* tuple */[
        match$6[0],
        match$6[1],
        match$6[2]
      ], getResultUint8ArrayDataFunc, state$1);
  var match$8 = match$7[2];
  var match$9 = match$7[1];
  var imageUint8DataArr = match$9[2];
  var match$10 = BuildIMGUIDataSystem$Wonderjs.build(state$1, /* tuple */[
        match$8[0],
        match$8[1],
        match$8[2]
      ]);
  var match$11 = match$10[2];
  var match$12 = match$11[1];
  var match$13 = match$12[0];
  var totalByteLength$1 = match$13[0];
  var buffer = BuildBufferSystem$Wonderjs.build(totalByteLength$1, /* tuple */[
        match$3[0],
        match$3[1],
        match$3[2]
      ], imageUint8DataArr, match$12[1]);
  var basicCameraViewDataArr = BuildCameraDataSystem$Wonderjs.buildBasicCameraViewData(match$1[4], state$1);
  var cameraProjectionDataArr = BuildCameraDataSystem$Wonderjs.buildCameraProjectionData(match$1[5], state$1);
  var flyCameraControllerDataArr = BuildFlyCameraControllerDataSystem$Wonderjs.build(match$1[6], state$1);
  var arcballCameraControllerDataArr = BuildArcballCameraControllerDataSystem$Wonderjs.build(match$1[7], state$1);
  var lightDataArr = BuildLightDataSystem$Wonderjs.build(match$1[8], state$1);
  var scriptDataArr = BuildScriptDataSystem$Wonderjs.build(match$1[9], state$1);
  var extensionsUsedArr = BuildExtensionDataSystem$Wonderjs.buildExtensionsUsed(lightDataArr);
  return /* tuple */[
          EncodeGLBJsonSystem$Wonderjs.encode(totalByteLength$1, /* tuple */[
                match[2],
                match$13[2],
                match$4[1],
                match$4[2],
                meshRendererDataArr,
                match$5[0],
                match$5[1],
                match$5[2],
                match$9[0],
                match$9[1],
                imageUint8DataArr,
                basicCameraViewDataArr,
                cameraProjectionDataArr,
                flyCameraControllerDataArr,
                arcballCameraControllerDataArr,
                lightDataArr,
                scriptDataArr,
                /* tuple */[
                  match$10[0],
                  match$10[1],
                  match$11[0]
                ],
                match$7[0],
                extensionsUsedArr
              ], state$1),
          match$5[5],
          buffer
        ];
}

export {
  generateGLBData ,
  
}
/* BuildBufferSystem-Wonderjs Not a pure module */
