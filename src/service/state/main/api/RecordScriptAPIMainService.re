open StateDataMainType;

let getScriptAPIJsObj = state => state.apiRecord.scriptAPIJsObj;

/* let setScriptAPIJsObj = (scriptAPIJsObj, {apiRecord} as state) => {
     ...state,
     apiRecord: {
       ...apiRecord,
       scriptAPIJsObj,
     },
   }; */

let create = () => {
  "unsafeGetScriptAttribute": OperateScriptDataMainService.unsafeGetScriptAttribute,
  "unsafeGetScriptAttributeFieldValue": OperateScriptAttributeDataMainService.unsafeGetScriptAttributeFieldValue,
  "setScriptAttributeFieldValue": OperateScriptDataMainService.setScriptAttributeFieldValue,
};