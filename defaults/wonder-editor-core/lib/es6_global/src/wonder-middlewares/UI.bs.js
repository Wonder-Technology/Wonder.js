

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Utils$WonderEditorCore from "../Utils.bs.js";
import * as ArraySt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as HashMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/hash_map/HashMap.bs.js";
import * as MutableHashMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/hash_map/MutableHashMap.bs.js";
import * as MiddlewareManager$WonderEditorCore from "./MiddlewareManager.bs.js";

function markNotRender(state, id) {
  MutableHashMap$WonderCommonlib.set(state.isRenderMap, id, false);
  
}

function markRender(state, id) {
  MutableHashMap$WonderCommonlib.set(state.isRenderMap, id, true);
  
}

function init(param) {
  return {
          execFuncMap: MutableHashMap$WonderCommonlib.createEmpty(undefined, undefined),
          stateMap: MutableHashMap$WonderCommonlib.createEmpty(undefined, undefined),
          isRenderMap: MutableHashMap$WonderCommonlib.createEmpty(undefined, undefined)
        };
}

function _markAllNotRender(state) {
  ArraySt$WonderCommonlib.forEach(HashMap$WonderCommonlib.entries(state.isRenderMap), (function (param) {
          if (param[1]) {
            return markNotRender(state, param[0]);
          }
          
        }));
  return state;
}

function render(states) {
  var middlewareState = states.middlewareState;
  var state = MiddlewareManager$WonderEditorCore.unsafeGetState(middlewareState, "UI");
  var execFuncMap = state.execFuncMap;
  ArraySt$WonderCommonlib.reduceOneParam(HashMap$WonderCommonlib.entries(state.isRenderMap), (function (states, param) {
          if (!param[1]) {
            return states;
          }
          var execFunc = MutableHashMap$WonderCommonlib.unsafeGet(execFuncMap, param[0]);
          return Curry._2(execFunc, states, Utils$WonderEditorCore.buildAPI(undefined));
        }), states);
  var state$1 = _markAllNotRender(state);
  var middlewareState$1 = MiddlewareManager$WonderEditorCore.setState(middlewareState, "UI", state$1);
  return {
          middlewareState: middlewareState$1
        };
}

function addExecFunc(state, id, func) {
  return {
          execFuncMap: MutableHashMap$WonderCommonlib.set(state.execFuncMap, id, func),
          stateMap: state.stateMap,
          isRenderMap: state.isRenderMap
        };
}

function removeExecFunc(state, id) {
  return {
          execFuncMap: MutableHashMap$WonderCommonlib.deleteVal(state.execFuncMap, id),
          stateMap: state.stateMap,
          isRenderMap: state.isRenderMap
        };
}

function setState(state, id, uiState) {
  return {
          execFuncMap: state.execFuncMap,
          stateMap: MutableHashMap$WonderCommonlib.set(state.stateMap, id, uiState),
          isRenderMap: state.isRenderMap
        };
}

var drawButton = (// function(states, state, x,y,width,height,text,onClickFunc) {
function(states, x,y,width,height,text,onClickFunc) {
  /////*! only read state, not write it */
  /*! get state from states */

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
button.innerHTML =text

// TODO fix onclick, should return states
button.onclick = (e) => onClickFunc(states, e)
button.id = id

  document.body.appendChild(
    button
  )

  return states
});

function dispatch(state, param) {
  if (param[0] === "submit") {
    var id = "showAllRegisteredEventHandlers";
    var uiState = MutableHashMap$WonderCommonlib.unsafeGet(state.stateMap, id);
    ArraySt$WonderCommonlib.push(uiState.eventHandlerArr, {
          eventName: param[1],
          handlerFunc: param[2]
        });
    MutableHashMap$WonderCommonlib.set(state.isRenderMap, id, true);
  } else {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "UI.res",
            172,
            2
          ],
          Error: new Error()
        };
  }
  return state;
}

function useSelector(uiState) {
  return uiState;
}

function register(state, param) {
  var id = param.id;
  return markRender(setState(addExecFunc(removeExecFunc(state, id), id, param.func), id, param.stateValue), id);
}

function getData(param) {
  return {
          init: init,
          addExecFunc: addExecFunc,
          removeExecFunc: removeExecFunc,
          setState: setState,
          markRender: markRender,
          dispatch: dispatch,
          useSelector: useSelector,
          render: render,
          drawButton: drawButton,
          register: register
        };
}

export {
  markNotRender ,
  markRender ,
  init ,
  _markAllNotRender ,
  render ,
  addExecFunc ,
  removeExecFunc ,
  setState ,
  drawButton ,
  dispatch ,
  useSelector ,
  register ,
  getData ,
  
}
/* No side effect */
