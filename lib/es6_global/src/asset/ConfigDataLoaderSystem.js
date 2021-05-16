

import * as Most from "most";
import * as Caml_array from "../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as MostUtils$Wonderjs from "./utils/MostUtils.js";
import * as FetchCommon$Wonderjs from "./FetchCommon.js";
import * as PathService$Wonderjs from "../service/atom/PathService.js";
import * as ArrayService$Wonderjs from "../service/atom/ArrayService.js";
import * as IsDebugMainService$Wonderjs from "../service/state/main/state/IsDebugMainService.js";
import * as ParseSettingService$Wonderjs from "../service/record/main/setting/ParseSettingService.js";
import * as StateDataMainService$Wonderjs from "../service/state/main/state/StateDataMainService.js";
import * as OperateSettingService$Wonderjs from "../service/record/main/setting/OperateSettingService.js";
import * as ParseWorkerJobService$Wonderjs from "../service/record/main/workerJob/ParseWorkerJobService.js";
import * as CreateStateMainService$Wonderjs from "../service/state/main/state/CreateStateMainService.js";
import * as RecordSceneMainService$Wonderjs from "../service/state/main/scene/RecordSceneMainService.js";
import * as RecordWorkerJobService$Wonderjs from "../service/record/main/workerJob/RecordWorkerJobService.js";
import * as ParseNoWorkerJobService$Wonderjs from "../service/record/main/noWorkerJob/ParseNoWorkerJobService.js";
import * as RecordRenderMainService$Wonderjs from "../service/state/main/render/RecordRenderMainService.js";
import * as WorkerDetectMainService$Wonderjs from "../service/state/main/workerDetect/WorkerDetectMainService.js";
import * as BrowserDetectMainService$Wonderjs from "../service/state/main/browserDetect/BrowserDetectMainService.js";
import * as ParseRenderConfigService$Wonderjs from "../service/record/main/renderConfig/ParseRenderConfigService.js";
import * as RecordNoWorkerJobService$Wonderjs from "../service/record/main/noWorkerJob/RecordNoWorkerJobService.js";
import * as RecordGeometryMainService$Wonderjs from "../service/state/main/geometry/RecordGeometryMainService.js";
import * as RecordRenderConfigService$Wonderjs from "../service/record/main/renderConfig/RecordRenderConfigService.js";
import * as RecordTransformMainService$Wonderjs from "../service/state/main/transform/RecordTransformMainService.js";
import * as RecordPointLightMainService$Wonderjs from "../service/state/main/light/point/RecordPointLightMainService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../service/state/main/meshRenderer/RecordMeshRendererMainService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../service/state/main/material/basic/RecordBasicMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../service/state/main/material/light/RecordLightMaterialMainService.js";
import * as RecordSourceTextureMainService$Wonderjs from "../service/state/main/texture/source/RecordSourceTextureMainService.js";
import * as RecordCubemapTextureMainService$Wonderjs from "../service/state/main/texture/cubemap/RecordCubemapTextureMainService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../service/state/main/light/direction/RecordDirectionLightMainService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "../service/state/main/instance/RecordSourceInstanceMainService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "../service/state/main/texture/source/basic_source/RecordBasicSourceTextureMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "../service/state/main/texture/source/arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function _collectAllRecords(stream) {
  return Most.reduce((function (arr, record) {
                return ArrayService$Wonderjs.push(record, arr);
              }), /* array */[], stream);
}

function _createFetchNoWorkerJobStreamArr(dataDir, fetchFunc) {
  return /* array */[
          Most.map(ParseNoWorkerJobService$Wonderjs.convertSettingToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "no_worker/setting/setting.json"
                      ]), fetchFunc)),
          Most.map(ParseNoWorkerJobService$Wonderjs.convertInitPipelinesToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "no_worker/pipeline/init_pipelines.json"
                      ]), fetchFunc)),
          Most.map(ParseNoWorkerJobService$Wonderjs.convertLoopPipelinesToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "no_worker/pipeline/loop_pipelines.json"
                      ]), fetchFunc)),
          Most.map(ParseNoWorkerJobService$Wonderjs.convertInitJobsToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "no_worker/job/init_jobs.json"
                      ]), fetchFunc)),
          Most.map(ParseNoWorkerJobService$Wonderjs.convertLoopJobsToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "no_worker/job/loop_jobs.json"
                      ]), fetchFunc))
        ];
}

function _createFetchRenderConfigStreamArr(dataDir, fetchFunc) {
  return /* array */[
          Most.map(ParseRenderConfigService$Wonderjs.convertShadersToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "render/shader/shaders.json"
                      ]), fetchFunc)),
          Most.map(ParseRenderConfigService$Wonderjs.convertShaderLibsToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "render/shader/shader_libs.json"
                      ]), fetchFunc))
        ];
}

function _setSetting(stateData, state, setting) {
  IsDebugMainService$Wonderjs.setIsDebug(stateData, OperateSettingService$Wonderjs.unsafeGetIsDebug(setting));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* settingRecord */0] = OperateSettingService$Wonderjs.setSetting(setting);
  return newrecord;
}

function _createHandleNoWorkerJobConfigStreamArr(dataDir, fetchFunc, state) {
  return Most.fromPromise(_collectAllRecords(MostUtils$Wonderjs.concatArray(_createFetchNoWorkerJobStreamArr(dataDir, fetchFunc))).then((function (recordArr) {
                    var newrecord = Caml_array.caml_array_dup(state);
                    return Promise.resolve((newrecord[/* noWorkerJobRecord */2] = RecordNoWorkerJobService$Wonderjs.create(recordArr), newrecord));
                  })));
}

