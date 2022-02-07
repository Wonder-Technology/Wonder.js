'use strict';

var Test1InitJob$WonderDemoWorkPluginTest1 = require("./Test1InitJob.bs.js");

function _getExecFunc(_pipelineName, jobName) {
  if (jobName === "init_test1_wonder") {
    return Test1InitJob$WonderDemoWorkPluginTest1.exec;
  }
  throw {
        RE_EXN_ID: "Match_failure",
        _1: [
          "Test1Main.res",
          4,
          2
        ],
        Error: new Error()
      };
}

function _init(_state) {
  
}

function getData(param) {
  return {
          pluginName: "wonder-work-plugin-test1",
          createStateFunc: (function (param) {
              
            }),
          initFunc: _init,
          getExecFunc: _getExecFunc,
          allPipelineData: [{
              name: "init",
              groups: [{
                  name: "first_test1_wonder",
                  link: "concat",
                  elements: [{
                      name: "init_test1_wonder",
                      type_: "job"
                    }]
                }],
              first_group: "first_test1_wonder"
            }]
        };
}

exports._getExecFunc = _getExecFunc;
exports._init = _init;
exports.getData = getData;
/* Test1InitJob-WonderDemoWorkPluginTest1 Not a pure module */
