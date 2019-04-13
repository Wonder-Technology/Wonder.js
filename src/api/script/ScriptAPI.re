open StateDataMainType;

open DisposeScriptService;

let createScript = state => CreateScriptMainService.create(. state);

let unsafeGetScriptGameObject = (script, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  GameObjectScriptMainService.unsafeGetGameObject(script, state.scriptRecord);
};

let addScriptEventFunctionData =
    (script, scriptEventFunctionDataName, scriptEventFunctionData, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  OperateScriptDataMainService.addScriptEventFunctionData(
    script,
    scriptEventFunctionDataName,
    scriptEventFunctionData,
    state,
  );
};

let removeScriptEventFunctionData =
    (script, scriptEventFunctionDataName, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  OperateScriptDataMainService.removeScriptEventFunctionData(
    script,
    scriptEventFunctionDataName,
    state,
  );
};

let replaceScriptEventFunctionData =
    (
      script,
      (sourceScriptEventFunctionDataName, targetScriptEventFunctionDataName),
      targetScriptEventFunctionData,
      state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  OperateScriptDataMainService.replaceScriptEventFunctionData(
    script,
    (sourceScriptEventFunctionDataName, targetScriptEventFunctionDataName),
    targetScriptEventFunctionData,
    state,
  );
};

let unsafeGetScriptEventFunctionDataEntries = (script, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  OperateScriptDataMainService.unsafeGetScriptEventFunctionDataEntries(
    script,
    state,
  );
};

let addScriptAttribute = (script, scriptAttributeName, scriptAttribute, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  OperateScriptDataMainService.addScriptAttribute(
    script,
    scriptAttributeName,
    scriptAttribute,
    state,
  );
};

let removeScriptAttribute = (script, scriptAttributeName, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  OperateScriptDataMainService.removeScriptAttribute(
    script,
    scriptAttributeName,
    state,
  );
};

let replaceScriptAttribute =
    (
      script,
      (sourceScriptAttributeName, targetScriptAttributeName),
      targetScriptAttribute,
      state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  OperateScriptDataMainService.replaceScriptAttribute(
    script,
    (sourceScriptAttributeName, targetScriptAttributeName),
    targetScriptAttribute,
    state,
  );
};

let unsafeGetScriptAttributeEntries = (script, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  OperateScriptDataMainService.unsafeGetScriptAttributeEntries(script, state);
};

let unsafeGetScriptAttribute = (script, scriptAttributeName, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  OperateScriptDataMainService.unsafeGetScriptAttribute(
    script,
    scriptAttributeName,
    state,
  );
};

let unsafeGetScriptAttributeFieldDefaultValue =
    (script, scriptAttributeName, fieldName, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  OperateScriptDataMainService.unsafeGetScriptAttribute(
    script,
    scriptAttributeName,
    state,
  )
  |> OperateScriptAttributeDataMainService.unsafeGetScriptAttributeFieldDefaultValue(
       fieldName,
     );
};

let setScriptAttributeFieldDefaultValueAndValue =
    (script, scriptAttributeName, fieldName, value, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  OperateScriptDataMainService.setScriptAttributeFieldDefaultValueAndValue(
    script,
    (scriptAttributeName, fieldName, value),
    state,
  );
};

let unsafeGetScriptIsActive = (script, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  IsActiveScriptMainService.unsafeGetIsActive(script, state);
};

let setScriptIsActive = (script, isScriptActive, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              script,
              isAlive,
              state.scriptRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  IsActiveScriptMainService.setIsActive(script, isScriptActive, state);
};