

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as ArrayService$Wonderjs from "../../../../service/atom/ArrayService.js";
import * as WorkerService$Wonderjs from "../../../../service/primitive/worker/WorkerService.js";
import * as JobConfigUtils$Wonderjs from "../../utils/JobConfigUtils.js";
import * as SerializeService$Wonderjs from "../../../../service/atom/SerializeService.js";
import * as ManageIMGUIAPI$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ManageIMGUIAPI.js";
import * as IOIMGUIMainService$Wonderjs from "../../../../service/state/main/imgui/IOIMGUIMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../../service/record/main/setting/BufferSettingService.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as WorkerInstanceService$Wonderjs from "../../../../service/record/main/workerInstance/WorkerInstanceService.js";
import * as ManageIMGUIMainService$Wonderjs from "../../../../service/state/main/imgui/ManageIMGUIMainService.js";
import * as RecordIMGUIMainService$Wonderjs from "../../../../service/state/main/imgui/RecordIMGUIMainService.js";
import * as InitBasicMaterialService$Wonderjs from "../../../../service/record/main/material/basic/InitBasicMaterialService.js";
import * as InitLightMaterialService$Wonderjs from "../../../../service/record/main/material/light/InitLightMaterialService.js";
import * as JudgeInstanceMainService$Wonderjs from "../../../../service/state/main/instance/JudgeInstanceMainService.js";
import * as OperateRenderMainService$Wonderjs from "../../../../service/state/main/render/OperateRenderMainService.js";
import * as PositionLightMainService$Wonderjs from "../../../../service/state/main/light/PositionLightMainService.js";
import * as RecordGeometryMainService$Wonderjs from "../../../../service/state/main/geometry/RecordGeometryMainService.js";
import * as RecordPointLightMainService$Wonderjs from "../../../../service/state/main/light/point/RecordPointLightMainService.js";
import * as AmbientLightSceneMainService$Wonderjs from "../../../../service/state/main/scene/AmbientLightSceneMainService.js";
import * as InitSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/InitSourceTextureMainService.js";
import * as OperateWorkerDataMainService$Wonderjs from "../../../../service/state/main/workerData/OperateWorkerDataMainService.js";
import * as PositionPointLightMainService$Wonderjs from "../../../../service/state/main/light/point/PositionPointLightMainService.js";
import * as RenderArrayPointLightServivce$Wonderjs from "../../../../service/record/main/light/point/RenderArrayPointLightServivce.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../../../../service/state/main/material/basic/RecordBasicMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../../../service/state/main/material/light/RecordLightMaterialMainService.js";
import * as OperateSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/OperateSourceTextureMainService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../../../../service/state/main/light/direction/RecordDirectionLightMainService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "../../../../service/state/main/instance/RecordSourceInstanceMainService.js";
import * as RenderArrayDirectionLightServivce$Wonderjs from "../../../../service/record/main/light/direction/RenderArrayDirectionLightServivce.js";
import * as DirectionDirectionLightMainService$Wonderjs from "../../../../service/state/main/light/direction/DirectionDirectionLightMainService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/basic_source/RecordBasicSourceTextureMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function _buildMaterialData(materialArrayForWorkerInit, gameObjectsMap, gameObjectRecord) {
  return ArrayService$WonderCommonlib.removeDuplicateItems(materialArrayForWorkerInit).reduce((function (arr, materialIndex) {
                return ArrayService$Wonderjs.push(/* tuple */[
                            materialIndex,
                            JudgeInstanceMainService$Wonderjs.isSourceInstance(materialIndex, gameObjectsMap, gameObjectRecord)
                          ], arr);
              }), /* array */[]);
}

function _removeAddedSourceDataDuplicateItems(needAddedSourceDataArray) {
  return ArrayService$Wonderjs.removeDuplicateItems((function (param) {
                return param[0].toString();
              }), needAddedSourceDataArray);
}

function _buildIMGUIData(state) {
  var wonderImguiIMGUIRecord = RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state);
  var ioData = RecordIMGUIMainService$Wonderjs.getIOData(state);
  var match = ManageIMGUIMainService$Wonderjs.isSetIMGUIFuncInRenderWorkerForWorker(state);
  if (match) {
    return /* tuple */[
            state,
            {
              ioData: ioData,
              customData: undefined,
              imguiFunc: undefined
            }
          ];
  } else {
    var match$1 = ManageIMGUIAPI$WonderImgui.getCustomData(wonderImguiIMGUIRecord);
    var match$2 = ManageIMGUIAPI$WonderImgui.getIMGUIFunc(wonderImguiIMGUIRecord);
    return /* tuple */[
            ManageIMGUIMainService$Wonderjs.markSetIMGUIFuncInRenderWorkerForWorker(state),
            {
              ioData: ioData,
              customData: match$1 !== undefined ? Caml_option.some(SerializeService$Wonderjs.serializeValueWithFunction(Caml_option.valFromOption(match$1))) : undefined,
              imguiFunc: match$2 !== undefined ? Caml_option.some(SerializeService$Wonderjs.serializeFunction(Caml_option.valFromOption(match$2))) : undefined
            }
          ];
  }
}

