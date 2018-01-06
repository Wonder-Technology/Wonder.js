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
      let state = ref(StateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
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
        "getMaterialColor",
        () =>
          test(
            "test default color",
            () => {
              let (state, material) = createBasicMaterial(state^);
              getMaterialColor(material, state) |> expect == [| 1., 1., 1. |]
            }
          )
      );
      describe(
        "setMaterialColor",
        () =>
          test(
            "test set color",
            () => {
              let (state, material) = createBasicMaterial(state^);
              let color = [| 0.2, 0.3, 0.5 |];
              let state = state |> setMaterialColor(material, color);
              getMaterialColor(material, state) |> expect == color
            }
          )
      );
      describe(
        "disposeComponent",
        () => {
          describe(
            "dispose data",
            () => {
              test(
                "remove from colorMap, shaderIndexMap, gameObjectMap",
                () => {
                  open MaterialType;
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let state =
                    state |> GameObject.disposeGameObjectMaterialComponent(gameObject1, material1);
                  let {colorMap, shaderIndexMap, gameObjectMap} =
                    MaterialTool.getMaterialData(state);
                  (
                    colorMap |> WonderCommonlib.SparseMapSystem.has(material1),
                    shaderIndexMap |> WonderCommonlib.SparseMapSystem.has(material1),
                    gameObjectMap |> WonderCommonlib.SparseMapSystem.has(material1)
                  )
                  |> expect == (false, false, false)
                }
              );
              test(
                "reset group count",
                () => {
                  let (state, material1) = createBasicMaterial(state^);
                  let (state, gameObject1) = GameObject.createGameObject(state);
                  let state =
                    state |> GameObject.addGameObjectMaterialComponent(gameObject1, material1);
                  let (state, gameObject2) = GameObject.createGameObject(state);
                  let state =
                    state |> GameObject.addGameObjectMaterialComponent(gameObject2, material1);
                  let state =
                    state |> GameObject.disposeGameObjectMaterialComponent(gameObject1, material1);
                  MaterialTool.getGroupCount(material1, state) |> expect == 0
                }
              )
            }
          );
          describe(
            "test add new one after dispose old one",
            () => {
              test(
                "use disposed index as new index firstly",
                () => {
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let state =
                    state |> GameObject.disposeGameObjectMaterialComponent(gameObject1, material1);
                  let (state, material2) = createBasicMaterial(state);
                  material2 |> expect == material1
                }
              );
              test(
                "if has no disposed index, get index from materialData.index",
                () => {
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let state =
                    state |> GameObject.disposeGameObjectMaterialComponent(gameObject1, material1);
                  let (state, material2) = createBasicMaterial(state);
                  let (state, material3) = createBasicMaterial(state);
                  (material2, material3) |> expect == (material1, material1 + 1)
                }
              )
            }
          );
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
        }
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