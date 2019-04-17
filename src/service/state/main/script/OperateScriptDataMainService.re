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

let addEventFunctionDataMap =
    (script, eventFunctionDataMap, {scriptRecord} as state) => {
  let ({scriptEventFunctionDataMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

  {
    ...state,
    scriptRecord: {
      ...scriptRecord,
      scriptEventFunctionDataMap:
        scriptEventFunctionDataMap
        |> WonderCommonlib.ImmutableSparseMapService.set(
             script,
             eventFunctionDataMap,
           ),
    },
  };
};

let addScriptEventFunctionData =
    (
      script,
      scriptEventFunctionDataName,
      scriptEventFunctionData,
      {scriptRecord} as state,
    ) => {
  let ({scriptEventFunctionDataMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

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

let addAttributeMap = (script, attributeMap, {scriptRecord} as state) => {
  let ({scriptAttributeMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

  {
    ...state,
    scriptRecord: {
      ...scriptRecord,
      scriptAttributeMap:
        scriptAttributeMap
        |> WonderCommonlib.ImmutableSparseMapService.set(script, attributeMap),
    },
  };
};

let addScriptAttribute =
    (script, scriptAttributeName, scriptAttribute, {scriptRecord} as state) => {
  let ({scriptAttributeMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

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

let _removeScriptData = (script, scriptDataName, dataMap, scriptDataMap) =>
  dataMap
  |> WonderCommonlib.ImmutableHashMapService.deleteVal(scriptDataName)
  |> WonderCommonlib.ImmutableSparseMapService.set(script, _, scriptDataMap);

let _removeScriptEventFunctionData =
    (
      script,
      scriptEventFunctionDataName,
      eventFunctionDataMap,
      scriptEventFunctionDataMap,
    ) =>
  _removeScriptData(
    script,
    scriptEventFunctionDataName,
    eventFunctionDataMap,
    scriptEventFunctionDataMap,
  );

let _removeScriptAttribute =
    (script, scriptAttributeName, attributeMap, scriptAttributeMap) =>
  _removeScriptData(
    script,
    scriptAttributeName,
    attributeMap,
    scriptAttributeMap,
  );

let removeScriptEventFunctionData =
    (script, scriptEventFunctionDataName, {scriptRecord} as state) => {
  let ({scriptEventFunctionDataMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

  {
    ...state,
    scriptRecord: {
      ...scriptRecord,
      scriptEventFunctionDataMap:
        switch (
          scriptEventFunctionDataMap
          |> WonderCommonlib.ImmutableSparseMapService.get(script)
        ) {
        | None => scriptEventFunctionDataMap
        | Some(eventFunctionDataMap) =>
          _removeScriptEventFunctionData(
            script,
            scriptEventFunctionDataName,
            eventFunctionDataMap,
            scriptEventFunctionDataMap,
          )
        },
    },
  };
};

let removeScriptAttribute =
    (script, scriptAttributeName, {scriptRecord} as state) => {
  let ({scriptAttributeMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

  {
    ...state,
    scriptRecord: {
      ...scriptRecord,
      scriptAttributeMap:
        switch (
          scriptAttributeMap
          |> WonderCommonlib.ImmutableSparseMapService.get(script)
        ) {
        | None => scriptAttributeMap
        | Some(attributeMap) =>
          _removeScriptAttribute(
            script,
            scriptAttributeName,
            attributeMap,
            scriptAttributeMap,
          )
        },
    },
  };
};

let replaceScriptEventFunctionData =
    (
      script,
      (sourceScriptEventFunctionDataName, targetScriptEventFunctionDataName),
      targetScriptEventFunctionData,
      state,
    ) =>
  removeScriptEventFunctionData(
    script,
    sourceScriptEventFunctionDataName,
    state,
  )
  |> addScriptEventFunctionData(
       script,
       targetScriptEventFunctionDataName,
       targetScriptEventFunctionData,
     );

let replaceScriptAttribute =
    (
      script,
      (sourceScriptAttributeName, targetScriptAttributeName),
      targetScriptAttribute,
      state,
    ) =>
  removeScriptAttribute(script, sourceScriptAttributeName, state)
  |> addScriptAttribute(
       script,
       targetScriptAttributeName,
       targetScriptAttribute,
     );

let getScriptEventFunctionDataEntries = (script, {scriptRecord} as state) => {
  let ({scriptEventFunctionDataMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

  scriptEventFunctionDataMap
  |> WonderCommonlib.ImmutableSparseMapService.get(script)
  |> Js.Option.andThen((. eventFunctionDataMap) =>
       (
         eventFunctionDataMap
         |> WonderCommonlib.ImmutableHashMapService.getValidEntries
       )
       ->Some
     );
};

let unsafeGetScriptEventFunctionDataEntries =
    (script, {scriptRecord} as state) =>
  getScriptEventFunctionDataEntries(script, state) |> OptionService.unsafeGet;

let getScriptAttributeEntries = (script, {scriptRecord} as state) => {
  let ({scriptAttributeMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

  scriptAttributeMap
  |> WonderCommonlib.ImmutableSparseMapService.get(script)
  |> Js.Option.andThen((. attributeMap) =>
       (
         attributeMap |> WonderCommonlib.ImmutableHashMapService.getValidEntries
       )
       ->Some
     );
};

let unsafeGetScriptAttributeEntries = (script, {scriptRecord} as state) =>
  getScriptAttributeEntries(script, state) |> OptionService.unsafeGet;

let getScriptAttribute =
    (script, scriptAttributeName, {scriptRecord} as state) => {
  let ({scriptAttributeMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

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

let _setScriptAttributeFieldData =
    (
      script,
      (scriptAttributeName, fieldName, data),
      setScriptAttributeFieldDataFunc,
      {scriptRecord} as state,
    ) =>
  switch (getScriptAttribute(script, scriptAttributeName, state)) {
  | None => state
  | Some(scriptAttribute) =>
    setScriptAttribute(
      script,
      scriptAttributeName,
      scriptAttribute |> setScriptAttributeFieldDataFunc(fieldName, data),
      state,
    )
  };

let setScriptAttributeFieldValue =
    (
      script,
      (scriptAttributeName, fieldName, value),
      {scriptRecord} as state,
    ) =>
  _setScriptAttributeFieldData(
    script,
    (scriptAttributeName, fieldName, value),
    OperateScriptAttributeDataMainService.setScriptAttributeFieldValue,
    state,
  );

let setScriptAttributeFieldDefaultValueAndValue =
    (
      script,
      (scriptAttributeName, fieldName, value),
      {scriptRecord} as state,
    ) =>
  _setScriptAttributeFieldData(
    script,
    (scriptAttributeName, fieldName, value),
    OperateScriptAttributeDataMainService.setScriptAttributeFieldDefaultValueAndValue,
    state,
  );

let getScriptAllEventFunctionData = (script, {scriptRecord} as state) => {
  let ({scriptEventFunctionDataMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

  scriptEventFunctionDataMap
  |> WonderCommonlib.ImmutableSparseMapService.get(script);
};

let unsafeGetScriptAllEventFunctionData = (script, {scriptRecord} as state) => {
  let ({scriptEventFunctionDataMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

  scriptEventFunctionDataMap
  |> ImmutableSparseMapService.unsafeGetAndCheck(script);
};

let setScriptAllEventFunctionData =
    (script, allEventFunctionData, {scriptRecord} as state) => {
  let ({scriptEventFunctionDataMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

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

let getScriptAllAttributes = (script, {scriptRecord} as state) => {
  let ({scriptAttributeMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

  scriptAttributeMap |> WonderCommonlib.ImmutableSparseMapService.get(script);
};

let unsafeGetScriptAllAttributes = (script, {scriptRecord} as state) => {
  let ({scriptAttributeMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

  scriptAttributeMap |> ImmutableSparseMapService.unsafeGetAndCheck(script);
};

let setScriptAllAttributes = (script, allAttributes, {scriptRecord} as state) => {
  let ({scriptAttributeMap}: StateDataMainType.scriptRecord) as scriptRecord = scriptRecord;

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
  |> WonderCommonlib.ImmutableHashMapService.map((. attributes) =>
       attributes
       |> WonderCommonlib.ImmutableHashMapService.map(
            (.
              (
                {value, defaultValue}: ScriptAttributeType.scriptAttributeField
              ) as scriptAttributeField,
            ) =>
            {...scriptAttributeField, value: defaultValue}
          )
     );