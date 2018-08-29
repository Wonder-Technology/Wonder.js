open GeometryAPI;

open GeometryType;

open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("Geometry", () => {
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
    /* let state = SettingTool.setMemory(state, ~maxDisposeCount=1, ()); */
    describe("createGeometry", () =>
      test("create a new geometry which is just index(int)", () => {
        let (state, geometry) = createGeometry(state^);
        (RecordGeometryMainService.getRecord(state).index, geometry)
        |> expect == (1, 0);
      })
    );

    describe("getAllGeometrys", () => {
      let _createGeometryGameObjects = state => {
        let (state, gameObject1, geometry1) =
          GeometryTool.createGameObject(state^);
        let (state, gameObject2, geometry2) =
          GeometryTool.createGameObject(state);
        let (state, gameObject3, geometry3) =
          BoxGeometryTool.createGameObject(state);

        (
          state,
          (gameObject1, gameObject2, gameObject3),
          (geometry1, geometry2, geometry3),
        );
      };

      test(
        "get all geometrys include the ones add or not add to gameObject", () => {
        let (
          state,
          (gameObject1, gameObject2, gameObject3),
          (geometry1, geometry2, geometry3),
        ) =
          _createGeometryGameObjects(state);

        let (state, geometry4) = GeometryAPI.createGeometry(state);

        GeometryAPI.getAllGeometrys(state)
        |> expect == [|geometry1, geometry2, geometry3, geometry4|];
      });
      test("test dispose", () => {
        let (
          state,
          (gameObject1, gameObject2, gameObject3),
          (geometry1, geometry2, geometry3),
        ) =
          _createGeometryGameObjects(state);

        let state =
          state
          |> GameObjectAPI.disposeGameObject(gameObject2)
          |> GameObjectAPI.disposeGameObject(gameObject3);
        let state = state |> DisposeJob.execJob(None);

        GameObjectAPI.getAllGeometryComponents(state)
        |> expect == [|geometry1|];
      });
    });

    describe("test set points", () => {
      let _testSetVertexDataWithTypeArray = (type_, getFunc, setFunc) =>
        test({j|directly set it|j}, () => {
          open GameObjectAPI;
          open GameObjectAPI;
          let (state, geometry) = createGeometry(state^);
          let state =
            state |> setFunc(geometry, Float32Array.make([|1., 2., 3.|]));
          let newData = Float32Array.make([|3., 5., 5.|]);
          let state = state |> setFunc(geometry, newData);
          getFunc(geometry, state) |> expect == newData;
        });
      describe("set vertices with type array", () =>
        _testSetVertexDataWithTypeArray(
          "vertices",
          getGeometryVertices,
          setGeometryVertices,
        )
      );
      describe("set texCoords with type array", () =>
        _testSetVertexDataWithTypeArray(
          "texCoords",
          getGeometryTexCoords,
          setGeometryTexCoords,
        )
      );
      describe("set normals with type array", () =>
        _testSetVertexDataWithTypeArray(
          "normals",
          getGeometryNormals,
          setGeometryNormals,
        )
      );
      describe("set indices with type array", () =>
        test("directly set it", () => {
          open GameObjectAPI;
          open GameObjectAPI;
          let (state, geometry) = createGeometry(state^);
          let newData = Uint16Array.make([|3, 5, 5|]);
          let state = state |> setGeometryIndices(geometry, newData);
          getGeometryIndices(geometry, state) |> expect == newData;
        })
      );
    });

    describe("test setGeometryName", () =>
      test("test", () => {
        let (state, geometry) = createGeometry(state^);
        let name = "geo1";

        let state = GeometryAPI.setGeometryName(geometry, name, state);

        GeometryAPI.unsafeGetGeometryName(geometry, state) |> expect == name;
      })
    );

    describe("unsafeGetGeometryGameObjects", () =>
      test("get geometry's gameObjects", () => {
        open GameObjectAPI;
        let (state, geometry) = createGeometry(state^);
        let (state, gameObject1) = state |> createGameObject;
        let (state, gameObject2) = state |> createGameObject;
        let state =
          state
          |> addGameObjectGeometryComponent(gameObject1, geometry)
          |> addGameObjectGeometryComponent(gameObject2, geometry);

        state
        |> unsafeGetGeometryGameObjects(geometry)
        |> expect == [|gameObject1, gameObject2|];
      })
    );

    describe("dispose component", () => {
      describe("dispose data", () => {
        describe("test dispose shared geometry", () =>
          test("remove gameObject", () => {
            let (state, geometry1) = createGeometry(state^);
            let (state, gameObject1) = GameObjectAPI.createGameObject(state);
            let state =
              state
              |> GameObjectAPI.addGameObjectGeometryComponent(
                   gameObject1,
                   geometry1,
                 );
            let (state, gameObject2) = GameObjectAPI.createGameObject(state);
            let state =
              state
              |> GameObjectAPI.addGameObjectGeometryComponent(
                   gameObject2,
                   geometry1,
                 );
            let (state, gameObject3) = GameObjectAPI.createGameObject(state);
            let state =
              state
              |> GameObjectAPI.addGameObjectGeometryComponent(
                   gameObject3,
                   geometry1,
                 );
            let state =
              state
              |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                   gameObject1,
                   geometry1,
                 );

            GeometryAPI.unsafeGetGeometryGameObjects(geometry1, state)
            |> expect == [|gameObject3, gameObject2|];
          })
        );
        describe("test dispose not shared geometry", () => {
          let _prepare = state => {
            let (state, gameObject1, geometry1) =
              GeometryTool.createGameObject(state^);
            let state =
              VboBufferTool.addVboBufferToGeometryBufferMap(geometry1, state);
            let state =
              state
              |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                   gameObject1,
                   geometry1,
                 );
            (state, gameObject1, geometry1);
          };
          test("remove from gameObjectsMap, nameMap", () => {
            open StateDataMainType;
            let (state, gameObject1, geometry1) = _prepare(state);
            let {gameObjectsMap, nameMap} = GeometryTool.getRecord(state);

            (
              GeometryTool.hasGameObject(geometry1, state),
              nameMap |> WonderCommonlib.SparseMapService.has(geometry1),
            )
            |> expect == (false, false);
          });
          describe("test reallocate geometry", () => {
            let _prepare = state => {
              let state =
                SettingTool.setMemory(state, ~maxDisposeCount=1, ());
              GeometryTool.createThreeGameObjectsAndSetPointData(state);
            };
            describe(
              "if have dispose too many geometrys, reallocate geometry", () => {
              describe("test type array data", () =>
                describe("pack old type array with alived data", () => {
                  test("alive geometry's points should exist", () => {
                    let (
                      state,
                      (gameObject1, gameObject2, gameObject3),
                      (geometry1, geometry2, geometry3),
                      (vertices1, vertices2, vertices3),
                      (texCoords1, texCoords2, texCoords3),
                      (normals1, normals2, normals3),
                      (indices1, indices2, indices3),
                    ) =
                      _prepare(state^);
                    let state =
                      state
                      |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                           gameObject1,
                           geometry1,
                         );
                    (
                      getGeometryVertices(geometry2, state),
                      getGeometryTexCoords(geometry2, state),
                      getGeometryNormals(geometry2, state),
                      getGeometryIndices(geometry2, state),
                      getGeometryVertices(geometry3, state),
                      getGeometryTexCoords(geometry3, state),
                      getGeometryNormals(geometry3, state),
                      getGeometryIndices(geometry3, state),
                    )
                    |>
                    expect == (
                                vertices2,
                                texCoords2,
                                normals2,
                                indices2,
                                vertices3,
                                texCoords3,
                                normals3,
                                indices3,
                              );
                  });
                  test("type array should be packed", () => {
                    open Js_typed_array;
                    open StateDataMainType;
                    let (
                      state,
                      (gameObject1, gameObject2, gameObject3),
                      (geometry1, geometry2, geometry3),
                      (vertices1, vertices2, vertices3),
                      (texCoords1, texCoords2, texCoords3),
                      (normals1, normals2, normals3),
                      (indices1, indices2, indices3),
                    ) =
                      _prepare(state^);
                    let state =
                      state
                      |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                           gameObject2,
                           geometry2,
                         );
                    let {vertices, texCoords, normals, indices} =
                      state |> GeometryTool.getRecord;
                    (
                      vertices |> Float32Array.slice(~start=0, ~end_=10),
                      texCoords |> Float32Array.slice(~start=0, ~end_=10),
                      normals |> Float32Array.slice(~start=0, ~end_=10),
                      indices |> Uint16Array.slice(~start=0, ~end_=10),
                    )
                    |>
                    expect == (
                                Float32Array.make([|
                                  10.,
                                  10.,
                                  11.,
                                  5.,
                                  3.,
                                  2.,
                                  5.,
                                  3.,
                                  2.,
                                  0.,
                                |]),
                                Float32Array.make([|
                                  0.5,
                                  0.5,
                                  0.,
                                  0.5,
                                  0.,
                                  0.5,
                                  0.,
                                  0.,
                                  0.,
                                  0.,
                                |]),
                                Float32Array.make([|
                                  1.,
                                  2.,
                                  3.,
                                  5.,
                                  1.,
                                  2.,
                                  5.,
                                  1.,
                                  2.,
                                  0.,
                                |]),
                                Uint16Array.make([|
                                  2,
                                  1,
                                  0,
                                  0,
                                  1,
                                  2,
                                  0,
                                  1,
                                  2,
                                  0,
                                |]),
                              );
                  });
                })
              );
              describe("test info array", () =>
                test("update startIndex, endIndex for packed type array", () => {
                  open StateDataMainType;
                  let (
                    state,
                    (gameObject1, gameObject2, gameObject3),
                    (geometry1, geometry2, geometry3),
                    (vertices1, vertices2, vertices3),
                    (texCoords1, texCoords2, texCoords3),
                    (normals1, normals2, normals3),
                    (indices1, indices2, indices3),
                  ) =
                    _prepare(state^);
                  let state =
                    state
                    |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                         gameObject1,
                         geometry1,
                       );
                  let {
                    verticesInfos,
                    texCoordsInfos,
                    normalsInfos,
                    indicesInfos,
                  } =
                    state |> GeometryTool.getRecord;
                  (
                    verticesInfos |> Uint32Array.slice(~start=0, ~end_=6),
                    texCoordsInfos |> Uint32Array.slice(~start=0, ~end_=6),
                    normalsInfos |> Uint32Array.slice(~start=0, ~end_=6),
                    indicesInfos |> Uint32Array.slice(~start=0, ~end_=6),
                  )
                  |>
                  expect == (
                              Uint32Array.make([|0, 3, 0, 3, 3, 6|]),
                              Uint32Array.make([|0, 2, 0, 2, 2, 4|]),
                              Uint32Array.make([|0, 3, 0, 3, 3, 6|]),
                              Uint32Array.make([|0, 3, 0, 3, 3, 6|]),
                            );
                })
              );
              test("reset offset", () => {
                open StateDataMainType;
                let (
                  state,
                  (gameObject1, gameObject2, gameObject3),
                  (geometry1, geometry2, geometry3),
                  (vertices1, vertices2, vertices3),
                  (texCoords1, texCoords2, texCoords3),
                  (normals1, normals2, normals3),
                  (indices1, indices2, indices3),
                ) =
                  _prepare(state^);
                let state =
                  state
                  |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                       gameObject1,
                       geometry1,
                     );
                let state =
                  state
                  |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                       gameObject3,
                       geometry3,
                     );
                let {
                  verticesOffset,
                  texCoordsOffset,
                  normalsOffset,
                  indicesOffset,
                } =
                  state |> GeometryTool.getRecord;
                (
                  verticesOffset,
                  texCoordsOffset,
                  normalsOffset,
                  indicesOffset,
                )
                |>
                expect == (
                            vertices2 |> Float32Array.length,
                            texCoords2 |> Float32Array.length,
                            normals2 |> Float32Array.length,
                            indices2 |> Uint16Array.length,
                          );
              });
              test("clean disposedIndexMap", () => {
                open StateDataMainType;
                let (
                  state,
                  (gameObject1, gameObject2, gameObject3),
                  (geometry1, geometry2, geometry3),
                  (vertices1, vertices2, vertices3),
                  (texCoords1, texCoords2, texCoords3),
                  (normals1, normals2, normals3),
                  (indices1, indices2, indices3),
                ) =
                  _prepare(state^);
                let state =
                  state
                  |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                       gameObject1,
                       geometry1,
                     );
                let {disposedIndexMap} = state |> GeometryTool.getRecord;
                disposedIndexMap
                |> expect == WonderCommonlib.SparseMapService.createEmpty();
              });
              test("reset aliveIndexArray", () => {
                open StateDataMainType;
                let (
                  state,
                  (gameObject1, gameObject2, gameObject3),
                  (geometry1, geometry2, geometry3),
                  (vertices1, vertices2, vertices3),
                  (texCoords1, texCoords2, texCoords3),
                  (normals1, normals2, normals3),
                  (indices1, indices2, indices3),
                ) =
                  _prepare(state^);
                let state =
                  state |> GameObjectTool.disposeGameObject(gameObject1);
                let (state, gameObject4, geometry4) =
                  GeometryTool.createGameObject(state);
                let state =
                  state |> GameObjectAPI.initGameObject(gameObject4);
                let state =
                  state |> GameObjectTool.disposeGameObject(gameObject4);
                let {aliveIndexArray} = state |> GeometryTool.getRecord;
                aliveIndexArray |> expect == [|geometry2, geometry3|];
              });
              describe("test add new one after dispose old one", () => {
                describe("if has disposed one", () =>
                  test("use disposed index as new index", () => {
                    open StateDataMainType;
                    let (
                      state,
                      (gameObject1, gameObject2, gameObject3),
                      (geometry1, geometry2, geometry3),
                      (vertices1, vertices2, vertices3),
                      (texCoords1, texCoords2, texCoords3),
                      (normals1, normals2, normals3),
                      (indices1, indices2, indices3),
                    ) =
                      _prepare(state^);
                    let state =
                      state
                      |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                           gameObject2,
                           geometry2,
                         );
                    let (state, gameObject4, geometry4) =
                      GeometryTool.createGameObject(state);
                    let state =
                      state |> GameObjectAPI.initGameObject(gameObject4);
                    let state =
                      state
                      |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                           gameObject4,
                           geometry4,
                         );
                    let (state, gameObject5, geometry5) =
                      GeometryTool.createGameObject(state);
                    let (state, gameObject6, geometry6) =
                      GeometryTool.createGameObject(state);
                    (geometry1, geometry3, geometry5, geometry6)
                    |> expect == (0, 2, 1, 3);
                  })
                );
                test("else, increase record.index ", () => {
                  open StateDataMainType;
                  let (
                    state,
                    (gameObject1, gameObject2, gameObject3),
                    (geometry1, geometry2, geometry3),
                    (vertices1, vertices2, vertices3),
                    (texCoords1, texCoords2, texCoords3),
                    (normals1, normals2, normals3),
                    (indices1, indices2, indices3),
                  ) =
                    _prepare(state^);
                  let (state, gameObject4, geometry4) =
                    GeometryTool.createGameObject(state);
                  geometry4 |> expect == geometry3 + 1;
                });
              });
            });
            describe("optimize: should only reallocate once in one loop", () =>
              test("test can correctly reallocate", () => {
                let (
                  state,
                  (gameObject1, gameObject2, gameObject3),
                  (geometry1, geometry2, geometry3),
                  (vertices1, vertices2, vertices3),
                  (texCoords1, texCoords2, texCoords3),
                  (normals1, normals2, normals3),
                  (indices1, indices2, indices3),
                ) =
                  ReallocateGeometryCPUMemoryTool.prepareForOptimize(state);
                ReallocateGeometryCPUMemoryTool.judgeForOptimize(
                  state,
                  (gameObject1, gameObject2, gameObject3),
                  (geometry1, geometry2, geometry3),
                  (vertices1, vertices2, vertices3),
                  (texCoords1, texCoords2, texCoords3),
                  (normals1, normals2, normals3),
                  (indices1, indices2, indices3),
                );
              })
            );
          });
        });
      });
      describe("contract check", () =>
        test("shouldn't dispose the alive component", () => {
          let (state, gameObject1, geometry1) =
            GeometryTool.createGameObject(state^);
          let state = state |> GameObjectAPI.initGameObject(gameObject1);
          let state =
            VboBufferTool.addVboBufferToGeometryBufferMap(geometry1, state);
          let state =
            state
            |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                 gameObject1,
                 geometry1,
               );
          expect(() => {
            let state =
              state
              |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                   gameObject1,
                   geometry1,
                 );
            ();
          })
          |> toThrowMessage(
               "expect dispose the alive component, but actual not",
             );
        })
      );
    });
    describe("contract check", () =>
      describe("check is alive", () =>
        describe("if geometry is disposed", () => {
          let _testGetFunc = getFunc => {
            open GameObjectAPI;
            open GameObjectAPI;
            let (state, gameObject, geometry) =
              GeometryTool.createGameObject(state^);
            let state =
              VboBufferTool.addVboBufferToGeometryBufferMap(geometry, state);
            let state =
              state
              |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                   gameObject,
                   geometry,
                 );
            expect(() =>
              getFunc(geometry, state)
            )
            |> toThrowMessage("expect component alive, but actual not");
          };
          let _testSetFunc = setFunc => {
            open GameObjectAPI;
            open GameObjectAPI;
            let (state, gameObject, geometry) =
              GeometryTool.createGameObject(state^);
            let state =
              VboBufferTool.addVboBufferToGeometryBufferMap(geometry, state);
            let state =
              state
              |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                   gameObject,
                   geometry,
                 );
            expect(() =>
              setFunc(geometry, Obj.magic(0), state)
            )
            |> toThrowMessage("expect component alive, but actual not");
          };
          test("getGeometryVertices should error", () =>
            _testGetFunc(getGeometryVertices)
          );
          test("getGeometryTexCoords should error", () =>
            _testGetFunc(getGeometryTexCoords)
          );
          test("getGeometryNormals should error", () =>
            _testGetFunc(getGeometryNormals)
          );
          test("getGeometryIndices should error", () =>
            _testGetFunc(getGeometryIndices)
          );
          test("unsafeGetGeometryGameObjects should error", () =>
            _testGetFunc(unsafeGetGeometryGameObjects)
          );
          test("setGeometryVertices should error", () =>
            _testSetFunc(setGeometryVertices)
          );
          test("setGeometryTexCoords should error", () =>
            _testSetFunc(setGeometryTexCoords)
          );
          test("setGeometryNormals should error", () =>
            _testSetFunc(setGeometryNormals)
          );
          test("setGeometryIndices should error", () =>
            _testSetFunc(setGeometryIndices)
          );
        })
      )
    );
  });