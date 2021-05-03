

import * as Json_decode$WonderBsJson from "./../../../../../../../node_modules/wonder-bs-json/lib/es6_global/src/Json_decode.js";

function convertSettingToRecord(loop_setting) {
  return /* record */[
          /* initPipeline */Json_decode$WonderBsJson.field("init_pipeline", Json_decode$WonderBsJson.string, loop_setting),
          /* loopPipeline */Json_decode$WonderBsJson.field("loop_pipeline", Json_decode$WonderBsJson.string, loop_setting)
        ];
}

function _convertPipelinesToRecord(pipelines) {
  return Json_decode$WonderBsJson.array((function (json) {
                return /* record */[
                        /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                        /* jobs */Json_decode$WonderBsJson.field("jobs", (function (param) {
                                return Json_decode$WonderBsJson.array((function (json) {
                                              return /* record */[/* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json)];
                                            }), param);
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

var convertInitPipelinesToRecord = _convertPipelinesToRecord;

var convertInitJobsToRecord = _convertJobsToRecord;

var convertLoopPipelinesToRecord = _convertPipelinesToRecord;

var convertLoopJobsToRecord = _convertJobsToRecord;

export {
  convertSettingToRecord ,
  _convertPipelinesToRecord ,
  _convertJobsToRecord ,
  convertInitPipelinesToRecord ,
  convertInitJobsToRecord ,
  convertLoopPipelinesToRecord ,
  convertLoopJobsToRecord ,
  
}
/* No side effect */
