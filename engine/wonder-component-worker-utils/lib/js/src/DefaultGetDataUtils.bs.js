'use strict';


function createComponentFunc(state) {
  return [
          state,
          -1
        ];
}

function addComponentFunc(state, gameObject, component) {
  return state;
}

function hasComponentFunc(state, gameObject) {
  return false;
}

function getComponentFunc(state, gameObject) {
  return -1;
}

function getGameObjectsFunc(state, component) {
  return [];
}

function setComponentDataFunc(state, component, dataName, dataValue) {
  return state;
}

function getAllComponentsFunc(state) {
  return [];
}

exports.createComponentFunc = createComponentFunc;
exports.addComponentFunc = addComponentFunc;
exports.hasComponentFunc = hasComponentFunc;
exports.getComponentFunc = getComponentFunc;
exports.getGameObjectsFunc = getGameObjectsFunc;
exports.setComponentDataFunc = setComponentDataFunc;
exports.getAllComponentsFunc = getAllComponentsFunc;
/* No side effect */
