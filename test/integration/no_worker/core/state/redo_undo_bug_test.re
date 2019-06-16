open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("fix redo,undo bug", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    test(
      {|1.create box1; 2.get copied state by deepCopyForRestore; 3.dispose box1; 4.add box2;
        the box1's vertices from copied state is wrong!|},
      () => {
        let state = TestTool.initWithJobConfig(~sandbox, ());

        let (state, boxGameObject, geometry) =
          BoxGeometryTool.createGameObject(state);
        let state = GameObjectAPI.initGameObject(boxGameObject, state);
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
        let copiedState = StateAPI.deepCopyForRestore(state);
        let state = GameObjectTool.disposeGameObject(boxGameObject, state);
        let (state, boxGameObject2, _) =
          BoxGeometryTool.createGameObject(state);
        let state = GameObjectAPI.initGameObject(boxGameObject2, state);
        BoxGeometryTool.getBoxGeometryVertices(copiedState)
        |> expect == BoxGeometryTool.getDefaultVertices();
      },
    );
    test(
      {|1.create box1 with map1;2.init and loop;3.get copied state by deepCopyForRestore;4.create box2 with map2;5.loop;6.restore;7.loop.
        should bind the box1->map1 in the last loop!
          |},
      () => {
        let state =
          RenderJobsTool.initWithJobConfig(
            sandbox,
            LoopRenderJobTool.buildNoWorkerJobConfig(),
          );

        let (state, _, _, _) = CameraTool.createCameraGameObject(state);
        let (state, gameObject1, _, _, _, _) =
          FrontRenderLightJobTool.prepareGameObjectWithCreatedDiffuseMap(
            sandbox,
            state,
          );
        let state = AllMaterialTool.pregetGLSLData(state);
        let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~bindTexture, ()),
             );
        let state =
          state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
        let copiedState = StateAPI.deepCopyForRestore(state);
        let (state, gameObject2, _, _, _, _) =
          FrontRenderLightJobTool.prepareGameObjectWithCreatedDiffuseMap(
            sandbox,
            state,
          );
        let state = state |> GameObjectAPI.initGameObject(gameObject2);
        let state = state |> DirectorTool.runWithDefaultTime;

        let bindTextureCallCount = bindTexture |> getCallCount;

        let restoredState = MainStateTool.restore(state, copiedState);
        let restoredState = restoredState |> DirectorTool.runWithDefaultTime;

        bindTexture |> getCallCount |> expect == bindTextureCallCount + 1;
      },
    );
  });