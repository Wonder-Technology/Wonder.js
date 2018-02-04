open PointLight;

open Wonder_jest;

let _ =
  describe(
    "PointLight",
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
        "createPointLight",
        () => {
          test(
            "create a new light which is just index(int)",
            () => {
              let (_, light) = createPointLight(state^);
              expect(light) == 0
            }
          );
          describe(
            "contract check",
            () =>
              describe(
                "limit the total alive count of light to 4",
                () => {
                  test(
                    "test create",
                    () => {
                      let (state, light) = createPointLight(state^);
                      let (state, light) = createPointLight(state);
                      let (state, light) = createPointLight(state);
                      let (state, light) = createPointLight(state);
                      expect(
                        () => {
                          let (state, light) = createPointLight(state);
                          ()
                        }
                      )
                      |> toThrowMessage("expect index: 4 <= maxIndex: 3, but actual not")
                    }
                  );
                  test(
                    "test create after dispose",
                    () => {
                      let (state, gameObject1, _) = PointLightTool.createGameObject(state^);
                      let (state, gameObject2, _) = PointLightTool.createGameObject(state);
                      let (state, gameObject3, _) = PointLightTool.createGameObject(state);
                      let (state, gameObject3, _) = PointLightTool.createGameObject(state);
                      let state = state |> GameObject.disposeGameObject(gameObject1);
                      expect(
                        () => {
                          let (state, light) = createPointLight(state);
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
        "getPointLightGameObject",
        () =>
          test(
            "get light's gameObject",
            () => {
              open GameObject;
              let (state, light) = createPointLight(state^);
              let (state, gameObject) = state |> createGameObject;
              let state = state |> addGameObjectPointLightComponent(gameObject, light);
              state |> getPointLightGameObject(light) |> expect == gameObject
            }
          )
      );
      describe(
        "getPointLightColor",
        () =>
          test(
            "test default color",
            () => {
              let (state, light) = createPointLight(state^);
              getPointLightColor(light, state) |> expect == [|1., 1., 1.|]
            }
          )
      );
      describe(
        "setPointLightColor",
        () =>
          test(
            "test set color",
            () => {
              let (state, light) = createPointLight(state^);
              let color = [|0.2, 0.3, 0.5|];
              let state = state |> setPointLightColor(light, color);
              getPointLightColor(light, state) |> TypeArrayTool.truncateArray |> expect == color
            }
          )
      );
      describe(
        "getPointLightIntensity",
        () =>
          test(
            "test default intensity",
            () => {
              let (state, light) = createPointLight(state^);
              getPointLightIntensity(light, state) |> expect == 1.
            }
          )
      );
      describe(
        "setPointLightIntensity",
        () =>
          test(
            "test set intensity",
            () => {
              let (state, light) = createPointLight(state^);
              let intensity = 2.;
              let state = state |> setPointLightIntensity(light, intensity);
              getPointLightIntensity(light, state) |> expect == intensity
            }
          )
      );
      describe(
        "getPointLightConstant",
        () =>
          test(
            "test default constant",
            () => {
              let (state, light) = createPointLight(state^);
              getPointLightConstant(light, state) |> expect == 1.
            }
          )
      );
      describe(
        "setPointLightConstant",
        () =>
          test(
            "test set constant",
            () => {
              let (state, light) = createPointLight(state^);
              let constant = 2.;
              let state = state |> setPointLightConstant(light, constant);
              getPointLightConstant(light, state) |> expect == constant
            }
          )
      );
      describe(
        "getPointLightLinear",
        () =>
          test(
            "test default linear",
            () => {
              let (state, light) = createPointLight(state^);
              getPointLightLinear(light, state)
              |> TypeArrayTool.truncateFloatValue(5)
              |> expect == 0.07
            }
          )
      );
      describe(
        "setPointLightLinear",
        () =>
          test(
            "test set linear",
            () => {
              let (state, light) = createPointLight(state^);
              let linear = 2.;
              let state = state |> setPointLightLinear(light, linear);
              getPointLightLinear(light, state)
              |> TypeArrayTool.truncateFloatValue(5)
              |> expect == linear
            }
          )
      );
      describe(
        "getPointLightQuadratic",
        () =>
          test(
            "test default quadratic",
            () => {
              let (state, light) = createPointLight(state^);
              getPointLightQuadratic(light, state)
              |> TypeArrayTool.truncateFloatValue(5)
              |> expect == 0.017
            }
          )
      );
      describe(
        "setPointLightQuadratic",
        () =>
          test(
            "test set quadratic",
            () => {
              let (state, light) = createPointLight(state^);
              let quadratic = 2.;
              let state = state |> setPointLightQuadratic(light, quadratic);
              getPointLightQuadratic(light, state) |> expect == quadratic
            }
          )
      );
      describe(
        "getPointLightRange",
        () =>
          test(
            "test default range",
            () => {
              let (state, light) = createPointLight(state^);
              getPointLightRange(light, state) |> expect == 65.
            }
          )
      );
      describe(
        "setPointLightRange",
        () =>
          test(
            "test set range",
            () => {
              let (state, light) = createPointLight(state^);
              let range = 2.;
              let state = state |> setPointLightRange(light, range);
              getPointLightRange(light, state) |> expect == range
            }
          )
      );
      describe(
        "disposeComponent",
        () =>
          describe(
            "dispose data",
            () => {
              test(
                "mark disposed",
                () => {
                  open PointLightType;
                  let (state, gameObject1, light1) = PointLightTool.createGameObject(state^);
                  let state =
                    state |> GameObject.disposeGameObjectPointLightComponent(gameObject1, light1);
                  PointLightTool.isAlive(light1, state) |> expect == false
                }
              );
              test(
                "remove from gameObjectMap",
                () => {
                  open PointLightType;
                  let (state, gameObject1, light1) = PointLightTool.createGameObject(state^);
                  let state =
                    state |> GameObject.disposeGameObjectPointLightComponent(gameObject1, light1);
                  let {gameObjectMap} = PointLightTool.getLightData(state);
                  gameObjectMap |> WonderCommonlib.SparseMapSystem.has(light1) |> expect == false
                }
              );
              describe(
                "test remove from type array",
                () => {
                  describe(
                    "remove from colors",
                    () => {
                      let _prepare = (state) => {
                        let (state, gameObject1, light1) = PointLightTool.createGameObject(state^);
                        let (state, gameObject2, light2) = PointLightTool.createGameObject(state);
                        let color1 = [|1., 1., 0.|];
                        let color2 = [|0., 1., 0.|];
                        let state = state |> PointLight.setPointLightColor(light1, color1);
                        let state = state |> PointLight.setPointLightColor(light2, color2);
                        let state =
                          state
                          |> GameObject.disposeGameObjectPointLightComponent(gameObject1, light1);
                        (state, (gameObject1, gameObject2), (color1, color2), (light1, light2))
                      };
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
                          (PointLightTool.getColor(0, state), PointLightTool.getColor(1, state))
                          |> expect == (color2, PointLightTool.getDefaultColor())
                        }
                      )
                    }
                  );
                  describe(
                    "remove from intensities",
                    () => {
                      let _prepare = (state) => {
                        let (state, gameObject1, light1) = PointLightTool.createGameObject(state^);
                        let (state, gameObject2, light2) = PointLightTool.createGameObject(state);
                        let intensity1 = 2.;
                        let intensity2 = 3.;
                        let state = state |> PointLight.setPointLightIntensity(light1, intensity1);
                        let state = state |> PointLight.setPointLightIntensity(light2, intensity2);
                        let state =
                          state
                          |> GameObject.disposeGameObjectPointLightComponent(gameObject1, light1);
                        (
                          state,
                          (gameObject1, gameObject2),
                          (intensity1, intensity2),
                          (light1, light2)
                        )
                      };
                      test(
                        "swap with last one and reset removed one's value",
                        () => {
                          let (
                            state,
                            (gameObject1, gameObject2),
                            (intensity1, intensity2),
                            (light1, light2)
                          ) =
                            _prepare(state);
                          (
                            PointLightTool.getIntensity(0, state),
                            PointLightTool.getIntensity(1, state)
                          )
                          |> expect == (intensity2, PointLightTool.getDefaultIntensity())
                        }
                      )
                    }
                  );
                  describe(
                    "remove from constants",
                    () => {
                      let _prepare = (state) => {
                        let (state, gameObject1, light1) = PointLightTool.createGameObject(state^);
                        let (state, gameObject2, light2) = PointLightTool.createGameObject(state);
                        let constant1 = 2.;
                        let constant2 = 3.;
                        let state = state |> PointLight.setPointLightConstant(light1, constant1);
                        let state = state |> PointLight.setPointLightConstant(light2, constant2);
                        let state =
                          state
                          |> GameObject.disposeGameObjectPointLightComponent(gameObject1, light1);
                        (
                          state,
                          (gameObject1, gameObject2),
                          (constant1, constant2),
                          (light1, light2)
                        )
                      };
                      test(
                        "swap with last one and reset removed one's value",
                        () => {
                          let (
                            state,
                            (gameObject1, gameObject2),
                            (constant1, constant2),
                            (light1, light2)
                          ) =
                            _prepare(state);
                          (
                            PointLightTool.getConstant(0, state),
                            PointLightTool.getConstant(1, state)
                          )
                          |> expect == (constant2, PointLightTool.getDefaultConstant())
                        }
                      )
                    }
                  );
                  describe(
                    "remove from linears",
                    () => {
                      let _prepare = (state) => {
                        let (state, gameObject1, light1) = PointLightTool.createGameObject(state^);
                        let (state, gameObject2, light2) = PointLightTool.createGameObject(state);
                        let linear1 = 2.;
                        let linear2 = 3.;
                        let state = state |> PointLight.setPointLightLinear(light1, linear1);
                        let state = state |> PointLight.setPointLightLinear(light2, linear2);
                        let state =
                          state
                          |> GameObject.disposeGameObjectPointLightComponent(gameObject1, light1);
                        (state, (gameObject1, gameObject2), (linear1, linear2), (light1, light2))
                      };
                      test(
                        "swap with last one and reset removed one's value",
                        () => {
                          let (
                            state,
                            (gameObject1, gameObject2),
                            (linear1, linear2),
                            (light1, light2)
                          ) =
                            _prepare(state);
                          (
                            PointLightTool.getLinear(0, state),
                            PointLightTool.getLinear(1, state)
                            |> TypeArrayTool.truncateFloatValue(5)
                          )
                          |> expect == (linear2, PointLightTool.getDefaultLinear())
                        }
                      )
                    }
                  );
                  describe(
                    "remove from quadratics",
                    () => {
                      let _prepare = (state) => {
                        let (state, gameObject1, light1) = PointLightTool.createGameObject(state^);
                        let (state, gameObject2, light2) = PointLightTool.createGameObject(state);
                        let quadratic1 = 2.;
                        let quadratic2 = 3.;
                        let state = state |> PointLight.setPointLightQuadratic(light1, quadratic1);
                        let state = state |> PointLight.setPointLightQuadratic(light2, quadratic2);
                        let state =
                          state
                          |> GameObject.disposeGameObjectPointLightComponent(gameObject1, light1);
                        (
                          state,
                          (gameObject1, gameObject2),
                          (quadratic1, quadratic2),
                          (light1, light2)
                        )
                      };
                      test(
                        "swap with last one and reset removed one's value",
                        () => {
                          let (
                            state,
                            (gameObject1, gameObject2),
                            (quadratic1, quadratic2),
                            (light1, light2)
                          ) =
                            _prepare(state);
                          (
                            PointLightTool.getQuadratic(0, state),
                            PointLightTool.getQuadratic(1, state)
                            |> TypeArrayTool.truncateFloatValue(5)
                          )
                          |> expect == (quadratic2, PointLightTool.getDefaultQuadratic())
                        }
                      )
                    }
                  );
                  describe(
                    "remove from ranges",
                    () => {
                      let _prepare = (state) => {
                        let (state, gameObject1, light1) = PointLightTool.createGameObject(state^);
                        let (state, gameObject2, light2) = PointLightTool.createGameObject(state);
                        let range1 = 2.;
                        let range2 = 3.;
                        let state = state |> PointLight.setPointLightRange(light1, range1);
                        let state = state |> PointLight.setPointLightRange(light2, range2);
                        let state =
                          state
                          |> GameObject.disposeGameObjectPointLightComponent(gameObject1, light1);
                        (state, (gameObject1, gameObject2), (range1, range2), (light1, light2))
                      };
                      test(
                        "swap with last one and reset removed one's value",
                        () => {
                          let (
                            state,
                            (gameObject1, gameObject2),
                            (range1, range2),
                            (light1, light2)
                          ) =
                            _prepare(state);
                          (PointLightTool.getRange(0, state), PointLightTool.getRange(1, state))
                          |> expect == (range2, PointLightTool.getDefaultRange())
                        }
                      )
                    }
                  )
                }
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
                open GameObject;
                let (state, light) = createPointLight(state^);
                let (state, gameObject) = state |> createGameObject;
                let state = state |> addGameObjectPointLightComponent(gameObject, light);
                let state =
                  state |> GameObject.disposeGameObjectPointLightComponent(gameObject, light);
                expect(() => getFunc(light, state))
                |> toThrowMessage("expect component alive, but actual not")
              };
              test(
                "getPointLightGameObject should error",
                () => _testGetFunc(getPointLightGameObject)
              );
              test("getPointLightColor should error", () => _testGetFunc(getPointLightColor));
              test(
                "getPointLightIntensity should error",
                () => _testGetFunc(getPointLightIntensity)
              );
              test(
                "getPointLightConstant should error",
                () => _testGetFunc(getPointLightConstant)
              );
              test("getPointLightLinear should error", () => _testGetFunc(getPointLightLinear));
              test(
                "getPointLightQuadratic should error",
                () => _testGetFunc(getPointLightQuadratic)
              );
              test("getPointLightRange should error", () => _testGetFunc(getPointLightRange))
            }
          )
      )
    }
  );