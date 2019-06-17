open Wonder_jest;

open Js.Promise;

let _ =
  describe("DisposeVboRenderWorkerJob", () => {
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
    describe("dispose vbo buffer data", () => {
      let _prepare = state => {
        let (
          state,
          (gameObject1, gameObject2, gameObject3),
          (geometry1, geometry2, geometry3),
        ) =
          DisposeForNoWorkerAndWorkerJobTool.prepareGeometryGameObjects(
            state,
          );
        let (state, gameObject4, (_, _, _, sourceInstance4, _)) =
          RenderBasicHardwareInstanceTool.createSourceInstanceGameObject(
            sandbox,
            state,
          );
        let renderWorkerState =
          RenderWorkerStateTool.createStateAndSetToStateData();
        renderWorkerState.vboBufferRecord =
          renderWorkerState.vboBufferRecord
          |> VboBufferTool.addVboBufferToGeometryBufferMapByRecord(
               geometry1,
             )
          |> VboBufferTool.addVboBufferToGeometryBufferMapByRecord(
               geometry2,
             )
          |> VboBufferTool.addVboBufferToGeometryBufferMapByRecord(
               geometry3,
             )
          |> VboBufferTool.addVboBufferToSourceInstanceBufferMapByRecord(
               sourceInstance4,
             );
        (
          state,
          (gameObject1, gameObject2, gameObject3, gameObject4),
          (geometry1, geometry2, geometry3, sourceInstance4),
        );
      };
      let _buildData = (geometry1, geometry2, geometry3, sourceInstance4) =>
        Some({
          "data": {
            "geometryNeedDisposeVboBufferArr": [|geometry1, geometry2,geometry3|],
            "sourceInstanceNeedDisposeVboBufferArr": [|sourceInstance4|],
          },
        });
      testPromise("add buffer to pool", () => {
        open AllVboBufferType;
        let (
          state,
          (gameObject1, gameObject2, gameObject3, gameObject4),
          (geometry1, geometry2, geometry3, sourceInstance4),
        ) =
          _prepare(state);
        DisposeVboRenderWorkerJob.execJob(
          None,
          _buildData(geometry1, geometry2, geometry3, sourceInstance4),
          RenderWorkerStateTool.getStateData(),
        )
        |> WonderBsMost.Most.drain
        |> then_(() => {
             let renderWorkerState = RenderWorkerStateTool.unsafeGetState();
             let {
               vertexArrayBufferPool,
               elementArrayBufferPool,
               matrixInstanceBufferPool,
             } =
               renderWorkerState.vboBufferRecord;
             (
               vertexArrayBufferPool |> WonderCommonlib.MutableSparseMapService.length,
               elementArrayBufferPool |> WonderCommonlib.MutableSparseMapService.length,
               matrixInstanceBufferPool |> WonderCommonlib.MutableSparseMapService.length,
             )
             |> expect == (3 * 3, 1 * 3, 1)
             |> resolve;
           });
      });
      testPromise("remove from buffer map", () => {
        open AllVboBufferType;
        let (
          state,
          (gameObject1, gameObject2, gameObject3, gameObject4),
          (geometry1, geometry2, geometry3, sourceInstance4),
        ) =
          _prepare(state);
        DisposeVboRenderWorkerJob.execJob(
          None,
          _buildData(geometry1, geometry2, geometry3, sourceInstance4),
          RenderWorkerStateTool.getStateData(),
        )
        |> WonderBsMost.Most.drain
        |> then_(() => {
             let renderWorkerState = RenderWorkerStateTool.unsafeGetState();
             let {
               geometryVertexBufferMap,
               geometryNormalBufferMap,
               geometryElementArrayBufferMap,
               matrixInstanceBufferMap,
             } =
               renderWorkerState.vboBufferRecord;
             (
               geometryVertexBufferMap
               |> WonderCommonlib.MutableSparseMapService.has(geometry1),
               geometryNormalBufferMap
               |> WonderCommonlib.MutableSparseMapService.has(geometry1),
               geometryElementArrayBufferMap
               |> WonderCommonlib.MutableSparseMapService.has(geometry1),
               geometryVertexBufferMap
               |> WonderCommonlib.MutableSparseMapService.has(geometry2),
               geometryNormalBufferMap
               |> WonderCommonlib.MutableSparseMapService.has(geometry2),
               geometryElementArrayBufferMap
               |> WonderCommonlib.MutableSparseMapService.has(geometry2),
               geometryVertexBufferMap
               |> WonderCommonlib.MutableSparseMapService.has(geometry3),
               geometryNormalBufferMap
               |> WonderCommonlib.MutableSparseMapService.has(geometry3),
               geometryElementArrayBufferMap
               |> WonderCommonlib.MutableSparseMapService.has(geometry3),
               matrixInstanceBufferMap
               |> WonderCommonlib.MutableSparseMapService.has(sourceInstance4),
             )
             |>
             expect == (
                         false,
                         false,
                         false,
                         false,
                         false,
                         false,
                         false,
                         false,
                         false,
                         false,
                       )
             |> resolve;
           });
      });
    });
  });