open Wonder_jest;

open Js.Promise;

let _ =
  describe("test init skybox main worker job", () => {
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

    describe("prepare skybox gameObject to scene", () =>
      describe("create skybox gameObject to scene", () =>
        testPromise("gameObject has box geometry", () => {
          let state =
            state^
            |> FakeGlWorkerTool.setFakeGl(
                 FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
               );

          RenderJobsRenderWorkerTool.init(
            state =>
              BoxGeometryTool.isBoxGeometry(
                GameObjectAPI.unsafeGetGameObjectGeometryComponent(
                  SkyboxTool.unsafeGetSkyboxGameObject(state),
                  state,
                ),
                state,
              )
              |> expect == true
              |> resolve,
            state,
          );
        })
      )
    );
  });