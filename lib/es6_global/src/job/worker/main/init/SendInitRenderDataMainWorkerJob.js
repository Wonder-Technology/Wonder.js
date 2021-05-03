

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as ViewService$Wonderjs from "../../../../service/record/main/device/ViewService.js";
import * as ScreenService$Wonderjs from "../../../../service/primitive/device/ScreenService.js";
import * as StateDataMain$Wonderjs from "../../../../service/state/main/data/StateDataMain.js";
import * as WorkerService$Wonderjs from "../../../../service/primitive/worker/WorkerService.js";
import * as JobConfigUtils$Wonderjs from "../../utils/JobConfigUtils.js";
import * as AssetIMGUIAPI$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/AssetIMGUIAPI.js";
import * as IsDebugMainService$Wonderjs from "../../../../service/state/main/state/IsDebugMainService.js";
import * as BufferSettingService$Wonderjs from "../../../../service/record/main/setting/BufferSettingService.js";
import * as CopyTransformService$Wonderjs from "../../../../service/record/main/transform/CopyTransformService.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as OperateSettingService$Wonderjs from "../../../../service/record/main/setting/OperateSettingService.js";
import * as WorkerInstanceService$Wonderjs from "../../../../service/record/main/workerInstance/WorkerInstanceService.js";
import * as AssetIMGUIMainServiice$Wonderjs from "../../../../service/state/main/imgui/AssetIMGUIMainServiice.js";
import * as ManageIMGUIMainService$Wonderjs from "../../../../service/state/main/imgui/ManageIMGUIMainService.js";
import * as RecordIMGUIMainService$Wonderjs from "../../../../service/state/main/imgui/RecordIMGUIMainService.js";
import * as WorkerDetectMainService$Wonderjs from "../../../../service/state/main/workerDetect/WorkerDetectMainService.js";
import * as JudgeInstanceMainService$Wonderjs from "../../../../service/state/main/instance/JudgeInstanceMainService.js";
import * as RecordGeometryMainService$Wonderjs from "../../../../service/state/main/geometry/RecordGeometryMainService.js";
import * as GetDataRenderConfigService$Wonderjs from "../../../../service/record/all/renderConfig/GetDataRenderConfigService.js";
import * as RecordTransformMainService$Wonderjs from "../../../../service/state/main/transform/RecordTransformMainService.js";
import * as RecordPointLightMainService$Wonderjs from "../../../../service/state/main/light/point/RecordPointLightMainService.js";
import * as InitSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/source/InitSourceTextureMainService.js";
import * as InitCubemapTextureMainService$Wonderjs from "../../../../service/state/main/texture/cubemap/InitCubemapTextureMainService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../../../../service/state/main/meshRenderer/RecordMeshRendererMainService.js";
import * as RecordRenderConfigMainService$Wonderjs from "../../../../service/state/main/renderConfig/RecordRenderConfigMainService.js";
import * as RenderArrayPointLightServivce$Wonderjs from "../../../../service/record/main/light/point/RenderArrayPointLightServivce.js";
import * as ExtendIMGUIRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/imgui/ExtendIMGUIRenderWorkerService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../../../../service/state/main/material/basic/RecordBasicMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../../../service/state/main/material/light/RecordLightMaterialMainService.js";
import * as RecordSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/source/RecordSourceTextureMainService.js";
import * as OperateSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/source/OperateSourceTextureMainService.js";
import * as RecordCubemapTextureMainService$Wonderjs from "../../../../service/state/main/texture/cubemap/RecordCubemapTextureMainService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../../../../service/state/main/light/direction/RecordDirectionLightMainService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "../../../../service/state/main/instance/RecordSourceInstanceMainService.js";
import * as OperateCubemapTextureMainService$Wonderjs from "../../../../service/state/main/texture/cubemap/OperateCubemapTextureMainService.js";
import * as RenderArrayDirectionLightServivce$Wonderjs from "../../../../service/record/main/light/direction/RenderArrayDirectionLightServivce.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/source/basic_source/RecordBasicSourceTextureMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/source/basic_source/OperateBasicSourceTextureMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/source/arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function _buildMaterialData(buffer, index, disposedIndexArray, isSourceInstanceMap) {
  return {
          buffer: buffer,
          index: index,
          disposedIndexArray: disposedIndexArray,
          isSourceInstanceMap: isSourceInstanceMap
        };
}

