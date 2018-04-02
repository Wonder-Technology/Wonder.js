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
      let state = ref(MainStateTool.createState());
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
              open GameObjectAPI;
              open GameObjectAPI;
              let (state, material) = createLightMaterial(state^);
              let (state, gameObject) = state |> createGameObject;
              let state = state |> addGameObjectLightMaterialComponent(gameObject, material);
              state |> unsafeGetLightMaterialGameObject(material) |> expect == gameObject
            }
          )
      );
      describe(
        "operate data",
        () => {
          test(
            "get the data from array buffer may not equal to the value which is setted",
            () => {
              let (state, material) = createLightMaterial(state^);
              let color = [|0.2, 0.3, 0.5|];
              let state = state |> setLightMaterialDiffuseColor(material, color);
              getLightMaterialDiffuseColor(material, state)
              |> expect == [|0.20000000298023224, 0.30000001192092896, 0.5|]
            }
          );
          describe(
            "getLightMaterialDiffuseColor",
            () =>
              test(
                "test default color",
                () => {
                  let (state, material) = createLightMaterial(state^);
                  getLightMaterialDiffuseColor(material, state) |> expect == [|1., 1., 1.|]
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
                  getLightMaterialDiffuseColor(material, state)
                  |> TypeArrayTool.truncateArray
                  |> expect == color
                }
              )
          );
          describe(
            "getLightMaterialSpecularColor",
            () =>
              test(
                "test default color",
                () => {
                  let (state, material) = createLightMaterial(state^);
                  getLightMaterialSpecularColor(material, state) |> expect == [|1., 1., 1.|]
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
                  getLightMaterialSpecularColor(material, state)
                  |> TypeArrayTool.truncateArray
                  |> expect == color
                }
              )
          );
          describe(
            "getLightMaterialShininess",
            () =>
              test(
                "test default shininess",
                () => {
                  let (state, material) = createLightMaterial(state^);
                  getLightMaterialShininess(material, state) |> expect == 32.
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
                  getLightMaterialShininess(material, state) |> expect == shininess
                }
              )
          )
        }
      );
      describe(
        "disposeComponent",
        () =>
          describe(
            "dispose data",
            () => {
              test(
                "remove from gameObjectMap",
                () => {
                  open LightMaterialType;
                  let (state, gameObject1, material1) = LightMaterialTool.createGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectLightMaterialComponent(
                         gameObject1,
                         material1
                       );
                  let {gameObjectMap} = LightMaterialTool.getMaterialRecord(state);
                  gameObjectMap
                  |> WonderCommonlib.SparseMapService.has(material1)
                  |> expect == false
                }
              );
              describe(
                "test remove from type array",
                () => {
                  let _testRemoveFromTypeArr =
                      (
                        state,
                        valueTuple,
                        defaultValue,
                        (createGameObjectFunc, getValueFunc, setValueFunc)
                      ) =>
                    AllMaterialTool.testRemoveFromTypeArr(
                      state,
                      valueTuple,
                      defaultValue,
                      (
                        GameObjectAPI.disposeGameObjectLightMaterialComponent,
                        createGameObjectFunc,
                        getValueFunc,
                        setValueFunc
                      )
                    );
                  describe(
                    "remove from shaderIndices",
                    () =>
                      test(
                        "reset removed one's value",
                        () =>
                          _testRemoveFromTypeArr(
                            state,
                            (1, 2),
                            LightMaterialTool.getDefaultShaderIndex(state^),
                            (
                              LightMaterialTool.createGameObject,
                              LightMaterialTool.getShaderIndex,
                              LightMaterialTool.setShaderIndex
                            )
                          )
                      )
                  );
                  describe(
                    "remove from diffuseColors",
                    () =>
                      test(
                        "reset removed one's value",
                        () =>
                          _testRemoveFromTypeArr(
                            state,
                            ([|1., 0.2, 0.3|], [|0., 0.2, 0.3|]),
                            LightMaterialTool.getDefaultDiffuseColor(state^),
                            (
                              LightMaterialTool.createGameObject,
                              (material, state) =>
                                getLightMaterialDiffuseColor(material, state)
                                |> TypeArrayTool.truncateArray,
                              setLightMaterialDiffuseColor
                            )
                          )
                      )
                  );
                  describe(
                    "remove from specularColors",
                    () =>
                      test(
                        "reset removed one's value",
                        () =>
                          _testRemoveFromTypeArr(
                            state,
                            ([|1., 0.2, 0.3|], [|0., 0.2, 0.3|]),
                            LightMaterialTool.getDefaultSpecularColor(state^),
                            (
                              LightMaterialTool.createGameObject,
                              (material, state) =>
                                getLightMaterialSpecularColor(material, state)
                                |> TypeArrayTool.truncateArray,
                              setLightMaterialSpecularColor
                            )
                          )
                      )
                  );
                  describe(
                    "remove from shininess",
                    () =>
                      test(
                        "reset removed one's value",
                        () =>
                          _testRemoveFromTypeArr(
                            state,
                            (1., 2.),
                            LightMaterialTool.getDefaultShininess(state^),
                            (
                              LightMaterialTool.createGameObject,
                              getLightMaterialShininess,
                              setLightMaterialShininess
                            )
                          )
                      )
                  )
                }
              );
              test(
                "reset group count",
                () => {
                  let (state, material1) = createLightMaterial(state^);
                  let (state, gameObject1) = GameObjectAPI.createGameObject(state);
                  let state =
                    state
                    |> GameObjectAPI.addGameObjectLightMaterialComponent(gameObject1, material1);
                  let (state, gameObject2) = GameObjectAPI.createGameObject(state);
                  let state =
                    state
                    |> GameObjectAPI.addGameObjectLightMaterialComponent(gameObject2, material1);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectLightMaterialComponent(
                         gameObject1,
                         material1
                       );
                  LightMaterialTool.getGroupCount(material1, state) |> expect == 0
                }
              )
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
                open GameObjectAPI;
                open GameObjectAPI;
                let (state, material) = createLightMaterial(state^);
                let (state, gameObject) = state |> createGameObject;
                let state = state |> addGameObjectLightMaterialComponent(gameObject, material);
                let state =
                  state
                  |> GameObjectAPI.disposeGameObjectLightMaterialComponent(gameObject, material);
                expect(() => getFunc(material, state))
                |> toThrowMessage("expect component alive, but actual not")
              };
              test(
                "unsafeGetLightMaterialGameObject should error",
                () => _testGetFunc(unsafeGetLightMaterialGameObject)
              );
              test(
                "getLightMaterialDiffuseColor should error",
                () => _testGetFunc(getLightMaterialDiffuseColor)
              );
              test(
                "getLightMaterialSpecularColor should error",
                () => _testGetFunc(getLightMaterialSpecularColor)
              )
            }
          )
      )
    }
  );