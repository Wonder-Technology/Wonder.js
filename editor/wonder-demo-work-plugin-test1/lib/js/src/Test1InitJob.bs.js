'use strict';

var MostUtils$WonderDemoWorkPluginTest1 = require("./MostUtils.bs.js");

function exec(states) {
  return MostUtils$WonderDemoWorkPluginTest1.callFunc(function (param) {
              console.log("init test1 job exec");
              return states;
            });
}

exports.exec = exec;
/* MostUtils-WonderDemoWorkPluginTest1 Not a pure module */
