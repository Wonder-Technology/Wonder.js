

import * as RecordJobService$Wonderjs from "../../../record/main/job/RecordJobService.js";
import * as RecordViewService$Wonderjs from "../../../record/main/device/RecordViewService.js";
import * as ShaderChunkSystem$Wonderjs from "../../../../glsl/ShaderChunkSystem.js";
import * as RecordAPIMainService$Wonderjs from "../api/RecordAPIMainService.js";
import * as RecordAllGLSLService$Wonderjs from "../../../record/all/glsl/RecordAllGLSLService.js";
import * as RecordSettingService$Wonderjs from "../../../record/main/setting/RecordSettingService.js";
import * as RecordLoadMainService$Wonderjs from "../load/RecordLoadMainService.js";
import * as RecordAllShaderService$Wonderjs from "../../../record/all/shader/RecordAllShaderService.js";
import * as RecordEventMainService$Wonderjs from "../event/RecordEventMainService.js";
import * as RecordIMGUIMainService$Wonderjs from "../imgui/RecordIMGUIMainService.js";
import * as RecordVboBufferService$Wonderjs from "../../../record/main/vboBuffer/RecordVboBufferService.js";
import * as RecordAllJobDataService$Wonderjs from "../../../record/all/jobData/RecordAllJobDataService.js";
import * as RecordAllProgramService$Wonderjs from "../../../record/all/program/RecordAllProgramService.js";
import * as RecordGameObjectService$Wonderjs from "../../../record/main/gameObject/RecordGameObjectService.js";
import * as RecordScriptMainService$Wonderjs from "../script/RecordScriptMainService.js";
import * as RecordWorkerDataService$Wonderjs from "../../../record/main/workerData/RecordWorkerDataService.js";
import * as RecordAllGPUDetectService$Wonderjs from "../../../record/all/gpu/RecordAllGPUDetectService.js";
import * as RecordWorkerDetectService$Wonderjs from "../../../record/main/workerDetect/RecordWorkerDetectService.js";
import * as RecordAllGlobalTempService$Wonderjs from "../../../record/all/globalTemp/RecordAllGlobalTempService.js";
import * as RecordGLSLSenderAllService$Wonderjs from "../../all/sender/RecordGLSLSenderAllService.js";
import * as RecordTypeArrayPoolService$Wonderjs from "../../../record/main/typeArrayPool/RecordTypeArrayPoolService.js";
import * as RecordObjectInstanceService$Wonderjs from "../../../record/main/instance/objectInstance/RecordObjectInstanceService.js";
import * as RecordTimeControllerService$Wonderjs from "../../../record/main/timeController/RecordTimeControllerService.js";
import * as RecordWorkerInstanceService$Wonderjs from "../../../record/main/workerInstance/RecordWorkerInstanceService.js";
import * as RecordAllGLSLLocationService$Wonderjs from "../../../record/all/location/RecordAllGLSLLocationService.js";
import * as RecordAssetBundleMainService$Wonderjs from "../assetBundle/RecordAssetBundleMainService.js";
import * as RecordBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/RecordBasicCameraViewService.js";
import * as RecordAllBrowserDetectService$Wonderjs from "../../../record/all/browserDetect/RecordAllBrowserDetectService.js";
import * as RecordAllDeviceManagerService$Wonderjs from "../../../record/all/device/RecordAllDeviceManagerService.js";
import * as RecordFlyCameraControllerService$Wonderjs from "../../../record/main/camera_controller/fly/RecordFlyCameraControllerService.js";
import * as RecordArcballCameraControllerService$Wonderjs from "../../../record/main/camera_controller/arcball/RecordArcballCameraControllerService.js";
import * as RecordPerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/RecordPerspectiveCameraProjectionService.js";

