'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Main$WonderEngineCore = require("wonder-engine-core/lib/js/src/Main.bs.js");
var Utils$WonderEditorCore = require("../Utils.bs.js");
var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var ImmutableHashMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

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

var _getFromLocalStorage = (function(name) {
  return window.localStorage[name]
});

var _setToLocalStorage = (function(name, data) {
  window.localStorage[name] = data
});

function setRegisteredWorkPlugin(fileStr, libraryName, funcName) {
  return setState({
              registeredWorkPluginDataMap: ImmutableHashMap$WonderCommonlib.set(stateContainer.state.registeredWorkPluginDataMap, libraryName, {
                    fileStr: fileStr,
                    libraryName: libraryName,
                    funcName: funcName
                  })
            });
}

function setAllSavedToState(param) {
  return 1;
}

function saveAllRegisteredWorkPugins(param) {
  var match = stateContainer.state;
  return ArraySt$WonderCommonlib.forEach(ImmutableHashMap$WonderCommonlib.getValidValues(match.registeredWorkPluginDataMap), (function (param) {
                var libraryName = param.libraryName;
                _setToLocalStorage(libraryName + "_fileStr", param.fileStr);
                _setToLocalStorage(libraryName + "_libraryName", libraryName);
                return _setToLocalStorage(libraryName + "_funcName", param.funcName);
              }));
}

function registerAllSaved(param) {
  var libraryName = "WorkPluginTest1";
  var fileStr = OptionSt$WonderCommonlib.fromNullable(_getFromLocalStorage(libraryName + "_fileStr"));
  if (fileStr === undefined) {
    return ;
  }
  var libraryName$1 = _getFromLocalStorage(libraryName + "_libraryName");
  var funcName = _getFromLocalStorage(libraryName$1 + "_funcName");
  var getData = Utils$WonderEditorCore.serialize(Caml_option.valFromOption(fileStr), libraryName$1, funcName);
  return Main$WonderEngineCore.registerWorkPlugin(Curry._1(getData, undefined), [{
                pipelineName: "init",
                insertElementName: "init_root_wonder",
                insertAction: "after"
              }], undefined);
}

function buildAPI(param) {
  return {
          setRegisteredWorkPlugin: setRegisteredWorkPlugin,
          saveAllRegisteredWorkPugins: saveAllRegisteredWorkPugins
        };
}

function init(param) {
  return setState({
              registeredWorkPluginDataMap: ImmutableHashMap$WonderCommonlib.createEmpty(undefined, undefined)
            });
}

function getData(param) {
  return {
          buildAPI: buildAPI,
          init: init,
          setRegisteredWorkPlugin: setRegisteredWorkPlugin,
          saveAllRegisteredWorkPugins: saveAllRegisteredWorkPugins,
          registerAllSaved: registerAllSaved,
          setAllSavedToState: setAllSavedToState
        };
}

exports._createStateContainer = _createStateContainer;
exports.stateContainer = stateContainer;
exports.setState = setState;
exports.unsafeGetState = unsafeGetState;
exports._getFromLocalStorage = _getFromLocalStorage;
exports._setToLocalStorage = _setToLocalStorage;
exports.setRegisteredWorkPlugin = setRegisteredWorkPlugin;
exports.setAllSavedToState = setAllSavedToState;
exports.saveAllRegisteredWorkPugins = saveAllRegisteredWorkPugins;
exports.registerAllSaved = registerAllSaved;
exports.buildAPI = buildAPI;
exports.init = init;
exports.getData = getData;
/* Main-WonderEngineCore Not a pure module */
