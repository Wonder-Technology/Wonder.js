/* TODO add removeXXX apis */

open StateDataMainType;

let createScript = state => CreateScriptMainService.create(state);

let unsafeGetScriptGameObject = (script, state) =>
  GameObjectScriptMainService.unsafeGetGameObject(script, state.scriptRecord);

let addScriptEventFunction =
    (script, scriptEventFunctionDataName, scriptEventFunctionData, state) =>
  OperateScriptDataMainService.addScriptEventFunctionData(
    script,
    scriptEventFunctionDataName,
    scriptEventFunctionData,
    state,
  );

let addScriptAttribute = (script, scriptAttributeName, scriptAttribute, state) =>
  OperateScriptDataMainService.addScriptAttribute(
    script,
    scriptAttributeName,
    scriptAttribute,
    state,
  );

let unsafeGetScriptAttribute = (script, attributeName, state) =>
  OperateScriptDataMainService.unsafeGetScriptAttribute(
    script,
    attributeName,
    state,
  );

/* let findScriptAttribute = (gameObjectName, state) => {

   }; */

/* let setScriptAttributeDefaultValue = (script, scriptAttributeJsObj, attributeName, defaultValue, state) => {

   }; */