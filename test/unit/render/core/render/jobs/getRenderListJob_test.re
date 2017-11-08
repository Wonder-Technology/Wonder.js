open Jest;

let _ =
  describe(
    "test get_render_list job",
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
        "set render list to state.renderData.renderList",
        () => {
          let (state, gameObject1, _, _, _) = RenderJobsTool.prepareGameObject(sandbox, state^);
          let (state, gameObject2, _, _, _) = RenderJobsTool.prepareGameObject(sandbox, state);
          let render = (state: StateDataType.state) =>
            state |> GetRenderListJobTool.getJob(RenderJobsTool.buildConfigData());
          let state = RenderJobsTool.passGl(sandbox, state);
          let state = state |> RenderJobsTool.initSystemAndRender |> render;
          state.renderData.renderList |> expect == Some([|gameObject1, gameObject2|])
        }
      )
    }
  );