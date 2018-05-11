open BasicMaterialAPI;

open Wonder_jest;

let _ =
  describe(
    "BasicMaterial",
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
        "createBasicMaterial",
        () => {
          test(
            "create a new material which is just index(int)",
            () => {
              let (_, material) = createBasicMaterial(state^);
              expect(material) == 0
            }
          );
          describe(
            "set default value",
            () =>
              test(
                "set texture count to be 0",
                () => {
                  let (state, material) = createBasicMaterial(state^);
                  BasicMaterialTool.getTextureCount(material, state) |> expect == 0
                }
              )
          )
        }
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
                  let state = state |> BasicMaterialTool.dispose(material1);
                  expect(
                    () => {
                      let state =
                        state
                        |> BasicMaterialTool.initMaterials(
                             FakeGlTool.buildFakeGl(~sandbox, ()) |> Obj.magic
                           );
                      ()
                    }
                  )
                  |> toThrowMessage("expect component's gameObject exist, but actual not")
                }
              )
          )
      );
      describe(
        "unsafeGetBasicMaterialGameObject",
        () =>
          test(
            "get material's gameObject",
            () => {
              open GameObjectAPI;
              open GameObjectAPI;
              let (state, material) = createBasicMaterial(state^);
              let (state, gameObject) = state |> createGameObject;
              let state = state |> addGameObjectBasicMaterialComponent(gameObject, material);
              state |> unsafeGetBasicMaterialGameObject(material) |> expect == gameObject
            }
          )
      );
      describe(
        "operate data",
        () => {
          test(
            "get the data from array buffer may not equal to the value which is setted",
            () => {
              let (state, material) = createBasicMaterial(state^);
              let color = [|0.2, 0.3, 0.5|];
              let state = state |> setBasicMaterialColor(material, color);
              getBasicMaterialColor(material, state)
              |> expect == [|0.20000000298023224, 0.30000001192092896, 0.5|]
            }
          );
          describe(
            "getBasicMaterialColor",
            () =>
              test(
                "test default color",
                () => {
                  let (state, material) = createBasicMaterial(state^);
                  getBasicMaterialColor(material, state) |> expect == [|1., 1., 1.|]
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
                  let color = [|0.2, 0.3, 0.5|];
                  let state = state |> setBasicMaterialColor(material, color);
                  getBasicMaterialColor(material, state)
                  |> TypeArrayTool.truncateArray
                  |> expect == color
                }
              )
          );
          describe(
            "unsafeGetBasicMaterialMap",
            () =>
              test(
                "test default value",
                () => {
                  let (state, material) = createBasicMaterial(state^);
                  BasicMaterialAPI.unsafeGetBasicMaterialMap(material, state)
                  |> Obj.magic
                  |> expect == Js.Undefined.empty
                }
              )
          );
          describe(
            "setBasicMaterialMap",
            () => {
              let _prepare = (state) => {
                let (state, material) = createBasicMaterial(state);
                let (state, map1) = TextureAPI.createTexture(state);
                let (state, map2) = TextureAPI.createTexture(state);
                let state = state |> BasicMaterialAPI.setBasicMaterialMap(material, map2);
                (state, material, map2)
              };
              test(
                "texture count + 1",
                () => {
                  let (state, material, map) = _prepare(state^);
                  BasicMaterialTool.getTextureCount(material, state) |> expect == 1
                }
              );
              test(
                "set map unit to 0",
                () => {
                  let (state, material, map) = _prepare(state^);
                  BasicMaterialTool.getMapUnit(material, state) |> expect == 0
                }
              );
              test(
                "save texture index",
                () => {
                  let (state, material, map) = _prepare(state^);
                  BasicMaterialAPI.unsafeGetBasicMaterialMap(material, state) |> expect == map
                }
              )
            }
          )
        }
      );
      describe(
        "disposeComponent",
        () => {
          describe(
            "dispose data",
            () => {
              describe(
                "test dispose shared material",
                () =>
                  test(
                    "descrease group count",
                    () => {
                      let (state, material1) = createBasicMaterial(state^);
                      let (state, gameObject1) = GameObjectAPI.createGameObject(state);
                      let state =
                        state
                        |> GameObjectAPI.addGameObjectBasicMaterialComponent(
                             gameObject1,
                             material1
                           );
                      let (state, gameObject2) = GameObjectAPI.createGameObject(state);
                      let state =
                        state
                        |> GameObjectAPI.addGameObjectBasicMaterialComponent(
                             gameObject2,
                             material1
                           );
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                             gameObject1,
                             material1
                           );
                      BasicMaterialTool.getGroupCount(material1, state) |> expect == 0
                    }
                  )
              );
              describe(
                "test dispose not shared material",
                () => {
                  test(
                    "reset textureCount to 0 from textureCountMap",
                    () => {
                      open BasicMaterialType;
                      let (state, gameObject1, (material1, _)) =
                        BasicMaterialTool.createGameObjectWithMap(state^);
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                             gameObject1,
                             material1
                           );
                      BasicMaterialTool.getTextureCount(material1, state) |> expect == 0
                    }
                  );
                  test(
                    "remove from gameObjectMap",
                    () => {
                      open BasicMaterialType;
                      let (state, gameObject1, material1) =
                        BasicMaterialTool.createGameObject(state^);
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                             gameObject1,
                             material1
                           );
                      let {gameObjectMap} = BasicMaterialTool.getRecord(state);
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
                            GameObjectTool.disposeGameObjectBasicMaterialComponent,
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
                                BasicMaterialTool.getDefaultShaderIndex(state^),
                                (
                                  BasicMaterialTool.createGameObject,
                                  BasicMaterialTool.getShaderIndex,
                                  BasicMaterialTool.setShaderIndex
                                )
                              )
                          )
                      );
                      describe(
                        "remove from colors",
                        () =>
                          test(
                            "reset removed one's value",
                            () =>
                              _testRemoveFromTypeArr(
                                state,
                                ([|1., 0.2, 0.3|], [|0., 0.2, 0.3|]),
                                BasicMaterialTool.getDefaultColor(state^),
                                (
                                  BasicMaterialTool.createGameObject,
                                  (material, state) =>
                                    getBasicMaterialColor(material, state)
                                    |> TypeArrayTool.truncateArray,
                                  setBasicMaterialColor
                                )
                              )
                          )
                      );
                      describe(
                        "test map typeArrays",
                        () => {
                          let _testRemoveFromTypeArr =
                              (
                                state,
                                valueTuple,
                                defaultValue,
                                (createGameObjectFunc, getValueFunc, setValueFunc)
                              ) =>
                            AllMaterialTool.testRemoveFromTypeArrWithMap(
                              state,
                              valueTuple,
                              defaultValue,
                              (
                                GameObjectTool.disposeGameObjectBasicMaterialComponent,
                                createGameObjectFunc,
                                getValueFunc,
                                setValueFunc
                              )
                            );
                          describe(
                            "remove from textureIndices",
                            () =>
                              test(
                                "reset material's all texture indices",
                                () => {
                                  open Js.Typed_array;
                                  open BasicMaterialType;
                                  let state =
                                    TestTool.initWithoutBuildFakeDom(
                                      ~sandbox,
                                      ~buffer=
                                        SettingTool.buildBufferConfigStr(
                                          ~textureCountPerMaterial=2,
                                          ()
                                        ),
                                      ()
                                    );
                                  let (state, gameObject1, (material1, _)) =
                                    BasicMaterialTool.createGameObjectWithMap(state);
                                  let {textureIndices} = BasicMaterialTool.getRecord(state);
                                  let sourceIndex =
                                    BasicMaterialTool.getTextureIndicesIndex(material1, state);
                                  Uint32Array.unsafe_set(textureIndices, sourceIndex, 1);
                                  Uint32Array.unsafe_set(textureIndices, sourceIndex + 1, 2);
                                  Uint32Array.unsafe_set(textureIndices, sourceIndex + 2, 3);
                                  let defaultTextureIndex =
                                    BasicMaterialTool.getDefaultTextureIndex();
                                  let state =
                                    state
                                    |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                                         gameObject1,
                                         material1
                                       );
                                  textureIndices
                                  |> Uint32Array.slice(~start=0, ~end_=5)
                                  |>
                                  expect == Uint32Array.make([|
                                              defaultTextureIndex,
                                              defaultTextureIndex,
                                              3,
                                              0,
                                              0
                                            |])
                                }
                              )
                          );
                          describe(
                            "remove from mapUnits",
                            () =>
                              test(
                                "reset removed one's value",
                                () =>
                                  _testRemoveFromTypeArr(
                                    state,
                                    (1, 2),
                                    TextureTool.getDefaultUnit(),
                                    (
                                      BasicMaterialTool.createGameObjectWithMap,
                                      BasicMaterialTool.getMapUnit,
                                      BasicMaterialTool.setMapUnit
                                    )
                                  )
                              )
                          )
                        }
                      )
                    }
                  )
                }
              )
            }
          );
          describe(
            "test add new one after dispose old one",
            () => {
              test(
                "new one's data should be default value",
                () => {
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let color = [|0.2, 0.3, 0.5|];
                  let state = state |> setBasicMaterialColor(material1, color);
                  let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
                  let state =
                    state
                    |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                         gameObject1,
                         material1
                       );
                  let (state, gameObject3, material3) = BasicMaterialTool.createGameObject(state);
                  getBasicMaterialColor(material3, state)
                  |> expect == BasicMaterialTool.getDefaultColor(state)
                }
              );
              test(
                "use disposed index as new index firstly",
                () => {
                  let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
                  let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
                  let state =
                    state
                    |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                         gameObject1,
                         material1
                       );
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
                    state
                    |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                         gameObject1,
                         material1
                       );
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
                open GameObjectAPI;
                open GameObjectAPI;
                let (state, material) = createBasicMaterial(state^);
                let (state, gameObject) = state |> createGameObject;
                let state = state |> addGameObjectBasicMaterialComponent(gameObject, material);
                let state =
                  state
                  |> GameObjectTool.disposeGameObjectBasicMaterialComponent(gameObject, material);
                expect(() => getFunc(material, state))
                |> toThrowMessage("expect component alive, but actual not")
              };
              test(
                "unsafeGetBasicMaterialGameObject should error",
                () => _testGetFunc(unsafeGetBasicMaterialGameObject)
              )
            }
          )
      )
    }
  );