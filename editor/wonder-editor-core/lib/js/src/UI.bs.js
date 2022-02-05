'use strict';


function markNotRender(param) {
  return 1;
}

function init(param) {
  return 1;
}

function render(param) {
  return 1;
}

function addExecFunc(param) {
  return 1;
}

function removeExecFunc(param) {
  return 1;
}

function setState(param) {
  return 1;
}

function drawButton(param) {
  return 1;
}

function dispatch(param) {
  return 1;
}

function useSelector(param) {
  return 1;
}

function buildAPI(param) {
  return {
          addExecFunc: addExecFunc,
          removeExecFunc: removeExecFunc,
          setState: setState,
          drawButton: drawButton,
          dispatch: dispatch,
          useSelector: useSelector
        };
}

exports.markNotRender = markNotRender;
exports.init = init;
exports.render = render;
exports.addExecFunc = addExecFunc;
exports.removeExecFunc = removeExecFunc;
exports.setState = setState;
exports.drawButton = drawButton;
exports.dispatch = dispatch;
exports.useSelector = useSelector;
exports.buildAPI = buildAPI;
/* No side effect */
