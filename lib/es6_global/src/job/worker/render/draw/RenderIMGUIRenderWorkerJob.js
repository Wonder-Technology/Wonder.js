

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as OptionService$Wonderjs from "../../../../service/atom/OptionService.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as SerializeService$Wonderjs from "../../../../service/atom/SerializeService.js";
import * as ManageIMGUIAPI$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ManageIMGUIAPI.js";
import * as DeviceManagerService$Wonderjs from "../../../../service/record/all/device/DeviceManagerService.js";
import * as ManageIMGUIService$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/ManageIMGUIService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as RecordAPIRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/api/RecordAPIRenderWorkerService.js";
import * as ManageIMGUIRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/imgui/ManageIMGUIRenderWorkerService.js";
import * as RecordIMGUIRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/imgui/RecordIMGUIRenderWorkerService.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var imguiData = data.imguiData;
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(imguiData.imguiFunc) || OptionService$Wonderjs.isJsonSerializedValueNone(imguiData.customData);
                var imguiRecord = match ? RecordIMGUIRenderWorkerService$Wonderjs.getRecord(state) : ManageIMGUIAPI$WonderImgui.setIMGUIFunc(SerializeService$Wonderjs.deserializeValueWithFunction(OptionService$Wonderjs.unsafeGetJsonSerializedValue(imguiData.customData)), SerializeService$Wonderjs.deserializeFunction(OptionService$Wonderjs.unsafeGetJsonSerializedValue(imguiData.imguiFunc)), RecordIMGUIRenderWorkerService$Wonderjs.getRecord(state));
                state[/* imguiRecord */27] = imguiRecord;
                var state$1 = ManageIMGUIService$WonderImgui.render(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]), imguiData.ioData, RecordAPIRenderWorkerService$Wonderjs.getIMGUIAPIJsObj(state), /* tuple */[
                      ManageIMGUIRenderWorkerService$Wonderjs.getRecord,
                      ManageIMGUIRenderWorkerService$Wonderjs.setRecord
                    ], state);
                StateRenderWorkerService$Wonderjs.setState(stateData, state$1);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
