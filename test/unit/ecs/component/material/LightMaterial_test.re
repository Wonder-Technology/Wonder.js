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
        test("set texture count to be 0", () => {
          let (state, material) = createLightMaterial(state^);
          LightMaterialTool.getBasicSourceTextureCount(material, state)
          |> expect == 0;
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
    describe("unsafeGetLightMaterialGameObject", () =>
      test("get material's gameObject", () => {
        open GameObjectAPI;
        open GameObjectAPI;
        let (state, material) = createLightMaterial(state^);
        let (state, gameObject) = state |> createGameObject;
        let state =
          state |> addGameObjectLightMaterialComponent(gameObject, material);
        state
        |> unsafeGetLightMaterialGameObject(material)
        |> expect == gameObject;
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
        test("texture count + 1", () => {
          let (state, material, (map1, map2)) = _prepare(state^);
          LightMaterialTool.getBasicSourceTextureCount(material, state)
          |> expect == 2;
        });
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
    });
    describe("disposeComponent", () =>
      describe("dispose data", () => {
        test("reset basicSourceTextureCount to 0 from textureCountMap", () => {
          open LightMaterialType;
          let (state, gameObject1, (material1, _)) =
            LightMaterialTool.createGameObjectWithMap(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectLightMaterialComponent(
                 gameObject1,
                 material1,
               );
          LightMaterialTool.getBasicSourceTextureCount(material1, state)
          |> expect == 0;
        });
        test("remove from gameObjectMap, nameMap", () => {
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
          let {gameObjectMap, nameMap} = LightMaterialTool.getRecord(state);

          (
            gameObjectMap |> WonderCommonlib.SparseMapService.has(material1),
            nameMap |> WonderCommonlib.SparseMapService.has(material1),
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
                |>
                expect == Uint32Array.make([|
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
        test("reset group count", () => {
          let (state, material1) = createLightMaterial(state^);
          let (state, gameObject1) = GameObjectAPI.createGameObject(state);
          let state =
            state
            |> GameObjectAPI.addGameObjectLightMaterialComponent(
                 gameObject1,
                 material1,
               );
          let (state, gameObject2) = GameObjectAPI.createGameObject(state);
          let state =
            state
            |> GameObjectAPI.addGameObjectLightMaterialComponent(
                 gameObject2,
                 material1,
               );
          let state =
            state
            |> GameObjectTool.disposeGameObjectLightMaterialComponent(
                 gameObject1,
                 material1,
               );
          LightMaterialTool.getGroupCount(material1, state) |> expect == 0;
        });
      })
    );
    describe("contract check: is alive", () =>
      describe("if material is disposed", () => {
        let _testGetFunc = getFunc => {
          open GameObjectAPI;
          open GameObjectAPI;
          let (state, material) = createLightMaterial(state^);
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
        test("unsafeGetLightMaterialGameObject should error", () =>
          _testGetFunc(unsafeGetLightMaterialGameObject)
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