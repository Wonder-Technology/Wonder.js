open Wonder_jest;

let _ =
  describe(
    "test get_render_array job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := RenderJobsTool.initWithRenderConfig()
        }
      );
      test(
        "set render array to state.renderData.renderArray",
        () => {
          let (state, gameObject1, _, _, _) = RenderJobsTool.prepareGameObject(sandbox, state^);
          let (state, gameObject2, _, _, _) = RenderJobsTool.prepareGameObject(sandbox, state);
          let render = (state: StateDataType.state) =>
            state |> GetRenderArrayJobTool.getJob(RenderJobsTool.buildConfigData());
          let state = RenderJobsTool.passGl(sandbox, state);
          let state = state |> RenderJobsTool.initSystemAndRender |> render;
          state.renderData.renderArray |> expect == Some([|gameObject1, gameObject2|])
        }
      )
    }
  );