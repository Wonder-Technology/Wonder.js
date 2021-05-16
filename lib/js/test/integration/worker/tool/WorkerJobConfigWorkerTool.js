'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var ParseWorkerJobService$Wonderjs = require("../../../../src/service/record/main/workerJob/ParseWorkerJobService.js");

function buildMainInitPipelinesConfigWithoutCreateWorkerInstance(param) {
  return "\n[\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init\",\n          \"link\": \"concat\",\n          \"jobs\": [\n            {\n              \"name\": \"transfer_job_data\"\n            },\n            {\n              \"name\": \"send_init_render_data\"\n            }\n          ]\n        },\n        {\n          \"name\": \"transfer_job_data\",\n          \"link\": \"merge\",\n          \"jobs\": [\n            {\n              \"name\": \"send_job_data\"\n            },\n            {\n              \"name\": \"get_finish_send_job_data\"\n            }\n          ]\n        },\n        {\n          \"name\": \"frame\",\n          \"link\": \"merge\",\n          \"jobs\": [\n            {\n              \"name\": \"init\"\n            },\n            {\n              \"name\": \"get_finish_init_render_data\"\n            }\n          ]\n        }\n      ]\n    }\n  ]\n    ";
}

function buildMainLoopPipelinesConfig(param) {
  return "\n[\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"loop\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"send_render_data\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"frame\",\n                \"link\": \"merge\",\n                \"jobs\": [\n                    {\n                        \"name\": \"loop\"\n                    },\n                    {\n                        \"name\": \"get_finish_render_data\"\n                    }\n                ]\n            }\n        ]\n    }\n]\n    ";
}

function buildMainInitJobConfigWithoutCreateWorkerInstance(param) {
  return "\n[\n    {\n        \"name\": \"send_job_data\",\n        \"flags\": [\n            \"SEND_JOB_DATA\"\n        ]\n    },\n    {\n        \"name\": \"get_finish_send_job_data\",\n        \"flags\": [\n            \"FINISH_SEND_JOB_DATA\"\n        ]\n    },\n    {\n        \"name\": \"send_init_render_data\",\n        \"flags\": [\n            \"INIT_RENDER\"\n        ]\n    },\n    {\n        \"name\": \"get_finish_init_render_data\",\n        \"flags\": [\n            \"FINISH_INIT_RENDER\"\n        ]\n    }\n]\n    ";
}

function buildMainLoopJobConfig(param) {
  return "\n[\n    {\n        \"name\": \"tick\"\n    },\n    {\n        \"name\": \"update_transform\"\n    },\n    {\n        \"name\": \"update_camera\"\n    },\n    {\n        \"name\": \"get_camera_data\"\n    },\n    {\n        \"name\": \"create_basic_render_object_buffer\"\n    },\n    {\n        \"name\": \"create_light_render_object_buffer\"\n    },\n    {\n        \"name\": \"send_render_data\",\n        \"flags\": [\n            \"DRAW\"\n        ]\n    },\n    {\n        \"name\": \"get_finish_render_data\",\n        \"flags\": [\n            \"FINISH_RENDER\"\n        ]\n    }\n]\n    ";
}

