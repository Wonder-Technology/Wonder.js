'use strict';

var CPContainerManager$Wonderjs = require("../CPContainerManager.bs.js");

function getPipeline(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).pipeline;
}

function setPipeline(pipeline) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: pipeline,
              time: po.time,
              picture: po.picture
            });
}

function getTime(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).time;
}

function setTime(time) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              time: time,
              picture: po.picture
            });
}

function getPicture(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).picture;
}

function setPicture(picture) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              time: po.time,
              picture: picture
            });
}

exports.getPipeline = getPipeline;
exports.setPipeline = setPipeline;
exports.getTime = getTime;
exports.setTime = setTime;
exports.getPicture = getPicture;
exports.setPicture = setPicture;
/* CPContainerManager-Wonderjs Not a pure module */
