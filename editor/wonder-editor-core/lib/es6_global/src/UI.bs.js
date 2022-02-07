

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ArraySt$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as HashMap$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/hash_map/HashMap.bs.js";
import * as MutableHashMap$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/hash_map/MutableHashMap.bs.js";

function _createStateContainer(param) {
  return {
          state: undefined
        };
}

var stateContainer = {
  state: undefined
};

function setState(state) {
  stateContainer.state = state;
  
}

function unsafeGetState(param) {
  return stateContainer.state;
}

function markNotRender(id) {
  MutableHashMap$WonderCommonlib.set(stateContainer.state.isRenderMap, id, false);
  
}

function markRender(id) {
  MutableHashMap$WonderCommonlib.set(stateContainer.state.isRenderMap, id, true);
  
}

function init(param) {
  return setState({
              execFuncMap: MutableHashMap$WonderCommonlib.createEmpty(undefined, undefined),
              stateMap: MutableHashMap$WonderCommonlib.createEmpty(undefined, undefined),
              isRenderMap: MutableHashMap$WonderCommonlib.createEmpty(undefined, undefined)
            });
}

function _markAllNotRender(param) {
  var match = stateContainer.state;
  return ArraySt$WonderCommonlib.forEach(HashMap$WonderCommonlib.entries(match.isRenderMap), (function (param) {
                if (param[1]) {
                  return markNotRender(param[0]);
                }
                
              }));
}

function render(param) {
  var match = stateContainer.state;
  var stateMap = match.stateMap;
  var execFuncMap = match.execFuncMap;
  ArraySt$WonderCommonlib.forEach(HashMap$WonderCommonlib.entries(match.isRenderMap), (function (param) {
          if (!param[1]) {
            return ;
          }
          var execFunc = MutableHashMap$WonderCommonlib.unsafeGet(execFuncMap, param[0]);
          return Curry._1(execFunc, stateMap);
        }));
  return _markAllNotRender(undefined);
}

function addExecFunc(id, func) {
  var init = stateContainer.state;
  return setState({
              execFuncMap: MutableHashMap$WonderCommonlib.set(stateContainer.state.execFuncMap, id, func),
              stateMap: init.stateMap,
              isRenderMap: init.isRenderMap
            });
}

function removeExecFunc(id) {
  var init = stateContainer.state;
  return setState({
              execFuncMap: MutableHashMap$WonderCommonlib.deleteVal(stateContainer.state.execFuncMap, id),
              stateMap: init.stateMap,
              isRenderMap: init.isRenderMap
            });
}

function setState$1(id, uiState) {
  var init = stateContainer.state;
  return setState({
              execFuncMap: init.execFuncMap,
              stateMap: MutableHashMap$WonderCommonlib.set(stateContainer.state.stateMap, id, uiState),
              isRenderMap: init.isRenderMap
            });
}

var drawButton = (function(x,y,width,height,onClickFunc) {
  let id = "_" + ( x+y ).toString()

  if(document.querySelector("#" + id) !== null){
document.querySelector("#" + id).remove()
  }


let button = document.createElement("button")

button.style.position = "absolute"
button.style.left = x + "px"
button.style.top = y + "px"
button.style.width = width + "px"
button.style.height = height + "px"
button.innerHTML = "button"

button.onclick = onClickFunc
button.id = id

  document.body.appendChild(
    button
  )
});

function dispatch(param) {
  if (param[0] === "submit") {
    var id = "showAllRegisteredEventHandlers";
    var state = MutableHashMap$WonderCommonlib.unsafeGet(stateContainer.state.stateMap, id);
    ArraySt$WonderCommonlib.push(state.eventHandlerArr, {
          eventName: param[1],
          handlerFunc: param[2]
        });
    return MutableHashMap$WonderCommonlib.set(stateContainer.state.isRenderMap, id, true);
  }
  throw {
        RE_EXN_ID: "Match_failure",
        _1: [
          "UI.res",
          165,
          2
        ],
        Error: new Error()
      };
}

function useSelector(uiState) {
  return uiState;
}

function buildAPI(param) {
  return {
          addExecFunc: addExecFunc,
          removeExecFunc: removeExecFunc,
          setState: setState$1,
          drawButton: drawButton,
          dispatch: dispatch,
          useSelector: useSelector,
          markRender: markRender
        };
}

function getData(param) {
  return {
          init: init,
          addExecFunc: addExecFunc,
          removeExecFunc: removeExecFunc,
          setState: setState$1,
          markRender: markRender,
          dispatch: dispatch,
          useSelector: useSelector,
          render: render,
          buildAPI: buildAPI
        };
}

export {
  _createStateContainer ,
  stateContainer ,
  unsafeGetState ,
  markNotRender ,
  markRender ,
  init ,
  _markAllNotRender ,
  render ,
  addExecFunc ,
  removeExecFunc ,
  setState$1 as setState,
  drawButton ,
  dispatch ,
  useSelector ,
  buildAPI ,
  getData ,
  
}
/* No side effect */