function buildWorkerJobConfig($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var workerSetting = $staropt$star !== undefined ? $staropt$star : "\n    {\n    \"worker_file_dir\": \"./dist/\",\n    \"main_init_pipeline\": \"default\",\n    \"main_loop_pipeline\": \"default\",\n    \"worker_pipeline\": \"default\"\n}\n";
  var mainInitPipelines = $staropt$star$1 !== undefined ? $staropt$star$1 : "\n[\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init\",\n          \"link\": \"concat\",\n          \"jobs\": [\n            {\n              \"name\": \"transfer_job_data\"\n            },\n            {\n              \"name\": \"send_init_render_data\"\n            }\n          ]\n        },\n        {\n          \"name\": \"transfer_job_data\",\n          \"link\": \"merge\",\n          \"jobs\": [\n            {\n              \"name\": \"send_job_data\"\n            },\n            {\n              \"name\": \"get_finish_send_job_data\"\n            }\n          ]\n        },\n        {\n          \"name\": \"frame\",\n          \"link\": \"merge\",\n          \"jobs\": [\n            {\n              \"name\": \"init\"\n            },\n            {\n              \"name\": \"get_finish_init_render_data\"\n            }\n          ]\n        }\n      ]\n    }\n  ]\n    ";
  var mainLoopPipelines = $staropt$star$2 !== undefined ? $staropt$star$2 : "\n[\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"loop\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"send_render_data\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"frame\",\n                \"link\": \"merge\",\n                \"jobs\": [\n                    {\n                        \"name\": \"loop\"\n                    },\n                    {\n                        \"name\": \"get_finish_render_data\"\n                    }\n                ]\n            }\n        ]\n    }\n]\n    ";
  var workerPipelines = $staropt$star$3 !== undefined ? $staropt$star$3 : "\n[\n    {\n        \"name\": \"default\",\n        \"jobs\": {\n            \"render\": [\n                [\n                    {\n                        \"name\": \"send_finish_send_job_data\"\n                    },\n                    {\n                        \"name\": \"get_init_render_data\"\n                    },\n                    {\n                        \"name\": \"init_gl\"\n                    },\n                    {\n                        \"name\": \"send_finish_init_render_data\"\n                    }\n                ],\n                [\n                    {\n                        \"name\": \"get_render_data\"\n                    },\n                    {\n                        \"name\": \"send_finish_render_data\"\n                    }\n                ]\n            ]\n        }\n    }\n]\n";
  var mainInitJobs = $staropt$star$4 !== undefined ? $staropt$star$4 : "\n[\n    {\n        \"name\": \"send_job_data\",\n        \"flags\": [\n            \"SEND_JOB_DATA\"\n        ]\n    },\n    {\n        \"name\": \"get_finish_send_job_data\",\n        \"flags\": [\n            \"FINISH_SEND_JOB_DATA\"\n        ]\n    },\n    {\n        \"name\": \"send_init_render_data\",\n        \"flags\": [\n            \"INIT_RENDER\"\n        ]\n    },\n    {\n        \"name\": \"get_finish_init_render_data\",\n        \"flags\": [\n            \"FINISH_INIT_RENDER\"\n        ]\n    }\n]\n    ";
  var mainLoopJobs = $staropt$star$5 !== undefined ? $staropt$star$5 : "\n[\n    {\n        \"name\": \"tick\"\n    },\n    {\n        \"name\": \"update_transform\"\n    },\n    {\n        \"name\": \"update_camera\"\n    },\n    {\n        \"name\": \"get_camera_data\"\n    },\n    {\n        \"name\": \"create_basic_render_object_buffer\"\n    },\n    {\n        \"name\": \"create_light_render_object_buffer\"\n    },\n    {\n        \"name\": \"send_render_data\",\n        \"flags\": [\n            \"DRAW\"\n        ]\n    },\n    {\n        \"name\": \"get_finish_render_data\",\n        \"flags\": [\n            \"FINISH_RENDER\"\n        ]\n    }\n]\n    ";
  var workerJobs = $staropt$star$6 !== undefined ? $staropt$star$6 : "\n[\n    {\n        \"name\": \"send_finish_send_job_data\",\n        \"flags\": [\n            \"FINISH_SEND_JOB_DATA\"\n        ]\n    },\n    {\n        \"name\": \"get_init_render_data\",\n        \"flags\": [\n            \"INIT_RENDER\"\n        ]\n    },\n    {\n        \"name\": \"create_gl\"\n    },\n    {\n        \"name\": \"init_transform\"\n    },\n    {\n        \"name\": \"init_basic_material\"\n    },\n    {\n        \"name\": \"send_finish_init_render_data\",\n        \"flags\": [\n            \"FINISH_INIT_RENDER\"\n        ]\n    },\n    {\n        \"name\": \"get_render_data\",\n        \"flags\": [\n            \"DRAW\"\n        ]\n    },\n    {\n        \"name\": \"clear_color\"\n    },\n    {\n        \"name\": \"clear_buffer\"\n    },\n    {\n        \"name\": \"clear_last_send_component\"\n    },\n    {\n        \"name\": \"send_uniform_shader_data\"\n    },\n    {\n        \"name\": \"render_basic\"\n    },\n    {\n        \"name\": \"send_finish_render_data\",\n        \"flags\": [\n            \"FINISH_RENDER\"\n        ]\n    }\n]\n\n        ";
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

function create(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* workerJobRecord */3] = /* record */[
    /* setting */ParseWorkerJobService$Wonderjs.convertSettingToRecord(JSON.parse(param[0])),
    /* mainInitPipelines */ParseWorkerJobService$Wonderjs.convertMainInitPipelinesToRecord(JSON.parse(param[1])),
    /* mainLoopPipelines */ParseWorkerJobService$Wonderjs.convertMainLoopPipelinesToRecord(JSON.parse(param[2])),
    /* workerPipelines */ParseWorkerJobService$Wonderjs.convertWorkerPipelinesToRecord(JSON.parse(param[3])),
    /* mainInitJobs */ParseWorkerJobService$Wonderjs.convertMainInitJobsToRecord(JSON.parse(param[4])),
    /* mainLoopJobs */ParseWorkerJobService$Wonderjs.convertMainLoopJobsToRecord(JSON.parse(param[5])),
    /* workerJobs */ParseWorkerJobService$Wonderjs.convertWorkerJobsToRecord(JSON.parse(param[6]))
  ];
  return newrecord;
}

exports.buildMainInitPipelinesConfigWithoutCreateWorkerInstance = buildMainInitPipelinesConfigWithoutCreateWorkerInstance;
exports.buildMainLoopPipelinesConfig = buildMainLoopPipelinesConfig;
exports.buildMainInitJobConfigWithoutCreateWorkerInstance = buildMainInitJobConfigWithoutCreateWorkerInstance;
exports.buildMainLoopJobConfig = buildMainLoopJobConfig;
exports.buildWorkerJobConfig = buildWorkerJobConfig;
exports.create = create;
/* No side effect */
