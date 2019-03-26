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
  DisposeScriptMainService.isAlive(script, state.scriptRecord);

let buildEventFunctionJsObj =
    (
      ~initFunc=(. _, _, state) => state,
      ~updateFunc=(. _, _, state) => state,
      ~disposeFunc=(. _, _, state) => state,
      (),
    ) => {
  "init": Js.Nullable.return(initFunc),
  "update": Js.Nullable.return(updateFunc),
  "dispose": Js.Nullable.return(disposeFunc),
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

let unsafeGetScriptAllEventFunctionData = OperateScriptDataMainService.unsafeGetScriptAllEventFunctionData;

let setScriptAttributeIntFieldValue =
    (script, scriptAttributeName, fieldName, fieldValue, state) =>
  OperateScriptDataMainService.setScriptAttributeFieldValue(
    script,
    scriptAttributeName,
    fieldName,
    fieldValue |> ScriptAttributeType.intToScriptAttributeValue,
    state,
  );

module API = {
  let unsafeGetScriptAttributeIntFieldValue =
      (api, fieldName, scriptAttribute) => {
    let unsafeGetScriptAttributeFieldValue =
      api##unsafeGetScriptAttributeFieldValue;

    unsafeGetScriptAttributeFieldValue(fieldName, scriptAttribute)
    |> ScriptAttributeType.scriptAttributeValueToInt;
  };

  let setScriptAttributeIntFieldValue =
      (api, script, scriptAttributeName, fieldName, fieldValue, state) => {
    let setScriptAttributeFieldValue = api##setScriptAttributeFieldValue;

    setScriptAttributeFieldValue(
      script,
      scriptAttributeName,
      fieldName,
      fieldValue |> ScriptAttributeType.intToScriptAttributeValue,
      state,
    );
  };

  let unsafeGetScriptAttributeFloatFieldValue =
      (api, fieldName, scriptAttribute) => {
    let unsafeGetScriptAttributeFieldValue =
      api##unsafeGetScriptAttributeFieldValue;

    unsafeGetScriptAttributeFieldValue(fieldName, scriptAttribute)
    |> ScriptAttributeType.scriptAttributeValueToFloat;
  };

  let setScriptAttributeFloatFieldValue =
      (api, script, scriptAttributeName, fieldName, fieldValue, state) => {
    let setScriptAttributeFieldValue = api##setScriptAttributeFieldValue;

    setScriptAttributeFieldValue(
      script,
      scriptAttributeName,
      fieldName,
      fieldValue |> ScriptAttributeType.floatToScriptAttributeValue,
      state,
    );
  };
};

module TestCaseWithOneEventFuncAndOneAttribute = {
  let buildScriptEventFunctionData =
      (~scriptAttributeName, ~initFunc, ~updateFunc, ~disposeFunc) =>
    ScriptEventFunctionAPI.createScriptEventFunctionData(
      buildEventFunctionJsObj(~initFunc, ~updateFunc, ~disposeFunc, ()),
    );

  let getAttributeFieldADefaultValue = () => 1;

  let buildScriptAttribute = scriptAttributeName => {
    let scriptAttribute = ScriptAttributeAPI.createScriptAttribute();

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeField(
        "a",
        {
          "type": "int",
          "defaultValue":
            getAttributeFieldADefaultValue() |> createIntFieldValue,
        },
        scriptAttribute,
      );

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeField(
        "b",
        {"type": "float", "defaultValue": 0.1 |> createFloatFieldValue},
        scriptAttribute,
      );

    scriptAttribute;
  };

  let _getScriptAttributeName = () => "scriptAttribute1";

  /* let buildScriptData = (script, state) => {
       let scriptAttributeName = _getScriptAttributeName();
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
         ScriptAPI.addScriptEventFunction(
           script,
           scriptEventFunctionDataName,
           scriptEventFunctionData,
           state,
         );

       state;
     }; */

  let buildSetLocalPositionEventFunc =
    (. script, api, state) => {
      let unsafeGetScriptGameObject = api##unsafeGetScriptGameObject;
      let unsafeGetGameObjectTransformComponent =
        api##unsafeGetGameObjectTransformComponent;
      let getTransformLocalPosition = api##getTransformLocalPosition;
      let setTransformLocalPosition = api##setTransformLocalPosition;

      let transform =
        unsafeGetGameObjectTransformComponent(
          unsafeGetScriptGameObject(script, state),
          state,
        );

      let (x, y, z) = getTransformLocalPosition(transform, state);

      let state =
        setTransformLocalPosition(transform, (x +. 10., y, z), state);

      state;
    };

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
        ~initFunc=(. script, api, state) => {
                    let scriptAttributeName = _getScriptAttributeName();

                    let unsafeGetScriptAttribute =
                      api##unsafeGetScriptAttribute;

                    let scriptAttribute =
                      unsafeGetScriptAttribute(
                        script,
                        scriptAttributeName,
                        state,
                      );

                    let state =
                      API.setScriptAttributeIntFieldValue(
                        api,
                        script,
                        scriptAttributeName,
                        "a",
                        API.unsafeGetScriptAttributeIntFieldValue(
                          api,
                          "a",
                          scriptAttribute,
                        )
                        + 1,
                        state,
                      );

                    state;
                  },
        ~updateFunc=(. script, api, state) => {
                      let scriptAttributeName = _getScriptAttributeName();

                      let unsafeGetScriptAttribute =
                        api##unsafeGetScriptAttribute;

                      let scriptAttribute =
                        unsafeGetScriptAttribute(
                          script,
                          scriptAttributeName,
                          state,
                        );

                      let state =
                        API.setScriptAttributeFloatFieldValue(
                          api,
                          script,
                          scriptAttributeName,
                          "b",
                          API.unsafeGetScriptAttributeFloatFieldValue(
                            api,
                            "b",
                            scriptAttribute,
                          )
                          +. 10.,
                          state,
                        );

                      state;
                    },
        ~disposeFunc=buildSetLocalPositionEventFunc,
        (),
      ) => {
    let scriptAttributeName = _getScriptAttributeName();
    let scriptEventFunctionData =
      buildScriptEventFunctionData(
        ~scriptAttributeName,
        ~initFunc,
        ~updateFunc,
        ~disposeFunc,
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
      ScriptAPI.addScriptEventFunction(
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
      _getScriptAttributeName(),
      "a",
      state,
    );

  let getAttributeFieldBValue = (script, state) =>
    unsafeGetScriptAttributeFloatFieldValue(
      script,
      _getScriptAttributeName(),
      "b",
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
  };

  let setScriptAttributeFieldAValue = (script, value, state) =>
    setScriptAttributeIntFieldValue(
      script,
      _getScriptAttributeName(),
      "a",
      value,
      state,
    );
};

module TestCaseWithOneEventFuncAndTwoAttributes = {
  let buildScriptEventFunctionData =
      (scriptAttribute1Name, scriptAttribute2Name) =>
    ScriptEventFunctionAPI.createScriptEventFunctionData(
      buildEventFunctionJsObj(
        /* ~initFunc=
           (. script, api, state) => {
             let unsafeGetScriptAttribute = api##unsafeGetScriptAttribute;

             let scriptAttribute =
               unsafeGetScriptAttribute(script, scriptAttribute1Name, state);

             let state =
               API.setScriptAttributeIntFieldValue(
                 api,
                 script,
                 scriptAttribute1Name,
                 "a",
                 API.unsafeGetScriptAttributeIntFieldValue(
                   api,
                   "a",
                   scriptAttribute,
                 )
                 + 1,
                 state,
               );

             state;
           }, */
        ~updateFunc=
          (. script, api, state) => {
            let unsafeGetScriptAttribute = api##unsafeGetScriptAttribute;

            let scriptAttribute1 =
              unsafeGetScriptAttribute(script, scriptAttribute1Name, state);
            let scriptAttribute2 =
              unsafeGetScriptAttribute(script, scriptAttribute2Name, state);

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
        (),
      ),
    );

  let buildScriptAttribute1 = scriptAttributeName => {
    let scriptAttribute = ScriptAttributeAPI.createScriptAttribute();

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeField(
        "a",
        {"type": "int", "defaultValue": 1 |> createIntFieldValue},
        scriptAttribute,
      );

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeField(
        "b",
        {"type": "float", "defaultValue": 0.1 |> createFloatFieldValue},
        scriptAttribute,
      );

    scriptAttribute;
  };

  let buildScriptAttribute2 = scriptAttributeName => {
    let scriptAttribute = ScriptAttributeAPI.createScriptAttribute();

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeField(
        "a",
        {"type": "int", "defaultValue": 11 |> createIntFieldValue},
        scriptAttribute,
      );

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeField(
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
      ScriptAPI.addScriptEventFunction(
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
         _getScriptAttributeName(),
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
          (. script, api, state) => {
            let unsafeGetScriptAttribute = api##unsafeGetScriptAttribute;

            let scriptAttribute1 =
              unsafeGetScriptAttribute(script, scriptAttribute1Name, state);
            let scriptAttribute2 =
              unsafeGetScriptAttribute(script, scriptAttribute2Name, state);

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
        (),
      ),
    ),
    ScriptEventFunctionAPI.createScriptEventFunctionData(
      buildEventFunctionJsObj(
        ~updateFunc=
          (. script, api, state) => {
            let unsafeGetScriptAttribute = api##unsafeGetScriptAttribute;

            let scriptAttribute1 =
              unsafeGetScriptAttribute(script, scriptAttribute1Name, state);
            let scriptAttribute2 =
              unsafeGetScriptAttribute(script, scriptAttribute2Name, state);

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
        (),
      ),
    ),
  );

  let buildScriptAttribute1 = scriptAttributeName => {
    let scriptAttribute = ScriptAttributeAPI.createScriptAttribute();

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeField(
        "a",
        {"type": "int", "defaultValue": 1 |> createIntFieldValue},
        scriptAttribute,
      );

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeField(
        "b",
        {"type": "float", "defaultValue": 0.1 |> createFloatFieldValue},
        scriptAttribute,
      );

    scriptAttribute;
  };

  let buildScriptAttribute2 = scriptAttributeName => {
    let scriptAttribute = ScriptAttributeAPI.createScriptAttribute();

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeField(
        "a",
        {"type": "int", "defaultValue": 11 |> createIntFieldValue},
        scriptAttribute,
      );

    let scriptAttribute =
      ScriptAttributeAPI.addScriptAttributeField(
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
      ScriptAPI.addScriptEventFunction(
        script,
        scriptEventFunctionData1Name,
        scriptEventFunctionData1,
        state,
      );
    let state =
      ScriptAPI.addScriptEventFunction(
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
         _getScriptAttributeName(),
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