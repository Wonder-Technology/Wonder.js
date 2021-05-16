

import * as ManageIMGUIAPI$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ManageIMGUIAPI.js";
import * as ShaderChunkSystem$Wonderjs from "../../../../glsl/ShaderChunkSystem.js";
import * as RecordAllGLSLService$Wonderjs from "../../../record/all/glsl/RecordAllGLSLService.js";
import * as RecordAllShaderService$Wonderjs from "../../../record/all/shader/RecordAllShaderService.js";
import * as RecordVboBufferService$Wonderjs from "../../../record/main/vboBuffer/RecordVboBufferService.js";
import * as RecordAllJobDataService$Wonderjs from "../../../record/all/jobData/RecordAllJobDataService.js";
import * as RecordAllProgramService$Wonderjs from "../../../record/all/program/RecordAllProgramService.js";
import * as RecordAllGlobalTempService$Wonderjs from "../../../record/all/globalTemp/RecordAllGlobalTempService.js";
import * as RecordGLSLSenderAllService$Wonderjs from "../../all/sender/RecordGLSLSenderAllService.js";
import * as RecordTypeArrayPoolService$Wonderjs from "../../../record/main/typeArrayPool/RecordTypeArrayPoolService.js";
import * as RecordAPIRenderWorkerService$Wonderjs from "../api/RecordAPIRenderWorkerService.js";
import * as RecordAllGLSLLocationService$Wonderjs from "../../../record/all/location/RecordAllGLSLLocationService.js";
import * as RecordAllDeviceManagerService$Wonderjs from "../../../record/all/device/RecordAllDeviceManagerService.js";
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
          /* deviceManagerRecord */RecordAllDeviceManagerService$Wonderjs.create(/* () */0),
          /* shaderRecord */RecordAllShaderService$Wonderjs.create(/* () */0),
          /* programRecord */RecordAllProgramService$Wonderjs.create(/* () */0),
          /* glslRecord */RecordAllGLSLService$Wonderjs.create(/* () */0),
          /* glslSenderRecord */RecordGLSLSenderAllService$Wonderjs.create(/* () */0),
          /* glslLocationRecord */RecordAllGLSLLocationService$Wonderjs.create(/* () */0),
          /* glslChunkRecord */ShaderChunkSystem$Wonderjs.create(/* () */0),
          /* sourceInstanceRecord */RecordRenderWorkerSourceInstanceService$Wonderjs.create(/* () */0),
          /* basicMaterialRecord */undefined,
          /* lightMaterialRecord */undefined,
          /* meshRendererRecord */undefined,
          /* basicSourceTextureRecord */undefined,
          /* arrayBufferViewSourceTextureRecord */undefined,
          /* cubemapTextureRecord */undefined,
          /* allTextureRecord */undefined,
          /* transformRecord */undefined,
          /* geometryRecord */undefined,
          /* directionLightRecord */undefined,
          /* pointLightRecord */undefined,
          /* renderRecord */RecordRenderWorkerRenderService$Wonderjs.create(/* () */0),
          /* typeArrayPoolRecord */RecordTypeArrayPoolService$Wonderjs.create(/* () */0),
          /* vboBufferRecord */RecordVboBufferService$Wonderjs.create(/* () */0),
          /* globalTempRecord */RecordAllGlobalTempService$Wonderjs.create(/* () */0),
          /* workerDetectRecord */undefined,
          /* browserDetectRecord */undefined,
          /* imguiRecord */ManageIMGUIAPI$WonderImgui.createRecord(/* () */0),
          /* apiRecord */RecordAPIRenderWorkerService$Wonderjs.create(/* () */0),
          /* customRecord */RecordRenderWorkerCustomService$Wonderjs.create(/* () */0),
          /* jobDataRecord */RecordAllJobDataService$Wonderjs.create(/* () */0)
        ];
}

export {
  createState ,
  
}
/* ManageIMGUIAPI-WonderImgui Not a pure module */
