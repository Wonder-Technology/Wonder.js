open LightMaterialAPI;

open Wonder_jest;

let _ =
  describe(
    "LightMaterial",
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
        "createLightMaterial",
        () =>
          test(
            "create a new material which is just index(int)",
            () => {
              let (_, material) = createLightMaterial(state^);
              expect(material) == 0
            }
          )
      );
      /* describe(
           "init",
           () =>
             describe(
               "contract check",
               () =>
                 test(
                   "shouldn't dispose any material before init",
                   () => {
                     let (state, material1) = createLightMaterial(state^);
                     let (state, material2) = createLightMaterial(state);
                     let state = state |>  LightMaterialTool.dispose(material1);
                     expect(
                       () => {
                         let state =
                           state |> LightMaterialTool.initMaterials([@bs] GlTool.unsafeGetGl(state));
                         ()
                       }
                     )
                     |> toThrowMessage("expect not dispose any material before init, but actual do")
                   }
                 )
             )
         ); */
      describe(
        "unsafeGetLightMaterialGameObject",
        () =>
          test(
            "get material's gameObject",
            () => {
              open GameObjectAPI; open GameObjectAPI;
              let (state, material) = createLightMaterial(state^);
              let (state, gameObject) = state |> createGameObject;
              let state = state |> addGameObjectLightMaterialComponent(gameObject, material);
              state |> unsafeGetLightMaterialGameObject(material) |> expect == gameObject
            }
          )
      );
      describe(
        "unsafeGetLightMaterialDiffuseColor",
        () =>
          test(
            "test default color",
            () => {
              let (state, material) = createLightMaterial(state^);
              unsafeGetLightMaterialDiffuseColor(material, state) |> expect == [|1., 1., 1.|]
            }
          )
      );
      describe(
        "setLightMaterialDiffuseColor",
        () =>
          test(
            "test set color",
            () => {
              let (state, material) = createLightMaterial(state^);
              let color = [|0.2, 0.3, 0.5|];
              let state = state |> setLightMaterialDiffuseColor(material, color);
              unsafeGetLightMaterialDiffuseColor(material, state) |> expect == color
            }
          )
      );
      describe(
        "unsafeGetLightMaterialSpecularColor",
        () =>
          test(
            "test default color",
            () => {
              let (state, material) = createLightMaterial(state^);
              unsafeGetLightMaterialSpecularColor(material, state) |> expect == [|1., 1., 1.|]
            }
          )
      );
      describe(
        "setLightMaterialSpecularColor",
        () =>
          test(
            "test set color",
            () => {
              let (state, material) = createLightMaterial(state^);
              let color = [|0.2, 0.3, 0.5|];
              let state = state |> setLightMaterialSpecularColor(material, color);
              unsafeGetLightMaterialSpecularColor(material, state) |> expect == color
            }
          )
      );
      describe(
        "unsafeGetLightMaterialShininess",
        () =>
          test(
            "test default shininess",
            () => {
              let (state, material) = createLightMaterial(state^);
              unsafeGetLightMaterialShininess(material, state) |> expect == 32.
            }
          )
      );
      describe(
        "setLightMaterialShininess",
        () =>
          test(
            "test set shininess",
            () => {
              let (state, material) = createLightMaterial(state^);
              let shininess = 30.;
              let state = state |> setLightMaterialShininess(material, shininess);
              unsafeGetLightMaterialShininess(material, state) |> expect == shininess
            }
          )
      );
      describe(
        "disposeComponent",
        () =>
          describe(
            "dispose record",
            () => {
              test(
                "remove from diffuseColorMap, specularColorMap, shininessMap, shaderIndexMap, gameObjectMap",
                () => {
                  open LightMaterialType;
                  let (state, gameObject1, material1) = LightMaterialTool.createGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectLightMaterialComponent(gameObject1, material1);
                  let {
                    diffuseColorMap,
                    specularColorMap,
                    shininessMap,
                    shaderIndexMap,
                    gameObjectMap
                  } =
                    state.lightMaterialRecord;
                  (
                    diffuseColorMap |> WonderCommonlib.SparseMapService.has(material1),
                    specularColorMap |> WonderCommonlib.SparseMapService.has(material1),
                    shininessMap |> WonderCommonlib.SparseMapService.has(material1),
                    shaderIndexMap |> WonderCommonlib.SparseMapService.has(material1),
                    gameObjectMap |> WonderCommonlib.SparseMapService.has(material1)
                  )
                  |> expect == (false, false, false, false, false)
                }
              );
              test(
                "reset group count",
                () => {
                  let (state, material1) = createLightMaterial(state^);
                  let (state, gameObject1) = GameObjectAPI.createGameObject(state);
                  let state =
                    state |> GameObjectAPI.addGameObjectLightMaterialComponent(gameObject1, material1);
                  let (state, gameObject2) = GameObjectAPI.createGameObject(state);
                  let state =
                    state |> GameObjectAPI.addGameObjectLightMaterialComponent(gameObject2, material1);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectLightMaterialComponent(gameObject1, material1);
                  LightMaterialTool.getGroupCount(material1, state) |> expect == 0
                }
              )
            }
          )
      );
      /* describe(
           "test add new one after dispose old one",
           () => {
             test(
               "use disposed index as new index firstly",
               () => {
                 let (state, gameObject1, material1) = LightMaterialTool.createGameObject(state^);
                 let (state, gameObject2, material2) = LightMaterialTool.createGameObject(state);
                 let state =
                   state
                   |> GameObjectAPI.disposeGameObjectLightMaterialComponent(gameObject1, material1);
                 let (state, gameObject3, material3) = LightMaterialTool.createGameObject(state);
                 material3 |> expect == material1
               }
             );
             test(
               "if has no disposed index, get index from materialData.index",
               () => {
                 let (state, gameObject1, material1) = LightMaterialTool.createGameObject(state^);
                 let (state, gameObject2, material2) = LightMaterialTool.createGameObject(state);
                 let state =
                   state
                   |> GameObjectAPI.disposeGameObjectLightMaterialComponent(gameObject1, material1);
                 let (state, gameObject3, material3) = LightMaterialTool.createGameObject(state);
                 let (state, gameObject4, material4) = LightMaterialTool.createGameObject(state);
                 (material3, material4) |> expect == (material1, material2 + 1)
               }
             )
           }
         ) */
      describe(
        "contract check: is alive",
        () =>
          describe(
            "if material is disposed",
            () => {
              let _testGetFunc = (getFunc) => {
                open GameObjectAPI; open GameObjectAPI;
                let (state, material) = createLightMaterial(state^);
                let (state, gameObject) = state |> createGameObject;
                let state = state |> addGameObjectLightMaterialComponent(gameObject, material);
                let state =
                  state |> GameObjectAPI.disposeGameObjectLightMaterialComponent(gameObject, material);
                expect(() => getFunc(material, state))
                |> toThrowMessage("expect component alive, but actual not")
              };
              test(
                "unsafeGetLightMaterialGameObject should error",
                () => _testGetFunc(unsafeGetLightMaterialGameObject)
              );
              test(
                "unsafeGetLightMaterialDiffuseColor should error",
                () => _testGetFunc(unsafeGetLightMaterialDiffuseColor)
              );
              test(
                "unsafeGetLightMaterialSpecularColor should error",
                () => _testGetFunc(unsafeGetLightMaterialSpecularColor)
              )
            }
          )
      )
    }
  );