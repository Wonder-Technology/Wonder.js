

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OperateOutlineDataJobDataService$Wonderjs from "../../../../record/main/jobData/outlineData/OperateOutlineDataJobDataService.js";

function getColor(param) {
  return OperateOutlineDataJobDataService$Wonderjs.getColor(param[/* jobDataRecord */43]);
}

function setColor(color, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* jobDataRecord */43] = OperateOutlineDataJobDataService$Wonderjs.setColor(color, state[/* jobDataRecord */43]);
  return newrecord;
}

function getGameObjectsNeedDrawOutline(param) {
  return OperateOutlineDataJobDataService$Wonderjs.getGameObjectsNeedDrawOutline(param[/* jobDataRecord */43]);
}

function setGameObjectsNeedDrawOutline(gameObjectsNeedDrawOutline, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobDataRecord */43][/* outlineData */0];
  newrecord[/* jobDataRecord */43] = /* record */[/* outlineData : record */[
      /* outlineColor */init[/* outlineColor */0],
      /* gameObjectsNeedDrawOutline */gameObjectsNeedDrawOutline
    ]];
  return newrecord;
}

export {
  getColor ,
  setColor ,
  getGameObjectsNeedDrawOutline ,
  setGameObjectsNeedDrawOutline ,
  
}
/* No side effect */
