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
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init()
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
        "disposeComponent",
        () =>
          describe(
            "test add new one after dispose old one",
            () => {
              test(
                "use disposed index as new index firstly",
                () => {
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
                  let state =
                    state |> GameObject.disposeGameObjectMaterialComponent(gameObject1, material1);
                  let (state, gameObject3, material3) = BasicMaterialTool.createGameObject(state);
                  material3 |> expect == material1
                }
              );
              test(
                "if has no disposed index, get index from meshRendererData.index",
                () => {
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
                  let state =
                    state |> GameObject.disposeGameObjectMaterialComponent(gameObject1, material1);
                  let (state, gameObject3, material3) = BasicMaterialTool.createGameObject(state);
                  let (state, gameObject4, material4) = BasicMaterialTool.createGameObject(state);
                  (material3, material4) |> expect == (material1, material2 + 1)
                }
              )
            }
          )
      )
    }
  );