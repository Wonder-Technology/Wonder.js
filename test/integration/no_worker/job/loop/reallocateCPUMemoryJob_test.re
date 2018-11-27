open Wonder_jest;

open Js.Typed_array;

open GeometryType;

let _ =
  describe("test reallocate cpu memory job", () => {
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

    describe("isGeometryBufferNearlyFull", () => {
      test("if nearly full, return true", () =>
        QueryCPUMemoryService.isGeometryBufferNearlyFull(
          0.8,
          {
            ...GeometryTool.getRecord(state^),
            vertices: Float32Array.fromLength(100),
            verticesOffset: 80,
          },
        )
        |> expect == true
      );
      test("else, return false", () =>
        QueryCPUMemoryService.isGeometryBufferNearlyFull(
          0.8,
          {
            ...GeometryTool.getRecord(state^),
            vertices: Float32Array.fromLength(100),
            verticesOffset: 79,
          },
        )
        |> expect == false
      );
    });

    describe("test reallocate geometry", () => {
      open GeometryAPI;

      let _prepare = state => {
        let state = SettingTool.setMemory(state, ~maxDisposeCount=1, ());
        GeometryTool.createThreeGameObjectsAndSetFullPointData(state);
      };

      describe("if have dispose too many geometrys, reallocate", () => {
        describe("test type array data", () =>
          describe("pack old type array with alived data", () => {
            test("test indices and indices32", () => {
              open GeometryTool;
              let state =
                SettingTool.setMemory(state^, ~maxDisposeCount=1, ());
              let indices1 = Uint16Array.make([|2, 1, 0|]);
              let indices3 = Uint16Array.make([|0, 1, 2|]);
              let indices4 = Uint16Array.make([|3, 2, 5|]);
              let indices32_2 = Uint32Array.make([|2, 9, 1|]);
              let (state, gameObject1, geometry1) = createGameObject(state);
              let (state, gameObject2, geometry2) = createGameObject(state);
              let (state, gameObject3, geometry3) = createGameObject(state);
              let (state, gameObject4, geometry4) = createGameObject(state);
              let state =
                state
                |> setGeometryIndices(geometry1, indices1)
                |> setGeometryIndices(geometry3, indices3)
                |> setGeometryIndices(geometry4, indices4)
                |> setGeometryIndices32(geometry2, indices32_2);

              let state =
                state
                |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                     gameObject1,
                     geometry1,
                   );

              (
                getGeometryIndices(geometry3, state),
                getGeometryIndices(geometry4, state),
                getGeometryIndices32(geometry2, state),
              )
              |> expect == (indices3, indices4, indices32_2);
            });

            test("alive geometry's points should exist", () => {
              let (
                state,
                (gameObject1, gameObject2, gameObject3),
                (geometry1, geometry2, geometry3),
                (vertices1, vertices2, vertices3),
                (texCoords1, texCoords2, texCoords3),
                (normals1, normals2, normals3),
                (
                  (indices1, indices2, indices3),
                  (indices32_1, indices32_2, indices32_3),
                ),
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
                getGeometryIndices32(geometry2, state),
                getGeometryVertices(geometry3, state),
                getGeometryTexCoords(geometry3, state),
                getGeometryNormals(geometry3, state),
                getGeometryIndices(geometry3, state),
                getGeometryIndices32(geometry3, state),
              )
              |>
              expect == (
                          vertices2,
                          texCoords2,
                          normals2,
                          indices2,
                          indices32_2,
                          vertices3,
                          texCoords3,
                          normals3,
                          indices3,
                          indices32_3,
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
                (
                  (indices1, indices2, indices3),
                  (indices32_1, indices32_2, indices32_3),
                ),
              ) =
                _prepare(state^);
              let state =
                state
                |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                     gameObject2,
                     geometry2,
                   );
              let {vertices, texCoords, normals, indices, indices32} =
                state |> GeometryTool.getRecord;
              (
                vertices |> Float32Array.slice(~start=0, ~end_=10),
                texCoords |> Float32Array.slice(~start=0, ~end_=10),
                normals |> Float32Array.slice(~start=0, ~end_=10),
                indices |> Uint16Array.slice(~start=0, ~end_=10),
                indices32 |> Uint32Array.slice(~start=0, ~end_=10),
              )
              |>
              expect == (
                          Float32Array.make([|
                            11.,
                            10.,
                            11.,
                            4.,
                            3.,
                            2.,
                            4.,
                            3.,
                            2.,
                            0.,
                          |]),
                          Float32Array.make([|
                            0.5,
                            1.5,
                            1.,
                            0.5,
                            1.,
                            0.5,
                            0.,
                            0.,
                            0.,
                            0.,
                          |]),
                          Float32Array.make([|
                            1.,
                            3.,
                            3.,
                            5.,
                            4.,
                            2.,
                            5.,
                            4.,
                            2.,
                            0.,
                          |]),
                          Uint16Array.make([|2, 0, 1, 1, 0, 2, 1, 0, 2, 0|]),
                          Uint32Array.make([|1, 2, 0, 1, 0, 2, 1, 0, 2, 0|]),
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
              (
                (indices1, indices2, indices3),
                (indices32_1, indices32_2, indices32_3),
              ),
            ) =
              _prepare(state^);
            let state =
              state
              |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                   gameObject1,
                   geometry1,
                 );
            let {verticesInfos, texCoordsInfos, normalsInfos, indicesInfos} =
              state |> GeometryTool.getRecord;
            (
              verticesInfos |> Uint32Array.slice(~start=0, ~end_=6),
              texCoordsInfos |> Uint32Array.slice(~start=0, ~end_=6),
              normalsInfos |> Uint32Array.slice(~start=0, ~end_=6),
              indicesInfos |> Uint32Array.slice(~start=0, ~end_=6),
            )
            |>
            expect == (
                        Uint32Array.make([|0, 0, 0, 3, 3, 6|]),
                        Uint32Array.make([|0, 0, 0, 2, 2, 4|]),
                        Uint32Array.make([|0, 0, 0, 3, 3, 6|]),
                        Uint32Array.make([|0, 0, 0, 3, 3, 6|]),
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
            (
              (indices1, indices2, indices3),
              (indices32_1, indices32_2, indices32_3),
            ),
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
            indices32Offset,
          } =
            state |> GeometryTool.getRecord;
          (
            verticesOffset,
            texCoordsOffset,
            normalsOffset,
            indicesOffset,
            indices32Offset,
          )
          |>
          expect == (
                      vertices2 |> Float32Array.length,
                      texCoords2 |> Float32Array.length,
                      normals2 |> Float32Array.length,
                      indices2 |> Uint16Array.length,
                      indices32_2 |> Uint32Array.length,
                    );
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
                _,
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
              let state = state |> GameObjectAPI.initGameObject(gameObject4);
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
              _,
            ) =
              _prepare(state^);
            let (state, gameObject4, geometry4) =
              GeometryTool.createGameObject(state);
            geometry4 |> expect == geometry3 + 1;
          });
        });
      });

      describe("if geometry buffer nearly full, reallocate", () =>
        test("test pack vertices", () => {
          open GeometryTool;
          let state = {
            ...state^,
            geometryRecord:
              Some({
                ...GeometryTool.getRecord(state^),
                vertices: Float32Array.fromLength(100),
                verticesOffset: 84,
              }),
          };
          let vertices1 = Float32Array.make([|2., 1., (-1.)|]);
          let vertices2 = Float32Array.make([|4., 2., 1.|]);
          let (state, gameObject1, geometry1) = createGameObject(state);
          let (state, gameObject2, geometry2) = createGameObject(state);
          let state =
            state
            |> setGeometryVertices(geometry1, vertices1)
            |> setGeometryVertices(geometry2, vertices2);

          let state =
            state
            |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                 gameObject1,
                 geometry1,
               );

          let {vertices, verticesInfos} = state |> GeometryTool.getRecord;
          vertices
          |> Float32Array.slice(~start=0, ~end_=6)
          |> expect == Float32Array.make([|4., 2., 1., 0., 0., 0.|]);
        })
      );

      describe("optimize: should only reallocate once in one loop", () =>
        test("test can correctly reallocate", () => {
          let (
            state,
            (gameObject1, gameObject2, gameObject3),
            (geometry1, geometry2, geometry3),
            (vertices1, vertices2, vertices3),
            (texCoords1, texCoords2, texCoords3),
            (normals1, normals2, normals3),
            (
              (indices1, indices2, indices3),
              (indices32_1, indices32_2, indices32_3),
            ),
          ) =
            ReallocateGeometryCPUMemoryTool.prepareForOptimize(state);
          ReallocateGeometryCPUMemoryTool.judgeForOptimize(
            state,
            (gameObject1, gameObject2, gameObject3),
            (geometry1, geometry2, geometry3),
            (vertices1, vertices2, vertices3),
            (texCoords1, texCoords2, texCoords3),
            (normals1, normals2, normals3),
            (
              (indices1, indices2, indices3),
              (indices32_1, indices32_2, indices32_3),
            ),
          );
        })
      );
    });

    describe("fix bug", () =>
      describe("reallocate geometry", () =>
        test(
          {|
            create geometry g1;
            dispose g1;
            create geometry g2 with vertices v2;
            create geometry g3 with vertices v3;
            dispose g3;
            reallocate geometry to new buffer;

            g2->vertices should be v2.
            |},
          () => {
            let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());

            let (state, gameObject1, geometry1) =
              GeometryTool.createGameObject(state);

            let state =
              state
              |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBufferAndNotReallocate(
                   gameObject1,
                   geometry1,
                 );

            let (state, gameObject2, geometry2) =
              GeometryTool.createGameObject(state);
            let vertices2 = Float32Array.make([|1., 2., 3.|]);

            let state =
              GeometryAPI.setGeometryVertices(geometry2, vertices2, state);

            let (state, gameObject3, geometry3) =
              GeometryTool.createGameObject(state);
            let vertices3 = Float32Array.make([|3., 3., 3.|]);

            let state =
              GeometryAPI.setGeometryVertices(geometry3, vertices3, state);

            let state =
              state
              |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBufferAndNotReallocate(
                   gameObject3,
                   geometry3,
                 );

            let state =
              ReallocateGeometryCPUMemoryTool.reAllocateGeometryToNewBuffer(
                state,
              );

            GeometryAPI.getGeometryVertices(geometry2, state)
            |> expect == vertices2;
          },
        )
      )
    );
  });