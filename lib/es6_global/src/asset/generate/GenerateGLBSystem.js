

import * as BuildBufferSystem$Wonderjs from "./BuildBufferSystem.js";
import * as GetNodeDataSystem$Wonderjs from "./node/GetNodeDataSystem.js";
import * as EncodeGLBJsonSystem$Wonderjs from "./EncodeGLBJsonSystem.js";
import * as BuildIMGUIDataSystem$Wonderjs from "./BuildIMGUIDataSystem.js";
import * as BuildLightDataSystem$Wonderjs from "./BuildLightDataSystem.js";
import * as BuildCameraDataSystem$Wonderjs from "./BuildCameraDataSystem.js";
import * as BuildScriptDataSystem$Wonderjs from "./BuildScriptDataSystem.js";
import * as BuildGeometryDataSystem$Wonderjs from "./BuildGeometryDataSystem.js";
import * as BuildMaterialDataSystem$Wonderjs from "./material/BuildMaterialDataSystem.js";
import * as BuildExtensionDataSystem$Wonderjs from "./BuildExtensionDataSystem.js";
import * as BuildMeshRendererDataSystem$Wonderjs from "./BuildMeshRendererDataSystem.js";
import * as BuildCameraControllerDataSystem$Wonderjs from "./BuildCameraControllerDataSystem.js";

function generateGLBData(param, param$1, state) {
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
      ], param$1[1], state$1);
  var match$6 = match$5[6];
  var totalByteLength$1 = match$6[0];
  var imageUint8DataArr = match$5[4];
  var buffer = BuildBufferSystem$Wonderjs.build(totalByteLength$1, /* tuple */[
        totalByteLength,
        /* tuple */[
          match$3[0],
          match$3[1],
          match$3[2]
        ]
      ], imageUint8DataArr);
  var basicCameraViewDataArr = BuildCameraDataSystem$Wonderjs.buildBasicCameraViewData(match$1[4], state$1);
  var cameraProjectionDataArr = BuildCameraDataSystem$Wonderjs.buildCameraProjectionData(match$1[5], state$1);
  var arcballCameraControllerDataArr = BuildCameraControllerDataSystem$Wonderjs.build(match$1[6], state$1);
  var lightDataArr = BuildLightDataSystem$Wonderjs.build(match$1[7], state$1);
  var scriptDataArr = BuildScriptDataSystem$Wonderjs.build(match$1[8], state$1);
  var extensionsUsedArr = BuildExtensionDataSystem$Wonderjs.buildExtensionsUsed(lightDataArr);
  return /* tuple */[
          EncodeGLBJsonSystem$Wonderjs.encode(totalByteLength$1, /* tuple */[
                match[2],
                match$6[1],
                match$4[1],
                match$4[2],
                meshRendererDataArr,
                match$5[0],
                match$5[1],
                match$5[2],
                match$5[3],
                imageUint8DataArr,
                basicCameraViewDataArr,
                cameraProjectionDataArr,
                arcballCameraControllerDataArr,
                lightDataArr,
                scriptDataArr,
                BuildIMGUIDataSystem$Wonderjs.build(state$1),
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
