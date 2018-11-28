

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as MainStateTool$Wonderjs from "../state/MainStateTool.js";

function setChrome() {
  var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* browserDetectRecord */39] = /* record */[/* browser : Chrome */0];
  return MainStateTool$Wonderjs.setState(newrecord);
}

function setFirefox() {
  var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* browserDetectRecord */39] = /* record */[/* browser : Firefox */1];
  return MainStateTool$Wonderjs.setState(newrecord);
}

function setAndroid() {
  var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* browserDetectRecord */39] = /* record */[/* browser : Android */2];
  return MainStateTool$Wonderjs.setState(newrecord);
}

function setIOS() {
  var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* browserDetectRecord */39] = /* record */[/* browser : IOS */3];
  return MainStateTool$Wonderjs.setState(newrecord);
}

function setUnknown() {
  var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* browserDetectRecord */39] = /* record */[/* browser : Unknown */4];
  return MainStateTool$Wonderjs.setState(newrecord);
}

export {
  setChrome ,
  setFirefox ,
  setAndroid ,
  setIOS ,
  setUnknown ,
  
}
/* MainStateTool-Wonderjs Not a pure module */
