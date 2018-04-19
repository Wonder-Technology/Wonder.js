open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "DisposeVboRenderWorkerJob",
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
            TestToolMainWorker.initWithJobConfig(
              ~sandbox,
              ~buffer=SettingTool.buildBufferConfigStr(),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "dispose vbo buffer data",
        () => {
          let _prepare = (state) => {
            let (state, (gameObject1, gameObject2, gameObject3), (geometry1, geometry2, geometry3)) =
              DisposeJobTool.prepareBoxAndCustomGeometryGameObjects(state);
            let renderWorkerState = RenderWorkerStateTool.createStateAndSetToStateData();
            renderWorkerState.vboBufferRecord =
              renderWorkerState.vboBufferRecord
              |> VboBufferTool.addVboBufferToBoxGeometryBufferMapByRecord(geometry1)
              |> VboBufferTool.addVboBufferToBoxGeometryBufferMapByRecord(geometry2)
              |> VboBufferTool.addVboBufferToCustomGeometryBufferMapByRecord(geometry3);
            (state, (gameObject1, gameObject2, gameObject3), (geometry1, geometry2, geometry3))
          };
          testPromise(
            "add buffer to pool",
            () => {
              open VboBufferType;
              let (
                state,
                (gameObject1, gameObject2, gameObject3),
                (geometry1, geometry2, geometry3)
              ) =
                _prepare(state);
              DisposeVboRenderWorkerJob.execJob(
                None,
                Some({
                  "data": {
                    "boxGeometryNeedDisposeVboBufferArr": [|geometry1, geometry2|],
                    "customGeometryNeedDisposeVboBufferArr": [|geometry3|]
                  }
                }),
                RenderWorkerStateTool.getStateData()
              )
              |> Most.drain
              |> then_(
                   () => {
                     let renderWorkerState = RenderWorkerStateTool.getState();
                     let {vertexArrayBufferPool, elementArrayBufferPool} =
                       renderWorkerState.vboBufferRecord;
                     (
                       vertexArrayBufferPool |> SparseMapService.length,
                       elementArrayBufferPool |> SparseMapService.length
                     )
                     |> expect == (2 * 3, 1 * 3)
                     |> resolve
                   }
                 )
            }
          );
          testPromise(
            "remove from buffer map",
            () => {
              open VboBufferType;
              let (
                state,
                (gameObject1, gameObject2, gameObject3),
                (geometry1, geometry2, geometry3)
              ) =
                _prepare(state);
              DisposeVboRenderWorkerJob.execJob(
                None,
                Some({
                  "data": {
                    "boxGeometryNeedDisposeVboBufferArr": [|geometry1, geometry2|],
                    "customGeometryNeedDisposeVboBufferArr": [|geometry3|]
                  }
                }),
                RenderWorkerStateTool.getStateData()
              )
              |> Most.drain
              |> then_(
                   () => {
                     let renderWorkerState = RenderWorkerStateTool.getState();
                     let {
                       boxGeometryVertexBufferMap,
                       boxGeometryNormalBufferMap,
                       boxGeometryElementArrayBufferMap,
                       customGeometryVertexBufferMap,
                       customGeometryNormalBufferMap,
                       customGeometryElementArrayBufferMap
                     } =
                       renderWorkerState.vboBufferRecord;
                     (
                       boxGeometryVertexBufferMap |> WonderCommonlib.SparseMapService.has(geometry1),
                       boxGeometryNormalBufferMap
                       |> WonderCommonlib.SparseMapService.has(geometry1),
                       boxGeometryElementArrayBufferMap
                       |> WonderCommonlib.SparseMapService.has(geometry1),
                       boxGeometryVertexBufferMap
                       |> WonderCommonlib.SparseMapService.has(geometry2),
                       boxGeometryNormalBufferMap
                       |> WonderCommonlib.SparseMapService.has(geometry2),
                       boxGeometryElementArrayBufferMap
                       |> WonderCommonlib.SparseMapService.has(geometry2),
                       customGeometryVertexBufferMap
                       |> WonderCommonlib.SparseMapService.has(geometry3),
                       customGeometryNormalBufferMap
                       |> WonderCommonlib.SparseMapService.has(geometry3),
                       customGeometryElementArrayBufferMap
                       |> WonderCommonlib.SparseMapService.has(geometry3)
                     )
                     |> expect == (false, false, false, false, false, false, false, false, false)
                     |> resolve
                   }
                 )
            }
          )
        }
      )
    }
  );