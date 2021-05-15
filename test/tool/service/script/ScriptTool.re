open StateDataMainType;

let createGameObject = state => {
  open GameObjectAPI;
  open ScriptAPI;
  let (state, script) = createScript(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectScriptComponent(gameObject, script);

  (state, gameObject, script);
};

let isAlive = (script, state) =>
  DisposeScriptService.isAlive(script, state.scriptRecord);

let buildEventFunctionJsObj =
    (~initFunc=None, ~updateFunc=None, ~disposeFunc=None, ()) => {
  "init": initFunc |> Js.Nullable.fromOption,
  "update": updateFunc |> Js.Nullable.fromOption,
  "dispose": disposeFunc |> Js.Nullable.fromOption,
};

let createIntFieldValue = value =>
  value |> ScriptAttributeType.intToScriptAttributeValue;

let createFloatFieldValue = value =>
  value |> ScriptAttributeType.floatToScriptAttributeValue;

let buildAttributeField =
    (~type_="int", ~defaultValue=1 |> createIntFieldValue) => {
  "type": type_,
  "defaultValue": defaultValue,
};

let unsafeGetScriptAttributeEntries = (fieldName, attribute) =>
  OperateScriptAttributeDataMainService.getScriptAttributeField(
    fieldName,
    attribute,
  )
  |> OptionService.unsafeGet;

let _unsafeGetScriptAttributeFieldValue =
    (
      script,
      scriptAttributeName,
      fieldName,
      convertScriptAttributeValueTypeFunc,
      state,
    ) =>
  OperateScriptAttributeDataMainService.unsafeGetScriptAttributeFieldValue(
    fieldName,
    OperateScriptDataMainService.unsafeGetScriptAttribute(
      script,
      scriptAttributeName,
      state,
    ),
  )
  |> convertScriptAttributeValueTypeFunc;

let unsafeGetScriptAttributeIntFieldValue =
    (script, scriptAttributeName, fieldName, state) =>
  _unsafeGetScriptAttributeFieldValue(
    script,
    scriptAttributeName,
    fieldName,
    ScriptAttributeType.scriptAttributeValueToInt,
    state,
  );

let unsafeGetScriptAttributeFloatFieldValue =
    (script, scriptAttributeName, fieldName, state) =>
  _unsafeGetScriptAttributeFieldValue(
    script,
    scriptAttributeName,
    fieldName,
    ScriptAttributeType.scriptAttributeValueToFloat,
    state,
  );

let _unsafeGetScriptAttributeFieldDefaultValue =
    (
      script,
      scriptAttributeName,
      fieldName,
      convertScriptAttributeValueTypeFunc,
      state,
    ) =>
  OperateScriptAttributeDataMainService.unsafeGetScriptAttributeFieldDefaultValue(
    fieldName,
    OperateScriptDataMainService.unsafeGetScriptAttribute(
      script,
      scriptAttributeName,
      state,
    ),
  )
  |> convertScriptAttributeValueTypeFunc;

let unsafeGetScriptAttributeIntFieldDefaultValue =
    (script, scriptAttributeName, fieldName, state) =>
  _unsafeGetScriptAttributeFieldDefaultValue(
    script,
    scriptAttributeName,
    fieldName,
    ScriptAttributeType.scriptAttributeValueToInt,
    state,
  );

let unsafeGetScriptAttributeFloatFieldDefaultValue =
    (script, scriptAttributeName, fieldName, state) =>
  _unsafeGetScriptAttributeFieldDefaultValue(
    script,
    scriptAttributeName,
    fieldName,
    ScriptAttributeType.scriptAttributeValueToFloat,
    state,
  );

let hasScriptAllEventFunctionData = (script, state) =>
  OperateScriptDataMainService.getScriptAllEventFunctionData(script, state)
  |> Js.Option.isSome;

let hasScriptAllAttributes = (script, state) =>
  OperateScriptDataMainService.getScriptAllAttributes(script, state)
  |> Js.Option.isSome;

let unsafeGetScriptAllEventFunctionData = OperateScriptDataMainService.unsafeGetScriptAllEventFunctionData;

let setScriptAttributeIntFieldValue =
    (script, scriptAttributeName, fieldName, fieldValue, state) =>
  OperateScriptDataMainService.setScriptAttributeFieldValue(
    script,
    (
      scriptAttributeName,
      fieldName,
      fieldValue |> ScriptAttributeType.intToScriptAttributeValue,
    ),
    state,
  );

module ExecEventFunction = {
  let execAllInitEventFunction = state => InitScriptJobUtils.exec(state);

  let execAllUpdateEventFunction = state => UpdateScriptJobUtils.exec(state);

  let execScriptArrDisposeEventFunction = (scriptArray, state) =>
    OperateScriptEventFunctionDataMainService.execAllEventFunction(
      OperateScriptEventFunctionDataMainService.getActiveScriptAllDisposeEventFunctionData(
        scriptArray,
        state,
      ),
      state,
    );
};

module API = {
  let unsafeGetScriptAttributeIntFieldValue =
      (api, fieldName, scriptAttribute) => {
    let api = Obj.magic(api);
    let unsafeGetScriptAttributeFieldValue =
      api##unsafeGetScriptAttributeFieldValue;

    unsafeGetScriptAttributeFieldValue(. fieldName, scriptAttribute)
    |> ScriptAttributeType.scriptAttributeValueToInt;
  };

  let setScriptAttributeIntFieldValue =
      (api, script, scriptAttributeName, fieldName, fieldValue, state) => {
    let api = Obj.magic(api);
    let setScriptAttributeFieldValue = api##setScriptAttributeFieldValue;

    setScriptAttributeFieldValue(.
      script,
      (
        scriptAttributeName,
        fieldName,
        fieldValue |> ScriptAttributeType.intToScriptAttributeValue,
      ),
      state,
    );
  };

  let unsafeGetScriptAttributeFloatFieldValue =
      (api, fieldName, scriptAttribute) => {
    let api = Obj.magic(api);
    let unsafeGetScriptAttributeFieldValue =
      api##unsafeGetScriptAttributeFieldValue;

    unsafeGetScriptAttributeFieldValue(. fieldName, scriptAttribute)
    |> ScriptAttributeType.scriptAttributeValueToFloat;
  };

  let setScriptAttributeFloatFieldValue =
      (api, script, scriptAttributeName, fieldName, fieldValue, state) => {
    let api = Obj.magic(api);
    let setScriptAttributeFieldValue = api##setScriptAttributeFieldValue;

    setScriptAttributeFieldValue(.
      script,
      (
        scriptAttributeName,
        fieldName,
        fieldValue |> ScriptAttributeType.floatToScriptAttributeValue,
      ),
      state,
    );
  };
};

module TestCaseWithOneEventFuncStub = {
  let buildScriptEventFunctionData = (~initFunc, ~updateFunc, ~disposeFunc) =>
    ScriptEventFunctionAPI.createScriptEventFunctionData(
      buildEventFunctionJsObj(~initFunc, ~updateFunc, ~disposeFunc, ()),
    );

  let buildScriptData =
      (
        ~script,
        ~state,
        ~sandbox,
        ~initFuncStub=Sinon.createEmptyStubWithJsObjSandbox(sandbox),
        ~updateFuncStub=Sinon.createEmptyStubWithJsObjSandbox(sandbox),
        ~disposeFuncStub=Sinon.createEmptyStubWithJsObjSandbox(sandbox),
        (),
      ) => {
    let scriptEventFunctionData =
      buildScriptEventFunctionData(
        ~initFunc=
          Some(
            (. script, api, state) => {
              initFuncStub(.);

              state;
            },
          ),
        ~updateFunc=
          Some(
            (. script, api, state) => {
              updateFuncStub(.);

              state;
            },
          ),
        ~disposeFunc=
          Some(
            (. script, api, state) => {
              disposeFuncStub(.);

              state;
            },
          ),
      );
    let scriptEventFunctionDataName = "scriptEventFunctionData1";

    let state =
      ScriptAPI.addScriptEventFunctionData(
        script,
        scriptEventFunctionDataName,
        scriptEventFunctionData,
        state,
      );

    state;
  };
};

module TestCaseWithOneEventFuncAndOneAttribute = {
  let buildScriptEventFunctionData = (~initFunc, ~updateFunc, ~disposeFunc) =>
    ScriptEventFunctionAPI.createScriptEventFunctionData(
      buildEventFunctionJsObj(~initFunc, ~updateFunc, ~disposeFunc, ()),
    );

  let getAttributeFieldADefaultValue = () => 1;

  let buildScriptAttribute = scriptAttributeName => {
    let scriptAttribute = ScriptAttributeAPI.createScriptAttribute();

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeFieldJsObj(
        "a",
        {
          "type": "int",
          "defaultValue":
            getAttributeFieldADefaultValue() |> createIntFieldValue,
        },
        scriptAttribute,
      );

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeFieldJsObj(
        "b",
        {"type": "float", "defaultValue": 0.1 |> createFloatFieldValue},
        scriptAttribute,
      );

    scriptAttribute;
  };

  let getScriptAttributeName = () => "scriptAttribute1";

  /* let buildScriptData = (script, state) => {
        let scriptAttributeName = getScriptAttributeName();
        let scriptEventFunctionData =
          buildScriptEventFunctionData(~scriptAttributeName, ());
        let scriptAttribute = buildScriptAttribute(scriptAttributeName);
        let state =
          ScriptAPI.addScriptAttribute(
            script,
            scriptAttributeName,
            scriptAttribute,
            state,
          );

        let scriptEventFunctionDataName = "scriptEventFunctionData1";

        let state =
          ScriptAPI.addScriptEventFunctionData(
            script,
            scriptEventFunctionDataName,
           scriptEventFunctionData,
           state,
         );

       state;
     }; */

  let buildSetLocalPositionEventFunc = () =>
    (. script, api, state) => {
      let api = Obj.magic(api);
      let unsafeGetScriptGameObject = api##unsafeGetScriptGameObject;
      let unsafeGetGameObjectTransformComponent =
        api##unsafeGetGameObjectTransformComponent;
      let getTransformLocalPosition = api##getTransformLocalPosition;
      let setTransformLocalPosition = api##setTransformLocalPosition;

      let transform =
        unsafeGetGameObjectTransformComponent(.
          unsafeGetScriptGameObject(. script, state),
          state,
        );

      let (x, y, z) = getTransformLocalPosition(. transform, state);

      let state =
        setTransformLocalPosition(. transform, (x +. 10., y, z), state);

      state;
    };

  let getScriptAttributeFieldAName = () => "a";

  let buildInitEventFunc = () =>
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
            getScriptAttributeFieldAName(),
            (
              unsafeGetScriptAttributeFieldValue(.
                getScriptAttributeFieldAName(),
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

  let buildUpdateEventFunc = () =>
    (. script, api, state) => {
      let api = Obj.magic(api);
      let scriptAttributeName = getScriptAttributeName();

      let unsafeGetScriptAttribute = api##unsafeGetScriptAttribute;

      let scriptAttribute =
        unsafeGetScriptAttribute(. script, scriptAttributeName, state);

      let state =
        API.setScriptAttributeFloatFieldValue(
          api,
          script,
          scriptAttributeName,
          "b",
          (
            API.unsafeGetScriptAttributeFloatFieldValue(
              api,
              "b",
              scriptAttribute,
            )
          )
          +. 10.,
          state,
        );

      state;
    };

  let getLocalPositionBeforeExec = () => (0., 0., 0.);

  let getLocalPositionAfterExec = () => (10., 0., 0.);

  let getLocalPosition = (script, state) =>
    TransformAPI.getTransformLocalPosition(
      GameObjectAPI.unsafeGetGameObjectTransformComponent(
        ScriptAPI.unsafeGetScriptGameObject(script, state),
        state,
      ),
      state,
    );

  /* let judgeLocalPosition = (script, state) => {
       open Wonder_jest;
       open Expect;
       open! Expect.Operators;

       TransformAPI.getTransformLocalPosition(
         GameObjectAPI.unsafeGetGameObjectTransformComponent(
           ScriptAPI.unsafeGetScriptGameObject(script, state),
           state,
         ),
         state,
       )
       |> expect == getLocalPositionAfterExec();
     }; */

  let buildScriptData =
      (
        ~script,
        ~state,
        ~initFunc=buildInitEventFunc(),
        ~updateFunc=buildUpdateEventFunc(),
        ~disposeFunc=buildSetLocalPositionEventFunc(),
        (),
      ) => {
    let scriptAttributeName = getScriptAttributeName();
    let scriptEventFunctionData =
      buildScriptEventFunctionData(
        ~initFunc=Some(initFunc),
        ~updateFunc=Some(updateFunc),
        ~disposeFunc=Some(disposeFunc),
      );
    let scriptAttribute = buildScriptAttribute(scriptAttributeName);
    let state =
      ScriptAPI.addScriptAttribute(
        script,
        scriptAttributeName,
        scriptAttribute,
        state,
      );

    let scriptEventFunctionDataName = "scriptEventFunctionData1";

    let state =
      ScriptAPI.addScriptEventFunctionData(
        script,
        scriptEventFunctionDataName,
        scriptEventFunctionData,
        state,
      );

    state;
  };

  let getAttributeFieldAValue = (script, state) =>
    unsafeGetScriptAttributeIntFieldValue(
      script,
      getScriptAttributeName(),
      getScriptAttributeFieldAName(),
      state,
    );

  let getAttributeFieldBValue = (script, state) =>
    unsafeGetScriptAttributeFloatFieldValue(
      script,
      getScriptAttributeName(),
      "b",
      state,
    );

  let getAttributeFieldAValueBeforeExecInitEventFunc = () => 1;

  let getAttributeFieldAValueAfterExecInitEventFunc = () => 2;

  let getAttributeFieldBValueBeforeExecUpdateEventFunc = () => 0.1;

  let getAttributeFieldBValueAfterExecUpdateEventFunc = () => 0.1 +. 10.;

  let judgeExecInitEventFunc = (script, state) => {
    open Wonder_jest;
    open Expect;
    open! Expect.Operators;

    getAttributeFieldAValue(script, state)
    |> expect == getAttributeFieldAValueAfterExecInitEventFunc();
  };

  let setScriptAttributeFieldAValue = (script, value, state) =>
    setScriptAttributeIntFieldValue(
      script,
      getScriptAttributeName(),
      getScriptAttributeFieldAName(),
      value,
      state,
    );
};

module TestCaseWithOneEventFuncAndTwoAttributes = {
  let buildScriptEventFunctionData =
      (scriptAttribute1Name, scriptAttribute2Name) =>
    ScriptEventFunctionAPI.createScriptEventFunctionData(
      buildEventFunctionJsObj(
        ~updateFunc=
          Some(
            (. script, api, state) => {
              let api = Obj.magic(api);
              let unsafeGetScriptAttribute = api##unsafeGetScriptAttribute;

              let scriptAttribute1 =
                unsafeGetScriptAttribute(.
                  script,
                  scriptAttribute1Name,
                  state,
                );
              let scriptAttribute2 =
                unsafeGetScriptAttribute(.
                  script,
                  scriptAttribute2Name,
                  state,
                );

              let state =
                API.setScriptAttributeFloatFieldValue(
                  api,
                  script,
                  scriptAttribute1Name,
                  "b",
                  API.unsafeGetScriptAttributeFloatFieldValue(
                    api,
                    "b",
                    scriptAttribute2,
                  )
                  +. 10.,
                  state,
                );

              state;
            },
          ),
        (),
      ),
    );

  let buildScriptAttribute1 = scriptAttributeName => {
    let scriptAttribute = ScriptAttributeAPI.createScriptAttribute();

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeFieldJsObj(
        "a",
        {"type": "int", "defaultValue": 1 |> createIntFieldValue},
        scriptAttribute,
      );

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeFieldJsObj(
        "b",
        {"type": "float", "defaultValue": 0.1 |> createFloatFieldValue},
        scriptAttribute,
      );

    scriptAttribute;
  };

  let buildScriptAttribute2 = scriptAttributeName => {
    let scriptAttribute = ScriptAttributeAPI.createScriptAttribute();

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeFieldJsObj(
        "a",
        {"type": "int", "defaultValue": 11 |> createIntFieldValue},
        scriptAttribute,
      );

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeFieldJsObj(
        "b",
        {"type": "float", "defaultValue": 2.1 |> createFloatFieldValue},
        scriptAttribute,
      );

    scriptAttribute;
  };

  let _getScriptAttribute1Name = () => "scriptAttribute1";

  let _getScriptAttribute2Name = () => "scriptAttribute2";

  let buildScriptData = (script, state) => {
    let scriptAttribute1Name = _getScriptAttribute1Name();
    let scriptAttribute2Name = _getScriptAttribute2Name();

    let scriptEventFunctionData =
      buildScriptEventFunctionData(
        scriptAttribute1Name,
        scriptAttribute2Name,
      );

    let scriptAttribute1 = buildScriptAttribute1(scriptAttribute1Name);
    let scriptAttribute2 = buildScriptAttribute2(scriptAttribute2Name);

    let state =
      ScriptAPI.addScriptAttribute(
        script,
        scriptAttribute1Name,
        scriptAttribute1,
        state,
      );
    let state =
      ScriptAPI.addScriptAttribute(
        script,
        scriptAttribute2Name,
        scriptAttribute2,
        state,
      );

    let scriptEventFunctionDataName = "scriptEventFunctionData1";

    let state =
      ScriptAPI.addScriptEventFunctionData(
        script,
        scriptEventFunctionDataName,
        scriptEventFunctionData,
        state,
      );

    state;
  };

  let getAttribute1FieldBValue = (script, state) =>
    unsafeGetScriptAttributeFloatFieldValue(
      script,
      _getScriptAttribute1Name(),
      "b",
      state,
    );

  let getAttribute1FieldBValueAfterExecUpdateEventFunc = () => 12.1;
  /* let getAttributeFieldAValue = (script, state) =>
       unsafeGetScriptAttributeIntFieldValue(
         script,
         getScriptAttributeName(),
         "a",
         state,
       );


     let getAttributeFieldAValueAfterExecInitEventFunc = () => 2;

     let getAttributeFieldBValueAfterExecUpdateEventFunc = () => 0.1 +. 10.;

     let judgeExecInitEventFunc = (script, state) => {
       open Wonder_jest;
       open Expect;
       open! Expect.Operators;

       getAttributeFieldAValue(script, state)
       |> expect == getAttributeFieldAValueAfterExecInitEventFunc();
     }; */
};

module TestCaseWithTwoEventFuncsAndTwoAttributes = {
  let buildScriptEventFunctionData =
      (scriptAttribute1Name, scriptAttribute2Name) => (
    ScriptEventFunctionAPI.createScriptEventFunctionData(
      buildEventFunctionJsObj(
        ~updateFunc=
          Some(
            (. script, api, state) => {
              let api = Obj.magic(api);
              let unsafeGetScriptAttribute = api##unsafeGetScriptAttribute;

              let scriptAttribute1 =
                unsafeGetScriptAttribute(.
                  script,
                  scriptAttribute1Name,
                  state,
                );
              let scriptAttribute2 =
                unsafeGetScriptAttribute(.
                  script,
                  scriptAttribute2Name,
                  state,
                );

              let state =
                API.setScriptAttributeIntFieldValue(
                  api,
                  script,
                  scriptAttribute1Name,
                  "a",
                  API.unsafeGetScriptAttributeIntFieldValue(
                    api,
                    "a",
                    scriptAttribute2,
                  )
                  + 10,
                  state,
                );

              state;
            },
          ),
        (),
      ),
    ),
    ScriptEventFunctionAPI.createScriptEventFunctionData(
      buildEventFunctionJsObj(
        ~updateFunc=
          Some(
            (. script, api, state) => {
              let api = Obj.magic(api);
              let unsafeGetScriptAttribute = api##unsafeGetScriptAttribute;

              let scriptAttribute1 =
                unsafeGetScriptAttribute(.
                  script,
                  scriptAttribute1Name,
                  state,
                );
              let scriptAttribute2 =
                unsafeGetScriptAttribute(.
                  script,
                  scriptAttribute2Name,
                  state,
                );

              let state =
                API.setScriptAttributeFloatFieldValue(
                  api,
                  script,
                  scriptAttribute1Name,
                  "b",
                  API.unsafeGetScriptAttributeFloatFieldValue(
                    api,
                    "b",
                    scriptAttribute2,
                  )
                  +. 10.,
                  state,
                );

              state;
            },
          ),
        (),
      ),
    ),
  );

  let buildScriptAttribute1 = scriptAttributeName => {
    let scriptAttribute = ScriptAttributeAPI.createScriptAttribute();

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeFieldJsObj(
        "a",
        {"type": "int", "defaultValue": 1 |> createIntFieldValue},
        scriptAttribute,
      );

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeFieldJsObj(
        "b",
        {"type": "float", "defaultValue": 0.1 |> createFloatFieldValue},
        scriptAttribute,
      );

    scriptAttribute;
  };

  let buildScriptAttribute2 = scriptAttributeName => {
    let scriptAttribute = ScriptAttributeAPI.createScriptAttribute();

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeFieldJsObj(
        "a",
        {"type": "int", "defaultValue": 11 |> createIntFieldValue},
        scriptAttribute,
      );

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeFieldJsObj(
        "b",
        {"type": "float", "defaultValue": 2.1 |> createFloatFieldValue},
        scriptAttribute,
      );

    scriptAttribute;
  };

  let _getScriptAttribute1Name = () => "scriptAttribute1";

  let _getScriptAttribute2Name = () => "scriptAttribute2";

  let buildScriptData = (script, state) => {
    let scriptAttribute1Name = _getScriptAttribute1Name();
    let scriptAttribute2Name = _getScriptAttribute2Name();

    let (scriptEventFunctionData1, scriptEventFunctionData2) =
      buildScriptEventFunctionData(
        scriptAttribute1Name,
        scriptAttribute2Name,
      );

    let scriptAttribute1 = buildScriptAttribute1(scriptAttribute1Name);
    let scriptAttribute2 = buildScriptAttribute2(scriptAttribute2Name);

    let state =
      ScriptAPI.addScriptAttribute(
        script,
        scriptAttribute1Name,
        scriptAttribute1,
        state,
      );
    let state =
      ScriptAPI.addScriptAttribute(
        script,
        scriptAttribute2Name,
        scriptAttribute2,
        state,
      );

    let scriptEventFunctionData1Name = "scriptEventFunctionData1";
    let scriptEventFunctionData2Name = "scriptEventFunctionData2";

    let state =
      ScriptAPI.addScriptEventFunctionData(
        script,
        scriptEventFunctionData1Name,
        scriptEventFunctionData1,
        state,
      );
    let state =
      ScriptAPI.addScriptEventFunctionData(
        script,
        scriptEventFunctionData2Name,
        scriptEventFunctionData2,
        state,
      );

    state;
  };

  let getAttribute1FieldAValue = (script, state) =>
    unsafeGetScriptAttributeIntFieldValue(
      script,
      _getScriptAttribute1Name(),
      "a",
      state,
    );

  let getAttribute1FieldAValueAfterExecUpdateEventFunc = () => 21;

  let getAttribute1FieldBValue = (script, state) =>
    unsafeGetScriptAttributeFloatFieldValue(
      script,
      _getScriptAttribute1Name(),
      "b",
      state,
    );

  let getAttribute1FieldBValueAfterExecUpdateEventFunc = () => 12.1;
  /* let getAttributeFieldAValue = (script, state) =>
       unsafeGetScriptAttributeIntFieldValue(
         script,
         getScriptAttributeName(),
         "a",
         state,
       );


     let getAttributeFieldAValueAfterExecInitEventFunc = () => 2;

     let getAttributeFieldBValueAfterExecUpdateEventFunc = () => 0.1 +. 10.;

     let judgeExecInitEventFunc = (script, state) => {
       open Wonder_jest;
       open Expect;
       open! Expect.Operators;

       getAttributeFieldAValue(script, state)
       |> expect == getAttributeFieldAValueAfterExecInitEventFunc();
     }; */
};
