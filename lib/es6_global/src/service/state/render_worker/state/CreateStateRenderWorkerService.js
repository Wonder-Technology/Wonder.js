

import * as ManageIMGUIAPI$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ManageIMGUIAPI.js";
import * as RecordGLSLService$Wonderjs from "../../../record/all/glsl/RecordGLSLService.js";
import * as ShaderChunkSystem$Wonderjs from "../../../../glsl/ShaderChunkSystem.js";
import * as RecordShaderService$Wonderjs from "../../../record/all/shader/RecordShaderService.js";
import * as RecordJobDataService$Wonderjs from "../../../record/all/jobData/RecordJobDataService.js";
import * as RecordProgramService$Wonderjs from "../../../record/all/program/RecordProgramService.js";
import * as RecordVboBufferService$Wonderjs from "../../../record/main/vboBuffer/RecordVboBufferService.js";
import * as RecordGlobalTempService$Wonderjs from "../../../record/all/globalTemp/RecordGlobalTempService.js";
import * as RecordGLSLLocationService$Wonderjs from "../../../record/all/location/RecordGLSLLocationService.js";
import * as RecordDeviceManagerService$Wonderjs from "../../../record/all/device/RecordDeviceManagerService.js";
import * as RecordGLSLSenderAllService$Wonderjs from "../../all/sender/RecordGLSLSenderAllService.js";
import * as RecordTypeArrayPoolService$Wonderjs from "../../../record/main/typeArrayPool/RecordTypeArrayPoolService.js";
import * as RecordAPIRenderWorkerService$Wonderjs from "../api/RecordAPIRenderWorkerService.js";
import * as RecordRenderWorkerSceneService$Wonderjs from "../../../record/render_worker/scene/RecordRenderWorkerSceneService.js";
import * as RecordRenderWorkerCustomService$Wonderjs from "../../../record/render_worker/custom/RecordRenderWorkerCustomService.js";
import * as RecordRenderWorkerRenderService$Wonderjs from "../../../record/render_worker/render/RecordRenderWorkerRenderService.js";
import * as RecordRenderWorkerSettingService$Wonderjs from "../../../record/render_worker/setting/RecordRenderWorkerSettingService.js";
import * as RecordRenderWorkerSourceInstanceService$Wonderjs from "../../../record/render_worker/instance/RecordRenderWorkerSourceInstanceService.js";

function createState(param) {
  return /* record */[
          /* sceneRecord */RecordRenderWorkerSceneService$Wonderjs.create(/* () */0),
          /* settingRecord */RecordRenderWorkerSettingService$Wonderjs.create(/* () */0),
          /* renderConfigRecord */undefined,
          /* gpuDetectRecord : record */[
            /* extensionInstancedArrays */undefined,
            /* extensionElementIndexUint */undefined,
            /* precision */undefined,
            /* maxTextureUnit */undefined
          ],
          /* deviceManagerRecord */RecordDeviceManagerService$Wonderjs.create(/* () */0),
          /* shaderRecord */RecordShaderService$Wonderjs.create(/* () */0),
          /* programRecord */RecordProgramService$Wonderjs.create(/* () */0),
          /* glslRecord */RecordGLSLService$Wonderjs.create(/* () */0),
          /* glslSenderRecord */RecordGLSLSenderAllService$Wonderjs.create(/* () */0),
          /* glslLocationRecord */RecordGLSLLocationService$Wonderjs.create(/* () */0),
          /* glslChunkRecord */ShaderChunkSystem$Wonderjs.create(/* () */0),
          /* sourceInstanceRecord */RecordRenderWorkerSourceInstanceService$Wonderjs.create(/* () */0),
          /* basicMaterialRecord */undefined,
          /* lightMaterialRecord */undefined,
          /* meshRendererRecord */undefined,
          /* basicSourceTextureRecord */undefined,
          /* arrayBufferViewSourceTextureRecord */undefined,
          /* transformRecord */undefined,
          /* geometryRecord */undefined,
          /* directionLightRecord */undefined,
          /* pointLightRecord */undefined,
          /* renderRecord */RecordRenderWorkerRenderService$Wonderjs.create(/* () */0),
          /* typeArrayPoolRecord */RecordTypeArrayPoolService$Wonderjs.create(/* () */0),
          /* vboBufferRecord */RecordVboBufferService$Wonderjs.create(/* () */0),
          /* globalTempRecord */RecordGlobalTempService$Wonderjs.create(/* () */0),
          /* workerDetectRecord */undefined,
          /* browserDetectRecord */undefined,
          /* imguiRecord */ManageIMGUIAPI$WonderImgui.createRecord(/* () */0),
          /* apiRecord */RecordAPIRenderWorkerService$Wonderjs.create(/* () */0),
          /* customRecord */RecordRenderWorkerCustomService$Wonderjs.create(/* () */0),
          /* jobDataRecord */RecordJobDataService$Wonderjs.create(/* () */0)
        ];
}

export {
  createState ,
  
}
/* ManageIMGUIAPI-WonderImgui Not a pure module */
