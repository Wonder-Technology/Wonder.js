let getScriptAttributeName = () => "scriptAttribute";

let getScriptAttributeFieldName = () => "a";

let buildEventFunc = () =>
  (. script, api, state) => {
    let api = Obj.magic(api);
    let scriptAttributeName = getScriptAttributeName();

    let unsafeGetScriptAttribute = api##unsafeGetScriptAttribute;

    let scriptAttribute =
      unsafeGetScriptAttribute(. script, scriptAttributeName, state);

    let unsafeGetScriptAttributeFieldValue =
      api##unsafeGetScriptAttributeFieldValue;
    let setScriptAttributeFieldValue = api##setScriptAttributeFieldValue;

    let state =
      setScriptAttributeFieldValue(.
        script,
        (
          scriptAttributeName,
          getScriptAttributeFieldName(),
          (
            unsafeGetScriptAttributeFieldValue(.
              getScriptAttributeFieldName(),
              scriptAttribute,
            )
            |> ScriptAttributeType.scriptAttributeValueToInt
          )
          + 1
          |> ScriptAttributeType.intToScriptAttributeValue,
        ),
        state,
      );

    state;
  };

let getAttributeFieldAValueAfterExecEventeFunc = () => 2;

let buildEventFunc2 = () =>
  (. script, api, state) => {
    let api = Obj.magic(api);
    let scriptAttributeName = getScriptAttributeName();

    let unsafeGetScriptAttribute = api##unsafeGetScriptAttribute;

    let scriptAttribute =
      unsafeGetScriptAttribute(. script, scriptAttributeName, state);

    let unsafeGetScriptAttributeFieldValue =
      api##unsafeGetScriptAttributeFieldValue;
    let setScriptAttributeFieldValue = api##setScriptAttributeFieldValue;

    let state =
      setScriptAttributeFieldValue(.
        script,
        (
          scriptAttributeName,
          getScriptAttributeFieldName(),
          (
            unsafeGetScriptAttributeFieldValue(.
              getScriptAttributeFieldName(),
              scriptAttribute,
            )
            |> ScriptAttributeType.scriptAttributeValueToInt
          )
          + 2
          |> ScriptAttributeType.intToScriptAttributeValue,
        ),
        state,
      );

    state;
  };

let getAttributeFieldAValueAfterExecEventeFunc2 = () => 3;

/* let isExecAllInitEventFunction = (allScripts, state) =>
     allScripts
     |> Js.Array.map(script =>
          ScriptTool.unsafeGetScriptAttributeIntFieldValue(
            script,
            getScriptAttributeName(),
            getScriptAttributeFieldName(),
            state,
          )
        )
     == [|getAttributeFieldAValueAfterExecEventeFunc()|];

   let isExecAllUpdateEventFunction = (allScripts, state) =>
     allScripts
     |> Js.Array.map(script =>
          ScriptTool.unsafeGetScriptAttributeIntFieldValue(
            script,
            getScriptAttributeName(),
            getScriptAttributeFieldName(),
            state,
          )
        )
     == [|getAttributeFieldAValueAfterExecEventeFunc()|]; */

let buildEventFunctionDataMap =
    (
      ~initFunc=Some(buildEventFunc()),
      ~updateFunc=Some(buildEventFunc()),
      ~disposeFunc=None,
      (),
    ) => {
  let eventFunctionDataMap =
    WonderCommonlib.ImmutableHashMapService.createEmpty();

  let scriptEventFunctionData =
    ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptEventFunctionData(
      ~initFunc,
      ~updateFunc,
      ~disposeFunc,
    );

  let eventFunctionDataName = "eventFunctionData";

  eventFunctionDataMap
  |> WonderCommonlib.ImmutableHashMapService.set(
       eventFunctionDataName,
       scriptEventFunctionData,
     );
};

/* let buildEventFunctionDataMap = () => {
     let eventFunctionDataMap =
       WonderCommonlib.ImmutableHashMapService.createEmpty();

     let scriptEventFunctionData =
       ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptEventFunctionData(
         ~initFunc=Some(buildEventFunc()),
         ~updateFunc=Some(buildEventFunc()),
         ~disposeFunc=None,
       );

     let eventFunctionDataName = "eventFunctionData";

     eventFunctionDataMap
     |> WonderCommonlib.ImmutableHashMapService.set(
          eventFunctionDataName,
          scriptEventFunctionData,
        );
   }; */

let buildAttributeMap = () => {
  let attributeMap = WonderCommonlib.ImmutableHashMapService.createEmpty();

  let scriptAttributeName = getScriptAttributeName();

  let scriptAttribute =
    ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptAttribute(
      scriptAttributeName,
    );

  attributeMap
  |> WonderCommonlib.ImmutableHashMapService.set(
       scriptAttributeName,
       scriptAttribute,
     );
};