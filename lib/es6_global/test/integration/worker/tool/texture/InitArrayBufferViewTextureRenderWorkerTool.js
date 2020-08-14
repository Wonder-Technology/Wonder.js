

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as WorkerJobTool$Wonderjs from "../../../../tool/service/workerJob/WorkerJobTool.js";
import * as SettingWorkerTool$Wonderjs from "../SettingWorkerTool.js";
import * as TestMainWorkerTool$Wonderjs from "../../job/main_worker/tool/TestMainWorkerTool.js";

function _buildFakeCanvas(sandbox) {
  return Curry._1(SettingWorkerTool$Wonderjs.addTransferControlToOffscreen, {
              width: 0,
              height: 0,
              style: {
                left: "",
                top: "",
                width: "",
                height: "",
                position: "static"
              }
            });
}

function prepareState(sandbox) {
  SettingTool$Wonderjs.buildFakeCanvasForNotPassCanvasIdWithCanvas(sandbox, _buildFakeCanvas(sandbox));
  return TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, WorkerJobTool$Wonderjs.buildWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
}

export {
  _buildFakeCanvas ,
  prepareState ,
  
}
/* SettingTool-Wonderjs Not a pure module */
