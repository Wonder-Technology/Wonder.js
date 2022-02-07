

import * as MostUtils$WonderEditorCore from "../MostUtils.bs.js";

function exec(states) {
  return MostUtils$WonderEditorCore.callFunc(function (param) {
              console.log("init test1 job exec");
              return states;
            });
}

export {
  exec ,
  
}
/* MostUtils-WonderEditorCore Not a pure module */
