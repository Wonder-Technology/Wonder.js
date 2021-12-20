


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

export {
  createComponentFunc ,
  addComponentFunc ,
  hasComponentFunc ,
  getComponentFunc ,
  getGameObjectsFunc ,
  setComponentDataFunc ,
  getAllComponentsFunc ,
  
}
/* No side effect */