function _buildData(operateType, state) {
  var settingRecord = state[/* settingRecord */0];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(state);
  var basicRenderObjectRecord = OperateRenderMainService$Wonderjs.unsafeGetBasicRenderObjectRecord(state);
  var lightRenderObjectRecord = OperateRenderMainService$Wonderjs.unsafeGetLightRenderObjectRecord(state);
  var directionLightRecord = RecordDirectionLightMainService$Wonderjs.getRecord(state);
  var pointLightRecord = RecordPointLightMainService$Wonderjs.getRecord(state);
  var sourceInstanceRecord = RecordSourceInstanceMainService$Wonderjs.getRecord(state);
  var basicSourceTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  var arrayBufferViewSourceTextureRecord = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  var cameraData = OperateRenderMainService$Wonderjs.getCameraRecord(state);
  Js_option.isSome(cameraData);
  var match = OperateRenderMainService$Wonderjs.getCameraRecord(state);
  var match$1;
  if (match !== undefined) {
    var match$2 = match;
    match$1 = /* tuple */[
      true,
      {
        vMatrix: match$2[/* vMatrix */0],
        pMatrix: match$2[/* pMatrix */1],
        position: match$2[/* position */2]
      }
    ];
  } else {
    match$1 = /* tuple */[
      false,
      null
    ];
  }
  var match$3 = _buildIMGUIData(state);
  var state$1 = match$3[0];
  return /* tuple */[
          state$1,
          {
            operateType: operateType,
            ambientLightData: {
              color: AmbientLightSceneMainService$Wonderjs.getAmbientLightColor(state$1)
            },
            directionLightData: {
              index: directionLightRecord[/* index */0],
              directionMap: DirectionDirectionLightMainService$Wonderjs.buildDirectionMap(DirectionDirectionLightMainService$Wonderjs.getDirection, state$1),
              renderLightArr: RenderArrayDirectionLightServivce$Wonderjs.getRenderLightArr(directionLightRecord)
            },
            pointLightData: {
              index: pointLightRecord[/* index */0],
              positionMap: PositionLightMainService$Wonderjs.buildPositionMap(PositionPointLightMainService$Wonderjs.getPosition, state$1),
              renderLightArr: RenderArrayPointLightServivce$Wonderjs.getRenderLightArr(pointLightRecord)
            },
            initData: {
              materialData: {
                basicMaterialData: {
                  materialDataForWorkerInit: _buildMaterialData(basicMaterialRecord[/* materialArrayForWorkerInit */13], basicMaterialRecord[/* gameObjectsMap */10], gameObjectRecord)
                },
                lightMaterialData: {
                  materialDataForWorkerInit: _buildMaterialData(lightMaterialRecord[/* materialArrayForWorkerInit */16], lightMaterialRecord[/* gameObjectsMap */13], gameObjectRecord)
                }
              },
              textureData: {
                basicSourceTextureData: {
                  needAddedImageDataArray: OperateBasicSourceTextureMainService$Wonderjs.convertNeedAddedSourceArrayToImageDataArr(_removeAddedSourceDataDuplicateItems(basicSourceTextureRecord[/* needAddedSourceArray */13])),
                  needInitedTextureIndexArray: ArrayService$WonderCommonlib.removeDuplicateItems(basicSourceTextureRecord[/* needInitedTextureIndexArray */14])
                },
                arrayBufferViewSourceTextureData: {
                  needAddedSourceArray: _removeAddedSourceDataDuplicateItems(arrayBufferViewSourceTextureRecord[/* needAddedSourceArray */15]),
                  needInitedTextureIndexArray: ArrayService$WonderCommonlib.removeDuplicateItems(arrayBufferViewSourceTextureRecord[/* needInitedTextureIndexArray */16])
                }
              }
            },
            renderData: {
              isRender: match$1[0],
              camera: match$1[1],
              geometryData: {
                indicesTypeMap: geometryRecord[/* indicesTypeMap */17]
              },
              basic: {
                buffer: basicRenderObjectRecord[/* buffer */0],
                renderIndexArray: basicRenderObjectRecord[/* renderIndexArray */1],
                bufferCount: BufferSettingService$Wonderjs.getBasicMaterialCount(settingRecord)
              },
              light: {
                buffer: lightRenderObjectRecord[/* buffer */0],
                renderIndexArray: lightRenderObjectRecord[/* renderIndexArray */1],
                bufferCount: BufferSettingService$Wonderjs.getLightMaterialCount(settingRecord)
              },
              sourceInstance: {
                objectInstanceTransformIndexMap: sourceInstanceRecord[/* objectInstanceTransformIndexMap */1]
              }
            },
            imguiData: match$3[1],
            customData: OperateWorkerDataMainService$Wonderjs.getMainWorkerCustomData(state$1)
          }
        ];
}

function _clearData(state) {
  InitBasicMaterialService$Wonderjs.clearDataForWorkerInit(RecordBasicMaterialMainService$Wonderjs.getRecord(state));
  InitLightMaterialService$Wonderjs.clearDataForWorkerInit(RecordLightMaterialMainService$Wonderjs.getRecord(state));
  return IOIMGUIMainService$Wonderjs.resetPointEventStateWhenPointUp(InitSourceTextureMainService$Wonderjs.clearNeedInitedTextureIndexArray(OperateSourceTextureMainService$Wonderjs.clearNeedAddedSourceArr(state)));
}

function execJob(flags, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                var workerInstanceRecord = state[/* workerInstanceRecord */37];
                var operateType = JobConfigUtils$Wonderjs.getOperateType(flags);
                var match = _buildData(operateType, state);
                WorkerService$Wonderjs.postMessage(match[1], WorkerInstanceService$Wonderjs.unsafeGetRenderWorker(workerInstanceRecord));
                var state$1 = _clearData(match[0]);
                StateDataMainService$Wonderjs.setState(stateData, state$1);
                return Caml_option.some(operateType);
              }));
}

export {
  _buildMaterialData ,
  _removeAddedSourceDataDuplicateItems ,
  _buildIMGUIData ,
  _buildData ,
  _clearData ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
