open Wonder_jest;

let _ =
  describe("test init skybox job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.initWithJobConfig(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigTool.buildNoWorkerJobConfig(
              ~initPipelines=
                {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_skybox"
        }
      ]
    }
  ]
        |},
              ~initJobs=
                {|
[
        {
          "name": "init_skybox"
        }
]
        |},
              (),
            ),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("prepare skybox gameObject to scene", () =>
      describe("create skybox gameObject to scene", () =>
        test("gameObject has box geometry", () => {
          let state = state^ |> InitRenderJobTool.exec;

          BoxGeometryTool.isBoxGeometry(
            GameObjectAPI.unsafeGetGameObjectGeometryComponent(
              SkyboxTool.unsafeGetSkyboxGameObject(state),
              state,
            ),
            state,
          )
          |> expect == true;
        })
      )
    );

    describe("if skybox has cubemap texture", () =>
      describe("init texture", () =>
        describe("create gl texture, save to glTextureMap", () =>
          test("test", () => {
            let (state, map) =
              CubemapTextureAPI.createCubemapTexture(state^);
            let state = SceneAPI.setCubemapTexture(map, state);
            let glTexture = Obj.magic(1);
            let createTexture =
              Sinon.createEmptyStubWithJsObjSandbox(sandbox);
            createTexture |> returns(glTexture);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ()),
                 );

            let state = state |> InitRenderJobTool.exec;

            CubemapTextureTool.unsafeGetTexture(map, state)
            |> expect == glTexture;
          })
        )
      )
    );
  });