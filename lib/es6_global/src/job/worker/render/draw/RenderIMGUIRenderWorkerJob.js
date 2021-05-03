

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as ExecIMGUIAPI$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ExecIMGUIAPI.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ManageIMGUIService$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/ManageIMGUIService.js";
import * as AllDeviceManagerService$Wonderjs from "../../../../service/record/all/device/AllDeviceManagerService.js";
import * as ExecDataAllIMGUIService$Wonderjs from "../../../../service/record/all/imgui/ExecDataAllIMGUIService.js";
import * as SerializeAllIMGUIService$Wonderjs from "../../../../service/record/all/imgui/SerializeAllIMGUIService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as RecordAPIRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/api/RecordAPIRenderWorkerService.js";
import * as ManageIMGUIRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/imgui/ManageIMGUIRenderWorkerService.js";
import * as RecordIMGUIRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/imgui/RecordIMGUIRenderWorkerService.js";

function _addAllExecFuncData(execFuncDataArr, imguiRecord) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (imguiRecord, param) {
                return ExecIMGUIAPI$WonderImgui.addExecFuncData(param[/* name */3], param[/* customData */1], param[/* execOrder */2], param[/* execFunc */0], imguiRecord);
              }), imguiRecord, SerializeAllIMGUIService$Wonderjs.Exec[/* deserializeExecFuncDataArrToWonderIMGUIType */3](execFuncDataArr));
}

function _updateExecData(execFuncDataArr, imguiRecord) {
  var match = ExecDataAllIMGUIService$Wonderjs.hasExecFuncData(execFuncDataArr);
  if (match) {
    return _addAllExecFuncData(execFuncDataArr, ExecIMGUIAPI$WonderImgui.clearExecFuncDataArr(imguiRecord));
  } else {
    return imguiRecord;
  }
}

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var imguiData = data.imguiData;
                var execFuncDataArr = imguiData.execFuncDataArr;
                var imguiRecord = _updateExecData(execFuncDataArr, RecordIMGUIRenderWorkerService$Wonderjs.getRecord(state));
                state[/* imguiRecord */29] = imguiRecord;
                var state$1 = ManageIMGUIService$WonderImgui.render(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]), imguiData.ioData, RecordAPIRenderWorkerService$Wonderjs.getIMGUIAPIJsObj(state), /* tuple */[
                      ManageIMGUIRenderWorkerService$Wonderjs.getRecord,
                      ManageIMGUIRenderWorkerService$Wonderjs.setRecord
                    ], state);
                StateRenderWorkerService$Wonderjs.setState(stateData, state$1);
                return e;
              }));
}

export {
  _addAllExecFuncData ,
  _updateExecData ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
