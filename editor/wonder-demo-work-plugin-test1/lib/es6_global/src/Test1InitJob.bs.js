

import * as MostUtils$WonderDemoWorkPluginTest1 from "./MostUtils.bs.js";

function exec(states) {
  return MostUtils$WonderDemoWorkPluginTest1.callFunc(function (param) {
              console.log("init test1 job exec");
              return states;
            });
}

export {
  exec ,
  
}
/* MostUtils-WonderDemoWorkPluginTest1 Not a pure module */
