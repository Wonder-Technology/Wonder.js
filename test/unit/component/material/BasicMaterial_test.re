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
            "test gameObject add new material after dispose old one",
            () => {
              beforeEach(
                () =>
                  BufferConfigTool.setBufferSize(state^, ~basicMaterialDataBufferCount=2, ())
                  |> ignore
              );
              test(
                "if materialData.index == maxCount, use disposed index(material) as new index",
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
                "if has no disposed one, error",
                () => {
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
                  expect(() => createBasicMaterial(state))
                  |> toThrowMessage("have create too many components")
                }
              )
            }
          )
      )
    }
  );