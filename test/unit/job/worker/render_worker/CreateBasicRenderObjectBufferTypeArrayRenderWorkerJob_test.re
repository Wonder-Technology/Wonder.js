open Wonder_jest;

open Js.Promise;

let _ =
  describe(
    "CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          [@bs] SharedArrayBufferTool.setSharedArrayBufferToBeArrayBuffer();
          sandbox := createSandbox()
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "fix bug",
        () =>
          testPromise(
            "renderRecord->basicRenderObjectRecord should be correct ",
            () => {
              let state =
                SettingTool.createStateAndSetToStateData(
                  ~useWorker="true",
                  ~buffer=SettingTool.buildBufferConfigStr(~basicMaterialCount=5, ()),
                  ()
                );
              let (state, _, _, _, _) = RenderBasicJobTool.prepareGameObject(sandbox, state);
              let (state, _, _, _, _) = RenderBasicJobTool.prepareGameObject(sandbox, state);
              let (state, _, _, _, _) =
                RenderBasicJobTool.prepareGameObjectWithCustomGeometry(sandbox, state);
              let state = MainStateTool.setState(state);
              CreateBasicRenderObjectBufferMainWorkerJob.execJob(
                None,
                MainStateTool.getStateData()
              )
              |> Most.drain
              |> then_(
                   () => {
                     let state = MainStateTool.unsafeGetState();
                     let {buffer, count, geometryTypes}: RenderType.renderObjectRecord =
                       RenderMainTool.unsafeGetBasicRenderObjectRecord(state);
                     let renderWorkerState = RenderWorkerStateTool.createStateAndSetToStateData();
                     CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.execJob(
                       None,
                       Some({
                         "data": {
                           "renderData": {
                             "isRender": Js.true_,
                             "basic": {
                               "buffer": buffer,
                               "count": count,
                               "bufferCount":
                                 BufferSettingTool.getBasicMaterialCount(state)
                             }
                           }
                         }
                       }),
                       RenderWorkerStateTool.getStateData()
                     )
                     |> Most.drain
                     |> then_(
                          () => {
                            let renderWorkerState = RenderWorkerStateTool.unsafeGetState();
                            let {
                              count,
                              transformIndices,
                              materialIndices,
                              geometryIndices,
                              sourceInstanceIndices,
                              geometryTypes
                            }: RenderWorkerRenderType.renderObjectRecord =
                              RenderRenderWorkerTool.unsafeGetBasicRenderObjectRecord(
                                renderWorkerState
                              );
                            let defaultShaderIndex = BufferTool.getDefaultShaderIndex();
                            let defaultSourceInstance = BufferTool.getDefaultSourceInstance();
                            (
                              count,
                              transformIndices,
                              materialIndices,
                              geometryIndices,
                              sourceInstanceIndices,
                              geometryTypes
                            )
                            |>
                            expect == (
                                        3,
                                        Js.Typed_array.Uint32Array.make([|0, 1, 2, 0, 0|]),
                                        Js.Typed_array.Uint32Array.make([|0, 1, 2, 0, 0|]),
                                        Js.Typed_array.Uint32Array.make([|0, 1, 0, 0, 0|]),
                                        Js.Typed_array.Uint32Array.make([|
                                          defaultSourceInstance,
                                          defaultSourceInstance,
                                          defaultSourceInstance,
                                          defaultSourceInstance,
                                          defaultSourceInstance
                                        |]),
                                        Js.Typed_array.Uint8Array.make([|0, 0, 1, 0, 0|])
                                      )
                            |> resolve
                          }
                        )
                   }
                 )
            }
          )
      )
    }
  );