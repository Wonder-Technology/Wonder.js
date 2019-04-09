let getScriptAttributeName = () => "scriptAttribute";

let getScriptAttributeFieldName = () => "a";

let buildEventFunc = () =>
  (. script, api, state) => {
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