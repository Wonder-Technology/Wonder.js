open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test redo,undo geometry data", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    let _createGameObjectAndSetPointData = (state: StateDataMainType.state) => {
      open Js.Typed_array;
      open GeometryAPI;

      let (state, geometry) = createGeometry(state);
      let (state, gameObject) = GameObjectAPI.createGameObject(state);
      let state =
        state
        |> GameObjectAPI.addGameObjectGeometryComponent(gameObject, geometry);
      let vertices1 = Float32Array.make([|10., 10., 10., 10., 10., 10.|]);
      let texCoords1 = Float32Array.make([|0.5, 0.5, 0.5, 0.5|]);
      let normals1 = Float32Array.make([|1., 1., 1., 1., 1., 1.|]);
      let indices1 = Uint16Array.make([|0, 2, 1|]);
      let indices32_1 = Uint32Array.make([|0, 2, 1|]);
      let state =
        state
        |> setGeometryVertices(geometry, vertices1)
        |> setGeometryTexCoords(geometry, texCoords1)
        |> setGeometryNormals(geometry, normals1)
        |> setGeometryIndices(geometry, indices1)
        |> setGeometryIndices32(geometry, indices32_1);

      (
        state,
        gameObject,
        geometry,
        (vertices1, texCoords1, normals1, indices1, indices32_1),
      );
    };

    let _prepare = () => {
      let state =
        TestTool.initWithJobConfigWithoutBuildFakeDom(
          ~sandbox,
          ~buffer=
            SettingTool.buildBufferConfigStr(
              ~geometryPointCount=12,
              ~geometryCount=6,
              (),
            ),
          (),
        );

      let (
        state,
        gameObject1,
        geometry1,
        (vertices1, texCoords1, normals1, indices1, indices32_1),
      ) =
        _createGameObjectAndSetPointData(state);

      let state =
        state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
      let copiedState = MainStateTool.deepCopyForRestore(state);

      let (currentState, gameObject2, geometry2) =
        GeometryTool.createGameObject(state);
      let (currentState, gameObject3, geometry3) =
        GeometryTool.createGameObject(state);
      let vertices2 =
        Float32Array.make([|2., 3., 40., 1., 3., 5., 3., 4., 11.|]);
      let texCoords2 = Float32Array.make([|1., 0.5, 1., 1.5, 0.3, 0.5|]);
      let normals2 =
        Float32Array.make([|3., 2., 4., 5., 6., 7., 2.5, 1.5, 0.|]);
      let indices2 = Uint16Array.make([|0, 1, 2|]);
      let indices32_2 = Uint32Array.make([|0, 1, 2|]);
      let currentState =
        currentState
        |> GeometryAPI.setGeometryVertices(geometry2, vertices2)
        |> GeometryAPI.setGeometryTexCoords(geometry1, texCoords2)
        |> GeometryAPI.setGeometryNormals(geometry3, normals2)
        |> GeometryAPI.setGeometryIndices(geometry2, indices2)
        |> GeometryAPI.setGeometryIndices32(geometry2, indices32_2);

      (
        (currentState, copiedState),
        (geometry1, geometry2, geometry3),
        (vertices1, texCoords1, normals1, indices1, indices32_1),
        (vertices2, texCoords2, normals2, indices2, indices32_2),
      );
    };

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.initWithJobConfig(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("deep copy geometry record", () => {
      test("shadow copy nameMap", () =>
        StateDataMainType.(
          GeometryType.(
            MainStateTool.testShadowCopyArrayLikeMapData(
              state => {
                let {nameMap} = GeometryTool.getRecord(state);
                [|nameMap |> Obj.magic|];
              },
              state^,
            )
          )
        )
      );
      test("shadow copy indicesTypeMap", () =>
        StateDataMainType.(
          GeometryType.(
            MainStateTool.testShadowCopyArrayLikeMapData(
              state => {
                let {indicesTypeMap} = GeometryTool.getRecord(state);
                [|indicesTypeMap |> Obj.magic|];
              },
              state^,
            )
          )
        )
      );
      test("deep copy gameObjectsMap", () => {
        open StateDataMainType;
        open GeometryType;
        let (state, gameObject1, geometry1) =
          GeometryTool.createGameObject(state^);
        let {gameObjectsMap} = GeometryTool.getRecord(state);
        let originGameObjectsArr = [|1|];
        let copiedOriginGameObjectsArr = originGameObjectsArr |> Js.Array.copy;
        gameObjectsMap
        |> WonderCommonlib.MutableSparseMapService.set(
             geometry1,
             originGameObjectsArr,
           )
        |> ignore;
        let copiedState = MainStateTool.deepCopyForRestore(state);
        let {gameObjectsMap} = GeometryTool.getRecord(copiedState);
        let arr =
          gameObjectsMap
          |> WonderCommonlib.MutableSparseMapService.unsafeGet(geometry1);
        Array.unsafe_set(arr, 0, 2);

        let {gameObjectsMap} = GeometryTool.getRecord(state);
        gameObjectsMap
        |> WonderCommonlib.MutableSparseMapService.unsafeGet(geometry1)
        |> expect == copiedOriginGameObjectsArr;
      });
    });

    describe("restore geometry record to target state", () => {
      let _getMainVertexData = data =>
        data |> Float32Array.slice(~start=0, ~end_=8);

      let _getMainIndexData = data =>
        data |> Uint16Array.slice(~start=0, ~end_=8);

      let _getMainIndex32Data = data =>
        data |> Uint32Array.slice(~start=0, ~end_=8);

      test("test restore point data typeArrays", () => {
        open GeometryType;

        let ((currentState, copiedState), _, _, _) = _prepare();
        let restoredState = MainStateTool.restore(currentState, copiedState);

        let {vertices, texCoords, normals, indices, indices32} =
          restoredState |> GeometryTool.getRecord;

        (
          vertices |> _getMainVertexData,
          texCoords |> _getMainVertexData,
          normals |> _getMainVertexData,
          indices |> _getMainIndexData,
          indices32 |> _getMainIndex32Data,
        )
        |>
        expect == (
                    Float32Array.make([|
                      10.,
                      10.,
                      10.,
                      10.,
                      10.,
                      10.,
                      2.,
                      3.,
                    |]),
                    Float32Array.make([|
                      0.5,
                      0.5,
                      0.5,
                      0.5,
                      1.,
                      0.5,
                      1.,
                      1.5,
                    |]),
                    Float32Array.make([|1., 1., 1., 1., 1., 1., 3., 2.|]),
                    Uint16Array.make([|0, 2, 1, 0, 1, 2, 0, 0|]),
                    Uint32Array.make([|0, 2, 1, 0, 1, 2, 0, 0|]),
                  );
      });

      test("test restore point info typeArrays", () => {
        let (
          (currentState, copiedState),
          (geometry1, geometry2, geometry3),
          _,
          _,
        ) =
          _prepare();
        let restoredState = MainStateTool.restore(currentState, copiedState);

        let vertices =
          restoredState |> GeometryAPI.getGeometryVertices(geometry1);

        (
          restoredState
          |> GeometryAPI.getGeometryVertices(geometry1)
          |> Float32Array.length,
          restoredState
          |> GeometryAPI.getGeometryNormals(geometry1)
          |> Float32Array.length,
          restoredState
          |> GeometryAPI.getGeometryTexCoords(geometry1)
          |> Float32Array.length,
          restoredState
          |> GeometryAPI.getGeometryIndices(geometry1)
          |> Uint16Array.length,
          restoredState
          |> GeometryAPI.getGeometryVertices(geometry2)
          |> Float32Array.length,
          restoredState
          |> GeometryAPI.getGeometryNormals(geometry3)
          |> Float32Array.length,
        )
        |> expect == (6, 6, 4, 3, 0, 0);
      });
      test("test set point after restore", () => {
        let (
          (currentState, copiedState),
          (geometry1, geometry2, geometry3),
          _,
          _,
        ) =
          _prepare();
        let restoredState = MainStateTool.restore(currentState, copiedState);

        let vertices3 = Float32Array.make([|3., 4., 11.|]);
        let restoredState =
          restoredState
          |> GeometryAPI.setGeometryVertices(geometry3, vertices3);
        let vertices =
          restoredState |> GeometryAPI.getGeometryVertices(geometry3);

        vertices |> expect == vertices3;
      });
      test("test create geometry and set point after restore", () => {
        let (
          (currentState, copiedState),
          (geometry1, geometry2, geometry3),
          _,
          _,
        ) =
          _prepare();

        let restoredState = MainStateTool.restore(currentState, copiedState);

        let (restoredState, geometry4) =
          GeometryAPI.createGeometry(restoredState);

        let vertices = Float32Array.make([|0., 0.5, 1.0|]);
        let indices32 = Uint32Array.make([|1, 3, 2|]);

        let restoredState =
          GeometryAPI.setGeometryVertices(geometry4, vertices, restoredState)
          |> GeometryAPI.setGeometryIndices32(geometry4, indices32);

        (
          GeometryAPI.getGeometryVertices(geometry4, restoredState),
          GeometryAPI.getGeometryIndices(geometry4, restoredState),
          GeometryAPI.getGeometryIndices32(geometry4, restoredState),
        )
        |> expect == (vertices, Uint16Array.make([|0, 1, 2|]), indices32);
      });

      describe("test reallocate geometry", () => {
        test("test restore after reallocate", () => {
          let (
            (currentState, copiedState),
            (geometry1, geometry2, geometry3),
            (vertices1, texCoords1, normals1, indices1, indices32_1),
            _,
          ) =
            _prepare();

          let gameObject1 =
            GeometryAPI.unsafeGetGeometryGameObjects(geometry1, currentState)
            |> ArrayService.unsafeGetFirst;

          let currentState =
            currentState
            |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBufferAndNotReallocate(
                 gameObject1,
                 geometry1,
               );

          let currentState =
            ReallocateGeometryCPUMemoryTool.reAllocateGeometryToNewBuffer(
              currentState,
            );

          let restoredState =
            MainStateTool.restore(currentState, copiedState);

          (
            restoredState |> GeometryAPI.getGeometryVertices(geometry1),
            restoredState |> GeometryAPI.getGeometryNormals(geometry1),
            restoredState |> GeometryAPI.getGeometryTexCoords(geometry1),
            restoredState |> GeometryAPI.getGeometryIndices(geometry1),
            restoredState |> GeometryAPI.getGeometryIndices32(geometry1),
            restoredState |> GeometryAPI.hasGeometryVertices(geometry2),
            restoredState |> GeometryAPI.hasGeometryNormals(geometry3),
          )
          |>
          expect == (
                      vertices1,
                      normals1,
                      texCoords1,
                      indices1,
                      indices32_1,
                      false,
                      false,
                    );
        });
        test(
          {|
          1.create 3 geometrys g1,g2,g3;
          2.set g1 points data p1;
          3.copy state to copiedState1;
          4.set g2,g3 points data p2;
          5.dispose g1 with state;
          6.reallocate geometry with state;
          7.copy state to copiedState2;
          8.restore state to copiedState1 to be restoreState1;
          9.restore restoreState1 to copiedState2 to be restoreState2;

          get g2,g3 points data with restoreState2 should be p2.
          |},
          () => {
            let (
              (currentState, copiedState),
              (geometry1, geometry2, geometry3),
              (vertices1, texCoords1, normals1, indices1, indices32_1),
              (vertices2, texCoords2, normals2, indices2, indices32_2),
            ) =
              _prepare();

            let gameObject1 =
              GeometryAPI.unsafeGetGeometryGameObjects(
                geometry1,
                currentState,
              )
              |> ArrayService.unsafeGetFirst;

            let currentState =
              currentState
              |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBufferAndNotReallocate(
                   gameObject1,
                   geometry1,
                 );

            let currentState =
              ReallocateGeometryCPUMemoryTool.reAllocateGeometryToNewBuffer(
                currentState,
              );

            let copiedState2 = MainStateTool.deepCopyForRestore(currentState);

            let restoredState =
              MainStateTool.restore(currentState, copiedState);

            let restoredState2 =
              MainStateTool.restore(restoredState, copiedState2);

            (
              restoredState2 |> GeometryAPI.getGeometryVertices(geometry2),
              restoredState2 |> GeometryAPI.getGeometryIndices(geometry2),
              restoredState2 |> GeometryAPI.getGeometryIndices32(geometry2),
              restoredState2 |> GeometryAPI.getGeometryNormals(geometry3),
            )
            |> expect == (vertices2, indices2, indices32_2, normals2);
          },
        );
      });
    });
  });