function _buildTextureData(state) {
  Contract$WonderLog.requireCheck((function (param) {
          var basicSourceTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
          var needInitedTextureIndexArray = basicSourceTextureRecord[/* needInitedTextureIndexArray */13];
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("basicSourceTextureRecord->needInitedTextureIndexArray should be empty", "is " + (String(needInitedTextureIndexArray) + "")), (function (param) {
                  return Contract$WonderLog.Operators[/* = */0](needInitedTextureIndexArray.length, 0);
                }));
          var arrayBufferViewSourceTextureRecord = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
          var needInitedTextureIndexArray$1 = arrayBufferViewSourceTextureRecord[/* needInitedTextureIndexArray */15];
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("arrayBufferViewSourceTextureRecord->needInitedTextureIndexArray should be empty", "is " + (String(needInitedTextureIndexArray$1) + "")), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](needInitedTextureIndexArray$1.length, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var sourceTextureRecord = RecordSourceTextureMainService$Wonderjs.getRecord(state);
  var basicSourceTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  var arrayBufferViewSourceTextureRecord = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  var cubemapTextureRecord = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return {
          sourceTextureBuffer: sourceTextureRecord[/* buffer */0],
          basicSourceTextureData: {
            index: basicSourceTextureRecord[/* index */0],
            needAddedImageDataArray: OperateBasicSourceTextureMainService$Wonderjs.convertNeedAddedSourceArrayToImageDataArr(basicSourceTextureRecord[/* needAddedSourceArray */12])
          },
          arrayBufferViewSourceTextureData: {
            index: arrayBufferViewSourceTextureRecord[/* index */0],
            sourceMap: arrayBufferViewSourceTextureRecord[/* sourceMap */11]
          },
          cubemapTextureData: {
            buffer: cubemapTextureRecord[/* buffer */1],
            index: cubemapTextureRecord[/* index */0],
            needAddedPXImageDataArray: OperateCubemapTextureMainService$Wonderjs.convertNeedAddedSourceArrayToImageDataArr(cubemapTextureRecord[/* needAddedPXSourceArray */28]),
            needAddedNXImageDataArray: OperateCubemapTextureMainService$Wonderjs.convertNeedAddedSourceArrayToImageDataArr(cubemapTextureRecord[/* needAddedNXSourceArray */29]),
            needAddedPYImageDataArray: OperateCubemapTextureMainService$Wonderjs.convertNeedAddedSourceArrayToImageDataArr(cubemapTextureRecord[/* needAddedPYSourceArray */30]),
            needAddedNYImageDataArray: OperateCubemapTextureMainService$Wonderjs.convertNeedAddedSourceArrayToImageDataArr(cubemapTextureRecord[/* needAddedNYSourceArray */31]),
            needAddedPZImageDataArray: OperateCubemapTextureMainService$Wonderjs.convertNeedAddedSourceArrayToImageDataArr(cubemapTextureRecord[/* needAddedPZSourceArray */32]),
            needAddedNZImageDataArray: OperateCubemapTextureMainService$Wonderjs.convertNeedAddedSourceArrayToImageDataArr(cubemapTextureRecord[/* needAddedNZSourceArray */33])
          }
        };
}

function _getFntData(imguiRecord) {
  var match = AssetIMGUIAPI$WonderImgui.getFntData(imguiRecord);
  if (match !== undefined) {
    return JSON.stringify(match);
  }
  
}

function _buildIMGUIData(state) {
  var match = ManageIMGUIMainService$Wonderjs.getCanvasSize(state);
  var wonderImguiIMGUIRecord = RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state);
  return {
          canvasWidth: match[0],
          canvasHeight: match[1],
          fntData: _getFntData(wonderImguiIMGUIRecord),
          bitmapImageData: AssetIMGUIMainServiice$Wonderjs.convertBitmapToImageData(state),
          customTextureSourceDataArr: AssetIMGUIMainServiice$Wonderjs.convertCustomTextureSourcesToImageDataArr(state),
          extendData: {
            customControlData: {
              funcMap: Curry._1(ExtendIMGUIRenderWorkerService$Wonderjs.ExtendData[/* CustomControl */0][/* serializeFuncMap */0], state)
            },
            skinData: {
              allSkinDataMap: Curry._1(ExtendIMGUIRenderWorkerService$Wonderjs.ExtendData[/* Skin */1][/* serializeAllSkinDataMap */0], state)
            }
          }
        };
}

function _buildData(operateType, canvas, stateData) {
  var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
  var settingRecord = state[/* settingRecord */0];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = OperateSettingService$Wonderjs.unsafeGetGPU(settingRecord);
  var match$1 = OperateSettingService$Wonderjs.unsafeGetMemory(settingRecord);
  var buffer = BufferSettingService$Wonderjs.unsafeGetBuffer(settingRecord);
  var renderConfigRecord = RecordRenderConfigMainService$Wonderjs.getRecord(state);
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var directionLightRecord = RecordDirectionLightMainService$Wonderjs.getRecord(state);
  var pointLightRecord = RecordPointLightMainService$Wonderjs.getRecord(state);
  var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(state);
  var meshRendererRecord = RecordMeshRendererMainService$Wonderjs.getRecord(state);
  var sourceInstanceRecord = RecordSourceInstanceMainService$Wonderjs.getRecord(state);
  var match$2 = ScreenService$Wonderjs.queryFullScreenData(/* () */0);
  return {
          operateType: operateType,
          canvas: canvas,
          contextConfig: OperateSettingService$Wonderjs.unsafeGetContext(settingRecord),
          isDebug: IsDebugMainService$Wonderjs.getIsDebug(stateData),
          viewportData: /* array */[
            match$2[0],
            match$2[1],
            match$2[2],
            match$2[3]
          ],
          bufferData: {
            geometryPointCount: buffer[/* geometryPointCount */0],
            geometryCount: buffer[/* geometryCount */1],
            transformCount: buffer[/* transformCount */2],
            basicMaterialCount: buffer[/* basicMaterialCount */3],
            lightMaterialCount: buffer[/* lightMaterialCount */4],
            meshRendererCount: buffer[/* meshRendererCount */10],
            basicSourceTextureCount: buffer[/* basicSourceTextureCount */7],
            arrayBufferViewSourceTextureCount: buffer[/* arrayBufferViewSourceTextureCount */8],
            cubemapTextureCount: buffer[/* cubemapTextureCount */9],
            directionLightCount: buffer[/* directionLightCount */5],
            pointLightCount: buffer[/* pointLightCount */6]
          },
          gpuData: {
            useHardwareInstance: match[/* useHardwareInstance */0]
          },
          memoryData: {
            maxBigTypeArrayPoolSize: match$1[/* maxBigTypeArrayPoolSize */2]
          },
          instanceBufferData: {
            sourceInstanceCount: BufferSettingService$Wonderjs.getSourceInstanceCount(settingRecord),
            objectInstanceCountPerSourceInstance: BufferSettingService$Wonderjs.getObjectInstanceCountPerSourceInstance(settingRecord)
          },
          workerDetectData: {
            isUseWorker: WorkerDetectMainService$Wonderjs.isUseWorker(state)
          },
          browserDetectData: {
            browser: state[/* browserDetectRecord */42][/* browser */0]
          },
          renderConfigData: {
            shaders: JSON.stringify(GetDataRenderConfigService$Wonderjs.getShaders(renderConfigRecord)),
            shaderLibs: JSON.stringify(GetDataRenderConfigService$Wonderjs.getShaderLibs(renderConfigRecord))
          },
          transformData: {
            buffer: CopyTransformService$Wonderjs.unsafeGetCopiedBuffer(transformRecord)
          },
          basicMaterialData: _buildMaterialData(basicMaterialRecord[/* buffer */1], basicMaterialRecord[/* index */0], basicMaterialRecord[/* disposedIndexArray */8], JudgeInstanceMainService$Wonderjs.buildMap(basicMaterialRecord[/* index */0], RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* gameObjectsMap */7], gameObjectRecord)),
          lightMaterialData: _buildMaterialData(lightMaterialRecord[/* buffer */1], lightMaterialRecord[/* index */0], lightMaterialRecord[/* disposedIndexArray */12], JudgeInstanceMainService$Wonderjs.buildMap(lightMaterialRecord[/* index */0], RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* gameObjectsMap */11], gameObjectRecord)),
          geometryData: {
            buffer: geometryRecord[/* buffer */1],
            indicesTypeMap: geometryRecord[/* indicesTypeMap */17]
          },
          meshRendererData: {
            buffer: meshRendererRecord[/* buffer */1]
          },
          directionLightData: {
            buffer: directionLightRecord[/* buffer */1],
            index: directionLightRecord[/* index */0],
            renderLightArr: RenderArrayDirectionLightServivce$Wonderjs.getRenderLightArr(directionLightRecord)
          },
          pointLightData: {
            buffer: pointLightRecord[/* buffer */1],
            index: pointLightRecord[/* index */0],
            renderLightArr: RenderArrayPointLightServivce$Wonderjs.getRenderLightArr(pointLightRecord)
          },
          sourceInstanceData: {
            buffer: sourceInstanceRecord[/* buffer */2],
            objectInstanceTransformIndexMap: sourceInstanceRecord[/* objectInstanceTransformIndexMap */1]
          },
          textureData: _buildTextureData(state),
          imguiData: _buildIMGUIData(state)
        };
}

