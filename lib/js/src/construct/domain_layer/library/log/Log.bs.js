'use strict';


function printForDebug(value) {
  console.log(value);
  return value;
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

exports.printForDebug = printForDebug;
exports.getJsonStr = getJsonStr;
exports.buildDebugMessage = buildDebugMessage;
exports.buildDebugJsonMessage = buildDebugJsonMessage;
exports.buildFatalMessage = buildFatalMessage;
exports.buildErrorMessage = buildErrorMessage;
exports.buildAssertMessage = buildAssertMessage;
/* No side effect */
