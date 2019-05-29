open StateDataMainType;

let getScriptAPIJsObj = state => state.apiRecord.scriptAPIJsObj;

let setScriptAPIJsObj = (scriptAPIJsObj, state) => {
  ...state,
  apiRecord: {
    ...state.apiRecord,
    scriptAPIJsObj,
  },
};