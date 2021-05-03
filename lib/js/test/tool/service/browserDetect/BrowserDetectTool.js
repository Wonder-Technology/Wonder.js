'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");

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

exports.setChrome = setChrome;
exports.setFirefox = setFirefox;
exports.setAndroid = setAndroid;
exports.setIOS = setIOS;
exports.setUnknown = setUnknown;
/* No side effect */
