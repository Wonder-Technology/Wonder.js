

import * as Belt_List from "../../../../../../node_modules/rescript/lib/es6/belt_List.js";

function printForDebug(value) {
  console.log(JSON.stringify(value));
  return value;
}

function printListForDebug(list) {
  console.log(Belt_List.toArray(list));
  return list;
}

function logForDebug(value) {
  console.log(value);
  console.trace();
  
}

function log(value) {
  console.log(JSON.stringify(value));
  
}

function getJsonStr(json) {
  return JSON.stringify(json);
}

function buildDebugMessage(description, params, param) {
  return "\n  Debug:\n\n  description\n  " + description + "\n\n  params\n  " + params + "\n\n  ";
}

function buildDebugJsonMessage(description, $$var, param) {
  var varStr = JSON.stringify($$var);
  return "\n  DebugJson:\n\n  description\n  " + description + "\n\n  variable value\n  " + varStr + "\n  ";
}

function buildFatalMessage(title, description, reason, solution, params) {
  return "\n  Fatal:\n\n  title\n  " + title + "\n\n  description\n  " + description + "\n\n  reason\n  " + reason + "\n\n  solution\n  " + solution + "\n\n  params\n  " + params + "\n\n   ";
}

function buildErrorMessage(title, description, reason, solution, params) {
  return "\n  Error:\n\n  title\n  " + title + "\n\n  description\n  " + description + "\n\n  reason\n  " + reason + "\n\n  solution\n  " + solution + "\n\n  params\n  " + params + "\n\n   ";
}

function buildAssertMessage(expect, actual) {
  return "expect " + expect + ", but actual " + actual;
}

export {
  printForDebug ,
  printListForDebug ,
  logForDebug ,
  log ,
  getJsonStr ,
  buildDebugMessage ,
  buildDebugJsonMessage ,
  buildFatalMessage ,
  buildErrorMessage ,
  buildAssertMessage ,
  
}
/* No side effect */
