

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as WorkerJobTool$Wonderjs from "../../../../tool/service/workerJob/WorkerJobTool.js";
import * as SettingWorkerTool$Wonderjs from "../SettingWorkerTool.js";
import * as TestMainWorkerTool$Wonderjs from "../../job/main_worker/tool/TestMainWorkerTool.js";

function _buildFakeContext(sandbox, param) {
  var getImageData = Sinon.returns({
        data: {
          buffer: param[11]
        }
      }, Sinon.onCall(11, Sinon.returns({
                data: {
                  buffer: param[10]
                }
              }, Sinon.onCall(10, Sinon.returns({
                        data: {
                          buffer: param[9]
                        }
                      }, Sinon.onCall(9, Sinon.returns({
                                data: {
                                  buffer: param[8]
                                }
                              }, Sinon.onCall(8, Sinon.returns({
                                        data: {
                                          buffer: param[7]
                                        }
                                      }, Sinon.onCall(7, Sinon.returns({
                                                data: {
                                                  buffer: param[6]
                                                }
                                              }, Sinon.onCall(6, Sinon.returns({
                                                        data: {
                                                          buffer: param[5]
                                                        }
                                                      }, Sinon.onCall(5, Sinon.returns({
                                                                data: {
                                                                  buffer: param[4]
                                                                }
                                                              }, Sinon.onCall(4, Sinon.returns({
                                                                        data: {
                                                                          buffer: param[3]
                                                                        }
                                                                      }, Sinon.onCall(3, Sinon.returns({
                                                                                data: {
                                                                                  buffer: param[2]
                                                                                }
                                                                              }, Sinon.onCall(2, Sinon.returns({
                                                                                        data: {
                                                                                          buffer: param[1]
                                                                                        }
                                                                                      }, Sinon.onCall(1, Sinon.returns({
                                                                                                data: {
                                                                                                  buffer: param[0]
                                                                                                }
                                                                                              }, Sinon.onCall(0, Sinon.createEmptyStubWithJsObjSandbox(sandbox)))))))))))))))))))))))));
  return {
          drawImage: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
          getImageData: getImageData
        };
}

function _buildFakeCanvas(sandbox, context) {
  return Curry._1(SettingWorkerTool$Wonderjs.addTransferControlToOffscreen, {
              width: 0,
              height: 0,
              style: {
                left: "",
                top: "",
                width: "",
                height: "",
                position: "static"
              },
              getContext: Sinon.returns(context, Sinon.createEmptyStubWithJsObjSandbox(sandbox))
            });
}

function prepareState(sandbox, param) {
  var context = _buildFakeContext(sandbox, /* tuple */[
        param[0],
        param[1],
        param[2],
        param[3],
        param[4],
        param[5],
        param[6],
        param[7],
        param[8],
        param[9],
        param[10],
        param[11]
      ]);
  SettingTool$Wonderjs.buildFakeCanvasForNotPassCanvasIdWithCanvas(sandbox, _buildFakeCanvas(sandbox, context));
  var state = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, WorkerJobTool$Wonderjs.buildWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
  return /* tuple */[
          state,
          context
        ];
}

export {
  _buildFakeContext ,
  _buildFakeCanvas ,
  prepareState ,
  
}
/* Sinon Not a pure module */
