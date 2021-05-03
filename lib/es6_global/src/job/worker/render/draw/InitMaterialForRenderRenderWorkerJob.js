

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AllDeviceManagerService$Wonderjs from "../../../../service/record/all/device/AllDeviceManagerService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as InitInitBasicMaterialService$Wonderjs from "../../../../service/state/init_shader/init_material/init_basicMaterial/material/InitInitBasicMaterialService.js";
import * as InitInitLightMaterialService$Wonderjs from "../../../../service/state/init_shader/init_material/init_lightMaterial/material/InitInitLightMaterialService.js";
import * as JudgeInstanceRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/instance/JudgeInstanceRenderWorkerService.js";
import * as RecordBasicMaterialRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/material/basic/RecordBasicMaterialRenderWorkerService.js";
import * as RecordLightMaterialRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/material/light/RecordLightMaterialRenderWorkerService.js";
import * as CreateInitBasicMaterialStateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/material/basic/CreateInitBasicMaterialStateRenderWorkerService.js";
import * as CreateInitLightMaterialStateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/material/light/CreateInitLightMaterialStateRenderWorkerService.js";

function _initBasicMaterials(gl, basicMaterialData, isSupportInstance, state) {
  RecordBasicMaterialRenderWorkerService$Wonderjs.getRecord(state);
  ArrayService$WonderCommonlib.reduceOneParam((function (initBasicMaterialState, param) {
          return InitInitBasicMaterialService$Wonderjs.initMaterial(gl, /* tuple */[
                      param[0],
                      param[1],
                      isSupportInstance
                    ], initBasicMaterialState);
        }), CreateInitBasicMaterialStateRenderWorkerService$Wonderjs.createInitMaterialState(state), basicMaterialData.materialDataForWorkerInit);
  return state;
}

function _initLightMaterials(gl, lightMaterialData, isSupportInstance, state) {
  RecordLightMaterialRenderWorkerService$Wonderjs.getRecord(state);
  ArrayService$WonderCommonlib.reduceOneParam((function (initLightMaterialState, param) {
          return InitInitLightMaterialService$Wonderjs.initMaterial(gl, /* tuple */[
                      param[0],
                      param[1],
                      isSupportInstance
                    ], initLightMaterialState);
        }), CreateInitLightMaterialStateRenderWorkerService$Wonderjs.createInitMaterialState(state), lightMaterialData.materialDataForWorkerInit);
  return state;
}

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var initData = data.initData;
                initData.materialData;
                var basicMaterialData = data.initData.materialData.basicMaterialData;
                var lightMaterialData = data.initData.materialData.lightMaterialData;
                var gl = AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]);
                var isSupportInstance = JudgeInstanceRenderWorkerService$Wonderjs.isSupportInstance(state);
                StateRenderWorkerService$Wonderjs.setState(stateData, _initLightMaterials(gl, lightMaterialData, isSupportInstance, _initBasicMaterials(gl, basicMaterialData, isSupportInstance, state)));
                return e;
              }));
}

export {
  _initBasicMaterials ,
  _initLightMaterials ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
