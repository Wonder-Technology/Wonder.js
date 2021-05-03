

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as WorkerJobMainService$Wonderjs from "../../../../src/service/state/main/job/worker/WorkerJobMainService.js";
import * as ParseWorkerJobService$Wonderjs from "../../../../src/service/record/main/workerJob/ParseWorkerJobService.js";
import * as RecordWorkerJobService$Wonderjs from "../../../../src/service/record/main/workerJob/RecordWorkerJobService.js";
import * as OperateRenderWorkerJobService$Wonderjs from "../../../../src/service/record/main/workerJob/OperateRenderWorkerJobService.js";

function buildMainInitPipelinesConfigWithoutCreateWorkerInstance(param) {
  return "\n[\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"begin_init\",\n          \"link\": \"merge\",\n          \"jobs\": [\n            {\n              \"name\": \"init\"\n            },\n            {\n              \"name\": \"get_finish_init_render_data\"\n            }\n          ]\n        },\n        {\n          \"name\": \"init\",\n          \"link\": \"concat\",\n          \"jobs\": [\n            {\n              \"name\": \"transfer_job_data\"\n            },\n    {\n        \"name\": \"create_canvas\"\n    },\n    {\n        \"name\": \"set_full_screen\"\n    },\n            {\n              \"name\": \"send_init_render_data\"\n            }\n          ]\n        },\n        {\n          \"name\": \"transfer_job_data\",\n          \"link\": \"merge\",\n          \"jobs\": [\n            {\n              \"name\": \"send_job_data\"\n            },\n            {\n              \"name\": \"get_finish_send_job_data\"\n            }\n          ]\n        },\n        {\n          \"name\": \"frame\",\n          \"link\": \"concat\",\n          \"jobs\": [\n            {\n              \"name\": \"begin_init\"\n            }\n          ]\n        }\n      ]\n    }\n  ]\n    ";
}

function buildMainInitPipelinesConfigWithoutCreateWorkerInstanceAndMessage(param) {
  return "\n[\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"begin_init\",\n          \"link\": \"merge\",\n          \"jobs\": [\n            {\n              \"name\": \"init\"\n            }\n          ]\n        },\n        {\n          \"name\": \"init\",\n          \"link\": \"concat\",\n          \"jobs\": [\n            {\n              \"name\": \"detect_environment\"\n            },\n    {\n        \"name\": \"create_canvas\"\n    },\n    {\n        \"name\": \"set_full_screen\"\n    },\n            {\n              \"name\": \"init_script\"\n            },\n            {\n              \"name\": \"init_skybox\"\n            }\n          ]\n        },\n        {\n          \"name\": \"transfer_job_data\",\n          \"link\": \"merge\",\n          \"jobs\": [\n          ]\n        },\n        {\n          \"name\": \"frame\",\n          \"link\": \"concat\",\n          \"jobs\": [\n            {\n              \"name\": \"begin_init\"\n            }\n          ]\n        }\n      ]\n    }\n  ]\n    ";
}

function buildMainLoopPipelinesConfig(param) {
  return "\n[\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"loop\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"send_render_data\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"sync\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                ]\n            },\n            {\n                \"name\": \"begin_loop\",\n                \"link\": \"merge\",\n                \"jobs\": [\n                    {\n                        \"name\": \"loop\"\n                    },\n                    {\n                        \"name\": \"get_finish_render_data\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"frame\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"begin_loop\"\n                    },\n                    {\n                        \"name\": \"sync\"\n                    }\n                ]\n            }\n        ]\n    }\n]\n    ";
}

function buildMainLoopPipelinesConfigWithoutMessageExceptDisposeMessage(param) {
  return "\n[\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"loop\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"tick\"\n                    },\n                    {\n                        \"name\": \"update_transform\"\n                    },\n                    {\n                        \"name\": \"update_camera\"\n                    },\n                    {\n                        \"name\": \"get_camera_data\"\n                    },\n                    {\n                        \"name\": \"create_basic_render_object_buffer\"\n                    },\n                    {\n                        \"name\": \"create_light_render_object_buffer\"\n                    },\n                    {\n                        \"name\": \"copy_arraybuffer\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"copy_arraybuffer\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"copy_transform\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"sync\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"dispose_and_send_dispose_data\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"begin_loop\",\n                \"link\": \"merge\",\n                \"jobs\": [\n                    {\n                        \"name\": \"loop\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"frame\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"begin_loop\"\n                    },\n                    {\n                        \"name\": \"sync\"\n                    }\n                ]\n            }\n        ]\n    }\n]\n    ";
}

