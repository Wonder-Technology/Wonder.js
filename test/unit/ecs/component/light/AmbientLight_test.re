open AmbientLightAPI;

open Wonder_jest;

let _ =
  describe(
    "AmbientLight",
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
        "createAmbientLight",
        () => {
          test(
            "create a new light which is just index(int)",
            () => {
              let (_, light) = createAmbientLight(state^);
              expect(light) == 0
            }
          );
          describe(
            "contract check",
            () =>
              describe(
                "limit the total alive count of light to 3",
                () => {
                  test(
                    "test create",
                    () => {
                      let (state, light) = createAmbientLight(state^);
                      let (state, light) = createAmbientLight(state);
                      let (state, light) = createAmbientLight(state);
                      expect(
                        () => {
                          let (state, light) = createAmbientLight(state);
                          ()
                        }
                      )
                      |> toThrowMessage("expect index: 3 <= maxIndex: 2, but actual not")
                    }
                  );
                  test(
                    "test create after dispose",
                    () => {
                      let (state, gameObject1, _) = AmbientLightTool.createGameObject(state^);
                      let (state, gameObject2, _) = AmbientLightTool.createGameObject(state);
                      let (state, gameObject3, _) = AmbientLightTool.createGameObject(state);
                      let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
                      expect(
                        () => {
                          let (state, light) = createAmbientLight(state);
                          ()
                        }
                      )
                      |> not_
                      |> toThrow
                    }
                  )
                }
              )
          )
        }
      );
      describe(
        "unsafeGetAmbientLightGameObject",
        () =>
          test(
            "get light's gameObject",
            () => {
              open GameObjectAPI; open GameObjectAPI;
              let (state, light) = createAmbientLight(state^);
              let (state, gameObject) = state |> createGameObject;
              let state = state |> addGameObjectAmbientLightComponent(gameObject, light);
              state |> unsafeGetAmbientLightGameObject(light) |> expect == gameObject
            }
          )
      );
      describe(
        "getAmbientLightColor",
        () =>
          test(
            "test default color",
            () => {
              let (state, light) = createAmbientLight(state^);
              getAmbientLightColor(light, state) |> expect == [|1., 1., 1.|]
            }
          )
      );
      describe(
        "setAmbientLightColor",
        () =>
          test(
            "test set color",
            () => {
              let (state, light) = createAmbientLight(state^);
              let color = [|0.2, 0.3, 0.5|];
              let state = state |> setAmbientLightColor(light, color);
              getAmbientLightColor(light, state) |> TypeArrayTool.truncateArray |> expect == color
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
                "mark disposed",
                () => {
                  open AmbientLightType;
                  let (state, gameObject1, light1) = AmbientLightTool.createGameObject(state^);
                  let state =
                    state |> GameObjectAPI.disposeGameObjectAmbientLightComponent(gameObject1, light1);
                  AmbientLightTool.isAlive(light1, state) |> expect == false
                }
              );
              test(
                "remove from gameObjectMap",
                () => {
                  open AmbientLightType;
                  let (state, gameObject1, light1) = AmbientLightTool.createGameObject(state^);
                  let state =
                    state |> GameObjectAPI.disposeGameObjectAmbientLightComponent(gameObject1, light1);
                  let {gameObjectMap} = AmbientLightTool.getLightRecord(state);
                  gameObjectMap |> WonderCommonlib.SparseMapService.has(light1) |> expect == false
                }
              );
              describe(
                "test remove from type array",
                () =>
                  describe(
                    "remove from colors",
                    () => {
                      let _prepare = (state) => {
                        let (state, gameObject1, light1) =
                          AmbientLightTool.createGameObject(state^);
                        let (state, gameObject2, light2) =
                          AmbientLightTool.createGameObject(state);
                        let color1 = [|1., 1., 0.|];
                        let color2 = [|0., 1., 0.|];
                        let state = state |> AmbientLightAPI.setAmbientLightColor(light1, color1);
                        let state = state |> AmbientLightAPI.setAmbientLightColor(light2, color2);
                        let state =
                          state
                          |> GameObjectAPI.disposeGameObjectAmbientLightComponent(gameObject1, light1);
                        (state, (gameObject1, gameObject2), (color1, color2), (light1, light2))
                      };
                      test(
                        "not affected other light",
                        () => {
                          let (
                            state,
                            (gameObject1, gameObject2),
                            (color1, color2),
                            (light1, light2)
                          ) =
                            _prepare(state);
                          AmbientLightAPI.getAmbientLightColor(light2, state) |> expect == color2
                        }
                      );
                      test(
                        "swap with last one and reset removed one's value",
                        () => {
                          let (
                            state,
                            (gameObject1, gameObject2),
                            (color1, color2),
                            (light1, light2)
                          ) =
                            _prepare(state);
                          (
                            AmbientLightTool.getColor(0, state),
                            AmbientLightTool.getColor(1, state)
                          )
                          |> expect == (color2, AmbientLightTool.getDefaultColor())
                        }
                      );
                      describe(
                        "test add new one after dispose old one",
                        () =>
                          test(
                            "new one's index should equal to last one's index before dispose",
                            () => {
                              let (
                                state,
                                (gameObject1, gameObject2),
                                (color1, color2),
                                (light1, light2)
                              ) =
                                _prepare(state);
                              let (state, gameObject3, light3) =
                                AmbientLightTool.createGameObject(state);
                              light3 |> expect == 1
                            }
                          )
                      );
                      test(
                        "test dispose multi ones",
                        () => {
                          open AmbientLightType;
                          let (state, gameObject1, light1) =
                            AmbientLightTool.createGameObject(state^);
                          let (state, gameObject2, light2) =
                            AmbientLightTool.createGameObject(state);
                          let (state, gameObject3, light3) =
                            AmbientLightTool.createGameObject(state);
                          let color1 = [|1., 1., 0.|];
                          let color2 = [|0., 1., 0.|];
                          let color3 = [|0., 1., 1.|];
                          let state = state |> AmbientLightAPI.setAmbientLightColor(light1, color1);
                          let state = state |> AmbientLightAPI.setAmbientLightColor(light2, color2);
                          let state = state |> AmbientLightAPI.setAmbientLightColor(light3, color3);
                          let state =
                            state
                            |> GameObjectAPI.disposeGameObjectAmbientLightComponent(
                                 gameObject1,
                                 light1
                               );
                          let state =
                            state
                            |> GameObjectAPI.disposeGameObjectAmbientLightComponent(
                                 gameObject3,
                                 light3
                               );
                          AmbientLightAPI.getAmbientLightColor(light2, state) |> expect == color2
                        }
                      )
                    }
                  )
              )
            }
          )
      );
      describe(
        "contract check: is alive",
        () =>
          describe(
            "if light is disposed",
            () => {
              let _testGetFunc = (getFunc) => {
                open GameObjectAPI; open GameObjectAPI;
                let (state, light) = createAmbientLight(state^);
                let (state, gameObject) = state |> createGameObject;
                let state = state |> addGameObjectAmbientLightComponent(gameObject, light);
                let state =
                  state |> GameObjectAPI.disposeGameObjectAmbientLightComponent(gameObject, light);
                expect(() => getFunc(light, state))
                |> toThrowMessage("expect component alive, but actual not")
              };
              test(
                "unsafeGetAmbientLightGameObject should error",
                () => _testGetFunc(unsafeGetAmbientLightGameObject)
              );
              test("getAmbientLightColor should error", () => _testGetFunc(getAmbientLightColor))
            }
          )
      )
    }
  );