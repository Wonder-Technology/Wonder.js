open Material;

open BasicMaterial;

open Wonder_jest;

let _ =
  describe(
    "Material",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init()
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "getMaterialGameObject",
        () =>
          test(
            "get material's gameObject",
            () => {
              open GameObject;
              let (state, material) = createBasicMaterial(state^);
              let (state, gameObject) = state |> createGameObject;
              let state = state |> addGameObjectMaterialComponent(gameObject, material);
              state |> getMaterialGameObject(material) |> expect == gameObject
            }
          )
      );
      describe(
        "contract check: is alive",
        () =>
          describe(
            "if material is disposed",
            () => {
              let _testGetFunc = (getFunc) => {
                open GameObject;
                let (state, material) = createBasicMaterial(state^);
                let (state, gameObject) = state |> createGameObject;
                let state = state |> addGameObjectMaterialComponent(gameObject, material);
                let state =
                  state |> GameObject.disposeGameObjectMaterialComponent(gameObject, material);
                expect(() => getFunc(material, state)) |> toThrowMessage("component should alive")
              };
              test("getMaterialGameObject should error", () => _testGetFunc(getMaterialGameObject))
            }
          )
      )
    }
  );