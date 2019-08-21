open Wonder_jest;

open Js.Promise;

open RenderWorkerSourceInstanceType;

let _ =
  describe("DisposeSourceInstanceRenderWorkerJob", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestMainWorkerTool.initWithJobConfig(
          ~sandbox,
          ~buffer=SettingTool.buildBufferConfigStr(),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("dispose sourceInstance data", () => {
      let _test = (judgeFunc, state) => {
        let (
          state,
          gameObject,
          (
            geometry,
            material,
            meshRenderer,
            sourceInstance,
            objectInstanceGameObject,
          ),
        ) =
          RenderBasicHardwareInstanceRenderWorkerTool.prepare(
            sandbox,
            state^,
          );
        let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
        createBuffer |> returns(Obj.magic(1));
        let state =
          state
          |> FakeGlWorkerTool.setFakeGl(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ~createBuffer, ()),
             );
        let state = MainStateTool.setState(state);
        RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
          ~state,
          ~sandbox,
          ~completeFunc=
            _ => {
              let state =
                GameObjectAPI.disposeGameObject(
                  gameObject,
                  MainStateTool.unsafeGetState(),
                );

              RenderJobsRenderWorkerTool.mainLoopAndDispose(
                ~state,
                ~sandbox,
                ~completeFunc=
                  _ => {
                    let renderWorkerState =
                      RenderWorkerStateTool.unsafeGetState();
                    judgeFunc(sourceInstance, renderWorkerState) |> resolve;
                  },
                (),
              );
            },
          (),
        );
      };

      testPromise("add matrixFloat32ArrayMap->typeArray to pool", () =>
        _test(
          (sourceInstance, renderWorkerState) =>
            WonderCommonlib.MutableSparseMapService.unsafeGet(
              1024,
              TypeArrayPoolTool.getFloat32ArrayPoolMap(
                renderWorkerState.typeArrayPoolRecord,
              ),
            )
            |> Js.Array.length
            |> expect == 1,
          state,
        )
      );
      testPromise(
        "remove from matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap, isSendTransformMatrixDataMap",
        () =>
        _test(
          (sourceInstance, renderWorkerState) => {
            let {
              matrixFloat32ArrayMap,
              matrixInstanceBufferCapacityMap,
              isSendTransformMatrixDataMap,
            } =
              renderWorkerState.sourceInstanceRecord;
            (
              matrixFloat32ArrayMap
              |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                   sourceInstance,
                 )
              |> Obj.magic,
              matrixInstanceBufferCapacityMap
              |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                   sourceInstance,
                 )
              |> Obj.magic,
              isSendTransformMatrixDataMap
              |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                   sourceInstance,
                 )
              |> Obj.magic,
            )
            |> expect
            == (Js.Undefined.empty, Js.Undefined.empty, Js.Undefined.empty);
          },
          state,
        )
      );
    });
  });