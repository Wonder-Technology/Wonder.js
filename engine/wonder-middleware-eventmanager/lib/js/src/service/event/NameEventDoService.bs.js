'use strict';


function getPointDownEventName(param) {
  return "wd_pointdown";
}

function getPointUpEventName(param) {
  return "wd_pointup";
}

function getPointTapEventName(param) {
  return "wd_pointtap";
}

function getPointMoveEventName(param) {
  return "wd_pointmove";
}

function getPointScaleEventName(param) {
  return "wd_pointscale";
}

function getPointDragStartEventName(param) {
  return "wd_pointdragstart";
}

function getPointDragOverEventName(param) {
  return "wd_pointdragover";
}

function getPointDragDropEventName(param) {
  return "wd_pointdragdrop";
}

exports.getPointDownEventName = getPointDownEventName;
exports.getPointUpEventName = getPointUpEventName;
exports.getPointTapEventName = getPointTapEventName;
exports.getPointMoveEventName = getPointMoveEventName;
exports.getPointScaleEventName = getPointScaleEventName;
exports.getPointDragStartEventName = getPointDragStartEventName;
exports.getPointDragOverEventName = getPointDragOverEventName;
exports.getPointDragDropEventName = getPointDragDropEventName;
/* No side effect */
