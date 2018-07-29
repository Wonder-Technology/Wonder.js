open DirectionLightAPI;

open Wonder_jest;

let _ =
  describe("DirectionLight", () => {
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
    describe("createDirectionLight", () => {
      test("create a new light which is just index(int)", () => {
        let (_, light) = createDirectionLight(state^);
        expect(light) == 0;
      });
      describe("contract check", () =>
        describe("limit the total alive count of light to 4", () => {
          test("test create", () => {
            let (state, light) = createDirectionLight(state^);
            let (state, light) = createDirectionLight(state);
            let (state, light) = createDirectionLight(state);
            let (state, light) = createDirectionLight(state);
            expect(() => {
              let (state, light) = createDirectionLight(state);
              ();
            })
            |> toThrowMessage(
                 "expect index: 4 <= maxIndex: 3, but actual not",
               );
          });
          test("test create after dispose", () => {
            let (state, gameObject1, _) =
              DirectionLightTool.createGameObject(state^);
            let (state, gameObject2, _) =
              DirectionLightTool.createGameObject(state);
            let (state, gameObject3, _) =
              DirectionLightTool.createGameObject(state);
            let (state, gameObject3, _) =
              DirectionLightTool.createGameObject(state);
            let state =
              state |> GameObjectTool.disposeGameObject(gameObject1);
            expect(() => {
              let (state, light) = createDirectionLight(state);
              ();
            })
            |> not_
            |> toThrow;
          });
        })
      );
    });
    describe("unsafeGetDirectionLightGameObject", () =>
      test("get light's gameObject", () => {
        open GameObjectAPI;
        open GameObjectAPI;
        let (state, light) = createDirectionLight(state^);
        let (state, gameObject) = state |> createGameObject;
        let state =
          state |> addGameObjectDirectionLightComponent(gameObject, light);
        state
        |> unsafeGetDirectionLightGameObject(light)
        |> expect == gameObject;
      })
    );
    describe("getDirectionLightColor", () =>
      test("test default color", () => {
        let (state, light) = createDirectionLight(state^);
        getDirectionLightColor(light, state) |> expect == [|1., 1., 1.|];
      })
    );
    describe("setDirectionLightColor", () =>
      test("test set color", () => {
        let (state, light) = createDirectionLight(state^);
        let color = [|0.2, 0.3, 0.5|];
        let state = state |> setDirectionLightColor(light, color);
        getDirectionLightColor(light, state)
        |> TypeArrayTool.truncateArray
        |> expect == color;
      })
    );
    describe("getDirectionLightIntensity", () =>
      test("test default intensity", () => {
        let (state, light) = createDirectionLight(state^);
        getDirectionLightIntensity(light, state) |> expect == 1.;
      })
    );
    describe("setDirectionLightIntensity", () =>
      test("test set intensity", () => {
        let (state, light) = createDirectionLight(state^);
        let intensity = 2.;
        let state = state |> setDirectionLightIntensity(light, intensity);
        getDirectionLightIntensity(light, state) |> expect == intensity;
      })
    );
    describe("disposeComponent", () =>
      describe("dispose data", () => {
        test("mark disposed", () => {
          open DirectionLightType;
          let (state, gameObject1, light1) =
            DirectionLightTool.createGameObject(state^);
          let state =
            state
            |> GameObjectTool.disposeGameObjectDirectionLightComponent(
                 gameObject1,
                 light1,
               );
          DirectionLightTool.isAlive(light1, state) |> expect == false;
        });

        describe("remove from gameObjectMap", () =>
          describe("swap with last one", () => {
            test("test only has one", () => {
              open DirectionLightType;
              let (state, gameObject1, light1) =
                DirectionLightTool.createGameObject(state^);
              let state =
                state
                |> GameObjectTool.disposeGameObjectDirectionLightComponent(
                     gameObject1,
                     light1,
                   );
              let {gameObjectMap} = DirectionLightTool.getRecord(state);
              gameObjectMap |> expect == [||];
            });
            test("test two", () => {
              open DirectionLightType;
              let (state, gameObject1, light1) =
                DirectionLightTool.createGameObject(state^);
              let (state, gameObject2, light2) =
                DirectionLightTool.createGameObject(state);
              let state =
                state
                |> GameObjectTool.disposeGameObjectDirectionLightComponent(
                     gameObject1,
                     light1,
                   );
              let {gameObjectMap} = DirectionLightTool.getRecord(state);
              gameObjectMap |> expect == [|gameObject2|];
            });
          })
        );

        describe("test remove from type array", () => {
          describe("remove from colors", () => {
            let _prepare = state => {
              let (state, gameObject1, light1) =
                DirectionLightTool.createGameObject(state^);
              let (state, gameObject2, light2) =
                DirectionLightTool.createGameObject(state);
              let color1 = [|1., 1., 0.|];
              let color2 = [|0., 1., 0.|];
              let state =
                state
                |> DirectionLightAPI.setDirectionLightColor(light1, color1);
              let state =
                state
                |> DirectionLightAPI.setDirectionLightColor(light2, color2);
              let state =
                state
                |> GameObjectTool.disposeGameObjectDirectionLightComponent(
                     gameObject1,
                     light1,
                   );
              (
                state,
                (gameObject1, gameObject2),
                (color1, color2),
                (light1, light2),
              );
            };
            test("swap with last one and reset removed one's value", () => {
              let (
                state,
                (gameObject1, gameObject2),
                (color1, color2),
                (light1, light2),
              ) =
                _prepare(state);
              (
                DirectionLightTool.getColor(0, state),
                DirectionLightTool.getColor(1, state),
              )
              |> expect == (color2, DirectionLightTool.getDefaultColor());
            });
          });
          describe("remove from intensities", () => {
            let _prepare = state => {
              let (state, gameObject1, light1) =
                DirectionLightTool.createGameObject(state^);
              let (state, gameObject2, light2) =
                DirectionLightTool.createGameObject(state);
              let intensity1 = 2.;
              let intensity2 = 3.;
              let state =
                state
                |> DirectionLightAPI.setDirectionLightIntensity(
                     light1,
                     intensity1,
                   );
              let state =
                state
                |> DirectionLightAPI.setDirectionLightIntensity(
                     light2,
                     intensity2,
                   );
              let state =
                state
                |> GameObjectTool.disposeGameObjectDirectionLightComponent(
                     gameObject1,
                     light1,
                   );
              (
                state,
                (gameObject1, gameObject2),
                (intensity1, intensity2),
                (light1, light2),
              );
            };
            test("swap with last one and reset removed one's value", () => {
              let (
                state,
                (gameObject1, gameObject2),
                (intensity1, intensity2),
                (light1, light2),
              ) =
                _prepare(state);
              (
                DirectionLightTool.getIntensity(0, state),
                DirectionLightTool.getIntensity(1, state),
              )
              |>
              expect == (intensity2, DirectionLightTool.getDefaultIntensity());
            });
          });
        });
      })
    );

    /* describe("fix bug", () =>
             test("aaaa", () => {
               let (state, gameObject1, light1) =
                 DirectionLightTool.createGameObject(state^);
               let (state, gameObject2, light2) =
                 DirectionLightTool.createGameObject(state);


                 /* WonderLog.Log.print(
       GameObjectDirectionLightService.unsafeGetGameObject(light2, state.directionLightRecord)
                 ) |> ignore; */

               let state = GameObjectTool.disposeGameObject(gameObject1, state);

               PositionLightMainService.buildPositionMap(
                 DirectionLightTool.getRecord(state).index,
                 PositionDirectionLightMainService.getPosition,
                 state,
               )
               |> expect == [||];
             })
           ); */

    describe("contract check: is alive", () =>
      describe("if light is disposed", () => {
        let _testGetFunc = getFunc => {
          open GameObjectAPI;
          open GameObjectAPI;
          let (state, light) = createDirectionLight(state^);
          let (state, gameObject) = state |> createGameObject;
          let state =
            state |> addGameObjectDirectionLightComponent(gameObject, light);
          let state =
            state
            |> GameObjectTool.disposeGameObjectDirectionLightComponent(
                 gameObject,
                 light,
               );
          expect(() =>
            getFunc(light, state)
          )
          |> toThrowMessage("expect component alive, but actual not");
        };
        test("unsafeGetDirectionLightGameObject should error", () =>
          _testGetFunc(unsafeGetDirectionLightGameObject)
        );
        test("getDirectionLightColor should error", () =>
          _testGetFunc(getDirectionLightColor)
        );
        test("getDirectionLightIntensity should error", () =>
          _testGetFunc(getDirectionLightIntensity)
        );
      })
    );
    describe("getLightCount", () =>
      describe("contract check", () =>
        test("count should <= max buffer count", () =>
          expect(() => {
            let state =
              {
                ...state^,
                directionLightRecord: {
                  ...state^.directionLightRecord,
                  index: 5,
                },
              }
              |> DirectionLightTool.getLightCount;
            ();
          })
          |> toThrowMessage("light count: 5 <= max buffer count: 4")
        )
      )
    );
  });