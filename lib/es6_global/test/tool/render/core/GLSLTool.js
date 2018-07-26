

import * as List from "../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";

function getVsSource(shaderSource) {
  return List.nth(Sinon.getArgs(Sinon.getCall(0, shaderSource)), 1);
}

function getFsSource(shaderSource) {
  return List.nth(Sinon.getArgs(Sinon.getCall(1, shaderSource)), 1);
}

function containSpecifyCount(source, target, $staropt$star, _) {
  var count = $staropt$star !== undefined ? $staropt$star : 1;
  var match = source.match(new RegExp(target, "g"));
  if (match !== null) {
    return match.length === count;
  } else {
    return count === 0;
  }
}

function contain(source, targetLine) {
  return source.includes(targetLine.trim());
}

function containMultiline(source, targetLineArray) {
  return List.for_all((function (targetLine) {
                return source.includes(targetLine.trim());
              }), targetLineArray);
}

export {
  getVsSource ,
  getFsSource ,
  containSpecifyCount ,
  contain ,
  containMultiline ,
  
}
/* Sinon Not a pure module */
