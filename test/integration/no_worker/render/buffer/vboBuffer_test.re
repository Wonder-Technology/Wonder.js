open Wonder_jest;

let _ =
  describe("test vbo buffer", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        RenderJobsTool.initWithJobConfig(
          sandbox,
          NoWorkerJobConfigTool.buildNoWorkerJobConfig(
            ~initPipelines=
              NoWorkerJobConfigTool.buildNoWorkerInitPipelineConfigWithoutInitMain(),
            ~initJobs=
              NoWorkerJobConfigTool.buildNoWorkerInitJobConfigWithoutInitMain(),
            (),
          ),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test buffer pool", () => {
      describe("test create geometry after dispose one", () => {
        let _prepare = state => {
          let state = SettingTool.setMemory(state, ~maxDisposeCount=1, ());
          let (state, gameObject1, geometry1) =
            BoxGeometryTool.createGameObject(state);
          (state, gameObject1, geometry1);
        };
        test(
          "getOrCreateBuffer should use old one(created buffer previously) in pool",
          () => {
          open StateDataMainType;
          let (state, gameObject1, geometry1) = _prepare(state^);
          let (
            state,
            (
              arrayBuffer1,
              arrayBuffer2,
              arrayBuffer3,
              arrayBuffer4,
              arrayBuffer5,
              arrayBuffer6,
            ),
            (elementArrayBuffer1, elementArrayBuffer2),
            createBuffer,
          ) =
            VboBufferTool.prepareCreatedBuffer(sandbox, state);
          VboBufferTool.getOrCreateAllCustomGeometryBuffers(geometry1, state);
          let (
            resultVertexArrayBuffer1,
            resultTexCoordArrayBuffer1,
            resultNormalArrayBuffer1,
            resultElementArrayBuffer1,
          ) =
            VboBufferTool.getOrCreateAllCustomGeometryBuffers(geometry1, state);
          let state =
            state
            |> GameObjectAPI.disposeGameObjectCustomGeometryComponent(
                 gameObject1,
                 geometry1,
               );
          let (state, gameObject2, geometry2) =
            CustomGeometryTool.createGameObject(state);
          let state = state |> GameObjectAPI.initGameObject(gameObject2);
          let state = state |> DisposeJob.execJob(None);
          let (
            resultVertexArrayBuffer2,
            resultTexCoordArrayBuffer2,
            resultNormalArrayBuffer2,
            resultElementArrayBuffer2,
          ) =
            VboBufferTool.getOrCreateAllCustomGeometryBuffers(
              geometry2,
              state,
            );
          (
            createBuffer |> getCallCount,
            resultVertexArrayBuffer2,
            resultTexCoordArrayBuffer2,
            resultNormalArrayBuffer2,
            resultElementArrayBuffer2,
          )
          |>
          expect == (
                      4,
                      arrayBuffer3,
                      arrayBuffer2,
                      arrayBuffer1,
                      elementArrayBuffer1,
                    );
        });
      });
      describe("test create souceInstance gameObject after dispose one", () => {
        let _prepare = RenderBasicHardwareInstanceTool.prepare;
        test(
          "getOrCreateBuffer should use old one(created buffer previously) in pool",
          () => {
          open StateDataMainType;
          let (state, gameObject1, (_, _, _, sourceInstance1, _)) =
            _prepare(sandbox, state^);
          let buffer1 = Obj.magic(0);
          let buffer2 = Obj.magic(1);
          let buffer3 = Obj.magic(2);
          let buffer4 = Obj.magic(3);
          let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
          createBuffer |> onCall(0) |> returns(buffer1);
          createBuffer |> onCall(1) |> returns(buffer2);
          createBuffer |> onCall(2) |> returns(buffer3);
          createBuffer |> onCall(3) |> returns(buffer4);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()),
               );
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          let instanceBuffer1 =
            VboBufferTool.getOrCreateInstanceBuffer(
              sourceInstance1,
              InstanceBufferTool.getDefaultCapacity(),
              state,
            );
          let state =
            state
            |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                 gameObject1,
                 sourceInstance1,
               );
          let state = state |> DisposeJob.execJob(None);
          let (state, gameObject2, (_, _, _, sourceInstance2, _)) =
            RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(
              sandbox,
              state,
            );
          let instanceBuffer2 =
            VboBufferTool.getOrCreateInstanceBuffer(
              sourceInstance2,
              InstanceBufferTool.getDefaultCapacity(),
              state,
            );
          instanceBuffer1 |> expect == instanceBuffer2;
        });
      });
    });
  });