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
        "disposeComponent",
        () =>
          describe(
            "contract check",
            () =>
              test(
                "shouldn't dispose the component which isn't alive",
                () => {
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let state =
                    state |> GameObject.disposeGameObjectMaterialComponent(gameObject1, material1);
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObject.disposeGameObjectMaterialComponent(gameObject1, material1);
                      ()
                    }
                  )
                  |> toThrowMessage("shouldn't dispose the component which isn't alive")
                }
              )
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