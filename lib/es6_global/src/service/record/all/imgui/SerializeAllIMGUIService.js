

import * as SerializeService$Wonderjs from "../../../atom/SerializeService.js";

function _isCustomDataEmpty(customData) {
  return customData === "";
}

function _deserializeCustomData(customData) {
  var match = customData === "";
  if (match) {
    return null;
  } else {
    return SerializeService$Wonderjs.deserializeValueWithFunction(customData);
  }
}

function serializeWonderIMGUIExecFuncDataArr(execFuncDataArr) {
  return execFuncDataArr.map((function (param) {
                return /* record */[
                        /* execFunc */SerializeService$Wonderjs.serializeFunction(param[/* execFunc */0]),
                        /* customData */SerializeService$Wonderjs.serializeValueWithFunction(param[/* customData */1]),
                        /* execOrder */param[/* execOrder */2],
                        /* name */param[/* name */3]
                      ];
              }));
}

function deserializeExecFuncDataArrToWonderIMGUIType(execFuncDataArr) {
  return execFuncDataArr.map((function (param) {
                return /* record */[
                        /* execFunc */SerializeService$Wonderjs.deserializeFunction(param[/* execFunc */0]),
                        /* customData */_deserializeCustomData(param[/* customData */1]),
                        /* execOrder */param[/* execOrder */2],
                        /* name */param[/* name */3]
                      ];
              }));
}

function serializeWonderExecFuncDataArr(execFuncDataArr) {
  return execFuncDataArr.map((function (param) {
                return /* record */[
                        /* execFunc */SerializeService$Wonderjs.serializeFunction(param[/* execFunc */0]),
                        /* customData */SerializeService$Wonderjs.serializeValueWithFunction(param[/* customData */1]),
                        /* execOrder */param[/* execOrder */2],
                        /* name */param[/* name */3]
                      ];
              }));
}

function deserializeExecFuncDataArrToWonderType(execFuncDataArr) {
  return execFuncDataArr.map((function (param) {
                return /* record */[
                        /* execFunc */SerializeService$Wonderjs.deserializeFunction(param[/* execFunc */0]),
                        /* customData */_deserializeCustomData(param[/* customData */1]),
                        /* execOrder */param[/* execOrder */2],
                        /* name */param[/* name */3]
                      ];
              }));
}

var Exec = /* module */[
  /* _isCustomDataEmpty */_isCustomDataEmpty,
  /* _deserializeCustomData */_deserializeCustomData,
  /* serializeWonderIMGUIExecFuncDataArr */serializeWonderIMGUIExecFuncDataArr,
  /* deserializeExecFuncDataArrToWonderIMGUIType */deserializeExecFuncDataArrToWonderIMGUIType,
  /* serializeWonderExecFuncDataArr */serializeWonderExecFuncDataArr,
  /* deserializeExecFuncDataArrToWonderType */deserializeExecFuncDataArrToWonderType
];

var serializeFuncMap = SerializeService$Wonderjs.serializeValueWithFunction;

var deserializeFuncMap = SerializeService$Wonderjs.deserializeValueWithFunction;

var CustomControl = /* module */[
  /* serializeFuncMap */serializeFuncMap,
  /* deserializeFuncMap */deserializeFuncMap
];

function serializeAllSkinDataMap(allSkinDataMap) {
  return JSON.stringify(allSkinDataMap);
}

function deserializeAllSkinDataMap(allSkinDataMap) {
  return JSON.parse(allSkinDataMap);
}

var Skin = /* module */[
  /* serializeAllSkinDataMap */serializeAllSkinDataMap,
  /* deserializeAllSkinDataMap */deserializeAllSkinDataMap
];

export {
  Exec ,
  CustomControl ,
  Skin ,
  
}
/* No side effect */
