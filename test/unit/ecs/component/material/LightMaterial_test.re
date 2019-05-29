open LightMaterialAPI;

open Wonder_jest;

let _ =
  describe("LightMaterial", () => {
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
    describe("createLightMaterial", () => {
      test("create a new material which is just index(int)", () => {
        let (_, material) = createLightMaterial(state^);
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

          let (state, material) = createLightMaterial(state^);
          LightMaterialTool.getEmptyMapUnitArray(material, state)
          |> expect == [|2, 1, 0|];
        })
      );
    });
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

    describe("unsafeGetLightMaterialGameObjects", () =>
      test("get material's gameObjects", () => {
        open GameObjectAPI;
        let (state, material) = createLightMaterial(state^);
        let (state, gameObject1) = state |> createGameObject;
        let (state, gameObject2) = state |> createGameObject;
        let state =
          state |> addGameObjectLightMaterialComponent(gameObject1, material);
        let state =
          state |> addGameObjectLightMaterialComponent(gameObject2, material);
        state
        |> unsafeGetLightMaterialGameObjects(material)
        |> expect == [|gameObject1, gameObject2|];
      })
    );

    describe("operate data", () => {
      test(
        "get the data from array buffer may not equal to the value which is setted",
        () => {
        let (state, material) = createLightMaterial(state^);
        let color = [|0.2, 0.3, 0.5|];
        let state = state |> setLightMaterialDiffuseColor(material, color);
        getLightMaterialDiffuseColor(material, state)
        |> expect == [|0.20000000298023224, 0.30000001192092896, 0.5|];
      });
      describe("getLightMaterialDiffuseColor", () =>
        test("test default color", () => {
          let (state, material) = createLightMaterial(state^);
          getLightMaterialDiffuseColor(material, state)
          |> expect == [|1., 1., 1.|];
        })
      );
      describe("setLightMaterialDiffuseColor", () =>
        test("test set color", () => {
          let (state, material) = createLightMaterial(state^);
          let color = [|0.2, 0.3, 0.5|];
          let state = state |> setLightMaterialDiffuseColor(material, color);
          getLightMaterialDiffuseColor(material, state)
          |> TypeArrayTool.truncateArray
          |> expect == color;
        })
      );
      describe("getLightMaterialSpecularColor", () =>
        test("test default color", () => {
          let (state, material) = createLightMaterial(state^);
          getLightMaterialSpecularColor(material, state)
          |> expect == [|1., 1., 1.|];
        })
      );
      describe("setLightMaterialSpecularColor", () =>
        test("test set color", () => {
          let (state, material) = createLightMaterial(state^);
          let color = [|0.2, 0.3, 0.5|];
          let state = state |> setLightMaterialSpecularColor(material, color);
          getLightMaterialSpecularColor(material, state)
          |> TypeArrayTool.truncateArray
          |> expect == color;
        })
      );
      describe("getLightMaterialShininess", () =>
        test("test default shininess", () => {
          let (state, material) = createLightMaterial(state^);
          getLightMaterialShininess(material, state) |> expect == 32.;
        })
      );
      describe("setLightMaterialShininess", () =>
        test("test set shininess", () => {
          let (state, material) = createLightMaterial(state^);
          let shininess = 30.;
          let state = state |> setLightMaterialShininess(material, shininess);
          getLightMaterialShininess(material, state) |> expect == shininess;
        })
      );
      describe("unsafeGetLightMaterialDiffuseMap", () =>
        test("if has no map, error", () => {
          let (state, material) = createLightMaterial(state^);
          expect(() =>
            LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(material, state)
          )
          |> toThrowMessage("expect data exist");
        })
      );
      describe("unsafeGetLightMaterialSpecularMap", () =>
        test("if has no map, error", () => {
          let (state, material) = createLightMaterial(state^);
          expect(() =>
            LightMaterialAPI.unsafeGetLightMaterialSpecularMap(
              material,
              state,
            )
          )
          |> toThrowMessage("expect data exist");
        })
      );

      describe("setLightMaterialDiffuseMap, setLightMaterialSpecularMap", () => {
        let _prepare = state => {
          let (state, material) = createLightMaterial(state);
          let (state, map1) =
            BasicSourceTextureAPI.createBasicSourceTexture(state);
          let (state, map2) =
            BasicSourceTextureAPI.createBasicSourceTexture(state);
          let state =
            state
            |> LightMaterialAPI.setLightMaterialSpecularMap(material, map1);
          let state =
            state
            |> LightMaterialAPI.setLightMaterialDiffuseMap(material, map2);
          (state, material, (map1, map2));
        };
        test("set map unit", () => {
          let (state, material, (map1, map2)) = _prepare(state^);
          (
            LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(material, state),
            LightMaterialAPI.unsafeGetLightMaterialSpecularMap(
              material,
              state,
            ),
          )
          |> expect == (1, 0);
        });
        test("save texture index", () => {
          let (state, material, (map1, map2)) = _prepare(state^);
          (
            LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(material, state),
            LightMaterialAPI.unsafeGetLightMaterialSpecularMap(
              material,
              state,
            ),
          )
          |> expect == (map2, map1);
        });
      });

      describe(
        "removeLightMaterialDiffuseMap, removeLightMaterialSpecularMap", () => {
        let _prepare = state => {
          let (state, material) = createLightMaterial(state);
          let (state, map1) =
            BasicSourceTextureAPI.createBasicSourceTexture(state);
          let (state, map2) =
            BasicSourceTextureAPI.createBasicSourceTexture(state);

          let state =
            state
            |> LightMaterialAPI.setLightMaterialSpecularMap(material, map1)
            |> LightMaterialAPI.setLightMaterialDiffuseMap(material, map2);

          (state, material, (map1, map2));
        };

        let _exec = (material, state) =>
          state
          |> LightMaterialAPI.removeLightMaterialSpecularMap(material)
          |> LightMaterialAPI.removeLightMaterialDiffuseMap(material);

        test("has map should return false", () => {
          let (state, material, (map1, map2)) = _prepare(state^);

          let state = _exec(material, state);

          (
            LightMaterialAPI.hasLightMaterialDiffuseMap(material, state),
            LightMaterialAPI.hasLightMaterialSpecularMap(material, state),
          )
          |> expect == (false, false);
        });

        describe("remove map from group", () => {
          test("test basicSourceTexture", () => {
            let (state, material, (map1, map2)) = _prepare(state^);

            let state = _exec(material, state);

            (
              BasicSourceTextureTool.unsafeGetMaterialDataArr(map1, state)
              |> Js.Array.length,
              BasicSourceTextureTool.unsafeGetMaterialDataArr(map2, state)
              |> Js.Array.length,
            )
            |> expect == (0, 0);
          });
          test("test arrayBufferViewSourceTexture", () => {
            let (state, material) = createLightMaterial(state^);
            let (state, map1) =
              ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
                state,
              );
            let (state, map2) =
              ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
                state,
              );

            let state =
              state
              |> LightMaterialAPI.setLightMaterialSpecularMap(material, map1)
              |> LightMaterialAPI.setLightMaterialDiffuseMap(material, map2);

            let state = _exec(material, state);

            (
              ArrayBufferViewSourceTextureTool.unsafeGetMaterialDataArr(
                map1,
                state,
              )
              |> Js.Array.length,
              ArrayBufferViewSourceTextureTool.unsafeGetMaterialDataArr(
                map2,
                state,
              )
              |> Js.Array.length,
            )
            |> expect == (0, 0);
          });
        });

        describe("test set new map after remove", () =>
          test("should get correct map", () => {
            let (state, material, (map1, map2)) = _prepare(state^);

            let state =
              state
              |> LightMaterialAPI.removeLightMaterialSpecularMap(material);

            let (state, map3) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);

            let state =
              state
              |> LightMaterialAPI.setLightMaterialSpecularMap(material, map3);

            (
              LightMaterialAPI.unsafeGetLightMaterialSpecularMap(
                material,
                state,
              ),
              LightMaterialAPI.unsafeGetLightMaterialDiffuseMap(
                material,
                state,
              ),
            )
            |> expect == (map3, map2);
          })
        );
      });
    });

    describe("disposeComponent", () =>
      describe("dispose data", () => {
        beforeEach(() =>
          state :=
            state^
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()))
        );

        describe("test dispose shared material", () =>
          test("remove gameObject", () => {
            let (state, lightMaterial1) = createLightMaterial(state^);
            let (state, gameObject1) = GameObjectAPI.createGameObject(state);
            let state =
              state
              |> GameObjectAPI.addGameObjectLightMaterialComponent(
                   gameObject1,
                   lightMaterial1,
                 );
            let (state, gameObject2) = GameObjectAPI.createGameObject(state);
            let state =
              state
              |> GameObjectAPI.addGameObjectLightMaterialComponent(
                   gameObject2,
                   lightMaterial1,
                 );
            let (state, gameObject3) = GameObjectAPI.createGameObject(state);
            let state =
              state
              |> GameObjectAPI.addGameObjectLightMaterialComponent(
                   gameObject3,
                   lightMaterial1,
                 );
            let state =
              state
              |> GameObjectTool.disposeGameObjectLightMaterialComponent(
                   gameObject1,
                   lightMaterial1,
                 );

            LightMaterialAPI.unsafeGetLightMaterialGameObjects(
              lightMaterial1,
              state,
            )
            |> expect == [|gameObject2, gameObject3|];
          })
        );

        test("remove from nameMap, emptyMapUnitArrayMap", () => {
          open LightMaterialType;
          let (state, gameObject1, material1) =
            LightMaterialTool.createGameObject(state^);
          let state =
            LightMaterialAPI.setLightMaterialName(material1, "name", state);
          let state =
            state
            |> GameObjectTool.disposeGameObjectLightMaterialComponent(
                 gameObject1,
                 material1,
               );
          let {nameMap, emptyMapUnitArrayMap} =
            LightMaterialTool.getRecord(state);

          (
            nameMap |> WonderCommonlib.MutableSparseMapService.has(material1),
            emptyMapUnitArrayMap
            |> WonderCommonlib.MutableSparseMapService.has(material1),
          )
          |> expect == (false, false);
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
                GameObjectTool.disposeGameObjectLightMaterialComponent,
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
                LightMaterialTool.getDefaultShaderIndex(state^),
                (
                  LightMaterialTool.createGameObject,
                  LightMaterialTool.getShaderIndex,
                  LightMaterialTool.setShaderIndex,
                ),
              )
            )
          );
          describe("remove from diffuseColors", () =>
            test("reset removed one's value", () =>
              _testRemoveFromTypeArr(
                state,
                ([|1., 0.2, 0.3|], [|0., 0.2, 0.3|]),
                LightMaterialTool.getDefaultDiffuseColor(state^),
                (
                  LightMaterialTool.createGameObject,
                  (material, state) =>
                    getLightMaterialDiffuseColor(material, state)
                    |> TypeArrayTool.truncateArray,
                  setLightMaterialDiffuseColor,
                ),
              )
            )
          );
          describe("remove from specularColors", () =>
            test("reset removed one's value", () =>
              _testRemoveFromTypeArr(
                state,
                ([|1., 0.2, 0.3|], [|0., 0.2, 0.3|]),
                LightMaterialTool.getDefaultSpecularColor(state^),
                (
                  LightMaterialTool.createGameObject,
                  (material, state) =>
                    getLightMaterialSpecularColor(material, state)
                    |> TypeArrayTool.truncateArray,
                  setLightMaterialSpecularColor,
                ),
              )
            )
          );
          describe("remove from shininess", () =>
            test("reset removed one's value", () =>
              _testRemoveFromTypeArr(
                state,
                (1., 2.),
                LightMaterialTool.getDefaultShininess(state^),
                (
                  LightMaterialTool.createGameObject,
                  getLightMaterialShininess,
                  setLightMaterialShininess,
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
                  GameObjectTool.disposeGameObjectLightMaterialComponent,
                  createGameObjectFunc,
                  getValueFunc,
                  setValueFunc,
                ),
              );
            describe("remove from textureIndices", () =>
              test("reset material's all texture indices", () => {
                open Js.Typed_array;
                open LightMaterialType;
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
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ()),
                     );
                let (state, gameObject1, (material1, _)) =
                  LightMaterialTool.createGameObjectWithMap(state);
                let {textureIndices} = LightMaterialTool.getRecord(state);
                let sourceIndex =
                  LightMaterialTool.getTextureIndicesIndex(material1, state);
                Uint32Array.unsafe_set(textureIndices, sourceIndex, 1);
                Uint32Array.unsafe_set(textureIndices, sourceIndex + 1, 2);
                Uint32Array.unsafe_set(textureIndices, sourceIndex + 2, 3);
                let defaultTextureIndex =
                  LightMaterialTool.getDefaultTextureIndex();
                let state =
                  state
                  |> GameObjectTool.disposeGameObjectLightMaterialComponent(
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
            describe("remove from diffuseMapUnits", () =>
              test("reset removed one's value", () =>
                _testRemoveFromTypeArr(
                  state,
                  (1, 2),
                  BasicSourceTextureTool.getDefaultUnit(),
                  (
                    LightMaterialTool.createGameObjectWithMap,
                    LightMaterialTool.getDiffuseMapUnit,
                    LightMaterialTool.setDiffuseMapUnit,
                  ),
                )
              )
            );
            describe("remove from specularMapUnits", () =>
              test("reset removed one's value", () =>
                _testRemoveFromTypeArr(
                  state,
                  (1, 2),
                  BasicSourceTextureTool.getDefaultUnit(),
                  (
                    LightMaterialTool.createGameObjectWithMap,
                    LightMaterialTool.getSpecularMapUnit,
                    LightMaterialTool.setSpecularMapUnit,
                  ),
                )
              )
            );
          });
        });

        describe("fix bug", () =>
          test(
            "if have create other gameObjects, shouldn't affect dispose lightMaterial gameObjects",
            () => {
              let (state, gameObject1, material1) =
                BasicMaterialTool.createGameObject(state^);
              let (state, gameObject2, material2) =
                LightMaterialTool.createGameObject(state);

              let state =
                state
                |> GameObjectAPI.batchDisposeGameObject([|
                     gameObject1,
                     gameObject2,
                   |])
                |> DisposeJob.execJob(None);
              let (state, gameObject3, material3) =
                LightMaterialTool.createGameObject(state);

              LightMaterialAPI.unsafeGetLightMaterialGameObjects(
                material3,
                state,
              )
              |> expect == [|gameObject3|];
            },
          )
        );
      })
    );

    describe("getAllLightMaterials", () => {
      let _createLightMaterialGameObjects = state => {
        let (state, gameObject1, component1) =
          LightMaterialTool.createGameObject(state^);
        let (state, gameObject2, component2) =
          LightMaterialTool.createGameObject(state);
        let (state, gameObject3, component3) =
          LightMaterialTool.createGameObject(state);

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
          _createLightMaterialGameObjects(state);

        let (state, component4) =
          LightMaterialAPI.createLightMaterial(state);

        LightMaterialAPI.getAllLightMaterials(state)
        |> expect == [|component1, component2, component3, component4|];
      });
      test("test dispose", () => {
        let (
          state,
          (gameObject1, gameObject2, gameObject3),
          (component1, component2, component3),
        ) =
          _createLightMaterialGameObjects(state);
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

        let state =
          state
          |> GameObjectAPI.disposeGameObject(gameObject2)
          |> GameObjectAPI.disposeGameObject(gameObject3);
        let state = state |> DisposeJob.execJob(None);

        GameObjectAPI.getAllLightMaterialComponents(state)
        |> expect == [|component1|];
      });
    });

    describe("test batch dispose lightMaterial", () => {
      let _prepareAndExecForHasGameObject = (state, execFunc) => {
        let state =
          state^
          |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
        let (state, material1) = createLightMaterial(state);
        let (state, gameObject1, (material2, (texture2_1, texture2_2))) =
          LightMaterialTool.createGameObjectWithMap(state);
        let (state, gameObject2, (material3, (texture3_1, texture3_2))) =
          LightMaterialTool.createGameObjectWithMap(state);

        let state = execFunc([|material2, material3|], state);

        (
          state,
          (
            material1,
            (material2, (texture2_1, texture2_2)),
            (material3, (texture3_1, texture3_2)),
          ),
        );
      };

      let _prepareAndExecForHasNoGameObject = (state, execFunc) => {
        let state =
          state^
          |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
        let (state, material1) = createLightMaterial(state);
        let (state, material2, (texture2_1, texture2_2, _, _)) =
          LightMaterialTool.createMaterialWithMap(state);
        let (state, material3, (texture3_1, texture3_2, _, _)) =
          LightMaterialTool.createMaterialWithMap(state);

        let state = execFunc([|material2, material3|], state);

        (
          state,
          (
            material1,
            (material2, (texture2_1, texture2_2)),
            (material3, (texture3_1, texture3_2)),
          ),
        );
      };

      describe("batchDisposeLightMaterial", () => {
        let _exec = (materialArr, state) => {
          let state = state |> batchDisposeLightMaterial(materialArr);
          let state = DisposeJob.execJob(None, state);

          state;
        };

        describe("if material has gameObjects", () => {
          test("remove from gameObject", () => {
            let (
              state,
              (
                material1,
                (material2, (texture2_1, texture2_2)),
                (material3, (texture3_1, texture3_2)),
              ),
            ) =
              _prepareAndExecForHasGameObject(state, _exec);

            (
              LightMaterialTool.hasGameObject(material2, state),
              LightMaterialTool.hasGameObject(material3, state),
            )
            |> expect == (false, false);
          });

          describe("dispose material data", () => {
            test("dispose material", () => {
              let (
                state,
                (
                  material1,
                  (material2, (texture2_1, texture2_2)),
                  (material3, (texture3_1, texture3_2)),
                ),
              ) =
                _prepareAndExecForHasGameObject(state, _exec);

              (
                LightMaterialTool.isMaterialDisposed(material1, state),
                LightMaterialTool.isMaterialDisposed(material2, state),
                LightMaterialTool.isMaterialDisposed(material3, state),
              )
              |> expect == (false, true, true);
            });
            test("dispose material->maps", () => {
              let (
                state,
                (
                  material1,
                  (material2, (texture2_1, texture2_2)),
                  (material3, (texture3_1, texture3_2)),
                ),
              ) =
                _prepareAndExecForHasGameObject(state, _exec);

              (
                BasicSourceTextureTool.isAlive(texture2_1, state),
                BasicSourceTextureTool.isAlive(texture2_2, state),
                BasicSourceTextureTool.isAlive(texture3_1, state),
                BasicSourceTextureTool.isAlive(texture3_2, state),
              )
              |> expect == (false, false, false, false);
            });
          });
        });

        describe("else", () =>
          describe("dispose material data", () => {
            test("dispose material", () => {
              let (
                state,
                (
                  material1,
                  (material2, (texture2_1, texture2_2)),
                  (material3, (texture3_1, texture3_2)),
                ),
              ) =
                _prepareAndExecForHasNoGameObject(state, _exec);

              (
                LightMaterialTool.isMaterialDisposed(material1, state),
                LightMaterialTool.isMaterialDisposed(material2, state),
                LightMaterialTool.isMaterialDisposed(material3, state),
              )
              |> expect == (false, true, true);
            });
            test("dispose material->maps", () => {
              let (
                state,
                (
                  material1,
                  (material2, (texture2_1, texture2_2)),
                  (material3, (texture3_1, texture3_2)),
                ),
              ) =
                _prepareAndExecForHasNoGameObject(state, _exec);

              (
                BasicSourceTextureTool.isAlive(texture2_1, state),
                BasicSourceTextureTool.isAlive(texture2_2, state),
                BasicSourceTextureTool.isAlive(texture3_1, state),
                BasicSourceTextureTool.isAlive(texture3_2, state),
              )
              |> expect == (false, false, false, false);
            });
          })
        );
      });

      describe("batchDisposeLightMaterialRemoveTexture", () => {
        let _exec = (materialArr, state) => {
          let state =
            state |> batchDisposeLightMaterialRemoveTexture(materialArr);
          let state = DisposeJob.execJob(None, state);

          state;
        };

        describe("if material has gameObjects", () => {
          test("remove from gameObject", () => {
            let (
              state,
              (
                material1,
                (material2, (texture2_1, texture2_2)),
                (material3, (texture3_1, texture3_2)),
              ),
            ) =
              _prepareAndExecForHasGameObject(state, _exec);

            (
              LightMaterialTool.hasGameObject(material2, state),
              LightMaterialTool.hasGameObject(material3, state),
            )
            |> expect == (false, false);
          });

          describe("dispose material data", () => {
            test("dispose material", () => {
              let (
                state,
                (
                  material1,
                  (material2, (texture2_1, texture2_2)),
                  (material3, (texture3_1, texture3_2)),
                ),
              ) =
                _prepareAndExecForHasGameObject(state, _exec);

              (
                LightMaterialTool.isMaterialDisposed(material1, state),
                LightMaterialTool.isMaterialDisposed(material2, state),
                LightMaterialTool.isMaterialDisposed(material3, state),
              )
              |> expect == (false, true, true);
            });
            test("remove material->maps", () => {
              let (
                state,
                (
                  material1,
                  (material2, (texture2_1, texture2_2)),
                  (material3, (texture3_1, texture3_2)),
                ),
              ) =
                _prepareAndExecForHasGameObject(state, _exec);

              (
                BasicSourceTextureTool.isAlive(texture2_1, state),
                BasicSourceTextureTool.isAlive(texture2_2, state),
                BasicSourceTextureTool.isAlive(texture3_1, state),
                BasicSourceTextureTool.isAlive(texture3_2, state),
              )
              |> expect == (true, true, true, true);
            });
          });
        });

        describe("else", () =>
          describe("dispose material data", () => {
            test("dispose material", () => {
              let (
                state,
                (
                  material1,
                  (material2, (texture2_1, texture2_2)),
                  (material3, (texture3_1, texture3_2)),
                ),
              ) =
                _prepareAndExecForHasNoGameObject(state, _exec);

              (
                LightMaterialTool.isMaterialDisposed(material1, state),
                LightMaterialTool.isMaterialDisposed(material2, state),
                LightMaterialTool.isMaterialDisposed(material3, state),
              )
              |> expect == (false, true, true);
            });
            test("dispose material->maps", () => {
              let (
                state,
                (
                  material1,
                  (material2, (texture2_1, texture2_2)),
                  (material3, (texture3_1, texture3_2)),
                ),
              ) =
                _prepareAndExecForHasNoGameObject(state, _exec);

              (
                BasicSourceTextureTool.isAlive(texture2_1, state),
                BasicSourceTextureTool.isAlive(texture2_2, state),
                BasicSourceTextureTool.isAlive(texture3_1, state),
                BasicSourceTextureTool.isAlive(texture3_2, state),
              )
              |> expect == (true, true, true, true);
            });
          })
        );
      });
    });

    describe("contract check: is alive", () =>
      describe("if material is disposed", () => {
        let _testGetFunc = getFunc => {
          open GameObjectAPI;
          let state =
            state^
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let (state, material) = createLightMaterial(state);
          let (state, gameObject) = state |> createGameObject;
          let state =
            state |> addGameObjectLightMaterialComponent(gameObject, material);
          let state =
            state
            |> GameObjectTool.disposeGameObjectLightMaterialComponent(
                 gameObject,
                 material,
               );
          expect(() =>
            getFunc(material, state)
          )
          |> toThrowMessage("expect component alive, but actual not");
        };
        test("unsafeGetLightMaterialGameObjects should error", () =>
          _testGetFunc(unsafeGetLightMaterialGameObjects)
        );
        test("getLightMaterialDiffuseColor should error", () =>
          _testGetFunc(getLightMaterialDiffuseColor)
        );
        test("getLightMaterialSpecularColor should error", () =>
          _testGetFunc(getLightMaterialSpecularColor)
        );
      })
    );
  });