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
        () =>
          describe(
            "get the last added geometry component data",
            () => {
              describe(
                "test get custom geometry component data",
                () =>
                  test
                    (
                      "test geometry index, type_",
                      () => {
                        let (state, gameObject, boxGeometry) =
                          BoxGeometryTool.createGameObject(state^);
                        let (state, customGeometry1) =
                          CustomGeometryAPI.createCustomGeometry(state);
                        let vertices2 = Float32Array.make([|1., 0., 3.|]);
                        let normals2 = Float32Array.make([|2., 4., (-20.)|]);
                        let indices2 = Uint16Array.make([|1, 0, 2|]);
                        let (state, customGeometry2) =
                          CustomGeometryAPI.createCustomGeometry(state);
                        let state =
                          state
                          |> CustomGeometryAPI.setCustomGeometryVertices(
                               customGeometry2,
                               vertices2
                             )
                          |> CustomGeometryAPI.setCustomGeometryNormals(customGeometry2, normals2)
                          |> CustomGeometryAPI.setCustomGeometryIndices(customGeometry2, indices2);
                        let state =
                          state
                          |> GameObjectTool.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(
                               gameObject,
                               boxGeometry
                             )
                          |> GameObjectAPI.addGameObjectCustomGeometryComponent(
                               gameObject,
                               customGeometry2
                             );
                        let (geometryIndex, type_) =
                          state
                          |> GetComponentGameObjectTool.unsafeGetGeometryComponentData(gameObject);
                        (geometryIndex, type_) |> expect == (customGeometry2, 1)
                      }
                    )
                    /* test(
                         "test buffer map",
                         () => {
                           open VboBufferType;
                           let _setBoxGeometryBuffer = (geometryIndex, state) => {
                             let buffer1 = Obj.magic(1);
                             let buffer2 = Obj.magic(2);
                             let buffer3 = Obj.magic(3);
                             let {
                               boxGeometryVertexBufferMap,
                               boxGeometryNormalBufferMap,
                               boxGeometryElementArrayBufferMap
                             } =
                               state |> VboBufferTool.getRecord;
                             boxGeometryVertexBufferMap
                             |> WonderCommonlib.SparseMapService.set(geometryIndex, buffer1);
                             boxGeometryNormalBufferMap
                             |> WonderCommonlib.SparseMapService.set(geometryIndex, buffer2);
                             boxGeometryElementArrayBufferMap
                             |> WonderCommonlib.SparseMapService.set(geometryIndex, buffer3);
                             state
                           };
                           let (state, gameObject, boxGeometry) =
                             BoxGeometryTool.createGameObject(state^);
                           let (state, customGeometry1) = CustomGeometryAPI.createCustomGeometry(state);
                           let (state, customGeometry2) = CustomGeometryAPI.createCustomGeometry(state);
                           let state =
                             state
                             |> GameObjectTool.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(
                                  gameObject,
                                  boxGeometry
                                )
                             |> GameObjectAPI.addGameObjectCustomGeometryComponent(
                                  gameObject,
                                  customGeometry2
                                );
                           let (
                             geometryIndex,
                             _,
                             (
                               customGeometryVertexBufferMap,
                               customGeometryNormalBufferMap,
                               customGeometryElementArrayBufferMap
                             ),
                             _
                           ) =
                             state
                             |> GetComponentGameObjectTool.unsafeGetGeometryComponentData(gameObject);
                           let state = _setBoxGeometryBuffer(geometryIndex, state);
                           (
                             customGeometryVertexBufferMap
                             |> WonderCommonlib.SparseMapService.has(geometryIndex),
                             customGeometryNormalBufferMap
                             |> WonderCommonlib.SparseMapService.has(geometryIndex),
                             customGeometryElementArrayBufferMap
                             |> WonderCommonlib.SparseMapService.has(geometryIndex)
                           )
                           |> expect == (false, false, false)
                         }
                       ) */
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
                    |> GameObjectTool.disposeGameObjectCustomGeometryComponent(
                         gameObject,
                         customGeometry1
                       )
                    |> GameObjectAPI.addGameObjectBoxGeometryComponent(gameObject, boxGeometry2);
                  let (geometryIndex, type_) =
                    state |> GetComponentGameObjectTool.unsafeGetGeometryComponentData(gameObject);
                  (geometryIndex, type_) |> expect == (boxGeometry2, 0)
                }
              )
            }
          )
      );
      /* describe(
           "contract check",
           () =>
             test(
               "shouldn't has no geometry component",
               () => {
                 let (state, gameObject, boxGeometry) = BoxGeometryTool.createGameObject(state^);
                 let state =
                   state
                   |> GameObjectTool.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(gameObject, boxGeometry);
                 expect(
                   () =>
                     state
                     |> GetComponentGameObjectTool.unsafeGetGeometryComponentData(gameObject)
                 )
                 |> toThrowMessage("expect has component, but actual not")
               }
             )
         ) */
      describe(
        "test unsafe get cloned gameObject's current geometry component data",
        () => {
          test(
            "test box geometry",
            () => {
              let (state, gameObject, boxGeometry1) = BoxGeometryTool.createGameObject(state^);
              let state = state |> GameObjectAPI.initGameObject(gameObject);
              let (_, _, _, clonedGameObjectArr, _) =
                CloneTool.cloneWithBoxGeometry(state, gameObject, boxGeometry1, 2);
              let (geometryIndex, _) =
                state
                |> GetComponentGameObjectTool.unsafeGetGeometryComponentData(
                     clonedGameObjectArr[1]
                   );
              geometryIndex |> expect == boxGeometry1
            }
          );
          test(
            "test custom geometry",
            () => {
              let (state, gameObject, customGeometry1) =
                CustomGeometryTool.createGameObject(state^);
              let state = state |> GameObjectAPI.initGameObject(gameObject);
              let (_, _, _, clonedGameObjectArr, _) =
                CloneTool.cloneWithCustomGeometry(state, gameObject, customGeometry1, 2);
              let (geometryIndex, _) =
                state
                |> GetComponentGameObjectTool.unsafeGetGeometryComponentData(
                     clonedGameObjectArr[1]
                   );
              geometryIndex |> expect == customGeometry1
            }
          )
        }
      )
    }
  );