function createState(param) {
  return /* record */[
          /* settingRecord */RecordSettingService$Wonderjs.create(/* () */0),
          /* jobRecord */RecordJobService$Wonderjs.create(/* () */0),
          /* noWorkerJobRecord */undefined,
          /* workerJobRecord */undefined,
          /* renderConfigRecord */undefined,
          /* gpuDetectRecord */RecordAllGPUDetectService$Wonderjs.create(/* () */0),
          /* sourceInstanceRecord */undefined,
          /* objectInstanceRecord */RecordObjectInstanceService$Wonderjs.create(/* () */0),
          /* viewRecord */RecordViewService$Wonderjs.create(/* () */0),
          /* deviceManagerRecord */RecordAllDeviceManagerService$Wonderjs.create(/* () */0),
          /* gameObjectRecord */RecordGameObjectService$Wonderjs.create(/* () */0),
          /* transformRecord */undefined,
          /* sceneRecord */undefined,
          /* basicCameraViewRecord */RecordBasicCameraViewService$Wonderjs.create(/* () */0),
          /* perspectiveCameraProjectionRecord */RecordPerspectiveCameraProjectionService$Wonderjs.create(/* () */0),
          /* basicMaterialRecord */undefined,
          /* lightMaterialRecord */undefined,
          /* sourceTextureRecord */undefined,
          /* basicSourceTextureRecord */undefined,
          /* arrayBufferViewSourceTextureRecord */undefined,
          /* cubemapTextureRecord */undefined,
          /* directionLightRecord */undefined,
          /* pointLightRecord */undefined,
          /* geometryRecord */undefined,
          /* meshRendererRecord */undefined,
          /* arcballCameraControllerRecord */RecordArcballCameraControllerService$Wonderjs.create(/* () */0),
          /* flyCameraControllerRecord */RecordFlyCameraControllerService$Wonderjs.create(/* () */0),
          /* scriptRecord */RecordScriptMainService$Wonderjs.create(/* () */0),
          /* shaderRecord */RecordAllShaderService$Wonderjs.create(/* () */0),
          /* glslRecord */RecordAllGLSLService$Wonderjs.create(/* () */0),
          /* programRecord */RecordAllProgramService$Wonderjs.create(/* () */0),
          /* glslLocationRecord */RecordAllGLSLLocationService$Wonderjs.create(/* () */0),
          /* glslSenderRecord */RecordGLSLSenderAllService$Wonderjs.create(/* () */0),
          /* glslChunkRecord */ShaderChunkSystem$Wonderjs.create(/* () */0),
          /* renderRecord */undefined,
          /* timeControllerRecord */RecordTimeControllerService$Wonderjs.create(/* () */0),
          /* vboBufferRecord */RecordVboBufferService$Wonderjs.create(/* () */0),
          /* globalTempRecord */RecordAllGlobalTempService$Wonderjs.create(/* () */0),
          /* typeArrayPoolRecord */RecordTypeArrayPoolService$Wonderjs.create(/* () */0),
          /* workerInstanceRecord */RecordWorkerInstanceService$Wonderjs.create(/* () */0),
          /* workerDataRecord */RecordWorkerDataService$Wonderjs.create(/* () */0),
          /* workerDetectRecord */RecordWorkerDetectService$Wonderjs.create(/* () */0),
          /* browserDetectRecord */RecordAllBrowserDetectService$Wonderjs.create(/* () */0),
          /* eventRecord */RecordEventMainService$Wonderjs.create(/* () */0),
          /* imguiRecord */RecordIMGUIMainService$Wonderjs.create(/* () */0),
          /* apiRecord */RecordAPIMainService$Wonderjs.create(/* () */0),
          /* jobDataRecord */RecordAllJobDataService$Wonderjs.create(/* () */0),
          /* assetBundleRecord */RecordAssetBundleMainService$Wonderjs.create(/* () */0),
          /* loadRecord */RecordLoadMainService$Wonderjs.create(/* () */0)
        ];
}

export {
  createState ,
  
}
/* RecordAPIMainService-Wonderjs Not a pure module */
