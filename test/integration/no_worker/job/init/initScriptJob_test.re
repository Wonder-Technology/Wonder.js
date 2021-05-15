open Wonder_jest;

let _ =
  describe("test init_script job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("shouldn't exec before load done", () => {
      test(
        "init_script job shouldn't exec all actived scripts' init event functions before load done",
        () => {
          let (state, gameObject, script1) =
            ScriptTool.createGameObject(state^);
          let initStub = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            ScriptTool.TestCaseWithOneEventFuncStub.buildScriptData(
              ~script=script1,
              ~initFuncStub=initStub,
              ~state,
              ~sandbox,
              (),
            );
          let state =
            LoadDataTool.markCanExecScriptAllEventFunction(false, state);

          let state = state |> InitScriptJobTool.exec;

          initStub |> getCallCount |> expect == 0;
        },
      );

      describe("test load stream wdb", () => {
        open Js.Promise;

        let boxTexturedWDBArrayBuffer = ref(Obj.magic(-1));

        beforeAll(() =>
          boxTexturedWDBArrayBuffer := NodeTool.convertGLBToWDB("BoxTextured")
        );
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

          TestTool.closeContractCheck();

          GLBTool.prepare(sandbox^);

          state :=
            state^
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
        });

        testPromise(
          "should exec all actived scripts' init event functions when load done",
          () => {
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
          let initStub = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            ScriptTool.TestCaseWithOneEventFuncStub.buildScriptData(
              ~script=script1,
              ~initFuncStub=initStub,
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
          |> then_(_ => initStub |> getCallCount |> expect == 1 |> resolve);
        });
        testPromise(
          "should exec all actived scripts' init event functions before exec all actived scripts' update event functions when load done",
          () => {
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
            let initStub = createEmptyStubWithJsObjSandbox(sandbox);
            let updateStub = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              ScriptTool.TestCaseWithOneEventFuncStub.buildScriptData(
                ~script=script1,
                ~initFuncStub=initStub,
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

                 initStub
                 |> getCall(0)
                 |> expect
                 |> toCalledBefore(updateStub |> getCall(0))
                 |> resolve;
               });
          },
        );
      });
    });

    test("exec all actived scripts' init event functions", () => {
      let (state, gameObject, script1) = ScriptTool.createGameObject(state^);
      let (state, gameObject, script2) = ScriptTool.createGameObject(state);
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

      let state = state |> ScriptAPI.setScriptIsActive(script2, false);

      let state = state |> InitScriptJobTool.exec;

      (
        ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldAValue(
          script1,
          state,
        ),
        ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldAValue(
          script2,
          state,
        ),
      )
      |> expect
      == (
           ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldAValueAfterExecInitEventFunc(),
           ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldAValueBeforeExecInitEventFunc(),
         );
    });
  });
