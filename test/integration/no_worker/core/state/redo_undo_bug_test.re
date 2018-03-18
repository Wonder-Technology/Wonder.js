open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "fix redo,undo bug",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.initWithJobConfig(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        {|fix "1.create box1; 2.get copied state by deepCopyForRestore; 3.dispose box1; 4.add box2; 5.restore to copied state. the box1's vertices from copied state is wrong!" bug|},
        () => {
          let (state, boxGameObject, geometry) = BoxGeometryTool.createGameObject(state^);
          let state = GameObjectAPI.initGameObject(boxGameObject, state);
          let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let copiedState = StateAPI.deepCopyForRestore(state);
          let state = GameObjectAPI.disposeGameObject(boxGameObject, state);
          let (state, boxGameObject2, _) = BoxGeometryTool.createGameObject(state);
          let state = GameObjectAPI.initGameObject(boxGameObject2, state);
          BoxGeometryAPI.unsafeGetBoxGeometryVertices(geometry, copiedState)
          |> expect == BoxGeometryTool.getDefaultVertices()
        }
      )
    }
  );