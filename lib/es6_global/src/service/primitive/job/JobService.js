

import * as List from "../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Pervasives from "../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function handleGetNoneNoWorkerJob(name, list) {
  Log$WonderLog.warn("job:" + (String(name) + " is none"));
  return list;
}

function handleGetNoneWorkerJob(name, jobHandleMap) {
  return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("get no job", "can\'t find job handle function whose job name is " + (String(name) + ""), "", "make sure that the job name defined in config record be correctly", "jobHandleMap:" + (Log$WonderLog.getJsonStr(jobHandleMap) + ("\nname: " + (String(name) + "")))));
}

function addJob(param, jobList) {
  var targetHandleFunc = param[3];
  var targetJobName = param[0];
  if (param[2]) {
    var afterJobName = param[1];
    return List.fold_left((function (list, jobItem) {
                  var match = jobItem[0] === afterJobName;
                  if (match) {
                    return Pervasives.$at(list, /* :: */[
                                jobItem,
                                /* :: */[
                                  /* tuple */[
                                    targetJobName,
                                    targetHandleFunc
                                  ],
                                  /* [] */0
                                ]
                              ]);
                  } else {
                    return Pervasives.$at(list, /* :: */[
                                jobItem,
                                /* [] */0
                              ]);
                  }
                }), /* [] */0, jobList);
  } else {
    return /* :: */[
            /* tuple */[
              targetJobName,
              targetHandleFunc
            ],
            jobList
          ];
  }
}

function removeJob(targetJobName, jobList) {
  return List.filter((function (param) {
                  return param[0] !== targetJobName;
                }))(jobList);
}

export {
  handleGetNoneNoWorkerJob ,
  handleGetNoneWorkerJob ,
  addJob ,
  removeJob ,
  
}
/* Log-WonderLog Not a pure module */
