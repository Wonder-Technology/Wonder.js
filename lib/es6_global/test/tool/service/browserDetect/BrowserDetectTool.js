

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function setChrome(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* browserDetectRecord */42] = /* record */[/* browser : Chrome */0];
  return newrecord;
}

function setFirefox(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* browserDetectRecord */42] = /* record */[/* browser : Firefox */1];
  return newrecord;
}

function setAndroid(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* browserDetectRecord */42] = /* record */[/* browser : Android */2];
  return newrecord;
}

function setIOS(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* browserDetectRecord */42] = /* record */[/* browser : IOS */3];
  return newrecord;
}

function setUnknown(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* browserDetectRecord */42] = /* record */[/* browser : Unknown */4];
  return newrecord;
}

export {
  setChrome ,
  setFirefox ,
  setAndroid ,
  setIOS ,
  setUnknown ,
  
}
/* No side effect */
