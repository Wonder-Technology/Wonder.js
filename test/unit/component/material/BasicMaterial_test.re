open BasicMaterial;

open Wonder_jest;

let _ =
  describe(
    "BasicMaterial",
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
        "createBasicMaterial",
        () =>
          test(
            "create a new material which is just index(int)",
            () => {
              let (_, material) = createBasicMaterial(state^);
              expect(material) == 0
            }
          )
      );
      describe(
        "init",
        () =>
          describe(
            "contract check",
            () =>
              test(
                "shouldn't dispose any material before init",
                () => {
                  let (state, material1) = createBasicMaterial(state^);
                  let (state, material2) = createBasicMaterial(state);
                  let state = state |>  BasicMaterialTool.dispose(material1);
                  expect(
                    () => {
                      let state =
                        state |> BasicMaterialTool.initMaterials([@bs] GlTool.unsafeGetGl(state));
                      ()
                    }
                  )
                  |> toThrowMessage("expect not dispose any material before init, but actual do")
                }
              )
          )
      );
      describe(
        "getBasicMaterialGameObject",
        () =>
          test(
            "get material's gameObject",
            () => {
              open GameObject;
              let (state, material) = createBasicMaterial(state^);
              let (state, gameObject) = state |> createGameObject;
              let state = state |> addGameObjectBasicMaterialComponent(gameObject, material);
              state |> getBasicMaterialGameObject(material) |> expect == gameObject
            }
          )
      );
      describe(
        "getBasicMaterialColor",
        () =>
          test(
            "test default color",
            () => {
              let (state, material) = createBasicMaterial(state^);
              getBasicMaterialColor(material, state) |> expect == [| 1., 1., 1. |]
            }
          )
      );
      describe(
        "setBasicMaterialColor",
        () =>
          test(
            "test set color",
            () => {
              let (state, material) = createBasicMaterial(state^);
              let color = [| 0.2, 0.3, 0.5 |];
              let state = state |> setBasicMaterialColor(material, color);
              getBasicMaterialColor(material, state) |> expect == color
            }
          )
      );
      describe(
        "disposeComponent",
        () =>{

          describe(
            "dispose data",
            () => {
              test(
                "remove from colorMap, shaderIndexMap, gameObjectMap",
                () => {
                  open BasicMaterialType;
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let state =
                    state
                    |> GameObject.disposeGameObjectBasicMaterialComponent(gameObject1, material1);
                  let {colorMap, shaderIndexMap, gameObjectMap} =
                    BasicMaterialTool.getMaterialData(state);
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
                    state |> GameObject.addGameObjectBasicMaterialComponent(gameObject1, material1);
                  let (state, gameObject2) = GameObject.createGameObject(state);
                  let state =
                    state |> GameObject.addGameObjectBasicMaterialComponent(gameObject2, material1);
                  let state =
                    state
                    |> GameObject.disposeGameObjectBasicMaterialComponent(gameObject1, material1);
                  BasicMaterialTool.getGroupCount(material1, state) |> expect == 0
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
                  let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
                  let state =
                    state |> GameObject.disposeGameObjectBasicMaterialComponent(gameObject1, material1);
                  let (state, gameObject3, material3) = BasicMaterialTool.createGameObject(state);
                  material3 |> expect == material1
                }
              );
              test(
                "if has no disposed index, get index from materialData.index",
                () => {
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
                  let state =
                    state |> GameObject.disposeGameObjectBasicMaterialComponent(gameObject1, material1);
                  let (state, gameObject3, material3) = BasicMaterialTool.createGameObject(state);
                  let (state, gameObject4, material4) = BasicMaterialTool.createGameObject(state);
                  (material3, material4) |> expect == (material1, material2 + 1)
                }
              )
            }
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
                let state = state |> addGameObjectBasicMaterialComponent(gameObject, material);
                let state =
                  state |> GameObject.disposeGameObjectBasicMaterialComponent(gameObject, material);
                expect(() => getFunc(material, state))
                |> toThrowMessage("expect component alive, but actual not")
              };
              test(
                "getBasicMaterialGameObject should error",
                () => _testGetFunc(getBasicMaterialGameObject)
              )
            }
          )
      )
    }
  );