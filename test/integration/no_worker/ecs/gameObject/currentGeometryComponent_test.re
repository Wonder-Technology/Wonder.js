open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "test current geometry component",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.init(
              ~sandbox,
              ~buffer=TestTool.buildBufferJsObj(~customGeometryPointDataBufferCount=10, ()),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test unsafe get current geometry component data",
        () => {
          describe(
            "get the last added geometry component data",
            () => {
              test(
                "test get custom geometry component data",
                () => {
                  let (state, gameObject, boxGeometry) = BoxGeometryTool.createGameObject(state^);
                  let (state, customGeometry1) = CustomGeometryAPI.createCustomGeometry(state);
                  let vertices2 = Float32Array.make([|1., 0., 3.|]);
                  let normals2 = Float32Array.make([|2., 4., (-20.)|]);
                  let indices2 = Uint16Array.make([|1, 0, 2|]);
                  let (state, customGeometry2) = CustomGeometryAPI.createCustomGeometry(state);
                  let state =
                    state
                    |> CustomGeometryAPI.setCustomGeometryVertices(customGeometry2, vertices2)
                    |> CustomGeometryAPI.setCustomGeometryNormals(customGeometry2, normals2)
                    |> CustomGeometryAPI.setCustomGeometryIndices(customGeometry2, indices2);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                         gameObject,
                         boxGeometry
                       )
                    |> GameObjectAPI.addGameObjectCustomGeometryComponent(
                         gameObject,
                         customGeometry2
                       );
                  let (
                    geometryIndex,
                    getVerticesFunc,
                    getNormalsFunc,
                    getIndicesFunc,
                    getIndicesCountFunc
                  ) =
                    state |> GetComponentGameObjectTool.unsafeGetGeometryDataComponent(gameObject);
                  (
                    geometryIndex,
                    [@bs] getVerticesFunc(geometryIndex, state),
                    [@bs] getNormalsFunc(geometryIndex, state),
                    [@bs] getIndicesFunc(geometryIndex, state),
                    getIndicesCountFunc(geometryIndex, state)
                  )
                  |>
                  expect == (
                              customGeometry2,
                              vertices2,
                              normals2,
                              indices2,
                              indices2 |> Uint16Array.length
                            )
                }
              );
              test(
                "test get box geometry component data",
                () => {
                  let (state, gameObject, customGeometry1) =
                    CustomGeometryTool.createGameObject(state^);
                  let (state, boxGeometry1) = BoxGeometryAPI.createBoxGeometry(state);
                  let (state, boxGeometry2) = BoxGeometryAPI.createBoxGeometry(state);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectCustomGeometryComponent(
                         gameObject,
                         customGeometry1
                       )
                    |> GameObjectAPI.addGameObjectBoxGeometryComponent(gameObject, boxGeometry2);
                  let (
                    geometryIndex,
                    getVerticesFunc,
                    getNormalsFunc,
                    getIndicesFunc,
                    getIndicesCountFunc
                  ) =
                    state |> GetComponentGameObjectTool.unsafeGetGeometryDataComponent(gameObject);
                  (
                    geometryIndex,
                    [@bs] getVerticesFunc(geometryIndex, state) |> Float32Array.length,
                    [@bs] getNormalsFunc(geometryIndex, state) |> Float32Array.length,
                    [@bs] getIndicesFunc(geometryIndex, state) |> Uint16Array.length,
                    getIndicesCountFunc(geometryIndex, state)
                  )
                  |> expect == (boxGeometry2, 72, 72, 36, 36)
                }
              )
            }
          );
          describe(
            "contract check",
            () =>
              test(
                "shouldn't has no geometry component",
                () => {
                  let (state, gameObject, boxGeometry) = BoxGeometryTool.createGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(gameObject, boxGeometry);
                  expect(
                    () =>
                      state
                      |> GetComponentGameObjectTool.unsafeGetGeometryDataComponent(gameObject)
                  )
                  |> toThrowMessage("expect has component, but actual not")
                }
              )
          )
        }
      )
    }
  );