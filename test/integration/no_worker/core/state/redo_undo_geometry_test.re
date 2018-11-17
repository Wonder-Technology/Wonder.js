open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test redo,undo geometry data", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

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
        |> WonderCommonlib.SparseMapService.set(
             geometry1,
             originGameObjectsArr,
           )
        |> ignore;
        let copiedState = MainStateTool.deepCopyForRestore(state);
        let {gameObjectsMap} = GeometryTool.getRecord(copiedState);
        let arr =
          gameObjectsMap
          |> WonderCommonlib.SparseMapService.unsafeGet(geometry1);
        Array.unsafe_set(arr, 0, 2);

        let {gameObjectsMap} = GeometryTool.getRecord(state);
        gameObjectsMap
        |> WonderCommonlib.SparseMapService.unsafeGet(geometry1)
        |> expect == copiedOriginGameObjectsArr;
      });
    });

    describe("restore geometry record to target state", () => {
      let _createGameObjectAndSetPointData = (state: StateDataMainType.state) => {
        open Js.Typed_array;
        open GeometryAPI;

        let (state, geometry) = createGeometry(state);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);
        let state =
          state
          |> GameObjectAPI.addGameObjectGeometryComponent(
               gameObject,
               geometry,
             );
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
        let texCoords2 = Float32Array.make([|1., 0.5, 0.2, 0.3, 0.3, 0.5|]);
        let normals2 =
          Float32Array.make([|3., 2., 4., 5., 6., 7., 2.5, 1.5, 0.|]);
        let indices2 = Uint16Array.make([|0, 1, 2|]);
        let indices32_2 = Uint32Array.make([|0, 1, 2|]);
        let currentState =
          currentState
          |> GeometryAPI.setGeometryVertices(geometry2, vertices2)
          |> GeometryAPI.setGeometryTexCoords(geometry2, texCoords2)
          |> GeometryAPI.setGeometryNormals(geometry3, normals2)
          |> GeometryAPI.setGeometryIndices(geometry2, indices2)
          |> GeometryAPI.setGeometryIndices32(geometry2, indices32_2);

        ((currentState, copiedState), (geometry1, geometry2, geometry3));
      };

      let _getMainVertexData = data =>
        data |> Float32Array.slice(~start=0, ~end_=8);

      let _getMainIndexData = data =>
        data |> Uint16Array.slice(~start=0, ~end_=8);

      let _getMainIndex32Data = data =>
        data |> Uint32Array.slice(~start=0, ~end_=8);

      test("test restore point data typeArrays", () => {
        open GeometryType;

        let ((currentState, copiedState), _) = _prepare();
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
                      0.,
                      0.,
                    |]),
                    Float32Array.make([|0.5, 0.5, 0.5, 0.5, 0., 0., 0., 0.|]),
                    Float32Array.make([|1., 1., 1., 1., 1., 1., 0., 0.|]),
                    Uint16Array.make([|0, 2, 1, 0, 0, 0, 0, 0|]),
                    Uint32Array.make([|0, 2, 1, 0, 0, 0, 0, 0|]),
                  );
      });

      test("test restore point info typeArrays", () => {
        let ((currentState, copiedState), (geometry1, geometry2, geometry3)) =
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
        /* |> expect == (6, 6, 4, 3, 0, 0); */
        |> expect == (6, 6, 4, 3, 9, 9);
      });
      test("test set point after restore", () => {
        let ((currentState, copiedState), (geometry1, geometry2, geometry3)) =
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
        let ((currentState, copiedState), (geometry1, geometry2, geometry3)) =
          _prepare();

        let restoredState = MainStateTool.restore(currentState, copiedState);

        let (restoredState, geometry4) =
          GeometryAPI.createGeometry(restoredState);
        /* let hasGeometry4Vertices =
             GeometryAPI.hasGeometryVertices(geometry4, restoredState);
           let hasGeometry4Indices =
             GeometryAPI.hasGeometryIndices(geometry4, restoredState); */

        let vertices = Float32Array.make([|0., 0.5, 1.0|]);
        let indices32 = Uint32Array.make([|1, 3, 2|]);

        let restoredState =
          GeometryAPI.setGeometryVertices(geometry4, vertices, restoredState)
          |> GeometryAPI.setGeometryIndices32(geometry4, indices32);

        (
          /* hasGeometry4Vertices,
             hasGeometry4Indices, */
          GeometryAPI.getGeometryVertices(geometry4, restoredState),
          GeometryAPI.getGeometryIndices(geometry4, restoredState),
          GeometryAPI.getGeometryIndices32(geometry4, restoredState),
        )
        |>
        expect == (
                    /* false,
                       false, */
                    vertices,
                    Uint16Array.make([|0, 0, 0|]),
                    indices32,
                  );
      });
    });
  });