function _createHandleRenderConfigStreamArr(dataDir, fetchFunc, state) {
  return Most.fromPromise(_collectAllRecords(MostUtils$Wonderjs.concatArray(_createFetchRenderConfigStreamArr(dataDir, fetchFunc))).then((function (recordArr) {
                    var newrecord = Caml_array.caml_array_dup(state);
                    return Promise.resolve((newrecord[/* renderConfigRecord */4] = RecordRenderConfigService$Wonderjs.create(recordArr), newrecord));
                  })));
}

function _createFetchWorkerJobStreamArr(dataDir, fetchFunc) {
  return /* array */[
          Most.map(ParseWorkerJobService$Wonderjs.convertSettingToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "worker/setting/setting.json"
                      ]), fetchFunc)),
          Most.map(ParseWorkerJobService$Wonderjs.convertMainInitPipelinesToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "worker/pipeline/main/main_init_pipelines.json"
                      ]), fetchFunc)),
          Most.map(ParseWorkerJobService$Wonderjs.convertMainLoopPipelinesToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "worker/pipeline/main/main_loop_pipelines.json"
                      ]), fetchFunc)),
          Most.map(ParseWorkerJobService$Wonderjs.convertMainInitJobsToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "worker/job/main/main_init_jobs.json"
                      ]), fetchFunc)),
          Most.map(ParseWorkerJobService$Wonderjs.convertMainLoopJobsToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "worker/job/main/main_loop_jobs.json"
                      ]), fetchFunc)),
          Most.map(ParseWorkerJobService$Wonderjs.convertWorkerPipelinesToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "worker/pipeline/worker/worker_pipelines.json"
                      ]), fetchFunc)),
          Most.map(ParseWorkerJobService$Wonderjs.convertWorkerJobsToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathService$Wonderjs.join(/* array */[
                        dataDir,
                        "worker/job/worker/worker_jobs.json"
                      ]), fetchFunc))
        ];
}

function _createHandleWorkerJobConfigStreamArr(dataDir, fetchFunc, state) {
  return Most.fromPromise(_collectAllRecords(MostUtils$Wonderjs.concatArray(_createFetchWorkerJobStreamArr(dataDir, fetchFunc))).then((function (recordArr) {
                    var newrecord = Caml_array.caml_array_dup(state);
                    return Promise.resolve((newrecord[/* workerJobRecord */3] = RecordWorkerJobService$Wonderjs.create(recordArr), newrecord));
                  })));
}

function _createHandleJobConfigStreamArr(dataDir, fetchFunc, state) {
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    return _createHandleWorkerJobConfigStreamArr(dataDir, fetchFunc, state);
  } else {
    return _createHandleNoWorkerJobConfigStreamArr(dataDir, fetchFunc, state);
  }
}

function _createRecordWithState(state) {
  return RecordSceneMainService$Wonderjs.create(RecordRenderMainService$Wonderjs.create(RecordGeometryMainService$Wonderjs.create(RecordSourceInstanceMainService$Wonderjs.create(RecordCubemapTextureMainService$Wonderjs.create(RecordArrayBufferViewSourceTextureMainService$Wonderjs.create(RecordBasicSourceTextureMainService$Wonderjs.create(RecordSourceTextureMainService$Wonderjs.create(RecordMeshRendererMainService$Wonderjs.create(RecordPointLightMainService$Wonderjs.create(RecordDirectionLightMainService$Wonderjs.create(RecordLightMaterialMainService$Wonderjs.create(RecordBasicMaterialMainService$Wonderjs.create(RecordTransformMainService$Wonderjs.create(state))))))))))))));
}

function _createAndSetState(stateData) {
  StateDataMainService$Wonderjs.setState(stateData, CreateStateMainService$Wonderjs.createState(/* () */0));
  return /* () */0;
}

function load(jsonPathArr, fetchFunc, stateData) {
  var settingFilePath = jsonPathArr[0];
  var dataDir = jsonPathArr[1];
  _createAndSetState(stateData);
  return Most.flatMap((function (json) {
                return Most.tap((function (state) {
                              StateDataMainService$Wonderjs.setState(stateData, state);
                              return /* () */0;
                            }), Most.concatMap((function (state) {
                                  return _createHandleRenderConfigStreamArr(dataDir, fetchFunc, state);
                                }), _createHandleJobConfigStreamArr(dataDir, fetchFunc, _createRecordWithState(BrowserDetectMainService$Wonderjs.detect(WorkerDetectMainService$Wonderjs.detect(_setSetting(stateData, StateDataMainService$Wonderjs.unsafeGetState(stateData), ParseSettingService$Wonderjs.convertToRecord(json))))))));
              }), FetchCommon$Wonderjs.createFetchJsonStream(settingFilePath, fetchFunc));
}

export {
  _collectAllRecords ,
  _createFetchNoWorkerJobStreamArr ,
  _createFetchRenderConfigStreamArr ,
  _setSetting ,
  _createHandleNoWorkerJobConfigStreamArr ,
  _createHandleRenderConfigStreamArr ,
  _createFetchWorkerJobStreamArr ,
  _createHandleWorkerJobConfigStreamArr ,
  _createHandleJobConfigStreamArr ,
  _createRecordWithState ,
  _createAndSetState ,
  load ,
  
}
/* most Not a pure module */
