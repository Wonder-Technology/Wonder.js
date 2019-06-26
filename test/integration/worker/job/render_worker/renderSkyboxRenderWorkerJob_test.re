open Wonder_jest;

open Js.Promise;

let _ =
  describe("test render skybox render worker job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => TestWorkerTool.clear(sandbox));

    describe("test send render data to render worker", () =>
      testPromise("send skyboxData", () => {
        let (state, postMessageToRenderWorker) =
          SendRenderDataMainWorkerTool.prepareForTestSendRenderData(sandbox);

        let (state, map) = SkyboxTool.prepareCubemapTexture(state);

        let state =
          state
          |> FakeGlWorkerTool.setFakeGl(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
             );

        MainStateTool.setState(state);

        RenderJobsRenderWorkerTool.init(
          state =>
            WorkerJobWorkerTool.execMainWorkerJob(
              ~execJobFunc=SendRenderDataMainWorkerJob.execJob,
              ~completeFunc=
                _ =>
                  postMessageToRenderWorker
                  |> expect
                  |> toCalledWith([|
                       SendRenderRenderDataWorkerTool.buildRenderRenderData(
                         ~skyboxData={
                           "cubemapTextureOpt":
                             SkyboxSceneMainService.getCubemapTexture(state),
                           "renderSkyboxGameObjectDataOpt":
                             RenderSkyboxJobUtils.getRenderData(state),
                         },
                         (),
                       ),
                     |])
                  |> resolve,
              (),
            ),
          state,
        );
      })
    );

    describe("test render worker job", () => {
      beforeAllPromise(() =>
        CubemapTextureRenderWorkerTool.buildFakeCreateImageBitmapFunc()
      );
      afterAllPromise(() =>
        CubemapTextureRenderWorkerTool.clearFakeCreateImageBitmapFunc()
      );

      describe("if skybox has cubemap texture", () =>
        describe("bind cubemap", () =>
          testPromise("active texture unit", () => {
            let state = TestMainWorkerTool.initWithJobConfig(~sandbox, ());

            let (state, map) = SkyboxTool.prepareCubemapTexture(state);
            let (state, _, _) = SkyboxTool.prepareGameObject(state);

            let textureUnit0 = 10;
            let textureCubemap = Obj.magic(8);
            let glTexture1 = Obj.magic(11);
            let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
            createTexture |> onCall(0) |> returns(glTexture1);
            let activeTexture = createEmptyStubWithJsObjSandbox(sandbox);
            let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlWorkerTool.setFakeGl(
                   FakeGlWorkerTool.buildFakeGl(
                     ~sandbox,
                     ~textureUnit0,
                     ~textureCubemap,
                     ~createTexture,
                     ~activeTexture,
                     ~bindTexture,
                     (),
                   ),
                 );

            MainStateTool.setState(state);

            RenderJobsRenderWorkerTool.initAndMainLoopAndRender(
              ~state,
              ~sandbox,
              ~completeFunc=
                _ =>
                  activeTexture
                  |> withOneArg(textureUnit0)
                  |> expect
                  |> toCalledOnce
                  |> resolve,
              (),
            );
          })
        )
      );
    });
  });