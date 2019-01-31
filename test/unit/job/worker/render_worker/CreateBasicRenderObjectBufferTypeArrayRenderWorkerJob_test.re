open Wonder_jest;

open Js.Promise;

let _ =
  describe("CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      SharedArrayBufferTool.setSharedArrayBufferToBeArrayBuffer(.);
      sandbox := createSandbox();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("fix bug", () =>
      testPromise(
        "renderRecord->basicRenderObjectRecord should be correct ", () => {
        let state =
          SettingTool.createStateAndSetToStateData(
            ~useWorker="true",
            ~buffer=
              SettingTool.buildBufferConfigStr(~basicMaterialCount=8, ()),
            (),
          );
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let (state, _, _, _, _) =
          RenderBasicJobTool.prepareGameObject(sandbox, state);
        let (state, _, _, _, _) =
          RenderBasicJobTool.prepareGameObject(sandbox, state);
        let (state, _, _, _, _) =
          RenderBasicJobTool.prepareGameObjectWithGeometry(sandbox, state);
        let state = MainStateTool.setState(state);

        GetCameraDataMainWorkerJob.execJob(None, MainStateTool.getStateData())
        |> WonderBsMost.Most.concat(
             CreateBasicRenderObjectBufferMainWorkerJob.execJob(
               None,
               MainStateTool.getStateData(),
             ),
           )
        |> WonderBsMost.Most.drain
        |> then_(() => {
             let state = MainStateTool.unsafeGetState();
             let {buffer, renderIndexArray}: RenderType.renderObjectRecord =
               RenderMainTool.unsafeGetBasicRenderObjectRecord(state);
             let renderWorkerState =
               RenderWorkerStateTool.createStateAndSetToStateData();
             CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.execJob(
               None,
               Some({
                 "data": {
                   "renderData": {
                     "isRender": true,
                     "basic": {
                       "buffer": buffer,
                       "renderIndexArray": renderIndexArray,
                       "bufferCount":
                         BufferSettingTool.getBasicMaterialCount(state),
                     },
                   },
                 },
               }),
               RenderWorkerStateTool.getStateData(),
             )
             |> WonderBsMost.Most.drain
             |> then_(() => {
                  let renderWorkerState =
                    RenderWorkerStateTool.unsafeGetState();
                  let {
                    renderIndexArray,
                    transformIndices,
                    materialIndices,
                    geometryIndices,
                    sourceInstanceIndices,
                  }: RenderWorkerRenderType.renderObjectRecord =
                    RenderRenderWorkerTool.unsafeGetBasicRenderObjectRecord(
                      renderWorkerState,
                    );
                  let defaultShaderIndex = BufferTool.getDefaultShaderIndex();
                  let defaultSourceInstance =
                    BufferTool.getDefaultSourceInstance();
                  (
                    renderIndexArray,
                    transformIndices,
                    materialIndices,
                    geometryIndices,
                    sourceInstanceIndices,
                  )
                  |>
                  expect == (
                              [|0, 1, 2|],
                              Js.Typed_array.Uint32Array.make([|
                                2,
                                3,
                                4,
                                0,
                                0,
                                0,
                                0,
                                0,
                              |]),
                              Js.Typed_array.Uint32Array.make([|
                                0,
                                1,
                                2,
                                0,
                                0,
                                0,
                                0,
                                0,
                              |]),
                              Js.Typed_array.Uint32Array.make([|
                                0,
                                1,
                                2,
                                0,
                                0,
                                0,
                                0,
                                0,
                              |]),
                              Js.Typed_array.Uint32Array.make([|
                                defaultSourceInstance,
                                defaultSourceInstance,
                                defaultSourceInstance,
                                defaultSourceInstance,
                                defaultSourceInstance,
                                defaultSourceInstance,
                                defaultSourceInstance,
                                defaultSourceInstance,
                              |]),
                            )
                  |> resolve;
                });
           });
      })
    );
  });