

import * as RecordJobService$Wonderjs from "../../../record/main/job/RecordJobService.js";
import * as RecordGLSLService$Wonderjs from "../../../record/all/glsl/RecordGLSLService.js";
import * as RecordViewService$Wonderjs from "../../../record/main/device/RecordViewService.js";
import * as ShaderChunkSystem$Wonderjs from "../../../../glsl/ShaderChunkSystem.js";
import * as RecordShaderService$Wonderjs from "../../../record/all/shader/RecordShaderService.js";
import * as RecordAPIMainService$Wonderjs from "../api/RecordAPIMainService.js";
import * as RecordJobDataService$Wonderjs from "../../../record/all/jobData/RecordJobDataService.js";
import * as RecordProgramService$Wonderjs from "../../../record/all/program/RecordProgramService.js";
import * as RecordSettingService$Wonderjs from "../../../record/main/setting/RecordSettingService.js";
import * as RecordEventMainService$Wonderjs from "../event/RecordEventMainService.js";
import * as RecordGPUDetectService$Wonderjs from "../../../record/all/gpu/RecordGPUDetectService.js";
import * as RecordIMGUIMainService$Wonderjs from "../imgui/RecordIMGUIMainService.js";
import * as RecordVboBufferService$Wonderjs from "../../../record/main/vboBuffer/RecordVboBufferService.js";
import * as RecordGameObjectService$Wonderjs from "../../../record/main/gameObject/RecordGameObjectService.js";
import * as RecordGlobalTempService$Wonderjs from "../../../record/all/globalTemp/RecordGlobalTempService.js";
import * as RecordScriptMainService$Wonderjs from "../script/RecordScriptMainService.js";
import * as RecordWorkerDataService$Wonderjs from "../../../record/main/workerData/RecordWorkerDataService.js";
import * as RecordGLSLLocationService$Wonderjs from "../../../record/all/location/RecordGLSLLocationService.js";
import * as RecordWorkerDetectService$Wonderjs from "../../../record/main/workerDetect/RecordWorkerDetectService.js";
import * as RecordDeviceManagerService$Wonderjs from "../../../record/all/device/RecordDeviceManagerService.js";
import * as RecordGLSLSenderAllService$Wonderjs from "../../all/sender/RecordGLSLSenderAllService.js";
import * as RecordTypeArrayPoolService$Wonderjs from "../../../record/main/typeArrayPool/RecordTypeArrayPoolService.js";
import * as RecordObjectInstanceService$Wonderjs from "../../../record/main/instance/objectInstance/RecordObjectInstanceService.js";
import * as RecordTimeControllerService$Wonderjs from "../../../record/main/timeController/RecordTimeControllerService.js";
import * as RecordWorkerInstanceService$Wonderjs from "../../../record/main/workerInstance/RecordWorkerInstanceService.js";
import * as RecordAssetBundleMainService$Wonderjs from "../assetBundle/RecordAssetBundleMainService.js";
import * as RecordBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/RecordBasicCameraViewService.js";
import * as RecordBrowserDetectAllService$Wonderjs from "../../../record/all/browserDetect/RecordBrowserDetectAllService.js";
import * as RecordArcballCameraControllerService$Wonderjs from "../../../record/main/camera_controller/arcball/RecordArcballCameraControllerService.js";
import * as RecordPerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/RecordPerspectiveCameraProjectionService.js";

function createState(param) {
  return /* record */[
          /* settingRecord */RecordSettingService$Wonderjs.create(/* () */0),
          /* jobRecord */RecordJobService$Wonderjs.create(/* () */0),
          /* noWorkerJobRecord */undefined,
          /* workerJobRecord */undefined,
          /* renderConfigRecord */undefined,
          /* gpuDetectRecord */RecordGPUDetectService$Wonderjs.create(/* () */0),
          /* sourceInstanceRecord */undefined,
          /* objectInstanceRecord */RecordObjectInstanceService$Wonderjs.create(/* () */0),
          /* viewRecord */RecordViewService$Wonderjs.create(/* () */0),
          /* deviceManagerRecord */RecordDeviceManagerService$Wonderjs.create(/* () */0),
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
          /* directionLightRecord */undefined,
          /* pointLightRecord */undefined,
          /* geometryRecord */undefined,
          /* meshRendererRecord */undefined,
          /* arcballCameraControllerRecord */RecordArcballCameraControllerService$Wonderjs.create(/* () */0),
          /* scriptRecord */RecordScriptMainService$Wonderjs.create(/* () */0),
          /* shaderRecord */RecordShaderService$Wonderjs.create(/* () */0),
          /* glslRecord */RecordGLSLService$Wonderjs.create(/* () */0),
          /* programRecord */RecordProgramService$Wonderjs.create(/* () */0),
          /* glslLocationRecord */RecordGLSLLocationService$Wonderjs.create(/* () */0),
          /* glslSenderRecord */RecordGLSLSenderAllService$Wonderjs.create(/* () */0),
          /* glslChunkRecord */ShaderChunkSystem$Wonderjs.create(/* () */0),
          /* renderRecord */undefined,
          /* timeControllerRecord */RecordTimeControllerService$Wonderjs.create(/* () */0),
          /* vboBufferRecord */RecordVboBufferService$Wonderjs.create(/* () */0),
          /* globalTempRecord */RecordGlobalTempService$Wonderjs.create(/* () */0),
          /* typeArrayPoolRecord */RecordTypeArrayPoolService$Wonderjs.create(/* () */0),
          /* workerInstanceRecord */RecordWorkerInstanceService$Wonderjs.create(/* () */0),
          /* workerDataRecord */RecordWorkerDataService$Wonderjs.create(/* () */0),
          /* workerDetectRecord */RecordWorkerDetectService$Wonderjs.create(/* () */0),
          /* browserDetectRecord */RecordBrowserDetectAllService$Wonderjs.create(/* () */0),
          /* eventRecord */RecordEventMainService$Wonderjs.create(/* () */0),
          /* imguiRecord */RecordIMGUIMainService$Wonderjs.create(/* () */0),
          /* apiRecord */RecordAPIMainService$Wonderjs.create(/* () */0),
          /* jobDataRecord */RecordJobDataService$Wonderjs.create(/* () */0),
          /* assetBundleRecord */RecordAssetBundleMainService$Wonderjs.create(/* () */0)
        ];
}

export {
  createState ,
  
}
/* RecordAPIMainService-Wonderjs Not a pure module */