function buildMainInitJobConfigWithoutCreateWorkerInstance(param) {
  return "\n[\n    {\n        \"name\": \"send_job_data\",\n        \"flags\": [\n            \"SEND_JOB_DATA\"\n        ]\n    },\n    {\n        \"name\": \"get_finish_send_job_data\",\n        \"flags\": [\n            \"FINISH_SEND_JOB_DATA\"\n        ]\n    },\n            {\n              \"name\": \"detect_environment\"\n            },\n    {\n        \"name\": \"create_canvas\"\n    },\n    {\n        \"name\": \"set_full_screen\"\n    },\n    {\n        \"name\": \"init_script\"\n    },\n            {\n              \"name\": \"init_skybox\"\n            },\n    {\n        \"name\": \"send_init_render_data\",\n        \"flags\": [\n            \"INIT_RENDER\"\n        ]\n    },\n    {\n        \"name\": \"get_finish_init_render_data\",\n        \"flags\": [\n            \"FINISH_INIT_RENDER\"\n        ]\n    }\n]\n    ";
}

function buildMainLoopJobConfig(param) {
  return "\n[\n    {\n        \"name\": \"tick\"\n    },\n    {\n        \"name\": \"update_transform\"\n    },\n    {\n        \"name\": \"update_camera\"\n    },\n    {\n        \"name\": \"get_camera_data\"\n    },\n    {\n        \"name\": \"create_basic_render_object_buffer\"\n    },\n    {\n        \"name\": \"create_light_render_object_buffer\"\n    },\n    {\n        \"name\": \"copy_transform\"\n    },\n    {\n        \"name\": \"send_render_data\",\n        \"flags\": [\n            \"DRAW\"\n        ]\n    },\n    {\n        \"name\": \"get_finish_render_data\",\n        \"flags\": [\n            \"FINISH_RENDER\"\n        ]\n    },\n    {\n        \"name\": \"dispose_and_send_dispose_data\",\n        \"flags\": [\n            \"DISPOSE\"\n        ]\n    }\n]\n    ";
}

function buildWorkerJobConfig($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var workerSetting = $staropt$star !== undefined ? $staropt$star : "\n    {\n    \"worker_file_dir\": \"./dist/\",\n    \"main_init_pipeline\": \"default\",\n    \"main_loop_pipeline\": \"default\",\n    \"worker_pipeline\": \"default\"\n}\n";
  var mainInitPipelines = $staropt$star$1 !== undefined ? $staropt$star$1 : "\n[\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"begin_init\",\n          \"link\": \"merge\",\n          \"jobs\": [\n            {\n              \"name\": \"init\"\n            },\n            {\n              \"name\": \"get_finish_init_render_data\"\n            }\n          ]\n        },\n        {\n          \"name\": \"init\",\n          \"link\": \"concat\",\n          \"jobs\": [\n            {\n              \"name\": \"transfer_job_data\"\n            },\n    {\n        \"name\": \"create_canvas\"\n    },\n    {\n        \"name\": \"set_full_screen\"\n    },\n            {\n              \"name\": \"send_init_render_data\"\n            }\n          ]\n        },\n        {\n          \"name\": \"transfer_job_data\",\n          \"link\": \"merge\",\n          \"jobs\": [\n            {\n              \"name\": \"send_job_data\"\n            },\n            {\n              \"name\": \"get_finish_send_job_data\"\n            }\n          ]\n        },\n        {\n          \"name\": \"frame\",\n          \"link\": \"concat\",\n          \"jobs\": [\n            {\n              \"name\": \"begin_init\"\n            }\n          ]\n        }\n      ]\n    }\n  ]\n    ";
  var mainLoopPipelines = $staropt$star$2 !== undefined ? $staropt$star$2 : "\n[\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"loop\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"send_render_data\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"sync\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                ]\n            },\n            {\n                \"name\": \"begin_loop\",\n                \"link\": \"merge\",\n                \"jobs\": [\n                    {\n                        \"name\": \"loop\"\n                    },\n                    {\n                        \"name\": \"get_finish_render_data\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"frame\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"begin_loop\"\n                    },\n                    {\n                        \"name\": \"sync\"\n                    }\n                ]\n            }\n        ]\n    }\n]\n    ";
  var workerPipelines = $staropt$star$3 !== undefined ? $staropt$star$3 : "\n[\n    {\n        \"name\": \"default\",\n        \"jobs\": {\n            \"render\": [\n                [\n                    {\n                        \"name\": \"send_finish_send_job_data\"\n                    },\n                    {\n                        \"name\": \"get_init_render_data\"\n                    },\n                    {\n                        \"name\": \"init_gl\"\n                    },\n                    {\n                        \"name\": \"send_finish_init_render_data\"\n                    }\n                ]\n            ]\n        }\n    }\n]\n";
  var mainInitJobs = $staropt$star$4 !== undefined ? $staropt$star$4 : "\n[\n    {\n        \"name\": \"send_job_data\",\n        \"flags\": [\n            \"SEND_JOB_DATA\"\n        ]\n    },\n    {\n        \"name\": \"get_finish_send_job_data\",\n        \"flags\": [\n            \"FINISH_SEND_JOB_DATA\"\n        ]\n    },\n            {\n              \"name\": \"detect_environment\"\n            },\n    {\n        \"name\": \"create_canvas\"\n    },\n    {\n        \"name\": \"set_full_screen\"\n    },\n    {\n        \"name\": \"init_script\"\n    },\n            {\n              \"name\": \"init_skybox\"\n            },\n    {\n        \"name\": \"send_init_render_data\",\n        \"flags\": [\n            \"INIT_RENDER\"\n        ]\n    },\n    {\n        \"name\": \"get_finish_init_render_data\",\n        \"flags\": [\n            \"FINISH_INIT_RENDER\"\n        ]\n    }\n]\n    ";
  var mainLoopJobs = $staropt$star$5 !== undefined ? $staropt$star$5 : "\n[\n    {\n        \"name\": \"tick\"\n    },\n    {\n        \"name\": \"update_transform\"\n    },\n    {\n        \"name\": \"update_camera\"\n    },\n    {\n        \"name\": \"get_camera_data\"\n    },\n    {\n        \"name\": \"create_basic_render_object_buffer\"\n    },\n    {\n        \"name\": \"create_light_render_object_buffer\"\n    },\n    {\n        \"name\": \"copy_transform\"\n    },\n    {\n        \"name\": \"send_render_data\",\n        \"flags\": [\n            \"DRAW\"\n        ]\n    },\n    {\n        \"name\": \"get_finish_render_data\",\n        \"flags\": [\n            \"FINISH_RENDER\"\n        ]\n    },\n    {\n        \"name\": \"dispose_and_send_dispose_data\",\n        \"flags\": [\n            \"DISPOSE\"\n        ]\n    }\n]\n    ";
  var workerJobs = $staropt$star$6 !== undefined ? $staropt$star$6 : "\n[\n    {\n        \"name\": \"send_finish_send_job_data\",\n        \"flags\": [\n            \"FINISH_SEND_JOB_DATA\"\n        ]\n    },\n    {\n        \"name\": \"get_init_render_data\",\n        \"flags\": [\n            \"INIT_RENDER\"\n        ]\n    },\n    {\n        \"name\": \"init_gl\"\n    },\n    {\n        \"name\": \"send_finish_init_render_data\",\n        \"flags\": [\n            \"FINISH_INIT_RENDER\"\n        ]\n    }\n]\n        ";
  return /* tuple */[
          workerSetting,
          mainInitPipelines,
          mainLoopPipelines,
          workerPipelines,
          mainInitJobs,
          mainLoopJobs,
          workerJobs
        ];
}

