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
          let (state, geometry) = createGeometry(state^);
          let newData = Uint16Array.make([|3, 5, 5|]);
          let state = state |> setGeometryIndices16(geometry, newData);
          getGeometryIndices16(geometry, state) |> expect == newData;
        })
      );
    });

    describe("hasGeometryVertices", () =>
      test("test", () => {
        let (state, geometry) = GeometryAPI.createGeometry(state^);
        let state =
          state
          |> GeometryAPI.setGeometryVertices(
               geometry,
               Float32Array.make([|1., 2., 3.|]),
             );

        GeometryAPI.hasGeometryVertices(geometry, state) |> expect == true;
      })
    );

    describe("test geometry has indices", () => {
      let _testIndices16 = (hasIndicesFunc, result) => {
        let (state, geometry) = GeometryAPI.createGeometry(state^);
        let state =
          state
          |> GeometryAPI.setGeometryIndices16(
               geometry,
               Uint16Array.make([|1, 2, 3|]),
             );

        hasIndicesFunc(geometry, state) |> expect == result;
      };

      let _testIndices32 = (hasIndicesFunc, result) => {
        let (state, geometry) = GeometryAPI.createGeometry(state^);
        let state =
          state
          |> GeometryAPI.setGeometryIndices32(
               geometry,
               Uint32Array.make([|1, 2, 3|]),
             );

        hasIndicesFunc(geometry, state) |> expect == result;
      };

      describe("hasGeometryIndices", () => {
        test("if has indices16, return true", () =>
          _testIndices16(GeometryAPI.hasGeometryIndices, true)
        );
        test("if has indices32, return true", () =>
          _testIndices32(GeometryAPI.hasGeometryIndices, true)
        );
      });

      describe("hasGeometryIndices16", () => {
        test("if has indices16, return true", () =>
          _testIndices16(GeometryAPI.hasGeometryIndices16, true)
        );
        test("if has indices32, return false", () =>
          _testIndices32(GeometryAPI.hasGeometryIndices16, false)
        );
      });

      describe("hasGeometryIndices32", () => {
        test("if has indices16, return false", () =>
          _testIndices16(GeometryAPI.hasGeometryIndices32, false)
        );
        test("if has indices32, return true", () =>
          _testIndices32(GeometryAPI.hasGeometryIndices32, true)
        );
      });
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

    describe("batchDisposeGeometry", () => {
      let _exec = (geometry1, state) => {
        let state = GeometryAPI.batchDisposeGeometry([|geometry1|], state);
        let state = DisposeJob.execJob(None, state);

        state;
      };

      describe("if geometry has gameObjects", () => {
        let _prepare = state => {
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

          ((gameObject1, gameObject2), geometry1, state);
        };

        let _prepareAndExec = state => {
          let ((gameObject1, gameObject2), geometry1, state) =
            _prepare(state);

          let state = _exec(geometry1, state);

          ((gameObject1, gameObject2), geometry1, state);
        };

        test("remove from gameObject", () => {
          let ((gameObject1, gameObject2), geometry1, state) =
            _prepareAndExec(state);

          (
            GameObjectAPI.hasGameObjectGeometryComponent(gameObject1, state),
            GameObjectAPI.hasGameObjectGeometryComponent(gameObject2, state),
          )
          |> expect == (false, false);
        });

        describe("dispose geometry data", () => {
          test("remove gameObject", () => {
            let ((gameObject1, gameObject2), geometry1, state) =
              _prepareAndExec(state);

            GeometryTool.hasGameObject(geometry1, state) |> expect == false;
          });
          test("remove from nameMap", () => {
            let ((gameObject1, gameObject2), geometry1, state) =
              _prepareAndExec(state);

            GeometryTool.getName(geometry1, state) |> expect == None;
          });
        });

        describe("dispose vbo buffer data", () =>
          test("test", () => {
            open AllVboBufferType;

            let ((gameObject1, gameObject2), geometry1, state) =
              _prepare(state);

            let state =
              VboBufferTool.addVboBufferToGeometryBufferMap(geometry1, state);

            let state = _exec(geometry1, state);

            let {geometryVertexBufferMap} = VboBufferTool.getRecord(state);

            geometryVertexBufferMap
            |> WonderCommonlib.MutableSparseMapService.has(geometry1)
            |> expect == false;
          })
        );
      });
      describe("else", () => {
        let _prepare = state => {
          let (state, geometry1) = createGeometry(state^);

          (geometry1, state);
        };

        let _prepareAndExec = state => {
          let (geometry1, state) = _prepare(state);

          let state = _exec(geometry1, state);

          (geometry1, state);
        };

        describe("dispose geometry data", () => {
          test("remove gameObject", () => {
            let (geometry1, state) = _prepareAndExec(state);

            GeometryTool.hasGameObject(geometry1, state) |> expect == false;
          });
          test("remove from nameMap", () => {
            let (geometry1, state) = _prepareAndExec(state);

            GeometryTool.getName(geometry1, state) |> expect == None;
          });
        });

        describe("dispose vbo buffer data", () =>
          test("test", () => {
            open AllVboBufferType;

            let (geometry1, state) = _prepare(state);

            let state =
              VboBufferTool.addVboBufferToGeometryBufferMap(geometry1, state);

            let state = _exec(geometry1, state);

            let {geometryVertexBufferMap} = VboBufferTool.getRecord(state);

            geometryVertexBufferMap
            |> WonderCommonlib.MutableSparseMapService.has(geometry1)
            |> expect == false;
          })
        );
      });
    });

    describe("dispose component", () => {
      describe("dispose data", () => {
        test("remove point data", () => {
          let (
            state,
            gameObject1,
            geometry1,
            (vertices1, texCoords1, normals1, indices1),
          ) =
            GeometryTool.createGameObjectAndSetPointData(state^);

          let state =
            state
            |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                 gameObject1,
                 geometry1,
               );

          let (state, geometry2) = createGeometry(state);
          (
            GeometryAPI.getGeometryVertices(geometry2, state),
            GeometryAPI.getGeometryTexCoords(geometry2, state),
            GeometryAPI.getGeometryNormals(geometry2, state),
            GeometryAPI.getGeometryIndices16(geometry2, state),
          )
          |> expect
          == (
               Float32Array.make([||]),
               Float32Array.make([||]),
               Float32Array.make([||]),
               Uint16Array.make([||]),
             );
        });

        describe("test dispose shared geometry", () =>
          describe("remove gamemObject", () => {
            let _prepare = state => {
              let (state, geometry1) = createGeometry(state^);
              let (state, gameObject1) =
                GameObjectAPI.createGameObject(state);
              let state =
                state
                |> GameObjectAPI.addGameObjectGeometryComponent(
                     gameObject1,
                     geometry1,
                   );
              let (state, gameObject2) =
                GameObjectAPI.createGameObject(state);
              let state =
                state
                |> GameObjectAPI.addGameObjectGeometryComponent(
                     gameObject2,
                     geometry1,
                   );
              let (state, gameObject3) =
                GameObjectAPI.createGameObject(state);
              let state =
                state
                |> GameObjectAPI.addGameObjectGeometryComponent(
                     gameObject3,
                     geometry1,
                   );

              (state, (gameObject1, gameObject2, gameObject3), geometry1);
            };

            test("test remove one gameObjecct", () => {
              let (state, (gameObject1, gameObject2, gameObject3), geometry1) =
                _prepare(state);

              let state =
                state
                |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                     gameObject1,
                     geometry1,
                   );

              GeometryAPI.unsafeGetGeometryGameObjects(geometry1, state)
              |> expect == [|gameObject2, gameObject3|];
            });
            test("test remove two gameObjeccts", () => {
              let (state, (gameObject1, gameObject2, gameObject3), geometry1) =
                _prepare(state);

              let state =
                state
                |> GameObjectTool.batchDisposeGameObjectsGeometryComponentWithoutVboBuffer(
                     [|gameObject3, gameObject2|],
                     geometry1,
                   );

              GeometryAPI.unsafeGetGeometryGameObjects(geometry1, state)
              |> expect == [|gameObject1|];
            });
            test("test remove all gameObjeccts", () => {
              let (state, (gameObject1, gameObject2, gameObject3), geometry1) =
                _prepare(state);

              let state =
                state
                |> GameObjectTool.batchDisposeGameObjectsGeometryComponentWithoutVboBuffer(
                     [|gameObject1, gameObject2, gameObject3|],
                     geometry1,
                   );

              GeometryTool.hasGameObject(geometry1, state) |> expect == false;
            });
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
              nameMap
              |> WonderCommonlib.MutableSparseMapService.has(geometry1),
            )
            |> expect == (false, false);
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

      describe("fix bug", () =>
        test(
          "if have create other gameObjects, shouldn't affect dispose geometry gameObjects",
          () => {
            let (state, gameObject1, material1) =
              BasicMaterialTool.createGameObject(state^);
            let (state, gameObject2, geometry2) =
              GeometryTool.createGameObject(state);

            let state =
              state
              |> GameObjectAPI.batchDisposeGameObject([|
                   gameObject1,
                   gameObject2,
                 |])
              |> DisposeJob.execJob(None);
            let (state, gameObject3, geometry3) =
              GeometryTool.createGameObject(state);

            GeometryAPI.unsafeGetGeometryGameObjects(geometry3, state)
            |> expect == [|gameObject3|];
          },
        )
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
          test("getGeometryIndices16 should error", () =>
            _testGetFunc(getGeometryIndices16)
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
          test("setGeometryIndices16 should error", () =>
            _testSetFunc(setGeometryIndices16)
          );
        })
      )
    );
  });