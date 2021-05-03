

import * as Json_decode$WonderBsJson from "./../../../../../../../node_modules/wonder-bs-json/lib/es6_global/src/Json_decode.js";

function convertSettingToRecord(setting) {
  return /* record */[
          /* workerFileDir */Json_decode$WonderBsJson.field("worker_file_dir", Json_decode$WonderBsJson.string, setting),
          /* mainInitPipeline */Json_decode$WonderBsJson.field("main_init_pipeline", Json_decode$WonderBsJson.string, setting),
          /* mainLoopPipeline */Json_decode$WonderBsJson.field("main_loop_pipeline", Json_decode$WonderBsJson.string, setting),
          /* workerPipeline */Json_decode$WonderBsJson.field("worker_pipeline", Json_decode$WonderBsJson.string, setting)
        ];
}

function convertMainInitPipelinesToRecord(pipelines) {
  return Json_decode$WonderBsJson.array((function (json) {
                return /* record */[
                        /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                        /* jobs */Json_decode$WonderBsJson.field("jobs", (function (json) {
                                return Json_decode$WonderBsJson.array((function (json) {
                                              return /* record */[
                                                      /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                                                      /* link */Json_decode$WonderBsJson.field("link", Json_decode$WonderBsJson.string, json),
                                                      /* jobs */Json_decode$WonderBsJson.field("jobs", (function (json) {
                                                              return Json_decode$WonderBsJson.array((function (json) {
                                                                            return /* record */[/* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json)];
                                                                          }), json);
                                                            }), json)
                                                    ];
                                            }), json);
                              }), json)
                      ];
              }), pipelines);
}

function convertMainLoopPipelinesToRecord(pipelines) {
  return Json_decode$WonderBsJson.array((function (json) {
                return /* record */[
                        /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                        /* jobs */Json_decode$WonderBsJson.field("jobs", (function (json) {
                                return Json_decode$WonderBsJson.array((function (json) {
                                              return /* record */[
                                                      /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                                                      /* link */Json_decode$WonderBsJson.field("link", Json_decode$WonderBsJson.string, json),
                                                      /* jobs */Json_decode$WonderBsJson.field("jobs", (function (json) {
                                                              return Json_decode$WonderBsJson.array((function (json) {
                                                                            return /* record */[/* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json)];
                                                                          }), json);
                                                            }), json)
                                                    ];
                                            }), json);
                              }), json)
                      ];
              }), pipelines);
}

function convertWorkerPipelinesToRecord(pipelines) {
  return Json_decode$WonderBsJson.array((function (json) {
                return /* record */[
                        /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                        /* jobs */Json_decode$WonderBsJson.field("jobs", (function (json) {
                                return /* record */[/* render */Json_decode$WonderBsJson.field("render", (function (json) {
                                                return Json_decode$WonderBsJson.array((function (json) {
                                                              return Json_decode$WonderBsJson.array((function (json) {
                                                                            return /* record */[/* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json)];
                                                                          }), json);
                                                            }), json);
                                              }), json)];
                              }), json)
                      ];
              }), pipelines);
}

function _convertJobsToRecord(jobs) {
  return Json_decode$WonderBsJson.array((function (json) {
                return /* record */[
                        /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                        /* flags */Json_decode$WonderBsJson.optional((function (param) {
                                return Json_decode$WonderBsJson.field("flags", (function (json) {
                                              return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.string, json);
                                            }), param);
                              }), json)
                      ];
              }), jobs);
}

var convertMainInitJobsToRecord = _convertJobsToRecord;

var convertMainLoopJobsToRecord = _convertJobsToRecord;

var convertWorkerJobsToRecord = _convertJobsToRecord;

export {
  convertSettingToRecord ,
  convertMainInitPipelinesToRecord ,
  convertMainLoopPipelinesToRecord ,
  convertWorkerPipelinesToRecord ,
  _convertJobsToRecord ,
  convertMainInitJobsToRecord ,
  convertMainLoopJobsToRecord ,
  convertWorkerJobsToRecord ,
  
}
/* No side effect */