function _clearData(state) {
  return InitCubemapTextureMainService$Wonderjs.clearNeedInitedTextureIndexArray(InitSourceTextureMainService$Wonderjs.clearNeedInitedTextureIndexArray(OperateCubemapTextureMainService$Wonderjs.clearNeedAddedSourceArr(OperateSourceTextureMainService$Wonderjs.clearNeedAddedSourceArr(state))));
}

function execJob(flags, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                var viewRecord = state[/* viewRecord */8];
                var workerInstanceRecord = state[/* workerInstanceRecord */39];
                var operateType = JobConfigUtils$Wonderjs.getOperateType(flags);
                var offscreen = ViewService$Wonderjs.unsafeGetCanvas(viewRecord).transferControlToOffscreen();
                WorkerService$Wonderjs.postMessageWithTransferData(_buildData(operateType, offscreen, stateData), /* array */[offscreen], WorkerInstanceService$Wonderjs.unsafeGetRenderWorker(workerInstanceRecord));
                var state$1 = _clearData(state);
                StateDataMainService$Wonderjs.setState(stateData, state$1);
                return Caml_option.some(operateType);
              }));
}

export {
  _buildMaterialData ,
  _buildTextureData ,
  _getFntData ,
  _buildIMGUIData ,
  _buildData ,
  _clearData ,
  execJob ,
  
}
/* Log-WonderLog Not a pure module */
