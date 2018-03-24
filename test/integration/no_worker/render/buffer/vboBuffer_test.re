open Wonder_jest;

let _ =
  describe(
    "test vbo buffer",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            RenderJobsTool.initWithJobConfig(
              sandbox,
              NoWorkerJobConfigTool.buildNoWorkerJobConfig(
                ~initPipelines=
                  NoWorkerJobConfigTool.buildNoWorkerInitPipelineConfigWithoutInitMain(),
                ~initJobs=NoWorkerJobConfigTool.buildNoWorkerInitJobConfigWithoutInitMain(),
                ()
              )
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test buffer pool",
        () => {
          describe(
            "test create geometry after dispose one",
            () => {
              let _prepare = (state) => {
                let state = SettingTool.setMemory(state, ~maxDisposeCount=1, ());
                let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state);
                let state = state |> BoxGeometryTool.initGeometrys;
                (state, gameObject1, geometry1)
              };
              test(
                "getOrCreateBuffer should use old one(created buffer previously) in pool",
                () => {
                  open MainStateDataType;
                  let (state, gameObject1, geometry1) = _prepare(state^);
                  /* let arrayBuffer1 = Obj.magic(20);
                     let arrayBuffer2 = Obj.magic(21);
                     let arrayBuffer3 = Obj.magic(22);
                     let arrayBuffer4 = Obj.magic(23);
                     let elementArrayBuffer1 = Obj.magic(12);
                     let elementArrayBuffer2 = Obj.magic(13);
                     let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                     createBuffer |> onCall(0) |> returns(arrayBuffer1);
                     createBuffer |> onCall(1) |> returns(arrayBuffer2);
                     createBuffer |> onCall(2) |> returns(elementArrayBuffer1);
                     createBuffer |> onCall(3) |> returns(arrayBuffer3);
                     createBuffer |> onCall(4) |> returns(arrayBuffer4);
                     createBuffer |> onCall(5) |> returns(elementArrayBuffer2); */
                  let (
                    state,
                    (arrayBuffer1, arrayBuffer2, arrayBuffer3, arrayBuffer4),
                    (elementArrayBuffer1, elementArrayBuffer2),
                    createBuffer
                  ) =
                    VboBufferTool.prepareCreatedBuffer(sandbox, state);
                  VboBufferTool.getOrCreateAllBoxGeometryBuffers(geometry1, state);
                  let (
                    resultVertexArrayBuffer1,
                    resultNormalArrayBuffer1,
                    resultElementArrayBuffer1
                  ) =
                    VboBufferTool.getOrCreateAllBoxGeometryBuffers(geometry1, state);
                  let state =
                    state |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(gameObject1, geometry1);
                  let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
                  let state = state |> GameObjectAPI.initGameObject(gameObject2);
                  let (
                    resultVertexArrayBuffer2,
                    resultNormalArrayBuffer2,
                    resultElementArrayBuffer2
                  ) =
                    VboBufferTool.getOrCreateAllBoxGeometryBuffers(geometry2, state);
                  (
                    createBuffer |> getCallCount,
                    resultVertexArrayBuffer2,
                    resultNormalArrayBuffer2,
                    resultElementArrayBuffer2
                  )
                  |> expect == (3, arrayBuffer2, arrayBuffer1, elementArrayBuffer1)
                }
              )
            }
          );
          describe(
            "test create souceInstance gameObject after dispose one",
            () => {
              let _prepare = RenderBasicHardwareInstanceTool.prepare;
              test(
                "getOrCreateBuffer should use old one(created buffer previously) in pool",
                () => {
                  open MainStateDataType;
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
                    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()));
                  let state =
                    state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
                  let instanceBuffer1 =
                    VboBufferTool.getOrCreateInstanceBuffer(
                      sourceInstance1,
                      InstanceBufferTool.getDefaultCapacity(),
                      state
                    );
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                         gameObject1,
                         sourceInstance1
                       );
                  let (state, gameObject2, (_, _, _, sourceInstance2, _)) =
                    RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(sandbox, state);
                  let instanceBuffer2 =
                    VboBufferTool.getOrCreateInstanceBuffer(
                      sourceInstance2,
                      InstanceBufferTool.getDefaultCapacity(),
                      state
                    );
                  instanceBuffer1 |> expect == instanceBuffer2
                }
              )
            }
          )
        }
      )
    }
  );