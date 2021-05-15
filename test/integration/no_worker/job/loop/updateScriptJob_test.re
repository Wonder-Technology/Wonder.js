open Wonder_jest;

let _ =
  describe("test update_script job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    let _buildNoWorkerJobConfig = () =>
      NoWorkerJobConfigTool.buildNoWorkerJobConfig(
        ~loopPipelines=
          {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "update_script"
        }
      ]
    }
  ]
        |},
        (),
      );

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.initWithJobConfig(
          ~sandbox,
          ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("shouldn't exec before load done", () => {
      open Js.Promise;

      let _buildFakeFetchReturnResponse =
          (sandbox, contentLength, ok, arrayBuffer) =>
        {
          "ok": true,
          "headers": {
            "get":
              Sinon.createEmptyStubWithJsObjSandbox(sandbox)
              |> Sinon.withOneArg("content-length")
              |> Sinon.returns(contentLength),
          },
          "arrayBuffer": () => arrayBuffer |> resolve,
        }
        |> resolve;

      let _buildFakeFetch = (sandbox, contentLength, gltfJsonStr, binBuffer) => {
        open Sinon;

        let fetch = createEmptyStubWithJsObjSandbox(sandbox);
        fetch
        |> onCall(0)
        |> returns(
             _buildFakeFetchReturnResponse(
               sandbox,
               contentLength,
               true,
               ConvertGLBSystem.convertGLBData(
                 gltfJsonStr |> Js.Json.parseExn,
                 binBuffer,
               ),
             ),
           );
        fetch;
      };

      beforeEach(() => {
        state :=
          RenderJobsTool.initWithJobConfigAndBufferConfigWithoutBuildFakeDom(
            sandbox,
            NoWorkerJobConfigTool.buildNoWorkerJobConfig(
              ~initPipelines=
                NoWorkerJobConfigTool.buildNoWorkerInitPipelineConfigWithoutInitMain(),
              ~initJobs=
                NoWorkerJobConfigTool.buildNoWorkerInitJobConfigWithoutInitMain(),
              ~loopJobs=NoWorkerJobConfigTool.buildNoWorkerLoopJobConfig(),
              ~loopPipelines=
                {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "update_script"
        }
      ]
    }
  ]
        |},
              (),
            ),
            SettingTool.buildBufferConfigStr(),
          );

        // _clearBlobData(.);
        // _buildFakeBlob(.);

        TestTool.closeContractCheck();

        GLBTool.prepare(sandbox^);

        state :=
          state^
          |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
      });

      describe("test load stream wdb", () => {
        let boxTexturedWDBArrayBuffer = ref(Obj.magic(-1));

        beforeAll(() =>
          boxTexturedWDBArrayBuffer := NodeTool.convertGLBToWDB("BoxTextured")
        );

        describe("test support stream load", () => {
          testPromise("test load once", () => {
            let _prepare = (sandbox, state) => {
              let readStub = createEmptyStubWithJsObjSandbox(sandbox);
              let readStub =
                readStub
                |> onCall(0)
                |> returns(
                     LoadStreamWDBTool.buildChunkData(
                       ~arrayBuffer=(boxTexturedWDBArrayBuffer^)->Some,
                       (),
                     ),
                   )
                |> onCall(1)
                |> returns(
                     LoadStreamWDBTool.buildChunkData(
                       ~arrayBuffer=None,
                       ~done_=true,
                       (),
                     ),
                   );

              LoadStreamWDBTool.prepareWithReadStub(sandbox, readStub, state);
            };

            let (
              default11Image,
              readStub,
              handleBeforeStartLoop,
              handleWhenDoneFunc,
              state,
            ) =
              _prepare(sandbox, state^);
            let (state, gameObject, script1) =
              ScriptTool.createGameObject(state);
            let updateStub = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              ScriptTool.TestCaseWithOneEventFuncStub.buildScriptData(
                ~script=script1,
                ~updateFuncStub=updateStub,
                ~state,
                ~sandbox,
                (),
              );
            MainStateTool.setState(state);
            let handleBeforeStartLoop = (state, rootGameObject) => {
              let state = handleBeforeStartLoop(state, rootGameObject);

              let state = state |> DirectorTool.runWithDefaultTime;

              state;
            };

            LoadStreamWDBTool.read(
              (
                default11Image,
                LoadStreamWDBTool.buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              LoadStreamWDBTool.buildReader(readStub),
            )
            |> then_(_ => {
                 let state = MainStateTool.unsafeGetState();
                 let state = state |> DirectorTool.runWithDefaultTime;

                 updateStub |> getCallCount |> expect == 1 |> resolve;
               });
          });
          testPromise("test load twice", () => {
            let _prepare = (sandbox, state) => {
              let readStub = createEmptyStubWithJsObjSandbox(sandbox);
              let readStub =
                readStub
                |> onCall(0)
                |> returns(
                     LoadStreamWDBTool.buildChunkData(
                       ~arrayBuffer=(boxTexturedWDBArrayBuffer^)->Some,
                       (),
                     ),
                   )
                |> onCall(1)
                |> returns(
                     LoadStreamWDBTool.buildChunkData(
                       ~arrayBuffer=None,
                       ~done_=true,
                       (),
                     ),
                   )
                |> onCall(2)
                |> returns(
                     LoadStreamWDBTool.buildChunkData(
                       ~arrayBuffer=(boxTexturedWDBArrayBuffer^)->Some,
                       (),
                     ),
                   )
                |> onCall(3)
                |> returns(
                     LoadStreamWDBTool.buildChunkData(
                       ~arrayBuffer=None,
                       ~done_=true,
                       (),
                     ),
                   );

              LoadStreamWDBTool.prepareWithReadStub(sandbox, readStub, state);
            };

            let (
              default11Image,
              readStub,
              handleBeforeStartLoop,
              handleWhenDoneFunc,
              state,
            ) =
              _prepare(sandbox, state^);
            let (state, gameObject, script1) =
              ScriptTool.createGameObject(state);
            let updateStub = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              ScriptTool.TestCaseWithOneEventFuncStub.buildScriptData(
                ~script=script1,
                ~updateFuncStub=updateStub,
                ~state,
                ~sandbox,
                (),
              );
            MainStateTool.setState(state);
            let handleBeforeStartLoop = (state, rootGameObject) => {
              let state = handleBeforeStartLoop(state, rootGameObject);

              let state = state |> DirectorTool.runWithDefaultTime;

              state;
            };

            LoadStreamWDBTool.read(
              (
                default11Image,
                LoadStreamWDBTool.buildController(sandbox),
                handleBeforeStartLoop,
                handleWhenDoneFunc,
              ),
              LoadStreamWDBTool.buildReader(readStub),
            )
            |> then_(_ => {
                 let state = MainStateTool.unsafeGetState();
                 let state = state |> DirectorTool.runWithDefaultTime;
                 state |> MainStateTool.setState |> ignore;

                 LoadStreamWDBTool.read(
                   (
                     default11Image,
                     LoadStreamWDBTool.buildController(sandbox),
                     handleBeforeStartLoop,
                     handleWhenDoneFunc,
                   ),
                   LoadStreamWDBTool.buildReader(readStub),
                 )
                 |> then_(_ => {
                      let state = MainStateTool.unsafeGetState();
                      let state = state |> DirectorTool.runWithDefaultTime;

                      updateStub |> getCallCount |> expect == 2 |> resolve;
                    });
               });
          });
        });

        describe("test not support stream load", () =>
          describe("fallback to load whole wdb", () =>
            testPromise("test load once", () => {
              let _prepare = (sandbox, state) => {
                let readStub = createEmptyStubWithJsObjSandbox(sandbox);
                let readStub =
                  readStub
                  |> onCall(0)
                  |> returns(
                       LoadStreamWDBTool.buildChunkData(
                         ~arrayBuffer=(boxTexturedWDBArrayBuffer^)->Some,
                         (),
                       ),
                     )
                  |> onCall(1)
                  |> returns(
                       LoadStreamWDBTool.buildChunkData(
                         ~arrayBuffer=None,
                         ~done_=true,
                         (),
                       ),
                     );

                LoadStreamWDBTool.prepareWithReadStub(
                  sandbox,
                  readStub,
                  state,
                );
              };

              let (
                default11Image,
                readStub,
                handleBeforeStartLoop,
                handleWhenDoneFunc,
                state,
              ) =
                _prepare(sandbox, state^);
              let (state, gameObject, script1) =
                ScriptTool.createGameObject(state);
              let updateStub = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                ScriptTool.TestCaseWithOneEventFuncStub.buildScriptData(
                  ~script=script1,
                  ~updateFuncStub=updateStub,
                  ~state,
                  ~sandbox,
                  (),
                );
              MainStateTool.setState(state);
              let handleBeforeStartLoop = (state, rootGameObject) => {
                let state = handleBeforeStartLoop(state, rootGameObject);

                let state = state |> DirectorTool.runWithDefaultTime;

                state;
              };
              let fetchFunc =
                _buildFakeFetch(
                  sandbox,
                  0,
                  ConvertGLBTool.buildGLTFJsonOfSingleNode(),
                  GLBTool.buildBinBuffer(),
                );

              LoadStreamWDBTool.load(
                ~wdbPath=NodeTool.buildWDBPath("BoxTextured"),
                ~fetchFunc,
                ~handleWhenLoadWholeWDBFunc=
                  (state, _, rootGameObject) =>
                    state
                    |> DirectorTool.runWithDefaultTime
                    |> MainStateTool.setState
                    |> ignore,
                (),
              )
              |> then_(_ =>
                   updateStub |> getCallCount |> expect == 1 |> resolve
                 );
            })
          )
        );
      });

      describe("test load whole wdb", () =>
        testPromise("test load once", () => {
          let fetchFunc =
            _buildFakeFetch(
              sandbox,
              0,
              ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              GLBTool.buildBinBuffer(),
            );
          let (state, gameObject, script1) =
            ScriptTool.createGameObject(state^);
          let updateStub = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            ScriptTool.TestCaseWithOneEventFuncStub.buildScriptData(
              ~script=script1,
              ~updateFuncStub=updateStub,
              ~state,
              ~sandbox,
              (),
            );
          MainStateTool.setState(state);

          LoadWDBTool.load(
            ~wdbPath="../singleNode.wdb",
            ~fetchFunc,
            ~handleWhenLoadingFunc=
              (contentLength, wdbPath) =>
                MainStateTool.unsafeGetState()
                |> DirectorTool.runWithDefaultTime
                |> MainStateTool.setState
                |> ignore,
            (),
          )
          |> then_(((state, _, _)) => {
               let state = state |> DirectorTool.runWithDefaultTime;

               updateStub |> getCallCount |> expect == 1 |> resolve;
             });
        })
      );
    });

    describe("exec all update event functions", () => {
      test("only exec actived scripts' update event functions", () => {
        let (state, gameObject, script1) =
          ScriptTool.createGameObject(state^);
        let (state, gameObject, script2) =
          ScriptTool.createGameObject(state);
        let state =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
            ~script=script1,
            ~state,
            (),
          );
        let state =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
            ~script=script2,
            ~state,
            (),
          );

        let state = state |> ScriptAPI.setScriptIsActive(script1, false);

        let state = DirectorTool.runWithDefaultTime(state);

        (
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
            script1,
            state,
          ),
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
            script2,
            state,
          ),
        )
        |> expect
        == (
             ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueBeforeExecUpdateEventFunc(),
             ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueAfterExecUpdateEventFunc(),
           );
      });

      test("only exec existed update event functions", () => {
        let (state, gameObject, script) =
          ScriptTool.createGameObject(state^);
        let scriptEventFunctionDataName1 = "scriptEventFunctionData1";
        let scriptEventFunctionDataName2 = "scriptEventFunctionData2";
        let scriptEventFunctionData1 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptEventFunctionData(
            ~initFunc=None,
            ~updateFunc=None,
            ~disposeFunc=None,
          );
        let scriptEventFunctionData2 =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptEventFunctionData(
            ~initFunc=None,
            ~updateFunc=
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildUpdateEventFunc()
              ->Some,
            ~disposeFunc=None,
          );
        let state =
          ScriptAPI.addScriptEventFunctionData(
            script,
            scriptEventFunctionDataName1,
            scriptEventFunctionData1,
            state,
          );
        let state =
          ScriptAPI.addScriptEventFunctionData(
            script,
            scriptEventFunctionDataName2,
            scriptEventFunctionData2,
            state,
          );
        let scriptAttributeName =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getScriptAttributeName();
        let scriptAttribute =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptAttribute(
            scriptAttributeName,
          );
        let state =
          ScriptAPI.addScriptAttribute(
            script,
            scriptAttributeName,
            scriptAttribute,
            state,
          );

        let state = DirectorTool.runWithDefaultTime(state);

        ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
          script,
          state,
        )
        |> expect
        == ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueAfterExecUpdateEventFunc();
      });

      describe("test one script component with one event function data", () => {
        describe("test one script component with one attribute", () => {
          test("test attribute", () => {
            let (state, gameObject, script1) =
              ScriptTool.createGameObject(state^);
            let (state, gameObject, script2) =
              ScriptTool.createGameObject(state);
            let state =
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
                ~script=script1,
                ~state,
                (),
              );
            let state =
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
                ~script=script2,
                ~state,
                (),
              );

            let state = DirectorTool.runWithDefaultTime(state);

            (
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
                script1,
                state,
              ),
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
                script2,
                state,
              ),
            )
            |> expect
            == (
                 ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueAfterExecUpdateEventFunc(),
                 ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueAfterExecUpdateEventFunc(),
               );
          });
          test("set transform local position in update", () => {
            let (state, gameObject, script1) =
              ScriptTool.createGameObject(state^);
            let (state, gameObject, script2) =
              ScriptTool.createGameObject(state);
            let state =
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
                ~script=script1,
                ~state,
                ~updateFunc=
                  ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildSetLocalPositionEventFunc(),
                (),
              );
            let state =
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
                ~script=script2,
                ~state,
                (),
              );

            let state = DirectorTool.runWithDefaultTime(state);

            (
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getLocalPosition(
                script1,
                state,
              ),
              ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
                script2,
                state,
              ),
            )
            |> expect
            == (
                 ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getLocalPositionAfterExec(),
                 ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueAfterExecUpdateEventFunc(),
               );
          });
        });

        test("test one script component with two attributes", () => {
          let (state, gameObject, script1) =
            ScriptTool.createGameObject(state^);
          let (state, gameObject, script2) =
            ScriptTool.createGameObject(state);
          let state =
            ScriptTool.TestCaseWithOneEventFuncAndTwoAttributes.buildScriptData(
              script1,
              state,
            );
          let state =
            ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
              ~script=script2,
              ~state,
              (),
            );

          let state = DirectorTool.runWithDefaultTime(state);

          (
            ScriptTool.TestCaseWithOneEventFuncAndTwoAttributes.getAttribute1FieldBValue(
              script1,
              state,
            ),
            ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
              script2,
              state,
            ),
          )
          |> expect
          == (
               ScriptTool.TestCaseWithOneEventFuncAndTwoAttributes.getAttribute1FieldBValueAfterExecUpdateEventFunc(),
               ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueAfterExecUpdateEventFunc(),
             );
        });
      });

      test("test one script component with two event function data", () => {
        let (state, gameObject, script1) =
          ScriptTool.createGameObject(state^);
        let (state, gameObject, script2) =
          ScriptTool.createGameObject(state);
        let state =
          ScriptTool.TestCaseWithTwoEventFuncsAndTwoAttributes.buildScriptData(
            script1,
            state,
          );
        let state =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
            ~script=script2,
            ~state,
            (),
          );

        let state = DirectorTool.runWithDefaultTime(state);

        (
          ScriptTool.TestCaseWithTwoEventFuncsAndTwoAttributes.getAttribute1FieldAValue(
            script1,
            state,
          ),
          ScriptTool.TestCaseWithTwoEventFuncsAndTwoAttributes.getAttribute1FieldBValue(
            script1,
            state,
          ),
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValue(
            script2,
            state,
          ),
        )
        |> expect
        == (
             ScriptTool.TestCaseWithTwoEventFuncsAndTwoAttributes.getAttribute1FieldAValueAfterExecUpdateEventFunc(),
             ScriptTool.TestCaseWithTwoEventFuncsAndTwoAttributes.getAttribute1FieldBValueAfterExecUpdateEventFunc(),
             ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldBValueAfterExecUpdateEventFunc(),
           );
      });
    });
  });
