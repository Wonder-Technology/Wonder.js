open StateDataMainType;

let _addScriptData =
    (script, (scriptDataName, scriptData), dataMap, scriptDataMap) =>
  dataMap
  |> WonderCommonlib.ImmutableHashMapService.set(scriptDataName, scriptData)
  |> WonderCommonlib.ImmutableSparseMapService.set(script, _, scriptDataMap);

let _addScriptEventFunctionData =
    (
      script,
      (scriptEventFunctionDataName, scriptEventFunctionData),
      eventFunctionDataMap,
      scriptEventFunctionDataMap,
    ) =>
  _addScriptData(
    script,
    (scriptEventFunctionDataName, scriptEventFunctionData),
    eventFunctionDataMap,
    scriptEventFunctionDataMap,
  );

let _addScriptAttribute =
    (
      script,
      (scriptAttributeName, scriptAttribute),
      attributeMap,
      scriptAttributeMap,
    ) =>
  _addScriptData(
    script,
    (scriptAttributeName, scriptAttribute),
    attributeMap,
    scriptAttributeMap,
  );

let addScriptEventFunctionData =
    (
      script,
      scriptEventFunctionDataName,
      scriptEventFunctionData,
      {scriptRecord} as state,
    ) => {
  let {scriptEventFunctionDataMap} as scriptRecord = scriptRecord;

  {
    ...state,
    scriptRecord: {
      ...scriptRecord,
      scriptEventFunctionDataMap:
        switch (
          scriptEventFunctionDataMap
          |> WonderCommonlib.ImmutableSparseMapService.get(script)
        ) {
        | None =>
          _addScriptEventFunctionData(
            script,
            (scriptEventFunctionDataName, scriptEventFunctionData),
            WonderCommonlib.ImmutableHashMapService.createEmpty(),
            scriptEventFunctionDataMap,
          )
        | Some(eventFunctionDataMap) =>
          _addScriptEventFunctionData(
            script,
            (scriptEventFunctionDataName, scriptEventFunctionData),
            eventFunctionDataMap,
            scriptEventFunctionDataMap,
          )
        },
    },
  };
};

let addScriptAttribute =
    (script, scriptAttributeName, scriptAttribute, {scriptRecord} as state) => {
  let {scriptAttributeMap} as scriptRecord = scriptRecord;

  {
    ...state,
    scriptRecord: {
      ...scriptRecord,
      scriptAttributeMap:
        switch (
          scriptAttributeMap
          |> WonderCommonlib.ImmutableSparseMapService.get(script)
        ) {
        | None =>
          _addScriptAttribute(
            script,
            (scriptAttributeName, scriptAttribute),
            WonderCommonlib.ImmutableHashMapService.createEmpty(),
            scriptAttributeMap,
          )
        | Some(attributeMap) =>
          _addScriptAttribute(
            script,
            (scriptAttributeName, scriptAttribute),
            attributeMap,
            scriptAttributeMap,
          )
        },
    },
  };
};

let getScriptAttribute =
    (script, scriptAttributeName, {scriptRecord} as state) => {
  let {scriptAttributeMap} as scriptRecord = scriptRecord;

  scriptAttributeMap
  |> WonderCommonlib.ImmutableSparseMapService.get(script)
  |> Js.Option.andThen((. scriptAttribute) =>
       scriptAttribute
       |> WonderCommonlib.ImmutableHashMapService.get(scriptAttributeName)
     );
};

let unsafeGetScriptAttribute =
    (script, scriptAttributeName, {scriptRecord} as state) =>
  getScriptAttribute(script, scriptAttributeName, state)
  |> OptionService.unsafeGet;

let setScriptAttribute = addScriptAttribute;

let setScriptAttributeFieldValue =
    (script, scriptAttributeName, fieldName, value, {scriptRecord} as state) =>
  switch (getScriptAttribute(script, scriptAttributeName, state)) {
  | None => state
  | Some(scriptAttribute) =>
    setScriptAttribute(
      script,
      scriptAttributeName,
      scriptAttribute
      |> OperateScriptAttributeDataMainService.setScriptAttributeFieldValue(
           fieldName,
           value,
         ),
      state,
    )
  };

let unsafeGetScriptAllEventFunctionData = (script, {scriptRecord} as state) => {
  let {scriptEventFunctionDataMap} = scriptRecord;

  scriptEventFunctionDataMap
  |> ImmutableSparseMapService.unsafeGetAndCheck(script);
};

let setScriptAllEventFunctionData =
    (script, allEventFunctionData, {scriptRecord} as state) => {
  let {scriptEventFunctionDataMap} = scriptRecord;

  {
    ...state,
    scriptRecord: {
      ...scriptRecord,
      scriptEventFunctionDataMap:
        scriptEventFunctionDataMap
        |> WonderCommonlib.ImmutableSparseMapService.set(
             script,
             allEventFunctionData,
           ),
    },
  };
};

let unsafeGetScriptAllAttributes = (script, {scriptRecord} as state) => {
  let {scriptAttributeMap} = scriptRecord;

  scriptAttributeMap |> ImmutableSparseMapService.unsafeGetAndCheck(script);
};

let setScriptAllAttributes = (script, allAttributes, {scriptRecord} as state) => {
  let {scriptAttributeMap} = scriptRecord;

  {
    ...state,
    scriptRecord: {
      ...scriptRecord,
      scriptAttributeMap:
        scriptAttributeMap
        |> WonderCommonlib.ImmutableSparseMapService.set(
             script,
             allAttributes,
           ),
    },
  };
};

let resetScriptAllAttributesFieldValue = allAttributes =>
  allAttributes
  |> ImmutableHashMapService.map((. attributes) =>
       attributes
       |> ImmutableHashMapService.map(
            (.
              (
                {value, defaultValue}: ScriptAttributeType.scriptAttributeField
              ) as scriptAttributeField,
            ) =>
            {...scriptAttributeField, value: defaultValue}
          )
     );