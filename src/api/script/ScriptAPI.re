open StateDataMainType;

let createScript = state => CreateScriptMainService.create(. state);

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
    (
      script,
      (sourceScriptEventFunctionDataName, targetScriptEventFunctionDataName),
      targetScriptEventFunctionData,
      state,
    ) =>
  OperateScriptDataMainService.replaceScriptEventFunctionData(
    script,
    (sourceScriptEventFunctionDataName, targetScriptEventFunctionDataName),
    targetScriptEventFunctionData,
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
    (
      script,
      (sourceScriptAttributeName, targetScriptAttributeName),
      targetScriptAttribute,
      state,
    ) =>
  OperateScriptDataMainService.replaceScriptAttribute(
    script,
    (sourceScriptAttributeName, targetScriptAttributeName),
    targetScriptAttribute,
    state,
  );

let unsafeGetScriptAttributeEntries = (script, state) =>
  OperateScriptDataMainService.unsafeGetScriptAttributeEntries(script, state);

let unsafeGetScriptAttribute = (script, scriptAttributeName, state) =>
  OperateScriptDataMainService.unsafeGetScriptAttribute(
    script,
    scriptAttributeName,
    state,
  );

let unsafeGetScriptAttributeFieldDefaultValue =
    (script, scriptAttributeName, fieldName, state) =>
  OperateScriptDataMainService.unsafeGetScriptAttribute(
    script,
    scriptAttributeName,
    state,
  )
  |> OperateScriptAttributeDataMainService.unsafeGetScriptAttributeFieldDefaultValue(
       fieldName,
     );

let setScriptAttributeFieldDefaultValueAndValue =
    (script, scriptAttributeName, fieldName, value, state) =>
  OperateScriptDataMainService.setScriptAttributeFieldDefaultValueAndValue(
    script,
    (scriptAttributeName, fieldName, value),
    state,
  );