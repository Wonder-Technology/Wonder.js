


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

export {
  markNotRender ,
  init ,
  render ,
  addExecFunc ,
  removeExecFunc ,
  setState ,
  drawButton ,
  dispatch ,
  useSelector ,
  buildAPI ,
  
}
/* No side effect */
