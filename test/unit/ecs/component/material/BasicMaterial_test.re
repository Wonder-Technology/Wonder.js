open BasicMaterialAPI;

open Wonder_jest;

let _ =
  describe("BasicMaterial", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("createBasicMaterial", () => {
      test("create a new material which is just index(int)", () => {
        let (_, material) = createBasicMaterial(state^);
        expect(material) == 0;
      });
      describe("set default value", () =>
        test("init emptyMapUnitArray", () => {
          state :=
            TestTool.initWithoutBuildFakeDom(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~textureCountPerMaterial=3,
                  (),
                ),
              (),
            );

          let (state, material) = createBasicMaterial(state^);
          BasicMaterialTool.getEmptyMapUnitArray(material, state)
          |> expect == [|2, 1, 0|];
        })
      );
    });
    describe("init", () =>
      describe("contract check", () =>
        test("shouldn't dispose any material before init", () => {
          state := TestTool.initWithJobConfigWithoutBuildFakeDom(~sandbox, ());

          let (state, gameObject1, material1) =
            BasicMaterialTool.createGameObject(state^);
          let (state, gameObject2, material2) =
            BasicMaterialTool.createGameObject(state);

          let state =
            state |> BasicMaterialTool.dispose(gameObject1, material1);

          expect(() => {
            let state =
              state
              |> BasicMaterialTool.initMaterials(
                   FakeGlTool.buildFakeGl(~sandbox, ()) |> Obj.magic,
                 );
            ();
          })
          |> toThrowMessage("expect not dispose any material before init");
        })
      )
    );

    describe("unsafeGetBasicMaterialGameObjects", () =>
      test("get material's gameObjects", () => {
        open GameObjectAPI;
        let (state, material) = createBasicMaterial(state^);
        let (state, gameObject1) = state |> createGameObject;
        let (state, gameObject2) = state |> createGameObject;
        let state =
          state |> addGameObjectBasicMaterialComponent(gameObject1, material);
        let state =
          state |> addGameObjectBasicMaterialComponent(gameObject2, material);
        state
        |> unsafeGetBasicMaterialGameObjects(material)
        |> expect == [|gameObject1, gameObject2|];
      })
    );

    describe("operate data", () => {
      test(
        "get the data from array buffer may not equal to the value which is setted",
        () => {
        let (state, material) = createBasicMaterial(state^);
        let color = [|0.2, 0.3, 0.5|];
        let state = state |> setBasicMaterialColor(material, color);
        getBasicMaterialColor(material, state)
        |> expect == [|0.20000000298023224, 0.30000001192092896, 0.5|];
      });
      describe("getBasicMaterialColor", () =>
        test("test default color", () => {
          let (state, material) = createBasicMaterial(state^);
          getBasicMaterialColor(material, state) |> expect == [|1., 1., 1.|];
        })
      );
      describe("setBasicMaterialColor", () =>
        test("test set color", () => {
          let (state, material) = createBasicMaterial(state^);
          let color = [|0.2, 0.3, 0.5|];
          let state = state |> setBasicMaterialColor(material, color);
          getBasicMaterialColor(material, state)
          |> TypeArrayTool.truncateArray
          |> expect == color;
        })
      );

      describe("getBasicMaterialIsDepthTest", () =>
        test("test default isDepthTest", () => {
          let (state, material) = createBasicMaterial(state^);

          getBasicMaterialIsDepthTest(material, state) |> expect == true;
        })
      );

      describe("setBasicMaterialIsDepthTest", () =>
        test("test set isDepthTest", () => {
          let (state, material) = createBasicMaterial(state^);
          let isDepthTest = false;

          let state =
            state |> setBasicMaterialIsDepthTest(material, isDepthTest);

          getBasicMaterialIsDepthTest(material, state)
          |> expect == isDepthTest;
        })
      );

      describe("getBasicMaterialAlpha", () =>
        test("test default alpha", () => {
          let (state, material) = createBasicMaterial(state^);

          getBasicMaterialAlpha(material, state) |> expect == 1.0;
        })
      );

      describe("setBasicMaterialAlpha", () =>
        test("test set alpha", () => {
          let (state, material) = createBasicMaterial(state^);
          let alpha = 0.5;

          let state = state |> setBasicMaterialAlpha(material, alpha);

          getBasicMaterialAlpha(material, state) |> expect == alpha;
        })
      );

      describe("unsafeGetBasicMaterialMap", () =>
        test("if has no map, error", () => {
          let (state, material) = createBasicMaterial(state^);
          expect(() =>
            BasicMaterialAPI.unsafeGetBasicMaterialMap(material, state)
          )
          |> toThrowMessage("expect data exist");
        })
      );
      describe("setBasicMaterialMap", () => {
        let _prepare = state => {
          let (state, material) = createBasicMaterial(state);
          let (state, map1) =
            BasicSourceTextureAPI.createBasicSourceTexture(state);
          let (state, map2) =
            BasicSourceTextureAPI.createBasicSourceTexture(state);
          let state =
            state |> BasicMaterialAPI.setBasicMaterialMap(material, map2);
          (state, material, map2);
        };
        test("set map unit to 0", () => {
          let (state, material, map) = _prepare(state^);
          BasicMaterialTool.getMapUnit(material, state) |> expect == 0;
        });
        test("save texture index", () => {
          let (state, material, map) = _prepare(state^);
          BasicMaterialAPI.unsafeGetBasicMaterialMap(material, state)
          |> expect == map;
        });
      });
    });

    describe("disposeComponent", () => {
      describe("dispose data", () => {
        describe("test dispose shared material", () =>
          test("remove gameObject", () => {
            let (state, basicMaterial1) = createBasicMaterial(state^);
            let (state, gameObject1) = GameObjectAPI.createGameObject(state);
            let state =
              state
              |> GameObjectAPI.addGameObjectBasicMaterialComponent(
                   gameObject1,
                   basicMaterial1,
                 );
            let (state, gameObject2) = GameObjectAPI.createGameObject(state);
            let state =
              state
              |> GameObjectAPI.addGameObjectBasicMaterialComponent(
                   gameObject2,
                   basicMaterial1,
                 );
            let (state, gameObject3) = GameObjectAPI.createGameObject(state);
            let state =
              state
              |> GameObjectAPI.addGameObjectBasicMaterialComponent(
                   gameObject3,
                   basicMaterial1,
                 );
            let state =
              state
              |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                   gameObject1,
                   basicMaterial1,
                 );

            BasicMaterialAPI.unsafeGetBasicMaterialGameObjects(
              basicMaterial1,
              state,
            )
            |> expect == [|gameObject2, gameObject3|];
          })
        );
        describe("test dispose not shared material", () => {
          test("remove from gameObjectsMap, nameMap, emptyMapUnitArrayMap", () => {
            open BasicMaterialType;
            let (state, gameObject1, material1) =
              BasicMaterialTool.createGameObject(state^);
            let state =
              BasicMaterialAPI.setBasicMaterialName(material1, "name", state);
            let state =
              state
              |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                   gameObject1,
                   material1,
                 );
            let {gameObjectsMap, nameMap, emptyMapUnitArrayMap} =
              BasicMaterialTool.getRecord(state);

            (
              BasicMaterialTool.hasGameObject(material1, state),
              nameMap
              |> WonderCommonlib.MutableSparseMapService.has(material1),
              emptyMapUnitArrayMap
              |> WonderCommonlib.MutableSparseMapService.has(material1),
            )
            |> expect == (false, false, false);
          });

          describe("test remove from type array", () => {
            let _testRemoveFromTypeArr =
                (
                  state,
                  valueTuple,
                  defaultValue,
                  (createGameObjectFunc, getValueFunc, setValueFunc),
                ) =>
              AllMaterialTool.testRemoveFromTypeArr(
                state,
                valueTuple,
                defaultValue,
                (
                  GameObjectTool.disposeGameObjectBasicMaterialComponent,
                  createGameObjectFunc,
                  getValueFunc,
                  setValueFunc,
                ),
              );
            describe("remove from shaderIndices", () =>
              test("reset removed one's value", () =>
                _testRemoveFromTypeArr(
                  state,
                  (1, 2),
                  BasicMaterialTool.getDefaultShaderIndex(state^),
                  (
                    BasicMaterialTool.createGameObject,
                    BasicMaterialTool.getShaderIndex,
                    BasicMaterialTool.setShaderIndex,
                  ),
                )
              )
            );
            describe("remove from colors", () =>
              test("reset removed one's value", () =>
                _testRemoveFromTypeArr(
                  state,
                  ([|1., 0.2, 0.3|], [|0., 0.2, 0.3|]),
                  BasicMaterialTool.getDefaultColor(state^),
                  (
                    BasicMaterialTool.createGameObject,
                    (material, state) =>
                      getBasicMaterialColor(material, state)
                      |> TypeArrayTool.truncateArray,
                    setBasicMaterialColor,
                  ),
                )
              )
            );
            describe("test map typeArrays", () => {
              let _testRemoveFromTypeArr =
                  (
                    state,
                    valueTuple,
                    defaultValue,
                    (createGameObjectFunc, getValueFunc, setValueFunc),
                  ) =>
                AllMaterialTool.testRemoveFromTypeArrWithMap(
                  state,
                  valueTuple,
                  defaultValue,
                  (
                    GameObjectTool.disposeGameObjectBasicMaterialComponent,
                    createGameObjectFunc,
                    getValueFunc,
                    setValueFunc,
                  ),
                );

              describe("remove from textureIndices", () =>
                test("reset material's all texture indices", () => {
                  open Js.Typed_array;
                  open BasicMaterialType;
                  let state =
                    TestTool.initWithoutBuildFakeDom(
                      ~sandbox,
                      ~buffer=
                        SettingTool.buildBufferConfigStr(
                          ~textureCountPerMaterial=2,
                          (),
                        ),
                      (),
                    );
                  let (state, gameObject1, (material1, _)) =
                    BasicMaterialTool.createGameObjectWithMap(state);
                  let {textureIndices} = BasicMaterialTool.getRecord(state);
                  let sourceIndex =
                    BasicMaterialTool.getTextureIndicesIndex(
                      material1,
                      state,
                    );
                  Uint32Array.unsafe_set(textureIndices, sourceIndex, 1);
                  Uint32Array.unsafe_set(textureIndices, sourceIndex + 1, 2);
                  Uint32Array.unsafe_set(textureIndices, sourceIndex + 2, 3);
                  let defaultTextureIndex =
                    BasicMaterialTool.getDefaultTextureIndex();
                  let state =
                    state
                    |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                         gameObject1,
                         material1,
                       );
                  textureIndices
                  |> Uint32Array.slice(~start=0, ~end_=5)
                  |> expect
                  == Uint32Array.make([|
                       defaultTextureIndex,
                       defaultTextureIndex,
                       3,
                       0,
                       0,
                     |]);
                })
              );

              describe("remove from mapUnits", () =>
                test("reset removed one's value", () =>
                  _testRemoveFromTypeArr(
                    state,
                    (1, 2),
                    BasicSourceTextureTool.getDefaultUnit(),
                    (
                      BasicMaterialTool.createGameObjectWithMap,
                      BasicMaterialTool.getMapUnit,
                      BasicMaterialTool.setMapUnit,
                    ),
                  )
                )
              );

              describe("remove from isDepthTests", () =>
                test("reset removed one's value", () =>
                  _testRemoveFromTypeArr(
                    state,
                    (false, true),
                    BasicMaterialTool.getDefaultIsDepthTest(),
                    (
                      BasicMaterialTool.createGameObjectWithMap,
                      BasicMaterialAPI.getBasicMaterialIsDepthTest,
                      BasicMaterialAPI.setBasicMaterialIsDepthTest,
                    ),
                  )
                )
              );

              describe("remove from isDepthTests", () =>
                test("reset removed one's value", () =>
                  _testRemoveFromTypeArr(
                    state,
                    (0.1, 0.5),
                    BasicMaterialTool.getDefaultAlpha(),
                    (
                      BasicMaterialTool.createGameObjectWithMap,
                      BasicMaterialAPI.getBasicMaterialAlpha,
                      BasicMaterialAPI.setBasicMaterialAlpha,
                    ),
                  )
                )
              );
            });
          });
        });

        describe("fix bug", () =>
          test(
            "if have create other gameObjects, shouldn't affect dispose basicMaterial gameObjects",
            () => {
              let (state, gameObject1, material1) =
                LightMaterialTool.createGameObject(state^);
              let (state, gameObject2, material2) =
                BasicMaterialTool.createGameObject(state);

              let state =
                state
                |> GameObjectAPI.batchDisposeGameObject([|
                     gameObject1,
                     gameObject2,
                   |])
                |> DisposeJob.execJob(None);
              let (state, gameObject3, material3) =
                BasicMaterialTool.createGameObject(state);

              BasicMaterialAPI.unsafeGetBasicMaterialGameObjects(
                material3,
                state,
              )
              |> expect == [|gameObject3|];
            },
          )
        );
      });

      describe("test add new one after dispose old one", () => {
        test("new one's data should be default value", () => {
          let (state, gameObject1, material1) =
            BasicMaterialTool.createGameObject(state^);
          let color = [|0.2, 0.3, 0.5|];
          let state = state |> setBasicMaterialColor(material1, color);
          let (state, gameObject2, material2) =
            BasicMaterialTool.createGameObject(state);
          let state =
            state
            |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                 gameObject1,
                 material1,
               );
          let (state, gameObject3, material3) =
            BasicMaterialTool.createGameObject(state);
          getBasicMaterialColor(material3, state)
          |> expect == BasicMaterialTool.getDefaultColor(state);
        });
        test("use disposed index as new index firstly", () => {
          let (state, gameObject1, material1) =
            BasicMaterialTool.createGameObject(state^);
          let (state, gameObject2, material2) =
            BasicMaterialTool.createGameObject(state);
          let state =
            state
            |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                 gameObject1,
                 material1,
               );
          let (state, gameObject3, material3) =
            BasicMaterialTool.createGameObject(state);
          material3 |> expect == material1;
        });
        test("if has no disposed index, get index from materialData.index", () => {
          let (state, gameObject1, material1) =
            BasicMaterialTool.createGameObject(state^);
          let (state, gameObject2, material2) =
            BasicMaterialTool.createGameObject(state);
          let state =
            state
            |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                 gameObject1,
                 material1,
               );
          let (state, gameObject3, material3) =
            BasicMaterialTool.createGameObject(state);
          let (state, gameObject4, material4) =
            BasicMaterialTool.createGameObject(state);
          (material3, material4) |> expect == (material1, material2 + 1);
        });
      });
    });

    describe("getAllBasicMaterials", () => {
      let _createBasicMaterialGameObjects = state => {
        let (state, gameObject1, component1) =
          BasicMaterialTool.createGameObject(state^);
        let (state, gameObject2, component2) =
          BasicMaterialTool.createGameObject(state);
        let (state, gameObject3, component3) =
          BasicMaterialTool.createGameObject(state);

        (
          state,
          (gameObject1, gameObject2, gameObject3),
          (component1, component2, component3),
        );
      };

      test(
        "get all components include the ones add or not add to gameObject", () => {
        let (
          state,
          (gameObject1, gameObject2, gameObject3),
          (component1, component2, component3),
        ) =
          _createBasicMaterialGameObjects(state);

        let (state, component4) =
          BasicMaterialAPI.createBasicMaterial(state);

        BasicMaterialAPI.getAllBasicMaterials(state)
        |> expect == [|component1, component2, component3, component4|];
      });
      test("test dispose", () => {
        let (
          state,
          (gameObject1, gameObject2, gameObject3),
          (component1, component2, component3),
        ) =
          _createBasicMaterialGameObjects(state);

        let state =
          state
          |> GameObjectAPI.disposeGameObject(gameObject2)
          |> GameObjectAPI.disposeGameObject(gameObject3);
        let state = state |> DisposeJob.execJob(None);

        GameObjectAPI.getAllBasicMaterialComponents(state)
        |> expect == [|component1|];
      });
    });

    describe("batchDisposeBasicMaterial", () => {
      let _exec = (materialArr, state) => {
        let state = state |> batchDisposeBasicMaterial(materialArr);
        let state = DisposeJob.execJob(None, state);

        state;
      };

      describe("if material has gameObjects", () => {
        let _prepareAndExec = state => {
          let (state, material1) = createBasicMaterial(state^);
          let (state, gameObject1, material2) =
            BasicMaterialTool.createGameObject(state);
          let (state, gameObject2, material3) =
            BasicMaterialTool.createGameObject(state);

          let state = _exec([|material2, material3|], state);

          (state, (material1, material2, material3));
        };

        test("remove from gameObject", () => {
          let (state, (material1, material2, material3)) =
            _prepareAndExec(state);

          (
            BasicMaterialTool.hasGameObject(material2, state),
            BasicMaterialTool.hasGameObject(material3, state),
          )
          |> expect == (false, false);
        });

        test("dispose material data", () => {
          let (state, (material1, material2, material3)) =
            _prepareAndExec(state);

          (
            BasicMaterialTool.isMaterialDisposed(material1, state),
            BasicMaterialTool.isMaterialDisposed(material2, state),
            BasicMaterialTool.isMaterialDisposed(material3, state),
          )
          |> expect == (false, true, true);
        });
      });

      describe("else", () =>
        test("dispose material data", () => {
          let (state, material1) = createBasicMaterial(state^);
          let (state, material2) = createBasicMaterial(state);

          let state = _exec([|material1, material2|], state);

          (
            BasicMaterialTool.isMaterialDisposed(material1, state),
            BasicMaterialTool.isMaterialDisposed(material2, state),
          )
          |> expect == (true, true);
        })
      );
    });

    describe("contract check: is alive", () =>
      describe("if material is disposed", () => {
        let _testGetFunc = getFunc => {
          open GameObjectAPI;
          open GameObjectAPI;
          let (state, material) = createBasicMaterial(state^);
          let (state, gameObject) = state |> createGameObject;
          let state =
            state |> addGameObjectBasicMaterialComponent(gameObject, material);
          let state =
            state
            |> GameObjectTool.disposeGameObjectBasicMaterialComponent(
                 gameObject,
                 material,
               );
          expect(() =>
            getFunc(material, state)
          )
          |> toThrowMessage("expect component alive, but actual not");
        };
        test("unsafeGetBasicMaterialGameObjects should error", () =>
          _testGetFunc(unsafeGetBasicMaterialGameObjects)
        );
      })
    );
  });