open Geometry;

open BoxGeometry;

open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "Geometry",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.init(~sandbox,
              ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "init",
        () => {
          describe(
            "init all geometrys",
            () => {
              let _prepare = () => {
                let (state, geometry1) = createBoxGeometry(state^);
                let (state, geometry2) = createBoxGeometry(state);
                let state = state |> BoxGeometryTool.setDefaultConfigData(geometry1);
                let state = state |> BoxGeometryTool.setDefaultConfigData(geometry2);
                (state, geometry1, geometry2)
              };
              test(
                "compute and set vertices",
                () => {
                  let (state, geometry1, geometry2) = _prepare();
                  let state = state |> GeometryTool.initGeometrys;
                  (getGeometryVertices(geometry1, state), getGeometryVertices(geometry2, state))
                  |>
                  expect == (
                              BoxGeometryTool.getDefaultVertices(),
                              BoxGeometryTool.getDefaultVertices()
                            )
                }
              );
              test(
                "compute and set indices",
                () => {
                  let (state, geometry1, geometry2) = _prepare();
                  let state = state |> GeometryTool.initGeometrys;
                  (getGeometryIndices(geometry1, state), getGeometryIndices(geometry2, state))
                  |>
                  expect == (
                              BoxGeometryTool.getDefaultIndices(),
                              BoxGeometryTool.getDefaultIndices()
                            )
                }
              )
            }
          );
          describe(
            "contract check",
            () =>
              test(
                "shouldn't dispose any geometry before init",
                () => {
                  let (state, geometry1) = BoxGeometryTool.createBoxGeometry(state^);
                  let (state, geometry2) = BoxGeometryTool.createBoxGeometry(state);
                  let state =
                    VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
                  let state = state |> GeometryTool.dispose(geometry1);
                  expect(
                    () => {
                      let state = state |> GeometryTool.initGeometrys;
                      ()
                    }
                  )
                  |> toThrowMessage("shouldn't dispose any geometry before init")
                }
              )
          )
        }
      );
      describe(
        "getDrawMode",
        () =>
          test(
            "return TRIANGLES",
            () => {
              let triangles = 1;
              let state = state^ |> FakeGlTool.setFakeGl({"TRIANGLES": triangles});
              state |> getGeometryDrawMode |> expect == triangles
            }
          )
      );
      describe(
        "getGeometryGameObject",
        () =>
          test(
            "get geometry's gameObject",
            () => {
              open GameObject;
              let (state, geometry) = createBoxGeometry(state^);
              let (state, gameObject) = state |> createGameObject;
              let state = state |> addGameObjectGeometryComponent(gameObject, geometry);
              state |> getGeometryGameObject(geometry) |> expect == gameObject
            }
          )
      );
      describe(
        "disposeComponent",
        () => {
          describe(
            "contract check",
            () =>
              test(
                "shouldn't dispose the component which isn't alive",
                () => {
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let state = state |> GameObject.initGameObject(gameObject1);
                  let state =
                    VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                      ()
                    }
                  )
                  |> toThrowMessage("shouldn't dispose the component which isn't alive")
                }
              )
          )
        }
      );
      describe(
        "contract check",
        () => {
          describe(
            "check is alive",
            () =>
              describe(
                "if geometry is disposed",
                () => {
                  let _testGetFunc = (getFunc) => {
                    open GameObject;
                    let (state, gameObject, geometry) = BoxGeometryTool.createGameObject(state^);
                    let state = state |> GeometryTool.initGeometrys;
                    let state =
                      VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry, state);
                    let state =
                      state |> GameObject.disposeGameObjectGeometryComponent(gameObject, geometry);
                    expect(() => getFunc(geometry, state))
                    |> toThrowMessage("component should alive")
                  };
                  let _testSetFunc = (setFunc) => {
                    open GameObject;
                    let (state, gameObject, geometry) = BoxGeometryTool.createGameObject(state^);
                    let state = state |> GeometryTool.initGeometrys;
                    let state =
                      VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry, state);
                    let state =
                      state |> GameObject.disposeGameObjectGeometryComponent(gameObject, geometry);
                    expect(() => setFunc(geometry, Obj.magic(0), state))
                    |> toThrowMessage("component should alive")
                  };
                  test(
                    "getGeometryVertices should error",
                    () => _testGetFunc(getGeometryVertices)
                  );
                  test("getGeometryIndices should error", () => _testGetFunc(getGeometryIndices));
                  test(
                    "getGeometryConfigData should error",
                    () => _testGetFunc(getGeometryConfigData)
                  );
                  test(
                    "getGeometryGameObject should error",
                    () => _testGetFunc(getGeometryGameObject)
                  );
                  test(
                    "setGeometryVertices should error",
                    () => _testSetFunc(setGeometryVertices)
                  );
                  test("setGeometryIndices should error", () => _testSetFunc(setGeometryIndices))
                }
              )
          )
          /* describe(
               "check getGeometryConfigData",
               () =>
                 test(
                   "cloned geometry have no config data, shouldn't get it",
                   () => {
                     open StateDataType;
                     let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                     let state = state |> GeometryTool.initGeometrys;
                     let (state, _, _, _, clonedGeometryArr) =
                       CloneTool.cloneWithGeometry(state, gameObject1, geometry1, 1);
                     expect(() => state |> Geometry.getGeometryConfigData(clonedGeometryArr[0]))
                     |> toThrowMessage("cloned geometry have no config data, shouldn't get it")
                   }
                 )
             ) */
        }
      )
    }
  );