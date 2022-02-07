'use strict';

var MostUtils$WonderEditorCore = require("../MostUtils.bs.js");

function exec(states) {
  return MostUtils$WonderEditorCore.callFunc(function (param) {
              console.log("init root job exec");
              return states;
            });
}

exports.exec = exec;
/* MostUtils-WonderEditorCore Not a pure module */
