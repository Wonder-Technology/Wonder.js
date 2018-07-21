open Wonder_jest;

let _ =
  describe("replace material component", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        RenderJobsTool.initWithJobConfig(
          sandbox,
          LoopRenderJobTool.buildNoWorkerJobConfig(),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test replace basicMaterial with lightMaterial", () =>
      test("test send u_diffuse", () => {
        let (state, gameObject, _, basicMaterial, meshRenderer) =
          RenderBasicJobTool.prepareGameObject(sandbox, state^);
        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
        let pos1 = 0;
        let getUniformLocation =
          GLSLLocationTool.getUniformLocation(
            ~pos=pos1,
            sandbox,
            "u_diffuse",
          );
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~uniform3f,
                 ~getUniformLocation,
                 (),
               ),
             );
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

        let (state, lightMaterial) =
          LightMaterialAPI.createLightMaterial(state);
        let state =
          MaterialAPI.replaceMaterial(
            (basicMaterial, lightMaterial),
            gameObject,
            (
              GameObjectAPI.disposeGameObjectBasicMaterialComponent,
              GameObjectAPI.addGameObjectLightMaterialComponent,
            ),
            state,
          );
        let state = state |> DirectorTool.runWithDefaultTime;

        uniform3f |> withOneArg(pos1) |> getCallCount |> expect == 1;
      })
    );
  });