// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as LogicJobSystem$Wonderjs  from "./logic/LogicJobSystem.js";
import * as RenderJobSystem$Wonderjs from "./render/RenderJobSystem.js";

function init(state) {
  return RenderJobSystem$Wonderjs.init(LogicJobSystem$Wonderjs.init(state));
}

export {
  init ,
  
}
/* LogicJobSystem-Wonderjs Not a pure module */