function createWithRecord(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* workerJobRecord */3] = RecordWorkerJobService$Wonderjs.create(/* tuple */[
        param[0],
        param[1],
        param[2],
        param[3],
        param[4],
        param[5],
        param[6]
      ]);
  return newrecord;
}

function create(param, state) {
  return createWithRecord(/* tuple */[
              ParseWorkerJobService$Wonderjs.convertSettingToRecord(JSON.parse(param[0])),
              ParseWorkerJobService$Wonderjs.convertMainInitPipelinesToRecord(JSON.parse(param[1])),
              ParseWorkerJobService$Wonderjs.convertMainLoopPipelinesToRecord(JSON.parse(param[2])),
              ParseWorkerJobService$Wonderjs.convertMainInitJobsToRecord(JSON.parse(param[4])),
              ParseWorkerJobService$Wonderjs.convertMainLoopJobsToRecord(JSON.parse(param[5])),
              ParseWorkerJobService$Wonderjs.convertWorkerPipelinesToRecord(JSON.parse(param[3])),
              ParseWorkerJobService$Wonderjs.convertWorkerJobsToRecord(JSON.parse(param[6]))
            ], state);
}

var getRenderWorkerPipelineJobs = OperateRenderWorkerJobService$Wonderjs._getRenderWorkerPipelineJobs;

var convertWorkerPipelinesToRecord = ParseWorkerJobService$Wonderjs.convertWorkerPipelinesToRecord;

var convertWorkerJobsToRecord = ParseWorkerJobService$Wonderjs.convertWorkerJobsToRecord;

var getRenderWorkerJobStreamArr = WorkerJobMainService$Wonderjs.getRenderWorkerJobStreamArr;

export {
  buildMainInitPipelinesConfigWithoutCreateWorkerInstance ,
  buildMainInitPipelinesConfigWithoutCreateWorkerInstanceAndMessage ,
  buildMainLoopPipelinesConfig ,
  buildMainLoopPipelinesConfigWithoutMessageExceptDisposeMessage ,
  buildMainInitJobConfigWithoutCreateWorkerInstance ,
  buildMainLoopJobConfig ,
  buildWorkerJobConfig ,
  createWithRecord ,
  create ,
  getRenderWorkerPipelineJobs ,
  convertWorkerPipelinesToRecord ,
  convertWorkerJobsToRecord ,
  getRenderWorkerJobStreamArr ,
  
}
/* WorkerJobMainService-Wonderjs Not a pure module */
