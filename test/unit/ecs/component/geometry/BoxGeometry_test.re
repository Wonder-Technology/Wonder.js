open BoxGeometryAPI;

open GeometryType;

open BoxGeometryType;

open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "BoxGeometry",
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
        "createBoxGeometry",
        () =>
          test(
            "create a new geometry which is just index(int)",
            () => {
              let (state, geometry) = createBoxGeometry(state^);
              (RecordBoxGeometryMainService.getRecord(state).index, geometry) |> expect == (1, 0)
            }
          )
      );
      test(
        "test vertices",
        () =>
          BoxGeometryAPI.getBoxGeometryVertices(state^)
          |> expect == BoxGeometryTool.getDefaultVertices()
      );
      test(
        "test normals",
        () =>
          BoxGeometryAPI.getBoxGeometryNormals(state^)
          |> expect == BoxGeometryTool.getDefaultNormals()
      );
      test(
        "test indices",
        () =>
          BoxGeometryAPI.getBoxGeometryIndices(state^)
          |> expect == BoxGeometryTool.getDefaultIndices()
      );
      describe(
        "getDrawMode",
        () =>
          test(
            "return TRIANGLES",
            () => {
              let triangles = 1;
              let state = state^ |> FakeGlTool.setFakeGl({"TRIANGLES": triangles});
              state |> getBoxGeometryDrawMode |> expect == triangles
            }
          )
      );
      describe(
        "unsafeGetBoxGeometryGameObject",
        () =>
          test(
            "get geometry's gameObject",
            () => {
              open GameObjectAPI;
              open GameObjectAPI;
              let (state, geometry) = createBoxGeometry(state^);
              let (state, gameObject) = state |> createGameObject;
              let state = state |> addGameObjectBoxGeometryComponent(gameObject, geometry);
              state |> unsafeGetBoxGeometryGameObject(geometry) |> expect == gameObject
            }
          )
      );
      describe(
        "dispose component",
        () => {
          describe(
            "dispose geometry data",
            () => {
              describe(
                "test dispose shared geometry",
                () =>
                  test(
                    "descrease group count",
                    () => {
                      let (state, geometry1) = createBoxGeometry(state^);
                      let (state, gameObject1) = GameObjectAPI.createGameObject(state);
                      let state =
                        state
                        |> GameObjectAPI.addGameObjectBoxGeometryComponent(gameObject1, geometry1);
                      let (state, gameObject2) = GameObjectAPI.createGameObject(state);
                      let state =
                        state
                        |> GameObjectAPI.addGameObjectBoxGeometryComponent(gameObject2, geometry1);
                      let (state, gameObject3) = GameObjectAPI.createGameObject(state);
                      let state =
                        state
                        |> GameObjectAPI.addGameObjectBoxGeometryComponent(gameObject3, geometry1);
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(
                             gameObject1,
                             geometry1
                           );
                      BoxGeometryTool.getGroupCount(geometry1, state) |> expect == 1
                    }
                  )
              );
              describe(
                "test dispose not shared geometry",
                () => {
                  let _prepare = (state) => {
                    let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                    let state =
                      VboBufferTool.addVboBufferToBoxGeometryBufferMap(
                        geometry1,
                        state
                      );
                    let state =
                      state
                      |> GameObjectTool.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(
                           gameObject1,
                           geometry1
                         );
                    (state, gameObject1, geometry1)
                  };
                  test(
                    "remove from groupCountMap, gameObjectMap",
                    () => {
                      open StateDataMainType;
                      let (state, gameObject1, geometry1) = _prepare(state);
                      let {groupCountMap, gameObjectMap} =
                        RecordBoxGeometryMainService.getRecord(state);
                      (
                        groupCountMap |> WonderCommonlib.SparseMapService.has(geometry1),
                        gameObjectMap |> WonderCommonlib.SparseMapService.has(geometry1)
                      )
                      |> expect == (false, false)
                    }
                  );
                }
              )
            }
          );
          describe(
            "test add new one after dispose old one",
            () => {
              test(
                "use disposed index as new index firstly",
                () => {
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let state = state |> GameObjectAPI.initGameObject(gameObject1);
                  let state =
                    VboBufferTool.addVboBufferToBoxGeometryBufferMap(
                      geometry1,
                      state
                    );
                  let state =
                    state
                    |> GameObjectTool.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(gameObject1, geometry1);
                  let (state, geometry2) = createBoxGeometry(state);
                  geometry2 |> expect == geometry1
                }
              );
              test(
                "if has no disposed index, get index from boxGeometryRecord.index",
                () => {
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let state = state |> GameObjectAPI.initGameObject(gameObject1);
                  let state =
                    VboBufferTool.addVboBufferToBoxGeometryBufferMap(
                      geometry1,
                      state
                    );
                  let state =
                    state
                    |> GameObjectTool.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(gameObject1, geometry1);
                  let (state, geometry2) = createBoxGeometry(state);
                  let (state, geometry3) = createBoxGeometry(state);
                  (geometry2, geometry3) |> expect == (geometry1, geometry1 + 1)
                }
              )
            }
          );
          describe(
            "contract check",
            () =>
              test(
                "shouldn't dispose the alive component",
                () => {
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let state = state |> GameObjectAPI.initGameObject(gameObject1);
                  let state =
                    VboBufferTool.addVboBufferToBoxGeometryBufferMap(
                      geometry1,
                      state
                    );
                  let state =
                    state
                    |> GameObjectTool.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(gameObject1, geometry1);
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(
                             gameObject1,
                             geometry1
                           );
                      ()
                    }
                  )
                  |> toThrowMessage("expect dispose the alive component, but actual not")
                }
              )
          )
        }
      );
      describe(
        "contract check",
        () =>
          describe(
            "check is alive",
            () =>
              describe(
                "if geometry is disposed",
                () => {
                  let _testGetFunc = (getFunc) => {
                    open GameObjectAPI;
                    open GameObjectAPI;
                    let (state, gameObject, geometry) = BoxGeometryTool.createGameObject(state^);
                    /*let state = state |> BoxGeometryTool.initGeometrys;*/
                    let state =
                      VboBufferTool.addVboBufferToBoxGeometryBufferMap(
                        geometry,
                        state
                      );
                    let state =
                      state
                      |> GameObjectTool.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(gameObject, geometry);
                    expect(() => getFunc(geometry, state))
                    |> toThrowMessage("expect component alive, but actual not")
                  };
                  let _testSetFunc = (setFunc) => {
                    open GameObjectAPI;
                    open GameObjectAPI;
                    let (state, gameObject, geometry) = BoxGeometryTool.createGameObject(state^);
                    /*let state = state |> BoxGeometryTool.initGeometrys;*/
                    let state =
                      VboBufferTool.addVboBufferToBoxGeometryBufferMap(
                        geometry,
                        state
                      );
                    let state =
                      state
                      |> GameObjectTool.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(gameObject, geometry);
                    expect(() => setFunc(geometry, Obj.magic(0), state))
                    |> toThrowMessage("expect component alive, but actual not")
                  };
                  test(
                    "unsafeGetBoxGeometryGameObject should error",
                    () => _testGetFunc(unsafeGetBoxGeometryGameObject)
                  )
                }
              )
          )
      )
    }
  );