open StateDataMainType;

let createScript = state => CreateScriptMainService.create(state);

let unsafeGetScriptGameObject = (script, state) =>
  GameObjectScriptMainService.unsafeGetGameObject(script, state.scriptRecord);

let addScriptEventFunctionData =
    (script, scriptEventFunctionDataName, scriptEventFunctionData, state) =>
  OperateScriptDataMainService.addScriptEventFunctionData(
    script,
    scriptEventFunctionDataName,
    scriptEventFunctionData,
    state,
  );

let removeScriptEventFunctionData =
    (script, scriptEventFunctionDataName, state) =>
  OperateScriptDataMainService.removeScriptEventFunctionData(
    script,
    scriptEventFunctionDataName,
    state,
  );

let replaceScriptEventFunctionData =
    (script, scriptEventFunctionDataName, scriptEventFunctionData, state) =>
  OperateScriptDataMainService.replaceScriptEventFunctionData(
    script,
    scriptEventFunctionDataName,
    scriptEventFunctionData,
    state,
  );

let unsafeGetScriptEventFunctionDataEntries = (script, state) =>
  OperateScriptDataMainService.unsafeGetScriptEventFunctionDataEntries(
    script,
    state,
  );

let addScriptAttribute = (script, scriptAttributeName, scriptAttribute, state) =>
  OperateScriptDataMainService.addScriptAttribute(
    script,
    scriptAttributeName,
    scriptAttribute,
    state,
  );

let removeScriptAttribute = (script, scriptAttributeName, state) =>
  OperateScriptDataMainService.removeScriptAttribute(
    script,
    scriptAttributeName,
    state,
  );

let replaceScriptAttribute =
    (script, scriptAttributeName, scriptAttribute, state) =>
  OperateScriptDataMainService.replaceScriptAttribute(
    script,
    scriptAttributeName,
    scriptAttribute,
    state,
  );

let unsafeGetScriptAttributeEntries = (script, state) =>
  OperateScriptDataMainService.unsafeGetScriptAttributeEntries(script, state);

let unsafeGetScriptAttribute = (script, attributeName, state) =>
  OperateScriptDataMainService.unsafeGetScriptAttribute(
    script,
    attributeName,
    state,
  );

let setScriptAttributeFieldDefaultValueAndValue =
    (script, scriptAttributeName, fieldName, value, state) =>
  OperateScriptDataMainService.setScriptAttributeFieldDefaultValueAndValue(
    script,
    (scriptAttributeName, fieldName, value),
    state,
  );